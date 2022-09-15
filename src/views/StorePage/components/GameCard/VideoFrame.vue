<template lang="">
	<iframe
		v-if="videoURL"
		id="ytplayer"
		type="text/html"
		:src="videoURL"
		title="Youtube Trailer"
		allow="autoplay"
		frameborder="0"
		allowfullscreen
		class="trailer-video"
	></iframe>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue"

const props = defineProps({
	videoID: String,
})

const videoURL = ref<string | undefined>(`https://www.youtube.com/embed/${props.videoID}?autoplay="1"&controls="0"`)
</script>

<style lang="scss" scoped>
@import "./GameCard.scss";
</style>
