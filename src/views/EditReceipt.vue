<template>
	<BOverlay :show="!loaded">
		<h2>Edit receipt</h2>
		<BRow v-if="receiptData">
			<BCol lg>
				<BCard class="value-card">
					<span class="value-card-title">
						Date
					</span>
					<br />
					<span class="value-card-data">
						{{ receiptData.createdAt | moment('DD. MM. YYYY.') }}
					</span>
				</BCard>
			</BCol>
			<BCol lg>
				<BCard class="value-card">
					<span class="value-card-title">
						Time
					</span>
					<br />
					<span class="value-card-data">
						{{ receiptData.createdAt | moment('HH:mm') }}
					</span>
				</BCard>
			</BCol>
			<BCol lg>
				<BCard class="value-card">
					<span class="value-card-title">
						Total price
					</span>
					<br />
					<span class="value-card-data">
						{{ receiptData.totalPrice.Float64.toFixed(2) }} <small>rsd</small>
					</span>
				</BCard>
			</BCol>
		</BRow>

		<BButton block variant="outline-primary" @click="showAddItemInReceiptModal()">
			Add item
		</BButton>

		<BTable
			id="items-table"
			hover
			:items="itemsData"
			:fields="itemsTableFields"
		>
			<template #cell(actions)="row">
				<BButton size="sm" @click="showEditItemInReceiptModal(row.item)">
					Edit
				</BButton>
				<BButton size="sm" variant="danger" @click="showDeleteItemInReceiptModal(row.item)">
					Remove
				</BButton>
			</template>
		</BTable>

		<!-- Update item from receipt modal -->
		<UpdateItemInReceiptModal
			id="edit-item-in-receipt-modal"
			:modal-form-data-prop="editItemInReceiptModalData"
			@ok="editItemInReceipt"
		/>

		<!-- Add item in receipt -->
		<EditItemInReceiptModal
			id="add-item-in-receipt-modal"
			show-new-item-button
			@ok="addItemInReceipt"
			@new-item="showAddItemModal"
		/>

		<!-- Delete receipt modal -->
		<DeleteModal
			id="delete-item-in-receipt-modal"
			target-type="item"
			:target-description="deleteItemInReceiptModalData.name"
			:target-id="deleteItemInReceiptModalData.id"
			@ok="deleteItemInReceipt"
		/>

		<!-- Add new item modal -->
		<EditItemModal
			id="add-item-modal"
			@ok="addItem"
		/>
	</BOverlay>
</template>

<script>
import EditItemModal from '../components/EditItemModal';
import EditItemInReceiptModal from '../components/EditItemInReceiptModal';
import UpdateItemInReceiptModal from '../components/UpdateItemInReceiptModal';
import DeleteModal from '../components/DeleteModal';
import ky from 'ky';
import {credentialsOptions} from '../common';

export default {
	name: 'EditReceipt',
	components: {
		EditItemModal,
		EditItemInReceiptModal,
		UpdateItemInReceiptModal,
		DeleteModal
	},
	data() {
		return {
			itemsTableFields: [
				{
					key: 'name',
					label: 'Name'
				},
				{
					key: 'amount',
					label: 'Amount'
				},
				{
					key: 'price',
					label: 'Price'
				},
				{
					key: 'actions',
					label: 'Actions'
				}
			],
			itemsData: null,
			receiptData: null,
			editItemInReceiptModalData: {
				id: null,
				amount: null
			},
			deleteItemInReceiptModalData: {
				id: null,
				name: null
			},
			loaded: false
		};
	},
	async mounted() {
		this.receiptData = await this.getReceiptData();
		this.itemsData = await this.getItemsData();
		this.loaded = true;
	},
	methods: {
		// Get receipt data as json
		async getReceiptData() {
			return (await ky.get(`${process.env.VUE_APP_BACKEND_URL}/receipts?id=${this.$route.params.id}`, credentialsOptions).json())[0];
		},
		// Get items data as json
		async getItemsData() {
			return ky.get(`${process.env.VUE_APP_BACKEND_URL}/items/inreceipt/${this.$route.params.id}`, credentialsOptions).json();
		},
		// Show modal for editing item in receipt and fill the from
		showEditItemInReceiptModal(receipt) {
			this.editItemInReceiptModalData.id = receipt.id;
			this.editItemInReceiptModalData.amount = receipt.amount;
			this.$bvModal.show('edit-item-in-receipt-modal');
		},
		// Logic for updating item in receipt
		async editItemInReceipt(data) {
			this.loaded = false;
			await ky.put(`${process.env.VUE_APP_BACKEND_URL}/items/inreceipt`, {
				...credentialsOptions,
				json: data
			});

			this.receiptData = await this.getReceiptData();
			this.itemsData = await this.getItemsData();
			this.loaded = true;
		},
		// Show modal for adding new item in receipt
		showAddItemInReceiptModal() {
			this.$bvModal.show('add-item-in-receipt-modal');
		},
		// Logic for adding new item in receipt
		async addItemInReceipt(rawData) {
			this.loaded = false;

			const data = {
				receiptId: this.$route.params.id,
				itemId: rawData.selectedItemId,
				amount: rawData.amount
			};

			await ky.post(`${process.env.VUE_APP_BACKEND_URL}/items/inreceipt`, {
				...credentialsOptions,
				json: data
			});

			this.receiptData = await this.getReceiptData();
			this.itemsData = await this.getItemsData();
			this.loaded = true;
		},
		// Show modal for deleting item in receipt
		showDeleteItemInReceiptModal(item) {
			this.deleteItemInReceiptModalData.id = item.id;
			this.deleteItemInReceiptModalData.name = item.name;
			this.$bvModal.show('delete-item-in-receipt-modal');
		},
		// Logic for deleting item in receipt
		async deleteItemInReceipt(itemId) {
			this.loaded = false;
			const data = {itemId};
			await ky.delete(`${process.env.VUE_APP_BACKEND_URL}/items/inreceipt`, {
				...credentialsOptions,
				json: data
			});

			this.receiptData = await this.getReceiptData();
			this.itemsData = await this.getItemsData();
			this.loaded = true;
		},
		// Show modal for adding new item to database
		showAddItemModal() {
			this.$bvModal.show('add-item-modal');
		},
		// Locig for adding new item to database
		async addItem(data) {
			await ky.post(`${process.env.VUE_APP_BACKEND_URL}/items`, {
				...credentialsOptions,
				json: data
			});
		}
	}
};
</script>

<style scoped>
#items-table button {
	margin: 0 2px;
}
.value-card {
	margin-bottom: 10px;
}
.value-card .value-card-title {
	color: #00000077;
}
.value-card .value-card-data {
	font-size: 1.5em;
}
</style>
