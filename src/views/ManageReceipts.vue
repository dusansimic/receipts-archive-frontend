<template>
	<BOverlay :show="!loaded">
		<h2>Manage receipts</h2>
		<BButton block variant="outline-primary" @click="showAddReceiptModal()">
			Add receipt
		</BButton>
		<BTable
			id="receipts-table"
			hover
			:items="receiptsData"
			:fields="receiptsTableFields"
			@row-clicked="manageReceipt"
		>
			<template #cell(totalPrice)="row">
				{{ row.item.totalPrice.toFixed(2) }}
			</template>
			<template #cell(locationNameAndAddress)="row">
				{{ row.item.location.name }}@{{ row.item.location.address }}
			</template>

			<template #cell(updatedAt)="row">
				{{ row.item.updatedAt | moment('from', 'now') }}
			</template>

			<template #cell(actions)="row">
				<BButton size="sm" @click="showEditReceiptModal(row.item)">
					Edit
				</BButton>
				<BButton size="sm" variant="danger" @click="showDeleteReceiptModal(row.item)">
					Delete
				</BButton>
			</template>
		</BTable>

		<!-- Edit receipt modal -->
		<EditReceiptModal
			v-if="locationsData"
			id="edit-receipt-modal"
			:modal-form-data-prop="editReceiptModalData"
			:locations-data="locationsData"
			@ok="editReceipt"
		/>

		<!-- Add new receipt modal -->
		<EditReceiptModal
			v-if="locationsData"
			id="add-receipt-modal"
			:locations-data="locationsData"
			@ok="addReceipt"
		/>

		<!-- Delete receipt modal -->
		<DeleteModal
			id="delete-receipt-modal"
			target-type="receipt"
			:target-description="`${deleteReceiptModalData.locationName} ${deleteReceiptModalData.totalPrice}`"
			:target-id="deleteReceiptModalData.id"
			@ok="deleteReceipt"
		/>
	</BOverlay>
</template>

<script>
import EditReceiptModal from '../components/EditReceiptModal';
import DeleteModal from '../components/DeleteModal';
import ky from 'ky';
import {credentialsOptions} from '../common';

export default {
	name: 'ManageReceipts',
	components: {
		EditReceiptModal,
		DeleteModal,
	},
	data() {
		return {
			receiptsTableFields: [
				{
					key: 'totalPrice',
					label: 'Total',
				},
				{
					key: 'locationNameAndAddress',
					label: 'Location',
				},
				{
					key: 'updatedAt',
					label: 'Updated',
				},
				{
					key: 'actions',
					label: 'Actions',
				},
			],
			locationsData: null,
			receiptsData: null,
			editReceiptModalData: {
				id: null,
				locationId: null,
				date: null,
				time: null,
			},
			deleteReceiptModalData: {
				id: null,
				locationName: null,
				totalPrice: null,
			},
			loaded: false,
		};
	},
	async mounted() {
		await this.getLocationsData();
		await this.getReceiptsData();
		this.loaded = true;
	},
	methods: {
		async getLocationsData() {
			const rawLocationsData = await ky.get('/api/locations', credentialsOptions).json();

			this.locationsData = rawLocationsData.map(location => {
				return {
					value: location.id,
					text: `${location.name}@${location.address}`,
				};
			});
		},
		async getReceiptsData() {
			this.receiptsData = await ky.get('/api/receipts', credentialsOptions).json();
		},
		showEditReceiptModal(receipt) {
			this.editReceiptModalData.id = receipt.id;
			this.editReceiptModalData.locationId = receipt.location.id;
			this.editReceiptModalData.date = receipt.createdAt.slice(0, 10);
			this.editReceiptModalData.time = receipt.createdAt.slice(11, 19);
			this.$bvModal.show('edit-receipt-modal');
		},
		async editReceipt(data) {
			this.loaded = false;
			await ky.put('/api/receipts', {
				...credentialsOptions,
				json: data,
			});

			await this.getReceiptsData();
			this.loaded = true;
		},
		showAddReceiptModal() {
			this.$bvModal.show('add-receipt-modal');
		},
		async addReceipt(formData) {
			this.loaded = false;
			const data = {
				id: formData.locationId,
				createdAt: formData.date + 'T' + formData.time + '.000Z',
			};
			await ky.post('/api/receipts', {
				...credentialsOptions,
				json: data,
			});

			await this.getReceiptsData();
			this.loaded = true;
		},
		showDeleteReceiptModal(receipt) {
			this.deleteReceiptModalData.id = receipt.id;
			this.deleteReceiptModalData.locationName = receipt.location.name;
			this.deleteReceiptModalData.totalPrice = receipt.totalPrice.toFixed(2);
			this.$bvModal.show('delete-receipt-modal');
		},
		async deleteReceipt(id) {
			this.loaded = false;
			const data = {id};
			await ky.delete('/api/receipts', {
				...credentialsOptions,
				json: data,
			});

			await this.getReceiptsData();
			this.loaded = true;
		},
		manageReceipt(receipt) {
			this.$router.push({name: 'EditReceipt', params: {id: receipt.id}});
		},
	},
};
</script>

<style scoped>
#receipts-table button {
	margin: 0 2px;
}
</style>
