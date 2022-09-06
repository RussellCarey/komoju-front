<template>
	<div class="container">
		<div class="content">
			<div class="header">
				<h5 class="header-results">1,345 results</h5>
				<div class="header-items">
					<input type="text" class="header-items-search" />
					<!-- Basket Icon-->
					<p class="header-items-add-tokens">Add tokens</p>
					<!-- User Icon-->
					<!-- Favourites Icon-->
				</div>
			</div>

			<div class="main">
				<div class="filter-area">
					<!-- Filter genre, platform etc-->
				</div>

				<div class="games">
					<GameCard :rating="4.5" :title="'Fortnite'" :image="'https://picsum.photos/200/300'" :price="4500" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useToast } from "vue-toastification"
import { useSearchStore } from "@/stores/search"

import CartModal from "@/components/store/CartModal/CartModal.vue"
import GameCard from "./components/GameCard/GameCard.vue"

const toast = useToast()

// DONT USE OPTIOSN API !!!!!
export default defineComponent({
	name: "store_view",
	components: {
		GameCard,
	},

	setup() {
		const store = useSearchStore()

		return {
			searchTerms: {
				genre: [] as string[],
				platforms: [] as string[],
				tags: [] as string[],
			},
			store,
		}
	},

	mounted() {
		//
	},
})
</script>

<style lang="scss" scoped>
@import "./StoreView.scss";
</style>
