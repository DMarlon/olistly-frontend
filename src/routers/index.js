import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Links from '../views/Links.vue'
import Detail from '../views/Detail.vue'
import Shortened from '../views/Shortened.vue'
import ConfirmUser from '../views/ConfirmUser.vue'
import Session from '../views/Session.vue'
import cookies from "@/utilitaries/cookies"

Vue.use(VueRouter)

const routes = [
	{
		name: 'home',
		path: '/',    
		component: Home,
		meta: {
			auth: true
		},
	},
	{
		name: 'links',
		path: '/links',    
		component: Links,
		meta: {
			auth: true
		}
	},
	{
		name: 'login',
		path: '/login',    
		component: Login,
		meta: {
			auth: false
		}
	},
	{
		name: "confirmUser",
		path: "/ativar/:userHash([A-F0-9]{40})",
		component: ConfirmUser,
		meta: {
			auth: false
		}
	},
	{
		name: "sessions",
		path: "/sessoes",
		component: Session,
		meta: {
			auth: false
		}
	},
	{
		name: "shortened",
		path: "/:shortenedHash([A-F0-9]{40})",
		component: Shortened,
		meta: {
			auth: false
		}
	},
	{
        name: "detail",
		path: "/:urlId(\\d+)/detail",
        component: Detail,
        meta: {
            auth: true
        }
    }
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
if (to.matched.some(record => record.meta.auth)) {
	const token = cookies.getJWTCookie();
	if (token)
		next();
	else
		next({ name: "login" });
}
else
	next();
});

export default router
