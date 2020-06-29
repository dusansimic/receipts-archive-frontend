<template>
	<div>
		<h2>Home</h2>
		<BCardGroup deck>
			<BCard bg-variant="light" header="Locations" class="text-center">
				<BCardText>
					Edit locations for receipts.
				</BCardText>
				<BButton to="/manage/locations">
					Manage locations
				</BButton>
			</BCard>

			<BCard bg-variant="light" header="Receipts" class="text-center">
				<BCardText>
					Edit all the receipts.
				</BCardText>
				<BButton to="/manage/receipts">
					Manage receipts
				</BButton>
			</BCard>

			<BCard bg-variant="light" header="Items" class="text-center">
				<BCardText>
					Edit items that can be used in receipts.
				</BCardText>
				<BButton to="/manage/items">
					Manage items
				</BButton>
			</BCard>
		</BCardGroup>
	</div>
</template>

<script>
export default {
	name: 'Home',
};
</script>
