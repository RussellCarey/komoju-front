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

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
	name: "store_view",

	props: {
		image: String,
		title: String,
		price: Number,
		rating: Number,
	},

	setup() {
		return {}
	},
})
</script>

<style lang="scss" scoped>
@import "./GameCard.scss";
</style>
