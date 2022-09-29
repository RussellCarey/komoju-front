<template lang="">
	<div class="chat">
		<div class="chat-window">
			<div class="chat-window-message" v-for="data in history" :key="data.id">
				<p class="chat-window-message-username">{{ data.username }}:</p>
				<p class="chat-window-message-text">{{ data.message }}</p>
			</div>
		</div>
		<div class="chat-inputarea">
			<input type="text" class="chat-inputarea-input" @input="onChangeMessage" :value="inputMessage" v-on:keyup.enter="sendMessage" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from "vue"
import { useCookies } from "@vueuse/integrations/useCookies"
import { sendChatMessage } from "./services/services"
import { IMessage } from "./interfaces/messages"

const cookies = useCookies(["local"])
const inputMessage = ref<string>("")

const props = defineProps<{
	history: IMessage[]
}>()

const onChangeMessage = (e: Event) => {
	const target = e.target as HTMLInputElement
	inputMessage.value = target.value
	console.log(inputMessage.value)
}

const sendMessage = async () => {
	const req = await sendChatMessage(inputMessage.value, cookies.get("token"))
	console.log(req)
	inputMessage.value = ""
}
</script>

<style lang="scss" scoped>
@import "./styles/styles.scss";
</style>

v-for="gen in genreData?.data?.results" :key="gen.id" :item="gen.name" :id="gen.id" :type="'genre'"
