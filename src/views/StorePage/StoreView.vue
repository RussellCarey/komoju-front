<template>
	<div class="container">
		<PaymentModal v-if="showPaymentModal" @closeModal="togglePaymentModal" />

		<div class="content">
			<div class="content-header">
				<h3 class="content-header-results">{{ gameData?.data?.count.toLocaleString() || 0 }} results</h3>
				<div class="content-header-items">
					<input type="text" class="content-header-items-search" :value="searchStore.get_search" @input="(e) => setSearchValue(e)" />

					<div class="content-header-items-cart">
						<p @click="toggleCartModal">Cart</p>
						<Modal v-if="showCartModal" :isFavourites="false" />
					</div>

					<p class="content-header-items-add-tokens" @click="togglePaymentModal">Add tokens</p>

					<div class="content-header-items-favourites">
						<p @click="toggleFavouritesModal">Favourites</p>
						<Modal v-if="showFavouriteModal" :isFavourites="true" />
					</div>

					<p>Tokens: {{ userStore.get_tokens }}</p>
				</div>
			</div>
			<div class="main">
				<div class="main-sidebar">
					<div class="main-sidebar-filter-area">
						<h4 class="main-sidebar-filter-area-title">Categories</h4>
						<FilterItem
							class="main-sidebar-filter-area-items"
							v-for="gen in genreData?.data?.results"
							:key="gen.id"
							:item="gen.name"
							:id="gen.id"
							:type="'genre'"
						/>
					</div>

					<div class="main-sidebar-filter-area">
						<h4 class="main-sidebar-filter-area-title">Platforms</h4>
						<FilterItem
							class="main-sidebar-filter-area-items"
							v-for="plats in platformData?.data?.results"
							:key="plats.id"
							:item="plats.name"
							:id="plats.id"
							:type="'platform'"
						/>
					</div>
				</div>

				<div class="main-sidebar-games">
					<GameCard
						v-for="games in gameData?.data?.results"
						:id="games.id"
						:key="games.id"
						:rating="games.rating"
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
import { useSearchStore } from "../../stores/search"
import { useUserStore } from "../../stores/user"
import { get_games, get_all_categories, get_all_platforms } from "./services/rawr"

import FilterItem from "./components/FilterItem/FilterItem.vue"
import GameCard from "./components/GameCard/GameCard.vue"
import PaymentModal from "./components/PaymentModal/PaymentModal.vue"
import Modal from "./components/Modal/ModalComponent.vue"

import { rawrResponse } from "../../interfaces/rawr"
const toast = useToast()

const searchStore = useSearchStore()
const userStore = useUserStore()
const gameData = ref<rawrResponse | null>()
const genreData = ref<rawrResponse | null>()
const platformData = ref<rawrResponse | null>()
const showPaymentModal = ref(false)
const showCartModal = ref(false)
const showFavouriteModal = ref(false)

const setSearchValue = (e: Event) => {
	const target = e.target as HTMLInputElement
	searchStore.edit_search(target?.value)
}

const togglePaymentModal = () => {
	showPaymentModal.value = !showPaymentModal.value
}

const toggleCartModal = () => {
	showCartModal.value = !showCartModal.value
}

const toggleFavouritesModal = () => {
	showFavouriteModal.value = !showFavouriteModal.value
}

onMounted(async () => {
	gameData.value = await get_games(searchStore.url)
	genreData.value = await get_all_categories()
	platformData.value = await get_all_platforms()
})

// Set a time so its not so fast?
watch(
	() => searchStore.url,
	async () => {
		gameData.value = await get_games(searchStore.url)
	}
)
</script>

<style lang="scss" scoped>
@import "./StoreView.scss";
</style>
