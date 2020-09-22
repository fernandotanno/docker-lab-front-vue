import Vue from 'vue';
import Router from 'vue-router';
// import Home from './components/Home';
import Users from './components/users/Users';
import Login from './components/Login';
// import Logout from './components/Logout';
// import { isSignedIn } from './plugins/auth';
import DashManager from './components/manager/DashManager';
import DashSeller from './components/seller/DashSeller';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login,
			meta: {
				guest: true
			}
		},
		{
			path: '/dashmanager',
			name: 'dashmanager',
			components: DashManager,
			meta: {
				requiresAuth: true,
				access: 'manager'
			},
			// children: [
			// 	{
			// 		path: 'users',
			// 		component: Users
			// 	}
			// ],
		},
		{
			path: '/dashseller',
			name: 'dashseller',
			components: {
				default: DashSeller,
			},
			meta: {
				requiresAuth: true,
				access: 'seller'
			}
		}, 
		{
			path: '/users',
			name: 'users',
			components: {
				default: Users,
				users: Users,
			},
			meta: {
				requiresAuth: true,
				access: 'manager'
			}

		}, {
			path: '*',
			redirect: '/login' //alterar para tela 404
		}
	]
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (localStorage.getItem('token') == null) {
			next({
				path: '/login',
				params: { nextUrl: to.fullPath }
			});
		} else {
			let user = JSON.parse(localStorage.getItem('user'));
			if (to.matched.some((record) => record.meta.access)) {
				if (user.access == 'manager') {
					next({name:'dashmanager'})
					next();
				} else if (user.access == 'seller') {
					next({ name: 'dashseller'})
					next();
				}
			} else {
				next();
			}
		}
	} else if (to.matched.some((record) => record.meta.guest)) {
		if (localStorage.getItem('token') == null) {
			next();
		}
		// else{
		//     next({ name: 'userboard'})
		// }
	} else {
		next();
	}
});

export default router;

