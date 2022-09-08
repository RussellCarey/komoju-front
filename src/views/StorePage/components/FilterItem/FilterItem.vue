<template lang="">
	<div class="filter-item">
		<div class="check-box" @click="setSelected" :class="isSelected ? 'checked' : ''"></div>
		<p class="filter-name">{{ item }}</p>
	</div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue"
import { useSearchStore } from "@/stores/search"

const store = useSearchStore()
let isSelected = ref(false)

const props = defineProps({
	item: String,
	type: String,
	id: Number,
})

const setSelected = () => {
	if (props.type === "genre" && props.id) {
		if (!isSelected.value) store.add_genre(props.id)
		if (isSelected.value) store.remove_genre(props.id)
	}

	if (props.type === "platform" && props.id) {
		if (!isSelected.value) store.add_platform(props.id)
		if (isSelected.value) store.remove_platform(props.id)
	}

	isSelected.value = !isSelected.value
}
</script>

<style lang="scss" scoped>
@import "./FilterItem.scss";
</style>
