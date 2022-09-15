/* eslint-disable @typescript-eslint/no-explicit-any */

import { defineStore } from "pinia"
import { User } from "@/interfaces/user"
import * as Services from "./usersServices"

export const useUserStore = defineStore("userStore", {
	state: () => ({
		auth_token: "" as string,
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
			this.auth_token = auth_token
		},
		set_tokens(tokens: number) {
			this.tokens = tokens
		},
		set_details(details: User) {
			this.details = details
		},
		async add_favourite(id: number, name: string, image: string, price: number) {
			try {
				const req = await Services.addFavourite(id, name, image, price)
				if (req.status === 200) this.favourites = req.data.data
				return req
			} catch (error: any) {
				return error.response
			}
		},
		async set_favourite() {
			try {
				const req = await Services.getCurrentFavourites()
				if (req.status === 200) this.favourites = req.data.data
				return req
			} catch (error: any) {
				return error.response
			}
		},
		async remove_favourite(id: number) {
			try {
				const req = await Services.removeFavourite(id)
				if (req.status === 200) this.favourites = req.data.data
				return req
			} catch (error: any) {
				return error.response
			}
		},
		async add_cart(id: number, name: string, image: string, price: number) {
			try {
				const req = await Services.addCartItem(id, name, image, price)
				if (req.status === 200) this.cart = req.data.data
				return req
			} catch (error: any) {
				return error.response
			}
		},
		async set_cart() {
			try {
				const req = await Services.getCurrentCart()
				if (req.status === 200) this.cart = req.data.data
				return req
			} catch (error: any) {
				return error.response
			}
		},
		async remove_cart(id: number) {
			try {
				const req = await Services.removeCartItem(id)
				if (req.status === 200) this.cart = req.data.data
				return req
			} catch (error: any) {
				return error.response
			}
		},
	},
})
