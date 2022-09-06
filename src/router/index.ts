import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import LoginView from '../views/LoginView/LoginView.vue';
import StoreView from '../views/StorePage/StoreView.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'home',
		component: LoginView,
	},
	{
		path: '/store',
		name: 'store',
		component: StoreView,
	},
	{ path: '/:pathMatch(.*)*', component: LoginView },
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
