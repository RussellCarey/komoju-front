import axios from "axios"

export const getUserDetails = async (token: string) => {
	try {
		const req = await axios.request({
			method: "GET",
			url: "http://localhost:3000/users/details",
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
