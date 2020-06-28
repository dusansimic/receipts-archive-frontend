<template>
	<div>
		<h2>Home</h2>
		<BTable
			hover
			:items="receiptsList"
			:fields="tableFields"
			@row-clicked="manageReceipt"
		>
			<template #cell(totalPrice)="row">
				{{ row.item.totalPrice.toFixed(2) }}
			</template>
			<template #cell(createdAt)="row">
				{{ row.item.createdAt | moment('from', 'now') }}
			</template>
		</BTable>
	</div>
</template>

<script>
import ky from 'ky';
import {credentialsOptions, prefixApiOptions} from '../common';

export default {
	name: 'Home',
	data() {
		return {
			tableFields: [
				{
					key: 'totalPrice',
					label: 'Price',
					sortable: true,
				},
				{
					key: 'location.name',
					label: 'Location',
					sortable: false,
				},
				{
					key: 'createdAt',
					label: 'Created at',
					sortable: true,
				},
			],
			receiptsList: [],
		};
	},
	mounted() {
		this.getReceiptsList();
	},
	methods: {
		async getReceiptsList() {
			this.receiptsList = await ky.get('receipts', {
				...credentialsOptions,
				...prefixApiOptions,
			}).json();
		},
		manageReceipt(receipt) {
			this.$router.push({name: 'Receipt', params: {id: receipt.id}});
		},
	},
};
</script>
