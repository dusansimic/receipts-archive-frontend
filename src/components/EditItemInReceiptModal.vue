<template>
	<BModal v-bind="attrs" v-on="listeners" @ok="ok()">
		<BButton v-if="showNewItemButton" block @click="newItem()">
			New item
		</BButton>

		<BForm @submit.prevent @submit="ok()">
			<BFormGroup
				id="nameInputGroup"
				label="Name:"
				label-for="nameInput"
				description="Name of specific item"
			>
				<BFormInput
					id="nameInput"
					v-model="modalFormData.name"
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
				v-if="searchResultsTable.itemsSearchResults && searchResultsTable.showResults"
				id="results-table"
				:items="searchResultsTable.itemsSearchResults"
				:fields="searchResultsTable.searchResultsTableFields"
				:per-page="5"
				:current-page="searchResultsTable.itemsSearchResultsPage"
				@row-clicked="pickItem"
				small
				striped
			/>

			<BPagination
				v-if="searchResultsTable.itemsSearchResults && searchResultsTable.showResults"
				v-model="searchResultsTable.itemsSearchResultsPage"
				:total-rows="searchResultsTable.itemsSearchResults.length"
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
					v-model.number="modalFormData.amount"
					type="number"
					required
				/>
			</BFormGroup>
		</BForm>
	</BModal>
</template>

<script>
import ky from 'ky';
import debounce from 'lodash/debounce';
import {credentialsOptions} from '../common';

export default {
	name: 'EditItemInReceiptModal',
	props: {
		showNewItemButton: {
			type: Boolean
		},
		modalFormDataProp: {
			type: Object,
			default: null
		}
	},
	data() {
		return {
			searchResultsTable: {
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
				showResults: true
			}
		};
	},
	computed: {
		listeners() {
			const {
				ok,
				...listeners
			} = this.$listeners;
			return listeners;
		},
		attrs() {
			return this.$attrs;
		},
		modalFormData() {
			const formData = this.modalFormDataProp || {
				selctedItemId: null,
				name: null,
				amount: null
			};
			return formData;
		}
	},
	methods: {
		searchItems: debounce(async function () {
			// If name input is empty, don't search since it returns all items
			if (this.modalFormData.name === '') {
				this.searchResultsTable.itemsSearchResults = null;
				return;
			}

			this.searchResultsTable.itemsSearchResults = await ky.get(`${process.env.VUE_APP_BACKEND_URL}/items`, {
				...credentialsOptions,
				searchParams: {
					name: this.modalFormData.name
				}
			}).json();
			this.searchResultsTable.showResults = true;
		}, 500),
		pickItem(item) {
			this.modalFormData.selectedItemId = item.id;
			this.modalFormData.name = item.name;
			this.searchResultsTable.showResults = false;
		},
		ok() {
			this.$emit('ok', this.modalFormData);
		},
		newItem() {
			this.$emit('new-item');
		}
	}
};
</script>
