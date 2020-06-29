<template>
	<div>
		<BCardGroup deck>
			<BCard bg-variant="light" class="text-center">
				<BCardBody>
					<BCardTitle>
						Locations
					</BCardTitle>

					<BCardText>
						Locations are places where receipts are created. That could be a grocery store or car
						wash.
					</BCardText>

					<BButton to="/manage/locations">
						Manage locations
					</BButton>
				</BCardBody>
			</BCard>

			<BCard bg-variant="light" class="text-center">
				<BCardBody>
					<BCardTitle>
						Recipts
					</BCardTitle>

					<BCardText>
						Receipts is a list of things that you paid for. It could be a store receipts or a taxes
						bill.
					</BCardText>

					<BButton to="/manage/receipts">
						Manage receipts
					</BButton>
				</BCardBody>
			</BCard>

			<BCard bg-variant="light" class="text-center">
				<BCardBody>
					<BCardTitle>
						Items
					</BCardTitle>

					<BCardText>
						Items are things that you add to receipts. They're usefull because you don't need to
						write all info about something that you paid for, just save it as an item and reference
						it in future receipts.
					</BCardText>

					<BButton to="/manage/items">
						Manage items
					</BButton>
				</BCardBody>
			</BCard>
		</BCardGroup>
	</div>
</template>

<script>
export default {
	name: 'Home',
};
</script>
