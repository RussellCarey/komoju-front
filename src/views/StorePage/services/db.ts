import axios from "axios"

export const signin = async (email: string, password: string) => {
	try {
		const req = await axios.request({
			method: "POST",
			url: "http://localhost:3000/users/login",
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
