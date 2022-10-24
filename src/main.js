import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
// import './style.css'

import request from './utils/request'
import storage from './utils/storage'
import api from './api/index'
import App from './App.vue'
import store from './store'
// import axios from  'axios'
// import config from './config/index'

// axios.get(config.mockApi + '/login').then(val => {
//     console.log(val)
// })


const app = createApp(App)
app.config.globalProperties.$request = request
app.config.globalProperties.$storage = storage
app.config.globalProperties.$api = api
app.use(ElementPlus).use(router).use(store).mount('#app')
console.log("环境变量", import.meta.env);
