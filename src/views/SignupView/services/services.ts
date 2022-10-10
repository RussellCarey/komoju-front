import axios from "axios"
import { UserSignup } from "../interfaces/interface"

export const submitSignup = async (user: UserSignup) => {
	try {
		const req = await axios.request({
			method: "POST",
			url: `${process.env.VUE_APP_ROOT_RAILS_URL}/users`,
			data: {
				user,
			},
		})

		return req
	} catch (error: any) {
		return error.response
	}
}
