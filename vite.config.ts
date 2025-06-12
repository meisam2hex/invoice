import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/molad-factor-ghahveh-saz/', // IMPORTANT: Change if your GitHub repo name is different!
})