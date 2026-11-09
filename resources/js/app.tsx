import { createInertiaApp } from '@inertiajs/react';
import { Card, createTheme, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import '@mantine/core/styles.css';
import 'mantine-datatable/styles.layer.css';
import '../css/app.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const theme = createTheme({
  fontFamily: 'Jost, Helvetica, sans-serif',
  primaryColor: 'green',
  colors: {
    gray: [
      '#f8f8f8',
      '#f3f3f3',
      '#e9e9e9',
      '#cecece',
      '#adadad',
      '#868686',
      '#494949',
      '#343434',
      '#212121',
      '#111111',
    ],
  },
  components: {
    Card: Card.extend({
      defaultProps: {
        withBorder: true,
        radius: 'md',
        shadow: 'md',
      },
    }),
  },
});

createInertiaApp({
  // Resolved by @inertiajs/vite — no import.meta.glob boilerplate needed.
  pages: { path: './Pages', extension: '.tsx' },

  title: (title) => (title ? `${title} — ${appName}` : appName),

  // Everything that has to wrap the page lives here.
  withApp: (app) => (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <ModalsProvider>{app}</ModalsProvider>
    </MantineProvider>
  ),

  progress: {
    color: '#4B5563',
  },
});
