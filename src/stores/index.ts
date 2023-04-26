import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'         // 本地持久化插件

const pinia = createPinia()
pinia.use(persist)

export default pinia

// 统一导出
export * from './public/public'
