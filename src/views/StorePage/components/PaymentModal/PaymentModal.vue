<template lang="">
	<div class="payment-container">
		<div class="modal-container">
			<p @click="$emit('closeModal')">CLOSE</p>
			<input type="number" id="tokens" class="modal-input" placeholder="Amount of tokens" :value="paymentData.tokens" @input="(e) => onChange(e)" />
			<div class="" v-if="!userStore.details.komoju_customer">
				<input type="number" id="card" class="modal-input" placeholder="Card Number" :value="paymentData.card" @input="(e) => onChange(e)" />
				<input type="text" id="month" class="modal-input" placeholder="Exp Month eg 04" :value="paymentData.month" @input="(e) => onChange(e)" />
				<input type="text" id="year" class="modal-input" placeholder="Exp Year eg 2022" :value="paymentData.year" @input="(e) => onChange(e)" />
				<input type="text" id="cvc" class="modal-input" placeholder="CVC" :value="paymentData.cvc" @input="(e) => onChange(e)" />
				<input type="text" id="first" class="modal-input" placeholder="First Name" :value="paymentData.first" @input="(e) => onChange(e)" />
				<input type="text" id="last" class="modal-input" placeholder="Last Name" :value="paymentData.last" @input="(e) => onChange(e)" />
				<input type="text" id="notes" class="modal-input" placeholder="Notes" :value="paymentData.notes" @input="(e) => onChange(e)" />
			</div>
			<p v-if="!userStore.details.komoju_customer" @click="toggleSavePayment">
				{{ !savePaymentData ? "Save payment data?" : "Dont save payment data?" }}
			</p>
			<button @click="attemptPayment">Purchase</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue"
import { PaymentData } from "./interfaces/PaymentModal"
import { useUserStore } from "@/stores/user"
import { useCookies } from "@vueuse/integrations/useCookies"
import { useToast } from "vue-toastification"
import { getPaymentToken, submitPaymentCard, submitPaymentCustomer, saveKomojuCustomer } from "./services/services"

const userStore = useUserStore()
const cookies = useCookies(["locale"])
const toast = useToast()
const emit = defineEmits(["closeModal"])

const savePaymentData = ref(false)

const paymentData = ref<PaymentData>({
	tokens: 1000,
	card: "4111111111111111",
	month: "04",
	year: "2024",
	cvc: "232",
	first: userStore.details.first_name,
	last: userStore.details.last_name,
	notes: "Testing data",
	email: userStore.details.email,
})

const toggleSavePayment = () => {
	savePaymentData.value = !savePaymentData.value
}

const onChange = (e: Event) => {
	const target = e.target as HTMLInputElement
	const id = target.id
	paymentData.value = { ...paymentData.value, [id]: target.value }
}

const attemptPayment = async () => {
	const jwtToken = cookies.get("token")
	if (!paymentData.value.tokens) return toast.error("Please choose a number of tokens.")

	const token = await getPaymentToken(paymentData.value)
	if (!token.data.id || token.status !== 200) return toast.error("Payment failed. Pleasecheck your email for details.")

	const oneTimePaymentToken = token.data.id

	// If user wants to save a new customer payment
	if (savePaymentData.value && !userStore.details.komoju_customer) {
		const savedCustomer = await saveKomojuCustomer(userStore.details.email, oneTimePaymentToken, jwtToken)
		if (savedCustomer.status !== 200) toast.error("Unable to save customer details for next time")

		const payment = await submitPaymentCustomer(paymentData.value.tokens, savedCustomer.data.data.id, jwtToken, true)
		if (payment.status !== 200) return toast.error("Payment failed. Please check your email for details.")

		return toast.success("Payment processing. Please check your email. Your tokens will be updated shortly.")
	}

	// If user have a saved customer payment method
	if (userStore.details.komoju_customer) {
		const payment = await submitPaymentCustomer(paymentData.value.tokens, userStore.details.komoju_customer, jwtToken, true)
		if (payment.status !== 200) return toast.error("Payment failed. Please check your email for details.")

		return toast.success("Payment processing. Please check your email. Your tokens will be updated shortly.")
	}

	// If user is just using card..
	const payment = await submitPaymentCard(paymentData.value.tokens, oneTimePaymentToken, jwtToken)
	if (payment.status !== 200) return toast.error("Payment failed. Please check your email for details.")

	toast.success("Payment processing. Please check your email. Your tokens will be updated shortly.")

	setTimeout(() => {
		emit("closeModal")
	}, 2000)
}
</script>

<style lang="scss" scoped>
@import "./PaymentModal.scss";
</style>
