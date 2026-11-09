import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import inertia from '@inertiajs/vite';

// The dev server's port is per-instance so several checkouts can run at once.
// It has to match the port Compose publishes, because Laravel writes this port
// into public/hot and the browser fetches assets from that exact port.
const port = Number(process.env.VITE_PORT || 5173);

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        // Handles page resolution (resources/js/Pages) and SSR wiring for us.
        inertia(),
    ],
    server: {
        port,
        strictPort: true,
        hmr: {
            host: 'localhost',
        },
        watch: {
            usePolling: true,
            interval: 1000,
        },
    },
});
