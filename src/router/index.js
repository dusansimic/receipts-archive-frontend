import Vue from 'vue';
import VueRouter from 'vue-router';
import {BootstrapVue} from 'bootstrap-vue';
import VueMoment from 'vue-moment';
import Home from '../views/Home.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueMoment);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
