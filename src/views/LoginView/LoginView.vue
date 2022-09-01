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

		if (cookie.username) console.log('MOVING TO MAIN SITE PAGE');
	},

	computed: {
		// Computed variables go here
	},

	methods: {
		async login() {
			try {
				const req = await signin(this.email, this.password);

				if (req.status !== 200) return console.log('ERROROROR');

				this.$cookies.set('token', JSON.stringify(req.data), '7d');
			} catch (error) {
				console.log(error);
			}
		},
	},
});
</script>

<style lang="scss" scoped>
@import './LoginView.scss';
</style>
