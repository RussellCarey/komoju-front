import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
const pinia = createPinia();
import router from './router';

import VueCookies from 'vue-cookies';
import Toast, { PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const toastOptions: PluginOptions = {
	// You can set your default options here
};

createApp(App).use(pinia).use(router).use(VueCookies).use(Toast, toastOptions).mount('#app');
