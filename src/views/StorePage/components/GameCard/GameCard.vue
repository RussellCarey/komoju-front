<template lang="">
	<div class="card-container" :style="{ backgroundImage: 'url(' + image + ')' }">
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

defineProps({
	image: String,
	title: String,
	price: Number,
	rating: Number,
})
</script>

<style lang="scss" scoped>
@import "./GameCard.scss";
</style>
