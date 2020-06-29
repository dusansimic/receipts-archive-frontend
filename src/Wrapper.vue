<template>
	<BContainer>
		<BRow>
			<BCol>
				<NavBar />
			</BCol>
		</BRow>
		<BRow>
			<BCol>
				<RouterView />
			</BCol>
		</BRow>
	</BContainer>
</template>

<script>
import NavBar from './components/NavBar';

export default {
	components: {
		NavBar,
	},
};
</script>
