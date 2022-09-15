<template lang="">
	<div :class="'card-container'" :style="{ backgroundImage: 'url(' + image + ')' }" @mouseover="isHovering = true" @mouseleave="isHovering = false">
		<!-- <VideoComponent v-if="isHovering && videoID" :videoID="videoID" /> -->

		<div class="card-container-heart" @click="addGameToFavourites"></div>
		<p class="card-container-add" @click="addGameToCart">Add to cart?</p>

		<div class="info-card">
			<div class="info-card-consoles">
				<p v-if="platforms.playstation">PS</p>
				<p v-if="platforms.xbox">xbox</p>
				<p v-if="platforms.pc">PC</p>
				<p v-if="platforms.switch">switch</p>
				<p v-if="platforms.ios">ios</p>
				<p v-if="platforms.android">android</p>
				<p v-if="platforms.linux">linux</p>
			</div>
			<p>{{ title }}</p>
			<div class="info-card-bottom-section">
				<p>{{ price }} tokens</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from "vue"
import { getYoutubeVideo } from "./services/services"
import { useCookies } from "@vueuse/integrations/useCookies"
import { FavouriteData } from "./interfaces/interfaces"
import { useToast } from "vue-toastification"
import { rawrPlatform } from "@/interfaces/rawr"
import { useUserStore } from "../../../../stores/user"

import VideoComponent from "./VideoFrame.vue"

const cookies = useCookies(["locale"])
const toast = useToast()

const userStore = useUserStore()

const videoID = ref<string | null>()
const isHovering = ref<boolean>(false)

const props = defineProps<{
	id: number
	image: string
	title: string
	price: number
	rating: number
	platforms: rawrPlatform[]
}>()

const gameData: FavouriteData = {
	game_id: props.id!,
	image: props.image!,
	name: props.title!,
	price: props.price!,
}

const platforms = ref<any>({
	xbox: false,
	playstation: false,
	ios: false,
	linux: false,
	switch: false,
	android: false,
	pc: false,
})

const getVideoData = async () => {
	if (videoID.value) return

	const req = await getYoutubeVideo(props.title + " trailer")
	videoID.value = req.data.items[0].id.videoId
}

const addGameToFavourites = async () => {
	await userStore.add_favourite(gameData.game_id, gameData.name, gameData.image, gameData.price)
	console.log(userStore.get_favourites)
	toast.success("Added to favourites.")
}

const addGameToCart = async () => {
	await userStore.add_cart(gameData.game_id, gameData.name, gameData.image, gameData.price)
	console.log(userStore.get_cart)
	toast.success("Added to cart.")
}

const checkPlatforms = () => {
	props.platforms?.forEach((pl) => {
		Object.keys(platforms.value).forEach((gpl) => {
			if (pl.platform.name.toLowerCase().includes(gpl)) {
				platforms.value[gpl] = true
			}
		})
	})
}

onMounted(async () => {
	checkPlatforms()
})
</script>

<style lang="scss" scoped>
@import "./GameCard.scss";
</style>
