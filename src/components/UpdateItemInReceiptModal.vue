<template>
	<BModal v-bind="attrs" v-on="listeners" @ok="ok()">
		<BForm @submit.prevent @submit="ok()">
			<BFormGroup
				id="amountInputGroup"
				label="Amount:"
				label-for="amountInput"
				description="Amount of specific item"
			>
				<BFormInput
					id="amountInput"
					v-model.number="modalFormData.amount"
					type="number"
					required
					placeholder="1"
				/>
			</BFormGroup>
			<!-- Da li da se omoguci direktno editovanje ili ne? -->
			<!-- <BButton block @click="editItem(editItemInReceiptModalData.formData.id)">
				Edit item
			</BButton> -->
		</BForm>
	</BModal>
</template>

<script>
export default {
	name: 'UpdateItemInReceiptModal',
	props: {
		modalFormDataProp: {
			type: Object,
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
			return this.modalFormDataProp;
		},
	},
	methods: {
		ok() {
			this.$emit('ok', this.modalFormData);
		},
	},
};
</script>
