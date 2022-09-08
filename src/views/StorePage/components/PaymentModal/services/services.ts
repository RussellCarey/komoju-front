/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { PaymentData } from "../interfaces/PaymentModal"

export const getPaymentToken = async (data: PaymentData, token: string) => {
	try {
		const req = await axios.request({
			method: "POST",
			url: "http://localhost:3000/create_token",
			data: {
				payment_details: {
					name: `${data.first} ${data.last}`,
					email: data.email,
					number: data.card,
					type: "credit_card",
					month: data.month,
					year: data.year,
					code: data.cvc,
				},
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

export const submitPayment = async (amount: number, payment_details: string, token: string) => {
	try {
		const req = await axios.request({
			method: "POST",
			url: "http://localhost:3000/make_payment",
			data: {
				amount,
				currency: "JPY",
				payment_details,
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
