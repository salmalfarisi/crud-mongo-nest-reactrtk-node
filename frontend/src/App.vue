<template>
  <div id="app">
	<div class="flex justify-center">
		<div class="self-center">
			<img alt="Vue logo" src="./assets/logo.png">
		</div>
	</div>
	<div class="flex justify-center">
		<div class="self-center">
			{{ /* cara panggil font yang bener */ }}
			<h1 class="minecraft-shadow font-minceraft font-['Minecraft'] font-normal text-minceraft-400 text-5xl not-italic font-semibold">
				Simple CRUD with Vue + Vuex
			</h1>
		</div>
	</div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
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
