import { createApp } from 'vue'
import pinia from '@/stores'
import router from '@/router'
import './style.css'
import App from './App.vue'
import 'animate.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(pinia).use(router).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}