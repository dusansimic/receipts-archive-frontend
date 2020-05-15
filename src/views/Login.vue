<template>
	<div>
		<h2>Login</h2>
		<Center>
			<GoogleSigninButton @click="onButtonClick()" />
		</Center>
	</div>
</template>

<script>
import GoogleSigninButton from '../components/GoogleSigninButton';

export default {
	name: 'Login',
	components: {
		GoogleSigninButton
	},
	methods: {
		onButtonClick() {
			console.log('Clicked!');
			location.href = `${process.env.VUE_APP_BACKEND_URL}/auth`;
		}
	}
};
</script>
