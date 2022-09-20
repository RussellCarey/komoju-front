<template lang="">
	<div :class="'card-container'" :style="{ backgroundImage: 'url(' + image + ')' }" @mouseover="isHovering = true" @mouseleave="isHovering = false">
		<VideoComponent v-if="isHovering" :title="gameData.name" />
		<div :class="isFavourite ? 'card-container-heart card-container-hearted' : 'card-container-heart'" @click="toggleFavourite"></div>
		<cartSVG class="card-container-add" @click="addGameToCart" />

		<div class="info-card">
			<div class="info-card-consoles">
				<playstationSVG v-if="platforms.playstation" class="info-card-consoles-icon" />
				<xboxSVG v-if="platforms.xbox" class="info-card-consoles-icon" />
				<androidSVG v-if="platforms.android" class="info-card-consoles-icon" />
				<appleSVG v-if="platforms.ios" class="info-card-consoles-icon" />
				<linuxSVG v-if="platforms.linux" class="info-card-consoles-icon" />
				<switchSVG v-if="platforms.switch" class="info-card-consoles-icon" />
				<windowSVG v-if="platforms.pc" class="info-card-consoles-icon" />
			</div>
			<p class="info-card-title">{{ title }}</p>
			<div class="info-card-bottom-section">
				<p class="info-card-price">{{ price }} tokens</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, onUpdated, watch } from "vue"
import { FavouriteData } from "./interfaces/interfaces"
import { useToast } from "vue-toastification"
import { rawrPlatform } from "@/interfaces/rawr"
import { useUserStore } from "../../../../stores/user"

import VideoComponent from "./VideoFrame.vue"

// svg
import playstationSVG from "../../../../assets/svg/playstationSVG.vue"
import xboxSVG from "../../../../assets/svg/xboxSVG.vue"
import linuxSVG from "../../../../assets/svg/linuxSVG.vue"
import appleSVG from "../../../../assets/svg/appleSVG.vue"
import switchSVG from "../../../../assets/svg/switchSVG.vue"
import windowSVG from "../../../../assets/svg/windowSVG.vue"
import androidSVG from "../../../../assets/svg/androidSVG.vue"
import cartSVG from "../../../../assets/svg/cartSVG.vue"

const toast = useToast()

const userStore = useUserStore()

const isHovering = ref<boolean>(false)
const isFavourite = ref<boolean>(false)
const favouriteID = ref<number>(0)

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

const toggleFavourite = async () => {
	if (!isFavourite.value) {
		await userStore.add_favourite(gameData.game_id, gameData.name, gameData.image, gameData.price)
		isFavourite.value = true
		return toast.success("Added to favourites.")
	}

	if (isFavourite.value) {
		await userStore.remove_favourite(favouriteID.value)
		isFavourite.value = false
		return toast.success(`Removed ${gameData.name}`)
	}
}

const addGameToCart = async () => {
	await userStore.add_cart(gameData.game_id, gameData.name, gameData.image, gameData.price)
	// console.log(userStore.get_cart)
	toast.success("Added to cart.")
}

const checkIsFavourites = () => {
	const currentFavs = userStore.get_favourites
	currentFavs.forEach((item) => {
		if (+item.game_id === +gameData.game_id) {
			favouriteID.value = +item.id
			isFavourite.value = true
		}
	})
}

const checkPlatforms = () => {
	props.platforms?.forEach((pl) => {
		Object.keys(platforms.value).forEach((gpl) => {
			if (pl.platform.name.toLowerCase().includes(gpl.toLowerCase())) {
				platforms.value[gpl] = true
			}
		})
	})
}

onMounted(async () => {
	checkPlatforms()
})

onUpdated(() => {
	checkIsFavourites()
})
</script>

<style lang="scss" scoped>
@import "./GameCard.scss";
</style>
