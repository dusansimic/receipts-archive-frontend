<template>
	<BModal v-bind="attrs" v-on="listeners" @ok="ok()">
		<BForm @submit.prevent @submit="ok()">
			<BFormGroup
				id="nameInputGroup"
				label="Name:"
				label-for="nameInput"
				description="Name of the item"
			>
				<BFormInput
					id="nameInput"
					v-model="modalFormData.name"
					type="text"
					required
				/>
			</BFormGroup>

			<BFormGroup
				id="priceInputGroup"
				label="Price:"
				label-for="priceInput"
				description="Price of the item per unit"
			>
				<BFormInput
					id="priceInput"
					v-model.number="modalFormData.price"
					type="number"
					required
				/>
			</BFormGroup>

			<BFormGroup
				id="unitInputGroup"
				label="Unit:"
				label-for="unitInput"
				description="Unit of the item"
			>
				<BFormInput
					id="unitInput"
					v-model.number="modalFormData.unit"
					type="text"
					required
				/>
			</BFormGroup>
		</BForm>
	</BModal>
</template>

<script>
export default {
	name: 'EditItemModal',
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
				price: null,
				unit: null,
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
