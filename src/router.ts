import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ProjectPage from '@/views/ProjectPage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/project/:slug', name: 'project', component: ProjectPage },
    {
      path: '/solutions',
      name: 'solutions',
      component: () => import('@/views/SolutionsList.vue')
    },
    {
      path: '/solutions/:path+',
      name: 'solution-detail',
      component: () => import('@/views/SolutionDetail.vue')
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

export default router
