<template>
	<div class="container">
		<div class="signup">
			<input id="email" data-cy="email-input" class="signup-input" type="text" @change="onChange" placeholder="Email" :value="userData.email" />
			<input
				id="username"
				data-cy="username-input"
				class="signup-input"
				type="text"
				@change="onChange"
				placeholder="Username"
				:value="userData.username"
			/>
			<input
				id="first_name"
				data-cy="first-name-input"
				class="signup-input"
				type="text"
				@change="onChange"
				placeholder="First Name"
				:value="userData.first_name"
			/>
			<input
				id="last_name"
				data-cy="last-name-input"
				class="signup-input"
				type="text"
				@change="onChange"
				placeholder="Last Name"
				:value="userData.last_name"
			/>
			<input
				id="password"
				data-cy="password-input"
				class="signup-input"
				type="password"
				@change="onChange"
				placeholder="Password"
				:value="userData.password"
			/>
			<input
				id="password_confirm"
				data-cy="password-confirm-input"
				class="signup-input"
				type="password"
				@change="onChange"
				placeholder="Confirm Password"
				:value="userData.password_confirm"
			/>
			<input
				v-if="userData.prefered_contact"
				id="mobile_number"
				data-cy="mobile-number-input"
				class="signup-input"
				type="text"
				@change="onChange"
				placeholder="Mobile Number"
				:value="userData.mobile_number"
			/>
			<input class="signup-check" data-cy="mobile-checkbox" type="checkbox" @click="userData.prefered_contact = +!userData.prefered_contact" />
			<label class="signup-label" for="sns">Get SNS text alerts?</label>
			<button class="signup-button" data-cy="signup-button" @click="activateAccountAttempt">Submit</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useToast } from "vue-toastification"
import { useRouter } from "vue-router"
import { UserSignup } from "./interfaces/interface"
import { submitSignup } from "./services/services"

const toast = useToast()
const router = useRouter()

const userData = ref<UserSignup>({
	username: "",
	email: "",
	password: "",
	password_confirm: "",
	first_name: "",
	last_name: "",
	prefered_contact: 0,
	mobile_number: "",
})

const onChange = (e: Event) => {
	console.log(userData)
	const target = e.target as HTMLInputElement
	const id = target.id
	userData.value = { ...userData.value, [id]: target.value }
}

//! Show errors from the DB too..
const activateAccountAttempt = async () => {
	toast.success(`Attempting sign up. Please wait.`)

	const req = await submitSignup(userData.value)

	if (req.status === 200) {
		toast.success("Signed up successfully! Please wait.")

		setTimeout(() => {
			return router.push("/")
		}, 2000)
	} else {
		return toast.error(`We could not sign up!`)
	}
}
</script>

<style lang="scss" scoped>
@import "./SignupView.scss";
</style>
