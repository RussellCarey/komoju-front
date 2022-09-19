<template lang="">
	<div class="trailer-video">
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
			class="trailer-vide-video"
			height="100%"
		></iframe>
	</div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue"

const props = defineProps({
	videoID: String,
})

const videoURL = ref<string | undefined>(`https://www.youtube.com/embed/${props.videoID}?autoplay=1&showinfo=0`)
</script>

<style lang="scss" scoped>
@import "./GameCard.scss";
</style>