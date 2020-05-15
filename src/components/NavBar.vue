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
					<BDropdownItem to="/manage/locations">
						Locations
					</BDropdownItem>
					<BDropdownItem to="/manage/receipts">
						Receipts
					</BDropdownItem>
					<BDropdownItem to="/manage/items">
						Items
					</BDropdownItem>
				</BNavItemDropdown>

				<BNavItemDropdown right>
					<!-- Using 'button-content' slot -->
					<template #button-content>
						<em>User</em>
					</template>
					<BDropdownItem to="/login">
						Login
					</BDropdownItem>
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
