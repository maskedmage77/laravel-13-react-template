/**
 * Values the PHP side hands to the client. VITE_* variables are baked in at
 * build time, so change them in .env and restart the dev server.
 */
export const appName: string = import.meta.env.VITE_APP_NAME || 'Laravel';
