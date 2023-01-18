import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`

createApp(App).use(store).use(router).mount('#app')

import 'bootstrap/dist/js/bootstrap'

