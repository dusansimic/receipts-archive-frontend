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
			<BNavbarNav>
				<BNavItem href="#">
					Link
				</BNavItem>
				<BNavItem
					href="#"
					disabled
				>
					Disabled
				</BNavItem>
			</BNavbarNav>

			<!-- Right aligned nav items -->
			<BNavbarNav class="ml-auto">
				<BNavForm>
					<BFormInput
						size="sm"
						class="mr-sm-2"
						placeholder="Search"
					/>
					<BButton
						size="sm"
						class="my-2 my-sm-0"
						type="submit"
					>
						Search
					</BButton>
				</BNavForm>

				<BNavItemDropdown
					text="Lang"
					right
				>
					<BDropdownItem href="#">
						EN
					</BDropdownItem>
					<BDropdownItem href="#">
						ES
					</BDropdownItem>
					<BDropdownItem href="#">
						RU
					</BDropdownItem>
					<BDropdownItem href="#">
						FA
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
