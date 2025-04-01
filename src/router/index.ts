import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Country from '../components/Country.vue'

// console.log("Router initialized");
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/country/:name', component: Country }, 
    ],
})

export default router