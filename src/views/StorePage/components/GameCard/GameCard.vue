<template lang="">
	<div class="card-container" :style="{ backgroundImage: 'url(' + image + ')' }">
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
import { defineProps } from "vue"
import { addFavourite, addCartItem } from "./services/services"
import { useCookies } from "@vueuse/integrations/useCookies"
import { FavouriteData } from "./interfaces/interfaces"
import { useToast } from "vue-toastification"

const cookies = useCookies(["locale"])
const toast = useToast()

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

const addGameToFavourites = async () => {
	const req = await addFavourite(cookies.get("token"), gameData)
	if (req.status !== 200) return toast.error("Could not add to favourites")

	toast.success("Added to favourites.")
}

const addGameToCart = async () => {
	const req = await addCartItem(cookies.get("token"), gameData)
	if (req.status !== 200) return toast.error("Could not add to cart")

	toast.success("Added to cart.")
}
</script>

<style lang="scss" scoped>
@import "./GameCard.scss";
</style>
