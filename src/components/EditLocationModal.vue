<template>
	<BModal v-bind="attrs" v-on="listeners" @ok="ok()">
		<BForm @submit.prevent @submit="ok()">
			<BFormGroup
				id="nameInputGroup"
				label="Name:"
				label-for="nameInput"
				description="Name of the location"
			>
				<BFormInput
					id="nameInput"
					v-model="modalFormData.name"
					type="text"
					required
				/>
			</BFormGroup>
			<BFormGroup
				id="addressInputGroup"
				label="Address:"
				label-for="addressInput"
				description="Address of the location"
			>
				<BFormInput
					id="addressInput"
					v-model="modalFormData.address"
					type="text"
					required
				/>
			</BFormGroup>
		</BForm>
	</BModal>
</template>

<script>
export default {
	name: 'EditLocationModal',
	props: {
		modalFormDataProp: {
			type: Object,
			default: null,
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
				name: null,
				address: null,
			};
			return formData;
		},
	},
	methods: {
		ok() {
			this.$emit('ok', this.modalFormData);
		},
	},
};
</script>
