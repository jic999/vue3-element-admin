import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/styles/index.scss'
/*ElementPlus 样式引入*/
import 'element-plus/es/components/switch/style/css'

import '../mock/index'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
