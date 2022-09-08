import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

import LoginView from "../views/LoginView/LoginView.vue"
import StoreView from "../views/StorePage/StoreView.vue"

import { useCookies } from "@vueuse/integrations/useCookies"
import { useUserStore } from "@/stores/user"
import { getUserDetails } from "./services/services"

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "home",
		component: LoginView,
	},
	{
		path: "/store",
		name: "store",
		component: StoreView,
	},
	{ path: "/:pathMatch(.*)*", component: LoginView },
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

router.beforeEach(async (to, from, next) => {
	const userStore = useUserStore()
	const cookies = useCookies(["locale"])

	if (to.path !== "/") {
		if (!cookies.get("token")) next({ name: "home" })

		const userData = await getUserDetails(cookies.get("token"))
		if (userData.status !== 200) next({ name: "home" })

		userStore.set_auth_token(userData.data.token)
		userStore.set_details(userData.data.user)
		userStore.set_tokens(userData.data.user.token_count)
	}

	next()
})

export default router
