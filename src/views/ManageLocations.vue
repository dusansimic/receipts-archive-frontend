<template>
	<BOverlay :show="!loaded">
		<h2>Manage locations</h2>
		<BButton block variant="outline-primary" @click="showAddLocationModal()">
			Add location
		</BButton>
		<BTable
			id="locations-table"
			hover
			:items="locationsData"
			:fields="locationsTableFields"
		>
			<template #cell(updatedAt)="row">
				{{ row.item.updatedAt | moment('from', 'now') }}
			</template>

			<template #cell(actions)="row">
				<BButton size="sm" @click="showEditLocationModal(row.item)">
					Edit
				</BButton>
				<BButton size="sm" variant="danger" @click="showDeleteLocationModal(row.item)">
					Delete
				</BButton>
			</template>
		</BTable>

		<!-- Edit location modal -->
		<EditLocationModal
			id="edit-location-modal"
			:modal-form-data-prop="editLocationModalData"
			@ok="editLocation"
		/>

		<!-- Add new location modal -->
		<EditLocationModal
			id="add-location-modal"
			@ok="addLocation"
		/>

		<!-- Delete location modal -->
		<DeleteModal
			id="delete-location-modal"
			target-type="location"
			:target-description="`${deleteLocationModalData.name}@${deleteLocationModalData.address}`"
			:target-id="deleteLocationModalData.id"
			@ok="deleteLocation"
		/>
	</BOverlay>
</template>

<script>
import EditLocationModal from '../components/EditLocationModal';
import DeleteModal from '../components/DeleteModal';
import ky from 'ky';
import {credentialsOptions} from '../common';

export default {
	name: 'ManageLocations',
	components: {
		EditLocationModal,
		DeleteModal
	},
	data() {
		return {
			locationsTableFields: [
				{
					key: 'name',
					label: 'Name'
				},
				{
					key: 'address',
					label: 'Address'
				},
				{
					key: 'updatedAt',
					label: 'Updated'
				},
				{
					key: 'actions',
					label: 'Actions'
				}
			],
			locationsData: null,
			editLocationModalData: {
				id: null,
				name: null,
				address: null
			},
			deleteLocationModalData: {
				id: null,
				name: null,
				address: null
			},
			loaded: false
		};
	},
	async mounted() {
		await this.getLocationsData();
		this.loaded = true;
	},
	methods: {
		async getLocationsData() {
			this.locationsData = await ky.get('/api/locations', credentialsOptions).json();
		},
		showEditLocationModal(location) {
			this.editLocationModalData.id = location.id;
			this.editLocationModalData.name = location.name;
			this.editLocationModalData.address = location.address;
			this.$bvModal.show('edit-location-modal');
		},
		async editLocation(data) {
			this.loaded = false;
			await ky.put('/api/locations', {
				...credentialsOptions,
				json: data
			});

			await this.getLocationsData();
			this.loaded = true;
		},
		showAddLocationModal() {
			this.$bvModal.show('add-location-modal');
		},
		async addLocation(data) {
			this.loaded = false;
			await ky.post('/api/locations', {
				...credentialsOptions,
				json: data
			});

			await this.getLocationsData();
			this.loaded = true;
		},
		showDeleteLocationModal(location) {
			this.deleteLocationModalData.id = location.id;
			this.deleteLocationModalData.name = location.name;
			this.deleteLocationModalData.address = location.address;
			this.$bvModal.show('delete-location-modal');
		},
		async deleteLocation(id) {
			this.loaded = false;
			const data = {id};
			await ky.delete('/api/locations', {
				...credentialsOptions,
				json: data
			});

			await this.getLocationsData();
			this.loaded = true;
		}
	}
};
</script>

<style scoped>
#locations-table button {
	margin: 0 2px;
}
</style>
