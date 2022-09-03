<template>
	<div class="container">
		<!-- Favourite button here with absolute pos -->

		<div class="container-info">
			<p class="container-info-title">Fornite</p>

			<div class="container-info-data">
				<p class="container-info-data-tokens">4500</p>
				<div class="container-info-data-rating">
					<p class="container-info-data-rating-value">4.7</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineProps } from 'vue';

interface CardModalProps {
	game_data: any;
	favourites_data: any;
}

export default {
	name: 'game_card',
	props: defineProps<CardModalProps>(),

	data() {
		return {
			game_name: '',
			tokens: '',
			rating: '',
		};
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
};
</script>

<style lang="scss" scoped>
@import './styles/CartModal.css';
</style>
