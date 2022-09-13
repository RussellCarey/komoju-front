import axios from "axios"

export const getCurrentFavourites = async (token: string) => {
	try {
		const req = await axios.request({
			method: "GET",
			url: `${process.env.VUE_APP_ROOT_RAILS_URL}/favourites`,
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

export const removeFavourite = async (token: string, id: number) => {
	try {
		const req = await axios.request({
			method: "DELETE",
			url: `${process.env.VUE_APP_ROOT_RAILS_URL}/favourites/${id}`,
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

export const getCurrentCart = async (token: string) => {
	try {
		const req = await axios.request({
			method: "GET",
			url: `${process.env.VUE_APP_ROOT_RAILS_URL}/cart`,
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

export const removeCartItem = async (token: string, id: number) => {
	try {
		const req = await axios.request({
			method: "DELETE",
			url: `${process.env.VUE_APP_ROOT_RAILS_URL}/cart/${id}`,
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
