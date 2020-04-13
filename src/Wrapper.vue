<template>
	<b-container>
		<b-row>
			<b-col>
				<NavBar/>
			</b-col>
		</b-row>
		<b-row>
			<b-col lg="10" md="10">
				<RouterView/>
			</b-col>
			<b-col></b-col>
		</b-row>
	</b-container>
</template>

<script>
import NavBar from './components/NavBar';

export default {
	components: {
		NavBar
	}
}
</script>
