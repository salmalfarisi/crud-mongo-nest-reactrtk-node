import Vue from 'vue';
import VueCookies from 'vue-cookies';
import App from './App.vue';
import VueRouter from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import store from './store/store';
import './styles/app.css';
import './styles/main.css';

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.use(VueRouter);
Vue.use(VueCookies);

const router = new VueRouter({
	routes:routes,
	mode:'history'
});

Vue.use(VueCookies, { expires: '2d'});
window.$cookies.config("2D", "", "localhost");

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
