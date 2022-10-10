<template>
	<div class="chat-bubble">
		<div class="chat-bubble-unseen">{{ unseenMessages }}</div>
		<ChatLogo data-cy="chat-bubble" class="chat-bubble-icon" @click="toggleChatWindow" />
		<ChatWindow :history="chatHistory" v-if="isOpen" />
	</div>
</template>

<script setup lang="ts">
// TODO: Write component better
import { ref, onMounted, getCurrentInstance } from "vue"

import { IOptions } from "@/utils/createWebsocket/interfaces/interfaces"
import { IMessage } from "./interfaces/messages"
import SocketConnection from "@/utils/createWebsocket/createWebsocket"

import ChatLogo from "../../assets/svg/chatIconSVG.vue"
import ChatWindow from "./ChatWindow.vue"

const isOpen = ref<boolean>(false)
const unseenMessages = ref<number>(0)
const chatHistory = ref<Array<IMessage>>([])

const toggleChatWindow = () => {
	isOpen.value = !isOpen.value
	unseenMessages.value = 0
}

// Options for the socket class
const socketOptions: IOptions = {
	name: "MessagesChannel",
	status: "public",
	connected: () => console.log("Connected chat"),
	rejected: () => console.log("Rejected"),
	// eslint-disable-next-line
	received: (data) => {
		chatHistory.value = [...chatHistory.value, ...data.messages]
		console.log(chatHistory.value)
		if (!isOpen.value) unseenMessages.value += 1
	},
	disconnected: () => console.log("Disconnected"),
}

onMounted(async () => {
	const cable = getCurrentInstance()?.appContext.config.globalProperties.$cable
	new SocketConnection(cable, socketOptions)
})
</script>

<style lang="scss" scoped>
@import "./styles/styles.scss";
</style>
