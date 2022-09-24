import axios from 'axios'
import {createApp} from 'vue';
import {createPinia} from 'pinia';

import App from './App.vue';
import router from './router';
import {apiUrl} from '@/env'

// import './assets/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

axios.defaults.baseURL = apiUrl;