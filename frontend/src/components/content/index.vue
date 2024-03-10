<template>
	<div class="px-5 py-3">
		<div class="flex justify-between">
			<div class="h1">
				List Data
			</div>
			<div>
				<router-link :to="{ name:'formdata', params : { id:'new' } }" class="w-full flex justify-center py-1 px-4 border border-transparent rounded-md shadow-sm text-2xl font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create</router-link>
			</div>
		</div>
		
		<div class="w-full shadow bg-white rounded">
		  <div class="border-gray-200 w-full rounded bg-white overflow-x-auto">
			<table class="w-full leading-normal ">
			  <thead
				class="text-gray-600 text-xs font-semibold border-gray tracking-wider px-5 py-3 bg-gray-100 hover:cursor-pointer uppercase border-b-2 border-gray-200">
				<tr class="border-b border-gray">
				  <th scope="col"
					class="text-gray-dark border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
					No
				  </th>
				  <th scope="col"
					class="text-gray-dark border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
					Title
				  </th>
				  <th scope="col"
					class="text-gray-dark border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
					Description
				  </th>
				  <th scope="col"
					class="flex justify-center text-gray-dark border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider">
					Option
				  </th>
				</tr>
			  </thead>
			  <tbody v-for="(result, loop) in data" :key="loop">
				<tr class="hover:bg-gray-100 hover:cursor-pointer">
				  <td class="w-10 py-4 px-6 border-b border-gray-200 text-gray-900 text-sm ">
					{{ loop + 1 }}
				  </td>
				  <td class="w-24 py-4 px-6 border-b border-gray-200 text-gray-900 text-sm ">
					<span>{{ result.title }}</span>
				  </td>
				  <td class="w-52 py-4 px-6 border-b border-gray-200 text-gray-900 text-sm ">
					<span>{{ result.description }}</span>
				  </td>
				  <td class="w-20 py-4 px-6 border-b border-gray-200 text-gray-900 text-sm ">
					<div class="flex justify-center gap-4">
						<div>
							<router-link :to="{ name:'formdata', params : { id:result._id } }" class="w-full flex justify-center py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Edit</router-link>
						</div>
						<div>
							<button @click.prevent="hapus(result._id)" type="submit" class="w-full flex justify-center py-1 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Delete</button>
						</div>
					</div>
				  </td>
				</tr>
			  </tbody>
			</table>
		  </div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name:"Index",
		computed:
		{
			...mapGetters(
				{
					data:"loadIndexData"					
				}
			)
		},
		mounted()
		{
			this.loadData();
		},
		methods:
		{
			async loadData()
			{
				//gak tau napa. functionnya gak ke arah sini
				this.$store.dispatch('loadCRUDDATA');
			},
			async hapus(id)
			{
				if (confirm("Are you sure want to delete this data ?") == true) 
				{
					this.$store.dispatch('deleteData', id);
				}
			}
		}
	}
</script>