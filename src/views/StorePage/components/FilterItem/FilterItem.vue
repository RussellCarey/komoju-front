<template lang="">
	<div class="filter-item">
		<div :data-cy="`category-item-${item}`" class="check-box" @click="setSelected" :class="isSelected ? 'checked' : ''"></div>
		<p class="filter-name">{{ item }}</p>
	</div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue"
import { useSearchStore } from "../../../../stores/search"

const searchStore = useSearchStore()
const isSelected = ref(false)

const props = defineProps({
	item: String,
	type: String,
	id: Number,
})

const setSelected = () => {
	if (props.type === "genre" && props.id) {
		if (!isSelected.value) searchStore.add_genre(props.id)
		if (isSelected.value) searchStore.remove_genre(props.id)
		console.log(searchStore.url)
	}

	if (props.type === "platform" && props.id) {
		if (!isSelected.value) searchStore.add_platform(props.id)
		if (isSelected.value) searchStore.remove_platform(props.id)
		console.log(searchStore.url)
	}

	isSelected.value = !isSelected.value
}
</script>

<style lang="scss" scoped>
@import "./FilterItem.scss";
</style>
