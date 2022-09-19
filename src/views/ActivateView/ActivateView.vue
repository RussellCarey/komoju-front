<template>
	<div class="container">
		<div class="activate">
			<p class="activate-text">You must activate your account before using this service..</p>
			<p class="activate-text">Input your activation code that you recieved in the welcome email or text, below.</p>
			<input class="activate-input" type="text" :value="activationCode" @change="onChange" />
			<button class="activate-button" @click="activateAccountAttempt">Submit</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from "vue"
import { useCookies } from "@vueuse/integrations/useCookies"
import { activateAccount } from "./services/services"
import { useToast } from "vue-toastification"
import { useRouter } from "vue-router"

const cookies = useCookies(["locale"])
const activationCode = ref<string>("")
const toast = useToast()
const router = useRouter()

const onChange = (e: Event) => {
	const target = e.target as HTMLInputElement
	activationCode.value = target.value
}

const activateAccountAttempt = async () => {
	const req = await activateAccount(activationCode.value, cookies.get("token"))

	if (req.status === 200 && req.data.is_authorized === true) {
		toast.success("Account activated! Please wait.")

		setTimeout(() => {
			return router.push("/store")
		}, 2000)
	} else {
		toast.error(`Error. Incorrect token.`)
	}
}
</script>

<style lang="scss" scoped>
@import "./ActivateView.scss";
</style>
