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
import { defineComponent, ref } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { useToast } from 'vue-toastification';
import { signin } from './services/db';

import { useUserStore } from '@/stores/user';

const toast = useToast();

// DONT USE OPTIOSN API !!!!!
export default defineComponent({
	name: 'login_view',
	props: [],

	setup() {
		const cookies = useCookies(['locale']);
		const store = useUserStore();
		const email = ref('');
		const password = ref('');
		const username = ref('');

		const login = async () => {
			const req = await signin(email.value, password.value);

			if (req.status !== 200) return toast.error('Error logging in!');

			// Set cookie
			cookies.set('token', JSON.stringify(req.data.token));

			// Set user global state..
			store.set_auth_token(req.data.token);
			store.set_details(req.data.user);
			store.set_tokens(req.data.user.token_count);
		};

		// We can now use these in the template..
		return { store, email, password, username, login, cookies };
	},

	mounted() {
		this.username = this.cookies.get('token');
		if (this.username) this.$router.push('/store');
	},
});
</script>

<style lang="scss" scoped>
@import './LoginView.scss';
</style>
