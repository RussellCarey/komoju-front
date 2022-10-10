import axios from "axios"
import { FavouriteData } from "@/views/StorePage/components/GameCard/interfaces/interfaces"
import { useCookies } from "@vueuse/integrations/useCookies"

const cookies = useCookies(["locale"])

export const addFavourite = async (id: number, name: string, image: string, price: number) => {
	try {
		const req = await axios.request({
			method: "POST",
			url: `${process.env.VUE_APP_ROOT_RAILS_URL}/favourites`,
			data: {
				game_id: id,
				image: image,
				name: name,
				price: price,
			},
			headers: {
				Authorization: cookies.get("token"),
			},
			withCredentials: true,
		})

		return req
	} catch (error: any) {
		return error.response
	}
}

export const getCurrentFavourites = async () => {
	try {
		const req = await axios.request({
			method: "GET",
			url: `${process.env.VUE_APP_ROOT_RAILS_URL}/favourites`,
			headers: {
				Authorization: cookies.get("token"),
			},
			withCredentials: true,
		})

		return req
	} catch (error: any) {
		return error.response
	}
}

export const removeFavourite = async (id: number) => {
	try {
		const req = await axios.request({
			method: "DELETE",
			url: `${process.env.VUE_APP_ROOT_RAILS_URL}/favourites/${id}`,
			headers: {
				Authorization: cookies.get("token"),
			},
			withCredentials: true,
		})

		return req
	} catch (error: any) {
		return error.response
	}
}

export const addCartItem = async (id: number, name: string, image: string, price: number) => {
	try {
		const req = await axios.request({
			method: "POST",
			url: `${process.env.VUE_APP_ROOT_RAILS_URL}/cart`,
			data: {
				game_id: id,
				image: image,
				name: name,
				price: price,
			},
			headers: {
				Authorization: cookies.get("token"),
			},
			withCredentials: true,
		})

		return req
	} catch (error: any) {
		return error.response
	}
}

export const getCurrentCart = async () => {
	try {
		const req = await axios.request({
			method: "GET",
			url: `${process.env.VUE_APP_ROOT_RAILS_URL}/cart`,
			headers: {
				Authorization: cookies.get("token"),
			},
			withCredentials: true,
		})

		return req
	} catch (error: any) {
		return error.response
	}
}

export const removeCartItem = async (id: number) => {
	try {
		const req = await axios.request({
			method: "DELETE",
			url: `${process.env.VUE_APP_ROOT_RAILS_URL}/cart/${id}`,
			headers: {
				Authorization: cookies.get("token"),
			},
			withCredentials: true,
		})

		return req
	} catch (error: any) {
		return error.response
	}
}
