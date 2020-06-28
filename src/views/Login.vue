<template>
	<div>
		<BRow>
			<BCol />
			<BCol lg="6">
				<h2>Login</h2>
				<GoogleSigninButton @click="onGoogleSigninButtonClick()" />
			</BCol>
			<BCol />
		</BRow>
	</div>
</template>

<script>
import GoogleSigninButton from '../components/GoogleSigninButton';

export default {
	name: 'Login',
	components: {
		GoogleSigninButton,
	},
	methods: {
		onGoogleSigninButtonClick() {
			location.href = '/api/auth';
		},
	},
};
</script>
