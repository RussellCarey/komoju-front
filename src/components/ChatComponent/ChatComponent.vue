<template>
	<div class="chat-bubble">
		<div class="chat-bubble-unseen">{{ unseenMessages }}</div>
		<ChatLogo class="chat-bubble-icon" @click="toggleChatWindow" />
		<ChatWindow :history="chatHistory" v-if="isOpen" />
	</div>
</template>

<script lang="ts">
import { ref } from "vue"

import { IMessageResponse, IMessage } from "./interfaces/messages"
import ChatLogo from "../../assets/svg/chatIconSVG.vue"
import ChatWindow from "./ChatWindow.vue"

export default {
	setup() {
		const isOpen = ref(false)
		const chatHistory = ref<Array<IMessage>>([])
		const unseenMessages = ref<number>(0)
		return { isOpen, chatHistory, unseenMessages }
	},
	components: {
		ChatWindow,
		ChatLogo,
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
				// @ts-ignore
				this.chatHistory = [...this.chatHistory, ...data.messages]
				// @ts-ignore
				if (!this.isOpen) this.unseenMessages++
			},
			disconnected() {
				console.log("disconnected")
			},
		},
	},
	methods: {
		sendMessage: function () {
			// @ts-ignore
			this.$cable.perform({
				channel: "MessagesChannel",
				action: "send_message",
				data: {
					// @ts-ignore
					content: this.message,
				},
			})
		},
		toggleChatWindow: function () {
			console.log("CLICK")
			// @ts-ignore
			this.isOpen = !this.isOpen
			// @ts-ignore
			this.unseenMessages = 0
		},
	},
	mounted() {
		// @ts-ignore
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
