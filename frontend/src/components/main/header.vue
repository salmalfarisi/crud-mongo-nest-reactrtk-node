<template>
	<div>
		<nav class="bg-gray-100">
		  <div class="px-4 mx-auto">
			<div class="flex justify-between">
			  <div class="flex py-2 space-x-4">
				<div>
				  <router-link class="flex items-center py-2 px-2 text-gray-700 hover:text-gray-900" :to='{ name:(user.name != null && user.name != undefined ? "indexdata" : "home") }'>
					<img class="h-6 w-6 mr-1" src="https://www.cdnlogo.com/logos/v/40/viper.svg">
					<span class="font-bold">salmalfarisi</span>
				  </router-link>
				</div>
			  </div>

			  <!-- secondary nav -->
			  <div v-if="user.username !== null && user.username !== undefined" class="hidden md:flex items-center space-x-1">
				<div>Hello {{ user.username }}</div>
				<a @click="logout()" class="py-2 px-3 py-2 px-3 bg-blue-400 hover:bg-blue-300 text-blue-900 hover:text-blue-800 rounded transition duration-300">Logout</a>
			  </div>

			  <!-- mobile button goes here -->
			  <div class="md:hidden flex items-center">
				<button class="mobile-menu-button">
				  <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				  </svg>
				</button>
			  </div>

			</div>
		  </div>

		  <!-- mobile menu. belum tau mau kemana ini arah -->
		  <div class="mobile-menu hidden md:hidden">
			<a href="#" class="block py-2 px-4 text-sm hover:bg-gray-200">Logout</a>
		  </div>
		</nav>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	
	export default {
		name:'HeadNavbar',
		computed:
		{
			...mapGetters(
				{
					user:"loadDataUser"
				}
			)
		},
		methods:
		{
			async logout()
			{
				this.$store.dispatch('removeAccount');
				this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie));
				this.$router.push({ name:'home' });
			}
		}
	}
</script>