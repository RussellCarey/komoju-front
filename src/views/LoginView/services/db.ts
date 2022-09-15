import axios from "axios"

export const signin = async (email: string, password: string) => {
	try {
		const req = await axios.request({
			method: "POST",
			url: `${process.env.VUE_APP_ROOT_RAILS_URL}/users/login`,
			data: {
				email,
				password,
			},
		})

		return req
	} catch (error: any) {
		return error.response
	}
}
