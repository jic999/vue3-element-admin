import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { setupRouter } from '@/router'

import '@/styles/index.scss'
/*ElementPlus 样式引入*/
import 'element-plus/es/components/switch/style/css'

import '../mock/index'

async function setupApp() {
  const app = createApp(App)
  await setupRouter(app)
  app.use(createPinia())
  app.mount('#app')
}
setupApp()
