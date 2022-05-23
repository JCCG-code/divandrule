// General imports
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'


// Axios configuration
axios.defaults.baseURL = process.env.VUE_APP_API_URL


// Create the frontend app by Vue.js
createApp(App).use(router).use(store).use(VueAxios, axios).mount('#app')
