import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import HomeView from '../views/HomeView.vue'
import Data from '../views/Menu/Data.vue'
import Graphique from '../views/Menu/Graphique.vue'
import Login from '../views/Auth/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/apercu',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },

    {
      path: '/donnee',
      name: 'data',
      component: Data,
      meta: { requiresAuth: true }
    },
    {
      path: '/graphique',
      name: 'graphique',
      component: Graphique,
      meta: { requiresAuth: true }
    },
 
    {
      path: '/',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (!requiresAuth) {
    next()
    return
  }

  const auth = getAuth()
  // Convertir onAuthStateChanged en une promesse pour attendre la vérification de l'état d'authentification
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(next())
      } else {
        resolve(next('/'))
      }
    })
  })
})

export default router
