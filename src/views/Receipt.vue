<template>
	<div>
		<BRow>
			<BCol lg="6">
				<ReceiptCard />
			</BCol>
			<BCol>
				<BButton variant="primary" :to="{name: 'EditReceipt', params: {id: this.$route.params.id}}">
					Edit
				</BButton>
				<BButton variant="danger" @click="deleteReceipt()">
					Remove
				</BButton>
			</BCol>
		</BRow>
	</div>
</template>

<script>
import ReceiptCard from '../components/ReceiptCard';
import ky from 'ky';
import {credentialsOptions, prefixApiOptions} from '../common';

export default {
	name: 'Receipt',
	components: {
		ReceiptCard,
	},
	methods: {
		async deleteReceipt() {
			const data = {id: this.$route.params.id};
			await ky.delete('receipts', {
				...credentialsOptions,
				...prefixApiOptions,
				json: data,
			});

			this.$router.push({name: 'Home'});
		},
	},
};
</script>

<style scoped>
button {
	margin: 0px 3px;
}
</style>
