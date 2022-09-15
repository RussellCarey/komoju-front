<template lang="">
	<iframe
		v-if="videoURL"
		autoplay="1"
		controls="0"
		:src="`https://www.youtube.com/embed/` + videoURL"
		title="Youtube Trailer"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		frameborder="0"
		scrolling="no"
		allowfullscreen
		class="trailer-video"
	></iframe>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue"

const props = defineProps({
	videoID: String,
})

console.log("LOADED THE VIDEO GRAME")
console.log(props.videoID)

const videoURL = ref<string | undefined>(props.videoID)
</script>

<style lang="scss" scoped>
@import "./GameCard.scss";
</style>
