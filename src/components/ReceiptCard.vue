<template>
	<BCard v-if="receiptData && itemsData">
		<table class="receiptData">
			<tbody>
				<tr>
					<td>Date:</td>
					<td>{{ receiptData.createdAt | moment('DD. MM. YYYY.') }}</td>
				</tr>
				<tr>
					<td>Time:</td>
					<td>{{ receiptData.createdAt | moment('HH:mm') }}</td>
				</tr>
			</tbody>
		</table>
		<hr />
		<table class="receiptData">
			<tbody>
				<tr v-for="item in itemsData" :key="item.id">
					<td>{{ item.name }} x{{ item.amount }}</td>
					<td>{{ item.price }}</td>
				</tr>
			</tbody>
		</table>
		<hr />
		<table class="receiptData">
			<tbody>
				<tr>
					<td />
					<td>
						Total:
						<span class="totalPrice">
							{{ receiptData.totalPrice.toFixed(2) }}
						</span>
					</td>
				</tr>
			</tbody>
		</table>
	</BCard>
</template>

<script>
import ky from 'ky';
import {credentialsOptions} from '../common';

export default {
	name: 'ReceiptCard',
	data() {
		return {
			receiptData: null,
			itemsData: null
		};
	},
	mounted() {
		this.getReceiptData();
		this.getItemsData();
	},
	methods: {
		async getReceiptData() {
			this.receiptData = (await ky.get(`${process.env.VUE_APP_BACKEND_URL}/receipts?id=${this.$route.params.id}`, credentialsOptions).json())[0];
		},
		async getItemsData() {
			this.itemsData = await ky.get(`${process.env.VUE_APP_BACKEND_URL}/items/inreceipt/${this.$route.params.id}`, credentialsOptions).json();
		}
	}
};
</script>

<style scoped>
.receiptData {
	width: 100%;
}
.receiptData td:nth-child(odd) {
	text-align: left;
}
.receiptData td:nth-child(even) {
	text-align: right;
}
hr {
	border-top: 1px dotted rgba(0, 0, 0, 0.2);
}
.totalPrice {
	font-size: 1.5em;
	font-weight: bold;
}
</style>
