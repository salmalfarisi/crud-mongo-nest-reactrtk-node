import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state:
	{
		dummy:
		[
			{
				title:"bootstrap",
				image:"https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg",
				price:10,
				description:"KMZWAY87AA"
			},
			{
				title:"vue",
				image:"https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",
				price:20,
				description:"AEZAKMI"
			},
			{
				title:"npm",
				image:"https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg",
				price:100,
				description:"HESOYAM"
			}
		]
	},
	getters:
	{
		getDataById: (state) => (data) =>
		{
			let result = state.dummy.find((loop) => loop.title == data);
			return result;
		}
	},
	mutations:
	{
		
	},
	actions:
	{
		
	},
});