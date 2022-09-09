<template lang="">
	<div class="modal-container">
		<div class="modal-container-items">
			<div v-for="item in items" :key="item.id" class="modal-container-items-item">
				<img src="" alt="" class="modal-container-items-item-image" />
				<p class="modal-container-items-item-name">{{ item.name }}</p>
				<p class="modal-container-items-item-price">{{ item.price }}</p>
				<p @click="(e) => removeItem(item.id, item.name)">X</p>
			</div>
			<p v-if="items.length < 1">No items in</p>
			<button v-if="!isFavourites">Purchase</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue"
import { useToast } from "vue-toastification"
import { useCookies } from "@vueuse/integrations/useCookies"
import { getCurrentFavourites, removeFavourite, getCurrentCart, removeCartItem } from "./services/services"

const cookies = useCookies(["locale"])
const items = ref([])
const toast = useToast()

const props = defineProps({
	isFavourites: Boolean,
	image: String,
	name: String,
	price: Number,
	qty: Number,
})

const removeItem = async (id: number, name: string) => {
	const req = props.isFavourites ? await removeFavourite(cookies.get("token"), id) : await removeCartItem(cookies.get("token"), id)
	if (req.status !== 200) return toast.error(`Error getting ${props.isFavourites ? "favourite" : "cart"} items`)

	items.value = req.data.data

	toast.success(`Removed ${name}`)
}

onMounted(async () => {
	const req = props.isFavourites ? await getCurrentFavourites(cookies.get("token")) : await getCurrentCart(cookies.get("token"))
	console.log(req)
	items.value = req.data.data
})
</script>

<style lang="scss" scoped>
@import "./Modal.scss";
</style>
