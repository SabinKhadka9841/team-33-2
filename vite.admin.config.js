import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Admin Panel Vite Config - Runs on port 5174
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    open: '/admin.html',
    proxy: {
      '/api/chat': {
        target: 'http://k8s-team33-accounts-4f99fe8193-a4c5da018f68b390.elb.ap-southeast-2.amazonaws.com',
        changeOrigin: true,
        secure: false,
      },
      '/api/accounts': {
        target: 'http://k8s-team33-accounts-4f99fe8193-a4c5da018f68b390.elb.ap-southeast-2.amazonaws.com',
        changeOrigin: true,
        secure: false,
      },
      '/api/deposits': {
        target: 'http://k8s-team33-accounts-4f99fe8193-a4c5da018f68b390.elb.ap-southeast-2.amazonaws.com',
        changeOrigin: true,
        secure: false,
      },
      '/api/admin/deposits': {
        target: 'http://k8s-team33-accounts-4f99fe8193-a4c5da018f68b390.elb.ap-southeast-2.amazonaws.com',
        changeOrigin: true,
        secure: false,
      },
      '/api/wallets': {
        target: 'http://k8s-team33-walletse-2b6bcd93c2-52fa21111cb7a7e7.elb.ap-southeast-2.amazonaws.com',
        changeOrigin: true,
        secure: false,
      },
    }
  },
  build: {
    outDir: 'dist-admin',
    rollupOptions: {
      input: {
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },
})
