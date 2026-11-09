# Laravel 13 React Template

A starting point for Laravel apps with an Inertia + React front end, styled with Mantine. Everything is wired up and running out of the box — auth, layouts, a CRUD example, dark/light mode, type-safe routes.

Upgraded from [`laravel-12-react-template`](https://github.com/maskedmage77/laravel-12-react-template), with every dependency brought to its current major.

## Stack

| Layer | Version |
| --- | --- |
| PHP | 8.3+ (8.4 in Docker) |
| Laravel | 13.x |
| Inertia | 3.x (`inertiajs/inertia-laravel`, `@inertiajs/react`, `@inertiajs/vite`) |
| React | 19.x |
| Mantine | 9.x (`core`, `hooks`, `form`, `modals`) |
| mantine-datatable | 9.x |
| Vite | 8.x |
| Tailwind | 4.x (via `@tailwindcss/vite`) |
| TypeScript | 7.x |
| Ziggy | 2.x |
| State | Zustand 5 |
| Icons | `@phosphor-icons/react` |

## What's included

- **Breeze auth** — login, register, password reset, email verification, password confirmation, profile update/delete.
- **Mantine AppShell** — responsive header + navbar, collapsible on mobile, dark/light toggle persisted by Mantine.
- **Users CRUD** — `UserController` plus `Index` / `Create` / `Edit` pages, a `mantine-datatable` listing with client-side pagination, and a confirm-before-delete modal. Copy this pattern for new resources.
- **Permission-gated navigation** — `Components/Navbar` reads `auth.permissions` (shared from `HandleInertiaRequests`) and hides links the user can't see.
- **Ziggy** — `route()` on the client, generated from your Laravel routes.
- **Welcome page** — shows the resolved stack versions, so a broken install is obvious immediately.

## Requirements

- PHP 8.3+ with `pdo_mysql`, `mbstring`, `gd`, `zip`, `bcmath`
- Composer 2
- Node **20.19+ or 22.12+** (Vite 8 requirement)
- MySQL 8 (or SQLite for a quick look)

## Getting started

### With Docker (recommended)

```bash
cp .env.example .env

# .env.example expects MySQL in the `db` container. Fill these in:
#   DB_PASSWORD=
#   DB_ROOT_PASSWORD=

docker compose -f docker-compose.dev.yml up --build -d
docker exec -it laravel-13-mantine-app sh

composer install
php artisan key:generate
php artisan migrate
npm install
npm run dev        # leave this running
```

The app is on <http://localhost>, the Vite dev server on <http://localhost:5173>.

### Without Docker

```bash
composer install
cp .env.example .env
php artisan key:generate

# For a quick look without MySQL, set DB_CONNECTION=sqlite in .env and:
touch database/database.sqlite

php artisan migrate
npm install
npm run dev
php artisan serve
```

### Production build

```bash
npm run build      # runs `tsc` then `vite build`
docker compose -f docker-compose.prod.yml up --build -d
```

## Project layout

```
app/
  Http/Controllers/          Dashboard, Profile, Auth/*, UserController (CRUD example)
  Http/Middleware/           HandleInertiaRequests — shared props (auth, roles, permissions)
resources/
  css/app.css                Tailwind layers + Ubuntu / Ubuntu Mono webfonts
  js/
    app.tsx                  createInertiaApp entry (theme + providers)
    config.ts                client-side config from VITE_* vars
    Components/              Navbar, Modals, UserCreateForm, UserEditForm
    Hooks/                   usePagination (axios + datatable), useUserStore (zustand)
    Layouts/                 AuthenticatedLayout (AppShell), GuestLayout (centred card)
    Pages/                   Inertia pages — Auth/, Profile/, Users/, Dashboard, Welcome
    types/                   User + PageProps
docker/                      dev + prod PHP images, nginx
```

## Conventions

**Pages are resolved automatically.** `@inertiajs/vite` maps `resources/js/Pages` — there's no `resolve`/`import.meta.glob` boilerplate in `app.tsx`. Add a file, render it by name.

**Providers live in `withApp`.** `app.tsx` wraps every page in `MantineProvider` + `ModalsProvider` via `createInertiaApp({ withApp })`, so there is no `setup` callback to maintain.

**Adding a resource.** Copy `UserController` and `Pages/Users/*`, add a `NavLink` in `Components/Navbar`, and add the route in `routes/web.php`.

**Permissions.** `HandleInertiaRequests::share()` currently returns empty `roles` and `permissions` arrays. Wire those to your authorisation package (`spatie/laravel-permission` is the usual) and the navbar gating starts working with no further changes.

**Fonts.** Ubuntu (300/400/500/700 + italics) and Ubuntu Mono (400/700) load from Google Fonts in `resources/css/app.css`; the Mantine theme points `fontFamily` at `Ubuntu` and `fontFamilyMonospace` at `Ubuntu Mono`. Both fall back to `system-ui` / `ui-monospace`, so the UI still looks right offline. To use a self-hosted face instead, drop the `@import` and add `@font-face` rules — nothing else needs to change.

**Tailwind and Mantine coexist.** `resources/css/app.css` imports Tailwind's `theme` and `utilities` layers but *not* preflight — preflight resets Mantine's form styling. Add utilities freely; don't add `@import "tailwindcss"`.

## Notes for the 12 → 13 upgrade

If you're porting an app from `laravel-12-react-template`, these are the changes that actually bite:

- **`@inertiajs/vite` replaces the per-page `@vite` entry** in `app.blade.php`. The blade file now uses `<x-inertia::head>` / `<x-inertia::app>` and only loads `resources/js/app.tsx`.
- **Inertia 3 dropped Axios.** Keep `axios` as an explicit dependency if you use it (this template does, in `usePagination`).
- **`<title inertia>` → `<title data-inertia>`**, and `Inertia::lazy()` → `Inertia::optional()`.
- **Layout components assigned as arrow functions** must be wrapped in an array (`Page.layout = [Layout]`).
- **Mantine 9 requires React 19.2+**, renamed `Grid gutter` → `Grid gap`, and removed the `color` prop on `Text`/`Anchor` in favour of `c`.
- **`phosphor-react` is abandoned** — this template uses `@phosphor-icons/react`, which is a drop-in for the same icon names.
- **Tailwind 4 no longer uses `tailwind.config.js`** or a PostCSS plugin; it's `@tailwindcss/vite` plus CSS-level `@import`/`@plugin`.

## Licence

MIT.
