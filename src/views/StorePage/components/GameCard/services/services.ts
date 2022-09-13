import axios from "axios"
import { FavouriteData } from "../interfaces/interfaces"

export const addFavourite = async (token: string, favouriteData: FavouriteData) => {
	try {
		const req = await axios.request({
			method: "POST",
			url: `${process.env.VUE_APP_ROOT_RAILS_URL}/favourites`,
			data: {
				game_id: favouriteData.name,
				image: favouriteData.image,
				name: favouriteData.name,
				price: favouriteData.price,
			},
			headers: {
				Authorization: token,
			},
			withCredentials: true,
		})

		return req
	} catch (error: any) {
		return error.response
	}
}

export const addCartItem = async (token: string, favouriteData: FavouriteData) => {
	try {
		const req = await axios.request({
			method: "POST",
			url: `${process.env.VUE_APP_ROOT_RAILS_URL}/cart`,
			data: {
				game_id: favouriteData.name,
				image: favouriteData.image,
				name: favouriteData.name,
				price: favouriteData.price,
			},
			headers: {
				Authorization: token,
			},
			withCredentials: true,
		})

		return req
	} catch (error: any) {
		return error.response
	}
}
