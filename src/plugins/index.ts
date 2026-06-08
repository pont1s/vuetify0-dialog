/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Types
import type { App } from 'vue'
import { createNotificationsPlugin } from '@vuetify/v0'

// Plugins
import vuetify from './vuetify'

export function registerPlugins (app: App) {
  app.use(vuetify)
  app.use(createNotificationsPlugin())
}
