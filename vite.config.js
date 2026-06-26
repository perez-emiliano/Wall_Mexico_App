import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa' // 💡 Importamos el plugin de PWA

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Actualiza la app automáticamente cuando subas cambios
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Wall México App',
        short_name: 'Wall México',
        description: 'Descubre oportunidades de empleo e impulsa tu negocio.',
        theme_color: '#c60b2a', // El color de la barra de estado en el celular (tu rojo)
        background_color: '#ffffff', // Color de fondo de la pantalla de carga
        display: 'standalone', // Hace que se abra en PANTALLA COMPLETA como app nativa
        orientation: 'portrait', // Bloquea la app en modo vertical
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // Permite que Android adapte el icono a círculos o cuadrados
          }
        ]
      }
    })
  ],
  server: {
    port: 3000, // Cambia el puerto si es necesario
    open: true, // Abre automáticamente en el navegador
  }
})