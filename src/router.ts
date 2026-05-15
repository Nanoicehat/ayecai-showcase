import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ProjectPage from '@/views/ProjectPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/project/:slug', name: 'project', component: ProjectPage },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router
