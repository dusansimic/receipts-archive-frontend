import Vue from 'vue';
import VueRouter from 'vue-router';
import {BootstrapVue} from 'bootstrap-vue';
import VueMoment from 'vue-moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.min.css';
import Home from '../views/Home';
import Receipt from '../views/Receipt';
import EditReceipt from '../views/EditReceipt';

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueMoment);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/receipt/:id',
		name: 'Receipt',
		component: Receipt
	},
	{
		path: '/edit/receipt/:id',
		name: 'EditReceipt',
		component: EditReceipt
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
