import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
//*import svgr from '@svgr/webpack';*/
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src', // Alias para la carpeta src
      // Agrega más alias según tus necesidades
    },
  },
  plugins: [react(),svgr()],
})
