<template>
	<div class="px-5 py-3">
		<div class="h1">
			{{ (data._id != '' && data._id != undefined ? 'Edit data' : 'New data') }}
		</div>
	
		<div class="w-full shadow bg-white rounded">
			<div class="p-4 border-gray-200 w-full rounded bg-white">
				<form>
					<div class="grid grid-cols-4 gap-4 mb-4">
						<div class="grid grid-cols-1 place-items-start">
							<label for="title" class="block text-xl font-medium mb-2">Title</label>
						</div>
						<div class="col-span-3">
							<input v-model="data.title" type="text" id="title" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required>
							<small v-for="(showError, index) in error.title" :key="index" class="text-red-500">
								<li>{{ showError }}</li>
							</small>
						</div>
					</div>
					<div class="grid grid-cols-4 gap-4 mb-4">
						<div>
							<label for="description" class="block text-xl font-medium mb-2">Description</label>
						</div>
						<div class="col-span-3">
							<textarea v-model="data.description" type="text" id="description" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" rows="5" required></textarea>
							<small v-for="(showError, index) in error.description" :key="index" class="text-red-500">
								<li>{{ showError }}</li>
							</small>
						</div>
					</div>
					<div class="flex justify-between">
						<div class="pt-2">
							<router-link :to="{ name:'indexdata' }" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</router-link>
						</div>
						<div>
							<button @click.prevent="submitData()" type="submit" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{{ (data._id != '' && data._id != undefined ? 'Update' : 'Create') }}</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'; 

	export default {
		name:"Formdata",
		computed:
		{
			...mapGetters(
				{
					data:'getCRUD',
					error:'getErrorCRUD'
				}
			)
		},
		mounted()
		{
			this.loaddata()
		},
		methods:
		{
			async loaddata()
			{
				let id = `${this.$route.params.id}`;
				
				if(id == 'new')
				{
					this.$store.dispatch('resetCRUD');
				}
				else
				{
					this.$store.dispatch('getCRUDdataByID', id);
				}
			},
			async submitData()
			{
				this.error.title = [];
				this.error.description = [];
				let typeform = (this.data._id != '' && this.data._id != undefined ? 'update' : 'create');
				
				this.$store.dispatch('submitCRUD', this.data);
				
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
						if(typeform == 'create')
						{
							alert('Successfully create data!!');							
						}
						else
						{
							alert('Successfully update data!!');							
						}
						this.$router.push({ name: 'indexdata' });
					}
				}, 1000);
			}
		}
	}
</script>