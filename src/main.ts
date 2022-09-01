import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueCookies from 'vue-cookies';
import Toast, { PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const toastOptions: PluginOptions = {
	// You can set your default options here
};

createApp(App).use(store).use(router).use(VueCookies).use(Toast, toastOptions).mount('#app');
