<template>
	<div>
		<BButton block variant="outline-primary" @click="showAddItemModal()">
			Add item
		</BButton>
		<BTable
			id="items-table"
			striped
			hover
			:items="itemsData"
			:fields="itemsTableFields"
		>
			<template #cell(actions)="row">
				<BButton size="sm" @click="editItemInReceipt(row.item)">
					Edit
				</BButton>
				<BButton size="sm" variant="danger" @click="removeItemInReceipt(row.item)">
					Remove
				</BButton>
			</template>
		</BTable>

		<!-- Update item from receipt modal -->
		<BModal v-model="editItemInReceiptModalData.showModal" @ok="updateItemInReceipt()">
			<BForm @submit.prevent @submit="updateItemInReceipt()">
				<BFormGroup
					id="amountInputGroup"
					label="Amount:"
					label-for="amountInput"
					description="Amount of specific item"
				>
					<BFormInput
						id="amountInput"
						v-model.number="editItemInReceiptModalData.formData.amount"
						type="number"
						required
						placeholder="1"
					/>
				</BFormGroup>
				<BButton block @click="editItem(editItemInReceiptModalData.formData.id)">
					Edit item
				</BButton>
			</BForm>
		</BModal>

		<!-- Update item modal -->
		<BModal v-model="editItemModalData.showModal" @ok="updateItem()">
			<BForm @submit.prevent @submit="updateItem()">
				<BFormGroup
					id="nameInputGroup"
					label="Name:"
					label-for="nameInput"
					description="Name of specific item"
				>
					<BFormInput
						id="nameInput"
						v-model="editItemModalData.formData.name"
						type="text"
						required
					/>
				</BFormGroup>

				<BFormGroup
					id="priceInputGroup"
					label="Price:"
					label-for="priceInput"
					description="Price of specific item"
				>
					<BFormInput
						id="priceInput"
						v-model.number="editItemModalData.formData.price"
						type="number"
						required
					/>
				</BFormGroup>

				<BFormGroup
					id="unitInputGroup"
					label="Unit:"
					label-for="unitInput"
					description="Unit of specific item"
				>
					<BFormInput
						id="unitInput"
						v-model="editItemModalData.formData.unit"
						type="text"
						required
						placeholder="kom"
					/>
				</BFormGroup>
			</BForm>
		</BModal>

		<!-- Add item modal -->
		<BModal v-model="addItemModalData.showModal" @ok="addItem()">
			<BForm @submit.prevent @submit="addItem()">
				<BFormGroup
					id="nameInputGroup"
					label="Name:"
					label-for="nameInput"
					description="Name of specific item"
				>
					<BFormInput
						id="nameInput"
						v-model="addItemModalData.formData.name"
						type="text"
						required
						@input="searchItems()"
					/>
				</BFormGroup>

				<!--
					Item search results table
					It'd be great if this would be replaced by results dropdown
				-->
				<BTable
					v-if="addItemModalData.itemsSearchResults && addItemModalData.showResults"
					id="results-table"
					:items="addItemModalData.itemsSearchResults"
					:fields="addItemModalData.searchResultsTableFields"
					:per-page="5"
					:current-page="addItemModalData.itemsSearchResultsPage"
					@row-clicked="pickItem"
					small
					striped
				/>

				<BPagination
					v-if="addItemModalData.itemsSearchResults && addItemModalData.showResults"
					v-model="addItemModalData.itemsSearchResultsPage"
					:total-rows="addItemModalData.itemsSearchResults.length"
					:per-page="5"
					align="fill"
					aria-controls="results-table"
				/>

				<BFormGroup
					id="amountInputGroup"
					label="Amount:"
					label-for="amountInput"
					description="Amount of specified item in items unit"
				>
					<BFormInput
						id="amountInput"
						v-model.number="addItemModalData.formData.amount"
						type="number"
						required
					/>
				</BFormGroup>
			</BForm>
		</BModal>
	</div>
</template>

<script>
import ky from 'ky';
import debounce from 'lodash/debounce';

export default {
	name: 'EditReceipt',
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
			editItemInReceiptModalData: {
				showModal: false,
				formData: {
					id: null,
					amount: null
				}
			},
			editItemModalData: {
				showModal: false,
				formData: {
					id: null,
					name: null,
					price: null,
					unit: null
				}
			},
			addItemModalData: {
				showModal: false,
				itemsSearchResults: null,
				itemsSearchResultsPage: 1,
				searchResultsTableFields: [
					{
						key: 'name',
						label: 'Name',
						sortable: true
					},
					{
						key: 'price',
						label: 'Price'
					},
					{
						key: 'unit',
						label: 'Unit'
					}
				],
				showResults: true,
				formData: {
					selectedItemId: null,
					name: null,
					amount: null
				}
			}
		};
	},
	mounted() {
		this.getItemsData();
	},
	methods: {
		async getItemsData() {
			this.itemsData = await ky.get(`${process.env.VUE_APP_BACKEND_URL}/items/inreceipt/${this.$route.params.id}`).json();
		},
		editItemInReceipt(item) {
			this.editItemInReceiptModalData.formData.id = item.id;
			this.editItemInReceiptModalData.formData.amount = item.amount;
			this.editItemInReceiptModalData.showModal = true;
		},
		async removeItemInReceipt(item) {
			const data = {
				itemId: item.id
			};
			await ky.delete(`${process.env.VUE_APP_BACKEND_URL}/items/inreceipt`, {
				json: data
			});

			this.getItemsData();
		},
		editItem(id) {
			const item = this.itemsData.find(item => item.id === id);
			this.editItemModalData.formData.id = item.itemId;
			this.editItemModalData.formData.name = item.name;
			this.editItemModalData.formData.price = item.price;
			this.editItemModalData.formData.unit = item.unit;
			this.editItemModalData.showModal = true;
		},
		async updateItemInReceipt() {
			const data = this.editItemInReceiptModalData.formData;
			await ky.put(`${process.env.VUE_APP_BACKEND_URL}/items/inreceipt`, {
				json: data
			});

			this.editItemInReceiptModalData.showModal = false;
			this.getItemsData();
		},
		async updateItem() {
			const data = this.editItemModalData.formData;
			await ky.put(`${process.env.VUE_APP_BACKEND_URL}/items`, {
				json: data
			});

			this.editItemModalData.showModal = false;
			this.getItemsData();
		},
		searchItems: debounce(async function () {
			// If name input is empty, don't search since it returns all items
			if (this.addItemModalData.formData.name === '') {
				this.addItemModalData.itemsSearchResults = null;
				return;
			}

			this.addItemModalData.itemsSearchResults = await ky.get(`${process.env.VUE_APP_BACKEND_URL}/items`, {
				searchParams: {
					name: this.addItemModalData.formData.name
				}
			}).json();
			this.addItemModalData.showResults = true;
		}, 500),
		pickItem(item) {
			this.addItemModalData.formData.selectedItemId = item.id;
			this.addItemModalData.formData.name = item.name;
			this.addItemModalData.showResults = false;
		},
		showAddItemModal() {
			this.addItemModalData.showModal = true;
		},
		async addItem() {
			const data = {
				receiptId: this.$route.params.id,
				itemId: this.addItemModalData.formData.selectedItemId,
				amount: this.addItemModalData.formData.amount
			};

			await ky.post(`${process.env.VUE_APP_BACKEND_URL}/items/inreceipt`, {
				json: data
			});

			this.addItemModalData.showModal = false;
			this.getItemsData();
		}
	}
};
</script>

<style scoped>
#items-table button {
	margin: 0 2px;
}
</style>
