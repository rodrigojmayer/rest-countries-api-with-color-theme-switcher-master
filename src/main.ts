import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles/main.css'
import '@mdi/font/css/materialdesignicons.css'
import router from './router'

const myCustomLightTheme = {
  dark: false,
  colors: {
      // Add other tokens as needed
      surface: 'hsl(0, 0%, 99%)',
        background: '#ffffff',
        primary: '#1976D2',
        secondary: 'hsl(0, 0%, 99%)',
    },
}

const myCustomDarkTheme = {
    dark: true,
    colors: {
        surface: 'hsl(209, 23%, 22%)', // 👈 sets --v-theme-surface
        background: '#1976D2',
        primary: '#90CAF9',
        secondary: 'hsl(209, 23%, 22%)',
    }
}
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
      myCustomDarkTheme,
    },
  },
})

// createApp(App).use(vuetify).mount('#app')
const app = createApp(App)
app.use(router)
app.use(vuetify)

router.isReady().then(() => {
  // console.log('Router is initialized ✅')
  app.mount('#app')
})
