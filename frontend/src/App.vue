<template>
  <div>
	<HeadNavbar/>
	<div class="py-3">
		<router-view></router-view>
	</div>
  </div>
</template>

<script>
import HelloWorld from './components/content/HelloWorld.vue';
import Title from './components/content/title.vue';
import HeadNavbar from './components/main/header.vue';

export default {
	name: 'App',
	components: 
	{
		HelloWorld,
		HeadNavbar,
		Title
	},
	mounted()
	{
		this.tes();
	},
	methods:
	{
		async tes()
		{
			var decodedCookie = decodeURIComponent(document.cookie);
			var hapusspasi = decodedCookie.replaceAll(" ", "");
			var ca = hapusspasi.split(';');
			var token = null;
			for (var i = 0; i < ca.length; i++)
			{
				var pecah = ca[i].split("=");
				if(pecah.length != 0)
				{
					if(pecah[0] == 'token')
					{
						token = 'Bearer ' + pecah[1];
						break;
					}
				}
			}
			
			if(token != null)
			{
				this.$store.dispatch("checkUserExist")
				
				setTimeout(() => {
					let checkuser = this.$store.state.state.user;
					
					if(checkuser.name != null || checkuser.name != undefined)
					{
						let current = this.$router.currentRoute;
						if(current.name == "home" || current.name == "register")
						{
							this.$router.push({ name: 'indexdata'});
						}
						else
						{
							this.$router.push(-1);
						}
					}
				}, 1000);
			}
			
			this.$router.push({ name:'home' });
		}
	}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
