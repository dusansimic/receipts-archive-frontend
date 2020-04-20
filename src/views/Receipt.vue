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
				<BButton variant="danger">
					Remove
				</BButton>
			</BCol>
		</BRow>
	</div>
</template>

<script>
import ReceiptCard from '../components/ReceiptCard';

export default {
	name: 'Receipt',
	components: {
		ReceiptCard
	}
};
</script>

<style scoped>
button {
	margin: 0px 3px;
}
</style>
