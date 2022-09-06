import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
const pinia = createPinia();
import router from './router';

import Toast, { PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const toastOptions: PluginOptions = {
	// You can set your default options here
};

createApp(App).use(router).use(Toast, toastOptions).use(pinia).mount('#app');
