import axios from "axios"

export const activateAccount = async (code: string, token: string) => {
	try {
		const req = await axios.request({
			method: "POST",
			url: `${process.env.VUE_APP_ROOT_RAILS_URL}/users/authorize`,
			data: {
				code,
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
