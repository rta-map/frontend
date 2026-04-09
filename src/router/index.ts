import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
const About = () => import('@/views/About.vue')

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: '/', name: "home", component: Home },
		{ path: '/about', name: "about", component: About },
		{ path: '/:pathMatch(.*)*', redirect: { name: 'home' } }
	],
})

export default router
