import { defineStore } from 'pinia';
import { User } from '@/interfaces/user';

export const useUserStore = defineStore('userStore', {
	state: () => ({
		auth_token: '' as string,
		tokens: 0 as number,
		details: {} as User,
		cart: {},
		favourites: {},
	}),
	getters: {
		get_auth_token: (state) => state.auth_token,
		get_tokens: (state) => state.tokens,
		get_details: (state) => state.details,
		get_favourites: (state) => state.favourites,
		get_cart: (state) => state.cart,
	},
	actions: {
		set_auth_token(auth_token: string) {
			this.auth_token = auth_token;
		},
		set_tokens(tokens: number) {
			this.tokens = tokens;
		},
		set_details(details: User) {
			this.details = details;
		},
		set_cart(cart: any) {
			this.cart = cart;
		},
		set_favourites(favourites: any) {
			this.favourites = favourites;
		},
	},
});

// tokens: number, details: any, cart: any, favourites: any)
