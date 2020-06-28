<template>
	<BModal v-bind="attrs" v-on="listeners" @ok="ok()">
		<BForm @submit.prevent @submit="ok()">
			<BFormGroup
				id="locationSelectGroup"
				label="Location:"
				label-for="locationSelect"
				description="Location where receipt was made"
			>
				<BFormSelect
					id="locationSelect"
					v-model="modalFormData.locationId"
					:options="locationsData"
					required
				/>
			</BFormGroup>

			<BFormGroup
				id="dateInputGroup"
				label="Date:"
				label-for="dateInput"
				description="Date of receipt print"
			>
				<BFormDatepicker
					id="dateInput"
					v-model="modalFormData.date"
					:start-weekday="1"
					required
				/>
			</BFormGroup>

			<BFormGroup
				id="timeInputGroup"
				label="Time:"
				label-for="timeInput"
				description="Time of receipt print"
			>
				<BFormTimepicker
					id="timeInput"
					v-model="modalFormData.time"
					:hour12="false"
					locale="de"
					required
				/>
			</BFormGroup>
		</BForm>
	</BModal>
</template>

<script>
export default {
	name: 'EditReceiptModal',
	props: {
		modalFormDataProp: {
			type: Object,
			default: null,
		},
		locationsData: {
			type: Array,
			required: true,
		},
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
				id: null,
				locationId: null,
				date: null,
				time: null,
			};
			return formData;
		},
	},
	methods: {
		ok() {
			this.$emit('ok', this.modalFormData);
			this.modalFormData = {
				id: null,
				locationId: null,
				date: null,
				time: null,
			};
		},
	},
};
</script>
