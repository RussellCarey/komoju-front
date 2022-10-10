<template>
	<div class="container">
		<div class="container-login">
			<div class="container-login-container">
				<p class="container-login-container-label">Email</p>
				<input v-model="email" class="container-login-container-input" type="text" data-cy="login-input" />
			</div>
			<div class="container-login-container">
				<p class="container-login-container-label">Password</p>
				<input v-model="password" class="container-login-container-input" type="password" data-cy="password-input" />
			</div>
			<div class="container-login-other">
				<p class="container-login-link">Remeber for 30 days</p>
				<p class="container-login-link">Forgot password?</p>
			</div>
			<button @click="login" class="container-login-button" data-cy="signin-button">Sign in</button>
			<p class="container-login-container-text">
				Need an account? <span class="container-login-link" @click="router.push('/signup')" data-cy="signup-button">sign up</span>
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, inject } from "vue"
import { useRouter } from "vue-router"
import { useCookies } from "../../../node_modules/@vueuse/integrations/useCookies"
import { signin } from "./services/db"
import { useUserStore } from "../../stores/user"
import { useToast } from "vue-toastification"

const toast = useToast()
const router = useRouter()
const cookies = useCookies(["locale"])
const store = useUserStore()
const email = ref<string>("")
const password = ref<string>("")
const token = ref<string>("")

const login = async () => {
	const req = await signin(email.value, password.value)
	if (req.status !== 200) return toast.error("Error logging in!")

	// Set cookie
	cookies.set("token", req.data.token)

	// Set user global state..
	store.set_auth_token(req.data.token)
	store.set_details(req.data.user)
	store.set_tokens(req.data.user.token_count)

	router.push("/store")
}

onMounted(async () => {
	token.value = cookies.get("token")
	if (token.value) router.push("/store")
})
</script>

<style lang="scss" scoped>
@import "./LoginView.scss";
</style>
