<template>
	<div>
		<h2>Home</h2>
		<BTable
			striped
			hover
			:items="receiptsList"
			:fields="tableFields"
			@row-clicked="logRow"
		>
			<template #cell(createdAt)="receipt">
				{{ receipt.item.createdAt | moment('from', 'now') }}
			</template>
		</BTable>
	</div>
</template>

<script>
import ky from 'ky';

export default {
	name: 'Home',
	data() {
		return {
			tableFields: [
				{
					key: 'totalPrice',
					label: 'Price',
					sortable: true
				},
				{
					key: 'location.name',
					label: 'Location',
					sortable: false
				},
				{
					key: 'createdAt',
					label: 'Created at',
					sortable: true
				}
			],
			receiptsList: []
		};
	},
	mounted() {
		this.getReceiptsList();
	},
	methods: {
		async getReceiptsList() {
			this.receiptsList = await ky.get(`${process.env.VUE_APP_BACKEND_URL}/receipts?createdBy=115314100014658551287`).json();
		},
		logRow(receipt) {
			this.$router.push({name: 'Receipt', params: {id: receipt.id}});
		}
	}
};
</script>
