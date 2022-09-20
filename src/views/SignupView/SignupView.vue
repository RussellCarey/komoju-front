<template>
	<div class="container">
		<div class="signup">
			<input id="email" class="signup-input" type="text" @change="onChange" placeholder="Email" :value="userData.email" />
			<input id="username" class="signup-input" type="text" @change="onChange" placeholder="Username" :value="userData.username" />
			<input id="first_name" class="signup-input" type="text" @change="onChange" placeholder="First Name" :value="userData.first_name" />
			<input id="last_name" class="signup-input" type="text" @change="onChange" placeholder="Last Name" :value="userData.last_name" />
			<input id="password" class="signup-input" type="password" @change="onChange" placeholder="Password" :value="userData.password" />
			<input
				id="password_confirm"
				class="signup-input"
				type="password"
				@change="onChange"
				placeholder="Confirm Password"
				:value="userData.password_confirm"
			/>
			<button class="signup-button" @click="activateAccountAttempt">Submit</button>
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
})

const onChange = (e: Event) => {
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
