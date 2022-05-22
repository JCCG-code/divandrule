// General imports
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'


// Axios configuration
axios.defaults.baseURL = 'http://ec2-54-187-107-182.us-west-2.compute.amazonaws.com:5001/api'


// Create the frontend app by Vue.js
createApp(App).use(router).use(store).use(VueAxios, axios).mount('#app')
