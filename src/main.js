import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/dist/vuetify.min.css'

const pinia = createPinia();
const vuetify = createVuetify({
    ssr: true,
})
createApp(App).use(router).use(pinia).use(vuetify).mount('#app');








