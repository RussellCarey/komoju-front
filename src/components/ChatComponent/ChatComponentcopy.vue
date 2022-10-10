<template>
	<div class="chat-bubble">
		<div class="chat-bubble-unseen">{{ unseenMessages }}</div>
		<ChatLogo class="chat-bubble-icon" @click="toggleChatWindow" />
		<ChatWindow :history="chatHistory" v-if="isOpen" />
	</div>
</template>

<script setup lang="ts">
// TODO: Write component better
import { ref, onMounted, getCurrentInstance } from "vue"
import { IMessageResponse, IMessage } from "./interfaces/messages"
import ChatLogo from "../../assets/svg/chatIconSVG.vue"
import ChatWindow from "./ChatWindow.vue"

const internalInstance = getCurrentInstance()
const cable = internalInstance?.appContext.config.globalProperties.$cable
let channel = {}
const isOpen = ref<boolean>(false)
const chatHistory = ref<Array<IMessage>>([])
const unseenMessages = ref<number>(0)

onMounted(async () => {
	// @ts-ignore
	cable.subscribe({
		channel: "MessagesChannel",
		room: "public",
		connected: () => {
			console.log("WE HAVE ACCESS AND CONNCTED YOOOOO")
		},
		//@ts-ignore
		received: (data) => {
			console.log("RECIEVED")
			console.log(data)
		},
	})
	channel = cable._channels?.subscriptions["MessagesChannel"]
	console.log(cable)
	console.log(channel)
	// @ts-ignore
	console.log(channel.received)
	// @ts-ignore
	console.log(typeof channel.received)
})

const sendMessage = () => {
	// @ts-ignore
	cable.perform({
		channel: "MessagesChannel",
		action: "send_message",
		data: {
			// @ts-ignore
			content: this.message,
		},
	})
}

const toggleChatWindow = () => {
	// @ts-ignore
	isOpen.value = !this.isOpen.value
	// @ts-ignore
	unseenMessages.value = 0
}

// @ts-ignore
// channel.connected() {
// 	console.log("connected")
// }
</script>

<style lang="scss" scoped>
@import "./styles/styles.scss";
</style>
