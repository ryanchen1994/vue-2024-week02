import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const app = createApp(App)

app.use(router).use(store)

// 在應用啟動時檢查認證狀態
store.dispatch('checkAuth')

app.mount('#app')