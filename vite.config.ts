import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 自动导入vue ref、computed、watch 相关函数
      imports: ["vue", "@vueuse/core", "vue-router"],
      resolvers: [
        ElementPlusResolver(),
      ],
      dts: "src/auto-import.d.ts",
      eslintrc: {
        enabled: true
      },
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
  ],
  resolve: {
    //设置路径别名
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/global.scss";'
      }
    }
  }
})
