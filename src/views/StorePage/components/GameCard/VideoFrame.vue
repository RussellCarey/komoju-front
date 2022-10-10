<template lang="">
	<div class="trailer-video">
		<p class="trailer-video-text" v-if="!videoURL">Loading video..</p>
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
import { defineProps, ref, onMounted } from "vue"
import { getYoutubeVideo } from "./services/services"

const videoURL = ref<string | null>()
const props = defineProps({
	title: String,
})

const getVideoData = async () => {
	if (videoURL.value) return
	const req = await getYoutubeVideo(props.title + " game trailer")

	// Show a spinner or some loading animation for the video?
	if (req.status !== 200) return

	const videoID = req.data.items[0].id.videoId
	videoURL.value = `https://www.youtube.com/embed/${videoID}?autoplay=1&showinfo=0`
}

onMounted(async () => {
	getVideoData()
})
</script>

<style lang="scss" scoped>
@import "./GameCard.scss";
</style>
