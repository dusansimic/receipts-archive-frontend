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
				<BNavItemDropdown right>
					<template #button-content>
						Manage 📝
					</template>

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
						User 👶🏻
					</template>

					<BDropdownItem to="/login">
						Login
					</BDropdownItem>

					<BDropdownItem @click="onSignOutButtonClick()">
						Sign Out
					</BDropdownItem>
				</BNavItemDropdown>
			</BNavbarNav>
		</BCollapse>
	</BNavbar>
</template>

<script>
import ky from 'ky';
import {credentialsOptions, prefixApiOptions} from '../common';

export default {
	name: 'NavBar',
	methods: {
		async onSignOutButtonClick() {
			await ky.get('auth/logout', {
				...credentialsOptions,
				...prefixApiOptions,
			});
			this.$router.push({name: 'Login'});
		},
	},
};
</script>
