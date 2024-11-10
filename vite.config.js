import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 50  // Reduced from 60 for better compression
      },
      pngquant: {
        quality: [0.6, 0.7],  // Reduced quality range for better compression
        speed: 4
      },
      webp: {
        quality: 60  // Reduced from 70
      },
      svgo: {
        multipass: true,
        plugins: [
          {
            name: 'removeViewBox',
            active: false
          },
          {
            name: 'cleanupIDs',
            active: true
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist',  // Changed from 'build' to match Azure Static Web Apps default
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2
      },
      mangle: {
        toplevel: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor'
            if (id.includes('recharts')) return 'charts'
            return 'vendor'
          }
        },
        chunkFileNames: 'assets/[hash:8].js',
        entryFileNames: 'assets/[hash:8].js',
        assetFileNames: 'assets/[hash:8][extname]'
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    reportCompressedSize: false,
    assetsInlineLimit: 4096  // Inline assets < 4kb
  },
  define: {
    'process.env': {}
  }
})