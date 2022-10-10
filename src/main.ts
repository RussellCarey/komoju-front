import { createApp } from "vue"
import { createPinia } from "pinia"
import router from "./router"
const pinia = createPinia()
import App from "./App.vue"

import ActionCableVue from "actioncable-vue"

import Toast, { PluginOptions } from "vue-toastification"
import "vue-toastification/dist/index.css"

const toastOptions: PluginOptions = {
	// You can set your default options here
}

const actionCableVueOptions = {
	debug: true,
	debugLevel: "error",
	connectionUrl: "ws://localhost:3000/api/cable",
	connectImmediately: true,
}

createApp(App).use(router).use(Toast, toastOptions).use(pinia).use(ActionCableVue, actionCableVueOptions).mount("#app")
