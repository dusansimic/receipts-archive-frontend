<template>
	<BNavbar
		toggleable="md"
		type="light"
		variant="ligth"
	>
		<BNavbarBrand :to="{name: 'Home'}">
			Receipts Archive
		</BNavbarBrand>

		<BNavbarToggle target="nav-collapse" />

		<BCollapse
			id="nav-collapse"
			is-nav
		>
			<!-- Right aligned nav items -->
			<BNavbarNav class="ml-auto">
				<BNavItemDropdown
					text="Manage"
					right
				>
					<BDropdownItem href="#">
						Locations
					</BDropdownItem>
					<BDropdownItem href="#">
						Receipts
					</BDropdownItem>
					<BDropdownItem href="#">
						Items
					</BDropdownItem>
				</BNavItemDropdown>

				<BNavItemDropdown right>
					<!-- Using 'button-content' slot -->
					<template #button-content>
						<em>User</em>
					</template>
					<BDropdownItem href="#">
						Profile
					</BDropdownItem>
					<BDropdownItem href="#">
						Sign Out
					</BDropdownItem>
				</BNavItemDropdown>
			</BNavbarNav>
		</BCollapse>
	</BNavbar>
</template>

<script>
export default {
	name: 'NavBar'
};
</script>
