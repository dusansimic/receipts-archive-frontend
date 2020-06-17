<template>
	<BOverlay :show="!loaded">
		<h2>Manage items</h2>
		<BButton block variant="outline-primary" @click="showAddItemModal()">
			Add item
		</BButton>
		<BTable
			id="items-table"
			hover
			:items="itemsData"
			:fields="itemsTableFields"
		>
			<template #cell(locationNameAndAddress)="row">
				{{ row.item.location.name }}@{{ row.item.location.address }}
			</template>

			<template #cell(updatedAt)="row">
				{{ row.item.updatedAt | moment('from', 'now') }}
			</template>

			<template #cell(actions)="row">
				<BButton size="sm" @click="showEditItemModal(row.item)">
					Edit
				</BButton>
				<BButton size="sm" variant="danger" @click="showDeleteItemModal(row.item)">
					Delete
				</BButton>
			</template>
		</BTable>

		<!-- Edit item modal -->
		<EditItemModal
			id="edit-item-modal"
			:modal-form-data-prop="editItemModalData"
			@ok="editItem"
		/>

		<!-- Add new item modal -->
		<EditItemModal
			id="add-item-modal"
			@ok="addItem"
		/>

		<!-- Delete item modal -->
		<DeleteModal
			id="delete-item-modal"
			target-type="item"
			:target-description="deleteItemModalData.name"
			:target-id="deleteItemModalData.id"
			@ok="deleteItem"
		/>
	</BOverlay>
</template>

<script>
import EditItemModal from '../components/EditItemModal';
import DeleteModal from '../components/DeleteModal';
import ky from 'ky';
import {credentialsOptions} from '../common';

export default {
	name: 'ManageItems',
	components: {
		EditItemModal,
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
					key: 'price',
					label: 'Price'
				},
				{
					key: 'unit',
					label: 'Unit'
				},
				{
					key: 'actions',
					label: 'Actions'
				}
			],
			itemsData: null,
			editItemModalData: {
				id: null,
				name: null,
				price: null,
				unit: null
			},
			deleteItemModalData: {
				id: null,
				name: null
			},
			loaded: false
		};
	},
	async mounted() {
		this.itemsData = await this.getItemData();
		this.loaded = true;
	},
	methods: {
		async getItemData() {
			return ky.get('/api/items', credentialsOptions).json();
		},
		showEditItemModal(item) {
			this.editItemModalData.id = item.id;
			this.editItemModalData.name = item.name;
			this.editItemModalData.price = item.price;
			this.editItemModalData.unit = item.unit;
			this.$bvModal.show('edit-item-modal');
		},
		async editItem(data) {
			this.loaded = false;
			await ky.put('/api/items', {
				...credentialsOptions,
				json: data
			});

			this.itemsData = await this.getItemData();
			this.loaded = true;
		},
		showAddItemModal() {
			this.$bvModal.show('add-item-modal');
		},
		async addItem(data) {
			this.loaded = false;
			await ky.post('/api/items', {
				...credentialsOptions,
				json: data
			});

			this.itemsData = await this.getItemData();
			this.loaded = true;
		},
		showDeleteItemModal(item) {
			this.deleteItemModalData.id = item.id;
			this.deleteItemModalData.name = item.name;
			this.$bvModal.show('delete-item-modal');
		},
		async deleteItem(id) {
			this.loaded = false;
			const data = {id};
			await ky.delete('/api/items', {
				...credentialsOptions,
				json: data
			});

			this.itemsData = await this.getItemData();
			this.loaded = true;
		}
	}
};
</script>

<style scoped>
#items-table button {
	margin: 0 2px;
}
</style>
