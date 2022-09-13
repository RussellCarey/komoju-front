/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { PaymentData } from "../interfaces/PaymentModal"

export const getPaymentToken = async (data: PaymentData) => {
	try {
		const req = await axios.request({
			method: "POST",
			url: "https://komoju.com/api/v1/tokens",
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
				"Content-Type": "application/json",
				Authorization: `Basic ${process.env.VUE_APP_KOMOJU_SECRET}`,
			},
			withCredentials: true,
		})

		return req
	} catch (error: any) {
		return error.response
	}
}

export const submitPaymentCard = async (amount: number, payment_details: string, token: string, save_details = false) => {
	try {
		const req = await axios.request({
			method: "POST",
			url: `${process.env.VUE_APP_ROOT_RAILS_URL}/make_payment`,
			data: {
				amount,
				currency: "JPY",
				payment_details,
				save_details,
			},
			headers: {
				Authorization: token,
			},
			withCredentials: true,
		})

		return req
	} catch (error: any) {
		console.log(error)
		return error.response
	}
}

export const submitPaymentCustomer = async (amount: number, customer: string, token: string, savePayment: boolean) => {
	try {
		const req = await axios.request({
			method: "POST",
			url: `${process.env.VUE_APP_ROOT_RAILS_URL}/make_payment`,
			data: {
				amount,
				currency: "JPY",
				customer,
				save_details: savePayment,
			},
			headers: {
				Authorization: token,
			},
			withCredentials: true,
		})

		return req
	} catch (error: any) {
		console.log(error)
		return error.response
	}
}

export const saveKomojuCustomer = async (email: string, payment_details: string, token: string) => {
	try {
		const req = await axios.request({
			method: "POST",
			url: `${process.env.VUE_APP_ROOT_RAILS_URL}/customers`,
			data: {
				email,
				payment_details,
			},
			headers: {
				Authorization: token,
			},
			withCredentials: true,
		})

		return req
	} catch (error: any) {
		console.log(error)
		return error.response
	}
}
