<template>
	<div>
		<h2>Home</h2>
		<b-table striped hover :items="receiptsList" :fields="tableFields" v-on:row-clicked="logRow">
			<template v-slot:cell(createdAt)="receipt">
				{{ receipt.item.createdAt | moment('from', 'now') }}
			</template>
		</b-table>
	</div>
</template>

<script>
import ky from 'ky';

export default {
	name: 'Home',
	data () {
		return {
			tableFields: [
				{
					key: "totalPrice",
					label: "Price",
					sortable: true
				},
				{
					key: "location.name",
					label: "Location",
					sortable: false
				},
				{
					key: "createdAt",
					label: "Created at",
					sortable: true
				}
			],
			receiptsList: []
		};
	},
	mounted () {
		this.getReceiptsList();
	},
	methods: {
		async getReceiptsList () {
			this.receiptsList = await ky.get('http://localhost:3001/receipts?createdBy=115314100014658551287').json();
		},
		logRow (receipt) {
			console.log(receipt);
		}
	}
}
</script>
