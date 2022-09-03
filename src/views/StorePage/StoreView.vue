<template>
	<div class="container">
		<div class="header">
			<h5 class="header-results">1,345 results</h5>
			<input type="text" class="header-search" />
			<!-- Basket Icon-->
			<p class="header-add-tokens">Add tokens</p>
			<!-- User Icon-->
			<!-- Favourites Icon-->
		</div>

		<div class="main">
			<div class="filter-area">
				<!-- Filter genre, platform etc-->
			</div>

			<div class="games">
				<!-- Where games cards are -->
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useToast } from 'vue-toastification';
import { useSearchStore } from '@/stores/search';

import CartModal from '@/components/store/CartModal/CartModal.vue';

const toast = useToast();

declare interface SearchTerms {
	genre: string[];
	playforms: string[];
	tags: string[];
}

// DONT USE OPTIOSN API !!!!!
export default defineComponent({
	name: 'store_view',
	props: [],

	setup() {
		const store = useSearchStore();

		return {
			searchTerms: {
				genre: [] as string[],
				platforms: [] as string[],
				tags: [] as string[],
			},
			store,
		};
	},

	components: {
		// CartModal,
	},

	mounted() {
		//
	},

	computed: {
		// Computed variables go here
	},

	methods: {
		//
	},
});
</script>

<style lang="scss" scoped>
@import './LoginView.scss';
</style>
