<template lang="">
	<div class="chat">
		<div class="chat-window" ref="windowRef">
			<div class="chat-window-message" v-for="data in history" :key="data.id" id="chickennugs">
				<p class="chat-window-message-time">{{ convertDateToTime(data.created_at) }}</p>
				<p class="chat-window-message-username">{{ data.username }}:</p>
				<p class="chat-window-message-text">{{ data.message }}</p>
			</div>
		</div>
		<div class="chat-inputarea">
			<input
				data-cy="chat-input"
				type="text"
				class="chat-inputarea-input"
				@input="onChangeMessage"
				:value="inputMessage"
				v-on:keyup.enter="sendMessage"
			/>
			<button data-cy="chat-submit" class="chat-inputarea-button" @click="sendMessage">submit</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from "vue"
import { useCookies } from "@vueuse/integrations/useCookies"
import { sendChatMessage } from "./services/services"
import { IMessage } from "./interfaces/messages"

const windowRef = ref<HTMLDivElement>()
const cookies = useCookies(["local"])
const inputMessage = ref<string>("")

const props = defineProps<{
	history: IMessage[]
}>()

const convertDateToTime = (date: string) => {
	const newDate = new Date(date)
	const h = newDate.getHours()
	const m = newDate.getMinutes()
	const parsedMinute = m < 10 ? `${0}${m}` : m
	return `${h}:${parsedMinute}`
}

const onChangeMessage = (e: Event) => {
	const target = e.target as HTMLInputElement
	inputMessage.value = target.value
}

const sendMessage = async () => {
	const req = await sendChatMessage(inputMessage.value, cookies.get("token"))
	console.log(req)
	inputMessage.value = ""

	// Not the best way, temporary..
	setTimeout(() => {
		if (windowRef.value) windowRef.value.scrollTop = windowRef.value.scrollHeight
	}, 500)
}

onMounted(async () => {
	//
})
</script>

<style lang="scss" scoped>
@import "./styles/styles.scss";
</style>
