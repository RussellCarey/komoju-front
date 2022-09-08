import { rawrResponse } from "@/interfaces/rawr"
import axios from "axios"

const game_url = `https://rawg.io/api/games`
const category_url = `https://rawg.io/api/genres`
const platform_url = `https://rawg.io/api/platforms`
const key = `key=f0411c841de74da1818f464ffe5c0aa5`

export const get_games = async (url: string) => {
	try {
		const req = await axios.request({
			method: "GET",
			url: url,
		})

		console.log(req)
		return req
	} catch (error: any) {
		return error.response
	}
}

export const get_all_categories = async () => {
	try {
		const req = await axios.request({
			method: "GET",
			url: `${category_url}?${key}`,
		})

		return req
	} catch (error: any) {
		return error.response
	}
}

export const get_all_platforms = async () => {
	try {
		const req = await axios.request({
			method: "GET",
			url: `${platform_url}?${key}`,
		})

		return req
	} catch (error: any) {
		return error.response
	}
}
