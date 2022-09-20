import { createRouter, createWebHistory, NavigationGuardNext, RouteRecordRaw } from "vue-router"

import LoginView from "../views/LoginView/LoginView.vue"
import StoreView from "../views/StorePage/StoreView.vue"
import ActivateView from "../views/ActivateView/ActivateView.vue"
import SignupView from "../views/SignupView/SignupView.vue"

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
	{
		path: "/activate",
		name: "activate",
		component: ActivateView,
	},
	{
		path: "/user",
		name: "user",
		component: StoreView,
	},
	{
		path: "/signup",
		name: "signup",
		component: SignupView,
	},
	{ path: "/:pathMatch(.*)*", component: LoginView },
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

const getSetUserData = async (next: NavigationGuardNext, userStore: any, cookies: any) => {
	if (userStore.tokens && userStore.details) return

	const userReq = await getUserDetails(cookies.get("token"))
	if (userReq.status !== 200) return next({ name: "home" })

	userStore.set_auth_token(userReq.data.token)
	userStore.set_details(userReq.data.user)
	userStore.set_tokens(userReq.data.user.token_count)
	userStore.set_favourite()
	userStore.set_cart()

	return userReq
}

router.beforeEach(async (to, from, next) => {
	const userStore = useUserStore()
	const cookies = useCookies(["locale"])

	if (to.path === "/" && cookies.get("token")) {
		return next({ name: "store" })
	}

	if (to.path === "/activate") {
		if (!cookies.get("token")) next({ name: "signup" })
		await getSetUserData(next, userStore, cookies)
	}

	if (to.path === "/store") {
		if (!cookies.get("token")) next({ name: "signup" })

		await getSetUserData(next, userStore, cookies)
		if (!userStore.get_details.authorized_at) return next({ name: "activate" })
	}

	if (to.path === "/signup") {
		if (cookies.get("token")) next({ name: "store" })
	}

	next()
})

export default router
