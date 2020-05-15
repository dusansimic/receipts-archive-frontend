<template>
	<BModal
		ok-variant="danger"
		ok-title="Delete"
		v-bind="attrs"
		v-on="listeners"
		@ok="ok()"
	>
		You're about to delete a {{ targetType }} {{ targetDescription }}.
	</BModal>
</template>

<script>
export default {
	name: 'DeleteModal',
	inheritAttrs: false,
	props: {
		targetType: {
			type: String,
			default: null
		},
		targetDescription: {
			type: String,
			default: null
		},
		targetId: {
			type: String,
			default: null
		}
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
			const {
				okVariant,
				okTitle,
				...attrs
			} = this.$attrs;
			return attrs;
		}
	},
	methods: {
		ok() {
			this.$emit('ok', this.targetId);
		}
	}
};
</script>
