<template>
	<div class="chat-bubble" @click="toggleChatWindow">
		<ChatWindow :history="chatHistory" />
		<ChatLogo class="chat-bubble-icon" />
	</div>
</template>

<script lang="ts">
import { ref } from "vue"

import { IMessageResponse, IMessage } from "./interfaces/messages"
import ChatLogo from "../../assets/svg/chatLogo.vue"
import ChatWindow from "./ChatWindow.vue"

export default {
	setup() {
		const isOpen = ref(false)
		const chatHistory = ref<Array<IMessage>>([])
		return { isOpen, chatHistory }
	},
	components: {
		ChatWindow,
	},
	channels: {
		MessagesChannel: {
			connected() {
				console.log("connected")
			},
			rejected() {
				console.log("rejected")
			},
			received(data: IMessageResponse) {
				console.log(data)
				this.chatHistory = [...this.chatHistory, ...data.messages]
			},
			disconnected() {
				console.log("disconnected")
			},
		},
	},
	methods: {
		sendMessage: function () {
			this.$cable.perform({
				channel: "MessagesChannel",
				action: "send_message",
				data: {
					content: this.message,
				},
			})
		},
		toggleChatWindow: function () {
			console.log("CLICK")
			this.isOpen = !this.isOpen
		},
	},
	mounted() {
		this.$cable.subscribe({
			channel: "MessagesChannel",
			room: "public",
		})
	},
}
</script>

<style lang="scss" scoped>
@import "./styles/styles.scss";
</style>
