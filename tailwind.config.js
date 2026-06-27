/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // La paleta de colores real de tu CSS
        wallmex: {
          red: '#c60b2a',       // Tu rojo institucional (links, hover, marca activa)
          blue: '#007aff',      // Tu azul de login, botones primarios e inputs enfocados
          'blue-hover': '#0062cc', // El hover de tu botón azul
          dark: '#1a1a1a',      // El color de tus títulos principales
          gray: '#666666',      // Tu color de subtítulos y textos secundarios
          bg: '#f4f6f9',        // El gris claro limpio del fondo del body
          card: '#ffffff',      // Fondo blanco puro de tus tarjetas
          input: '#fafafa',     // Fondo gris claro de tus inputs
          'input-border': '#e0e0e0', // Borde gris claro de inputs
          'nav-inactive': '#8e8e93'  // Gris de tus iconos inactivos
        },
        // Mapeo de los badges de tu feed
        badge: {
          vacante: {
            bg: '#e3f2fd',
            text: '#0d47a1',
          },
          impulso: {
            bg: '#e8f5e9',
            text: '#1b5e20',
          }
        }
      },
      fontFamily: {
        // Tu fuente Montserrat importada y la fuente del sistema
        montserrat: ['Montserrat', 'sans-serif'],
        system: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        // Las dos sombras exactas que programaste en tu CSS
        'card': '0 10px 25px rgba(0, 0, 0, 0.05)',
        'feed': '0 2px 8px rgba(0, 0, 0, 0.02)',
        'btn-blue': '0 4px 12px rgba(0, 122, 255, 0.2)',
        'focus-blue': '0 0 0 3px rgba(0, 122, 255, 0.1)',
        'focus-red': '0 0 0 3px rgba(198, 11, 42, 0.1)',
      }
    },
  },
  plugins: [],
}