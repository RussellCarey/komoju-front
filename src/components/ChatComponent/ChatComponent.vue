<template>
	<div class=""></div>
</template>

<script>
import mounted from "vue"
export default {
	setup(props) {
		//
	},
	data() {
		return {
			message: "Hello world",
		}
	},
	channels: {
		MessagesChannel: {
			connected() {
				console.log("connected")
			},
			rejected() {
				console.log("rejected")
			},
			received(data) {
				console.log(data)
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
/* @import ""; */
</style>
