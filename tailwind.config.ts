import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--josefin-sans)", ...fontFamily.sans],
        slab: ["var(--josefin-slab)", ...fontFamily.serif]
      },
      colors: {
        'es-discord': '#7289DA',
        'es-primary': '#0A2A75',
        'es-primary-light': '#0A4E75',
        'es-secondary': '#21798E',
        'es-secondary-light': '#41A5BD',
        'es-warning': '#F2B705',
        'es-warning-light': '#F2D57E',
        'es-danger': '#F20505',
        'es-danger-light': '#F29696',
        'es-gray': {
          100: '#F2F2F2',
          200: '#E1E0E2',
          300: '#8C8C8C',
          400: '#595959',
          500: '#262626'
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
