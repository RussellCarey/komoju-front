<template>
	<div class="container">
		<div class="content">
			<div class="header">
				<h3 class="header-results">{{ gameData?.data?.count.toLocaleString() || 0 }} results</h3>
				<div class="header-items">
					<input type="text" class="header-items-search" :value="store.get_search" @input="(e) => setSearchValue(e)" />
					<p>Cart</p>
					<p class="header-items-add-tokens">Add tokens</p>
					<p>Account</p>
					<p>Favourites</p>
					<p>Tokens: 1000</p>
				</div>
			</div>
			<div class="main">
				<div class="sidebar">
					<div class="filter-area">
						<h4>Categories</h4>
						<FilterItem
							class="filter-area-items"
							v-for="gen in genreData?.data?.results"
							:key="gen.id"
							:item="gen.name"
							:id="gen.id"
							:type="'genre'"
						/>
					</div>

					<div class="filter-area">
						<h4>Platforms</h4>
						<FilterItem
							class="filter-area-items"
							v-for="plats in platformData?.data?.results"
							:key="plats.id"
							:item="plats.name"
							:id="plats.id"
							:type="'platform'"
						/>
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

<script setup lang="ts">
import { watch, ref, onMounted } from "vue"
import { useToast } from "vue-toastification"
import { useSearchStore } from "@/stores/search"
import { get_games, get_all_categories, get_all_platforms } from "./services/rawr"

import FilterItem from "./components/FilterItem/FilterItem.vue"
import GameCard from "./components/GameCard/GameCard.vue"

import { rawrResponse } from "../../interfaces/rawr"
const toast = useToast()

const store = useSearchStore()
const gameData = ref<rawrResponse | null>()
const genreData = ref<rawrResponse | null>()
const platformData = ref<rawrResponse | null>()

const setSearchValue = (e: Event) => {
	const target = e.target as HTMLInputElement
	store.edit_search(target?.value)
}

onMounted(async () => {
	gameData.value = await get_games(store.url)
	genreData.value = await get_all_categories()
	platformData.value = await get_all_platforms()
})

watch(
	() => store.url,
	async () => {
		gameData.value = await get_games(store.url)
	}
)
</script>

<style lang="scss" scoped>
@import "./StoreView.scss";
</style>
