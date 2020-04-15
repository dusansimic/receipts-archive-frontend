<template>
	<BContainer>
		<BRow>
			<BCol>
				<NavBar />
			</BCol>
		</BRow>
		<BRow>
			<BCol
				lg="10"
				md="10"
			>
				<RouterView />
			</BCol>
			<BCol />
		</BRow>
	</BContainer>
</template>

<script>
import NavBar from './components/NavBar';

export default {
	components: {
		NavBar
	}
};
</script>
