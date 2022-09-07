<template>
	<div class="container">
		<div class="content">
			<div class="header">
				<h3 class="header-results">1,345 results</h3>
				<div class="header-items">
					<input type="text" class="header-items-search" />
					<!-- Basket Icon-->
					<p class="header-items-add-tokens">Add tokens</p>
					<!-- User Icon-->
					<!-- Favourites Icon-->
				</div>
			</div>

			<div class="main">
				<div class="sidebar">
					<div class="filter-area">
						<h4>Categories</h4>
						<CategoryItem class="filter-area-items" v-for="cats in categoryData?.data?.results" :key="cats.id" :name="cats.name" />
					</div>

					<div class="filter-area">
						<h4>Platforms</h4>
						<PlatformItem class="filter-area-items" v-for="plats in platformData?.data?.results" :key="plats.id" :name="plats.name" />
					</div>
				</div>

				<div class="games">
					<GameCard
						v-for="games in gameData?.data?.results"
						:key="games.id"
						:rating="4.5"
						:title="games.name"
						:image="games.background_image"
						:price="Math.floor(games.rating * 1000)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useToast } from "vue-toastification"
import { useSearchStore } from "@/stores/search"
import { get_all_games, get_all_categories, get_all_platforms } from "./services/rawr"

import CategoryItem from "./components/CategoryItem/CategoryItem.vue"
import GameCard from "./components/GameCard/GameCard.vue"

import { rawrResponse } from "../../interfaces/rawr"
import PlatformItem from "./components/PlatformItem/PlatformItem.vue"
const toast = useToast()

export default defineComponent({
	name: "store_view",
	components: {
		GameCard,
		CategoryItem,
		PlatformItem,
	},

	setup() {
		const store = useSearchStore()
		const gameData = {} as rawrResponse
		const categoryData = {} as rawrResponse
		const platformData = {} as rawrResponse

		return {
			store,
			gameData,
			categoryData,
			platformData,
		}
	},

	async mounted() {
		this.gameData = await get_all_games()
		this.categoryData = await get_all_categories()
		this.platformData = await get_all_platforms()
		console.log(this.gameData)
		console.log(this.categoryData)
		console.log(this.platformData)
	},
})
</script>

<style lang="scss" scoped>
@import "./StoreView.scss";
</style>
