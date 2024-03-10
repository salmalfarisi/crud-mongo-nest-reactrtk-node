<template>
	<div class="py-5 bg-minceraft-300 mx-5 rounded-xl">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div>
				<div class="hidden md:block">
					<div class="flex justify-center">
						<div>
							<img alt="Vue logo" width="200px" height="200px" src="https://www.cdnlogo.com/logos/m/30/mongodb-icon.svg">
						</div>
						<div>
							<img alt="Vue logo" width="200px" height="200px" src="https://www.cdnlogo.com/logos/n/57/nestjs.svg">
						</div>
						<div>
							<img alt="Vue logo" width="200px" height="200px" src="../../assets/logo.png">
						</div>
						<div>
							<img alt="Vue logo" width="200px" height="200px" src="https://www.cdnlogo.com/logos/n/94/nodejs-icon.svg">
						</div>
					</div>
				</div>
				<div class="px-12 md:px-0 flex justify-center">
					<div class="self-center">
						{{ /* cara panggil font yang bener */ }}
						<h1 class="minecraft-shadow font-minceraft font-['Minecraft'] font-normal text-minceraft-400 text-5xl not-italic font-semibold">
							Simple CRUD with MEVN
						</h1>
					</div>
				</div>
			</div>
			<div class="px-12">
				<h1 class="text-2xl font-bold text-center mb-4">Login</h1>
				<form>
					<div class="mb-4">
						<label for="username" class="block text-sm font-medium mb-2">Username</label>
						<input v-model="username" type="text" id="username" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your username" required>
					</div>
					<div class="inline-block w-100 mb-4">
						<label for="password" class="block text-sm font-medium mb-2">Password</label>
						<input v-model="password"  type="password" id="password" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required>
					</div>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<router-link :to="{ name:'register' }" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign Up</router-link>
						</div>
						<div>
							<button @click.prevent="login()" type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';

	export default{
		name:"Title",
		data()
		{
			return {
				username:'',
				password:''
			}
		},
		methods:
		{
			async login()
			{
				this.$store.dispatch("submitFormLogin", {
					username:this.username,
					password:this.password,
				});
				
				setTimeout(() => {
					let checkuser = this.$store.state.state.user;
					var decodedCookie = decodeURIComponent(document.cookie);
					
					if(checkuser.name != null || checkuser.name != undefined)
					{
						this.$router.push({ name: 'indexdata'});
					}
				}, 1000);
			}
		}
	}
</script>