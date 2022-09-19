<template lang="">
	<div class="modal-container">
		<div class="modal-container-items">
			<div v-for="item in items" :key="item.id" class="modal-container-items-item">
				<img :src="item.image" alt="" class="modal-container-items-item-image" />
				<p class="modal-container-items-item-name">{{ item.name }}</p>
				<p class="modal-container-items-item-price">{{ item.price }}</p>
				<div class="modal-container-items-item-delete" v-if="!isFavourites" @click="(e) => removeItem(item.id, item.name)"></div>
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
import { useUserStore } from "@/stores/user"

const cookies = useCookies(["locale"])
const items = ref([])
const toast = useToast()
const userStore = useUserStore()

const props = defineProps({
	isFavourites: Boolean,
	image: String,
	name: String,
	price: Number,
	qty: Number,
})

const removeItem = async (id: number, name: string) => {
	const req = props.isFavourites ? await userStore.remove_favourite(id) : await userStore.remove_cart(id)
	if (req.status !== 200) items.value = []
	items.value = props.isFavourites ? userStore.favourites : userStore.cart
	toast.success(`Removed ${name}`)
}

onMounted(async () => {
	items.value = props.isFavourites ? userStore.favourites : userStore.cart
})
</script>

<style lang="scss" scoped>
@import "./Modal.scss";
</style>