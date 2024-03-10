import Title from './components/content/title.vue';
import Registration from './components/content/registration.vue';
import Index from './components/content/index.vue';
import Formdata from './components/content/form.vue';

export default [
	{
		path: '/',
		component:Title,
		name: 'home'
	},
	{
		path: '/register',
		component:Registration,
		name: 'register'
	},
	{
		path: '/listing',
		component:Index,
		name: 'indexdata'
	},
	{
		path: '/data/:id',
		component:Formdata,
		name: 'formdata'
	},
]