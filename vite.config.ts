import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Common configuration for both library and app
  const commonConfig = {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }

  // Differentiate between building the library and the app
  if (command === 'build' && mode === 'lib') {
    return {
      ...commonConfig,
      build: {
        outDir: 'dist', // Output library build to docs/lib
        lib: {
          entry: resolve(__dirname, 'lib/main.js'),
          name: 'VueTyping',
          fileName: 'vue-typing',
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue',
            },
          },
        },
      },
    }
  } else {
    return {
      ...commonConfig,
      base: process.env.NODE_ENV === 'production' ? '/vue-typing/' : '/',
      build: {
        outDir: 'docs', // Output app build to docs
      },
    }
  }
})
