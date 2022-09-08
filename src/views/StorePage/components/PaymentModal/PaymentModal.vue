<template lang="">
	<div class="payment-container">
		<div class="modal-container">
			<p @click="$emit('closeModal')">CLOSE</p>
			<input type="number" id="tokens" class="modal-input" placeholder="Amount of tokens" :value="paymentData.tokens" @input="(e) => onChange(e)" />
			<input type="number" id="card" class="modal-input" placeholder="Card Number" :value="paymentData.card" @input="(e) => onChange(e)" />
			<input type="text" id="month" class="modal-input" placeholder="Exp Month eg 04" :value="paymentData.month" @input="(e) => onChange(e)" />
			<input type="text" id="year" class="modal-input" placeholder="Exp Year eg 2022" :value="paymentData.year" @input="(e) => onChange(e)" />
			<input type="text" id="cvc" class="modal-input" placeholder="CVC" :value="paymentData.cvc" @input="(e) => onChange(e)" />
			<input type="text" id="first" class="modal-input" placeholder="First Name" :value="paymentData.first" @input="(e) => onChange(e)" />
			<input type="text" id="last" class="modal-input" placeholder="Last Name" :value="paymentData.last" @input="(e) => onChange(e)" />
			<input type="text" id="notes" class="modal-input" placeholder="Notes" :value="paymentData.notes" @input="(e) => onChange(e)" />
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

import { getPaymentToken, submitPayment } from "./services/services"

const userStore = useUserStore()
const cookies = useCookies(["locale"])
const toast = useToast()
const emit = defineEmits(["closeModal"])

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

const onChange = (e: Event) => {
	const target = e.target as HTMLInputElement
	const id = target.id
	paymentData.value = { ...paymentData.value, [id]: target.value }
}

const attemptPayment = async () => {
	if (!paymentData.value.tokens) return toast.error("Please choose a number of tokens.")

	const token = await getPaymentToken(paymentData.value, cookies.get("token"))
	if (!token.data.data.id || token.status !== 200) toast.error("Payment failed. Pleasecheck your email for details.")

	const oneTimePaymentToken = token.data.data.id

	const payment = await submitPayment(paymentData.value.tokens, oneTimePaymentToken, cookies.get("token"))
	if (payment.status !== 200) toast.error("Payment failed. Pleasecheck your email for details.")

	toast.success("Payment processing. Please check your email. Your tokens will be updated shortly.")

	setTimeout(() => {
		emit("closeModal")
	}, 2000)
}
</script>

<style lang="scss" scoped>
@import "./PaymentModal.scss";
</style>
