<template lang="">
	<iframe
		v-if="videoURL"
		id="ytplayer"
		type="text/html"
		:src="videoURL"
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

const videoURL = ref<string | undefined>(`https://www.youtube.com/embed/${props.videoID}?autoplay=1&showinfo=0&controls=0`)
</script>

<style lang="scss" scoped>
@import "./GameCard.scss";
</style>
