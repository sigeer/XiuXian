import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  server: {
    // 在 devServer 配置中添加 headers
    // 关闭 'interest-cohort'
    headers: {
      'Permissions-Policy': 'interest-cohort=()',
    },
  },
})
