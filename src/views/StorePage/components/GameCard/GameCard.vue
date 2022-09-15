<template lang="">
	<div :class="'card-container'" :style="{ backgroundImage: 'url(' + image + ')' }" @mouseover="isHovering = true" @mouseleave="isHovering = false">
		<!-- <VideoComponent v-if="isHovering && videoID" :videoID="videoID" /> -->

		<div class="card-container-heart" @click="addGameToFavourites"></div>
		<p class="card-container-add" @click="addGameToCart">Add to cart?</p>

		<div class="info-card">
			<p>{{ title }}</p>
			<div class="info-card-bottom-section">
				<p>{{ price }} tokens</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue"
import { addFavourite, addCartItem, getYoutubeVideo } from "./services/services"
import { useCookies } from "@vueuse/integrations/useCookies"
import { FavouriteData } from "./interfaces/interfaces"
import { useToast } from "vue-toastification"

import { useUserStore } from "../../../../stores/user"

import VideoComponent from "./VideoFrame.vue"

const cookies = useCookies(["locale"])
const toast = useToast()

const userStore = useUserStore()

const props = defineProps({
	id: Number,
	image: String,
	title: String,
	price: Number,
	rating: Number,
})

const gameData: FavouriteData = {
	game_id: props.id!,
	image: props.image!,
	name: props.title!,
	price: props.price!,
}

const videoID = ref<string | null>()
const isHovering = ref<boolean>(false)

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
</script>

<style lang="scss" scoped>
@import "./GameCard.scss";
</style>
