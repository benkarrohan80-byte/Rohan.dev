import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@theme/v4'

export default defineConfig({
  // यहाँ अपने गिटहब रिपॉजिटरी का नाम लिखें (जैसे: /your-repo-name/)
  base: './', 
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: true,
    port: 3000,
    host: '0.0.0.0',
  }
})
