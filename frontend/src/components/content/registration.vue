<template>
	<div class="flex items-center justify-center">
		<div class="border-2 w-1/2 shadow-md rounded-lg px-8 py-6 max-w-md">
			<h1 class="text-2xl font-bold text-center mb-4">Sign Up</h1>
			<form>
				<div class="mb-4">
					<label for="name" class="block text-sm font-medium mb-2">Name</label>
					<input v-model="data.name" type="text" id="name" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your name" required>
					<small v-for="(showError, index) in error.name" :key="index" class="text-red-500">
						<li>{{ showError }}</li>
					</small>
				</div>
				<div class="mb-4">
					<label for="username" class="block text-sm font-medium mb-2">Username</label>
					<input v-model="data.username" type="text" id="username" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your username" required>
					<small v-for="(showError, index) in error.username" :key="index" class="text-red-500">
						<li>{{ showError }}</li>
					</small>
				</div>
				<div class="mb-4">
					<label for="email" class="block text-sm font-medium mb-2">Email Address</label>
					<input v-model="data.email" type="email" id="email" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required>
					<small v-for="(showError, index) in error.email" :key="index" class="text-red-500">
						<li>{{ showError }}</li>
					</small>
				</div>
				<div class="inline-block w-100 mb-4">
					<label for="password" class="block text-sm font-medium mb-2">Password</label>
					<input v-model="data.password"  type="password" id="password" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required>
					<small v-for="(showError, index) in error.password" :key="index" class="text-red-500">
						<li>{{ showError }}</li>
					</small>
				</div>
				<div class="mb-4">
					<label for="Rpassword" class="block text-sm font-medium mb-2">Repeat Password</label>
					<input v-model="data.Rpassword" type="password" id="Rpassword" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password again" required>
					<small v-html="error.Rpassword" class="text-red-500"></small>
				</div>
				<button @click.prevent="registration()" type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign Up</button>
				<div class="relative mb-4">
				  <div class="absolute inset-y-0 right-0">
					<router-link class="right-0" :to="{ name:'home' }">Already have an account ? Login</router-link>
				  </div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default{
		name:"Registration",
		computed:
		{
			...mapGetters(
				{
					data:"getUserRegistration",
					error:"getErrorUserRegistration"
				},
			)
		},
		methods:
		{
			async registration()
			{
				this.error.name = [];
				this.error.username = [];
				this.error.email = [];
				this.error.password = [];
				this.error.Rpassword = '';
				
				if(this.data.password != this.data.Rpassword)
				{
					this.error.Rpassword = "<li>Password and Repeat Password must match</li>";
				}
				else if(this.data.Rpassword == '')
				{
					this.error.Rpassword = "<li>Repeat Password should not be empty</li>";
				}
				else
				{
					this.$store.dispatch('submitFormRegis', this.data);
					setTimeout(() => {
						var setresult = true;
						let checkerror = this.error;
						for (const [key, value] of Object.entries(checkerror)) {
							if(value.length != 0)
							{
								setresult = false;
							}
						}
						
						if(setresult == true)
						{
							alert('Successfully create account!!');
							this.$router.push('home');
						}
					}, 1000);
				}
			}
		}
	}
</script>