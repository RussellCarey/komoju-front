<template>
	<div class="container">
		<div class="container-login">
			<h1 class="container-login-title">Welcome to Tokeny</h1>
			<div class="container-login-container">
				<p class="container-login-container-label">Email</p>
				<input v-model="email" class="container-login-container-input" type="text" />
			</div>
			<div class="container-login-container">
				<p class="container-login-container-label">Password</p>
				<input v-model="password" class="container-login-container-input" type="password" />
			</div>
			<button @click="login" class="container-login-button">Sign in</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { signin } from './services/db';
import { useToast } from 'vue-toastification';

const toast = useToast();

// DONT USE OPTIOSN API !!!!!
export default defineComponent({
	name: 'login_view',
	props: [],

	data() {
		return {
			email: '',
			password: '',
			username: '',
		};
	},

	mounted() {
		const cookie = this.$cookies.get('token');
		this.username = cookie.username;
		if (cookie.username) this.$router.push('/store');
	},

	computed: {
		// Computed variables go here
	},

	methods: {
		async login() {
			const req = await signin(this.email, this.password);
			if (req.status !== 200) return toast.error('Error logging in!');

			this.$cookies.set('token', JSON.stringify(req.data), '7d');
		},
	},
});
</script>

<style lang="scss" scoped>
@import './LoginView.scss';
</style>
