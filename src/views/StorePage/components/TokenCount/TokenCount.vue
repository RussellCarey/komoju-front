<template>
	<p>{{ tokenCount }}</p>
</template>

<script setup lang="ts">
// TODO: Write component better
import { ref, onMounted, getCurrentInstance } from "vue"
import { IOptions } from "@/utils/createWebsocket/interfaces/interfaces"
import SocketConnection from "@/utils/createWebsocket/createWebsocket"
import { useUserStore } from "@/stores/user"

const tokenCount = ref<number>(0)
const userStore = useUserStore()

console.log(userStore.details.username.toString())
// Options for the socket class
const socketOptions: IOptions = {
	name: `TokenChannel`,
	status: "public",
	room: `${userStore.details.username.toString()}`,
	connected: () => console.log("Connected tokencount"),
	rejected: () => console.log("Rejected"),
	received: (data: { token_count: number }) => {
		tokenCount.value = data.token_count
	},
	disconnected: () => console.log("Disconnected"),
}

onMounted(async () => {
	const cable = getCurrentInstance()?.appContext.config.globalProperties.$cable
	new SocketConnection(cable, socketOptions)
})
</script>

<style lang="scss" scoped>
//
</style>
