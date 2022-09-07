<template lang="">
	<div class="filter-item">
		<div class="check-box"></div>
		<p class="filter-name">{{ name }}</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
	name: "category_name",

	props: {
		name: String,
	},

	setup() {
		return {}
	},
})
</script>

<style lang="scss" scoped>
@import "./CategoryItem.scss";
</style>
