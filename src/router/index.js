import Vue from 'vue'
import VueRouter from 'vue-router'
import SearchWeather from '../components/searchWeather/SearchWeatherPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: SearchWeather
  },
  {
    path: '/favorites',
    name: 'favorites',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "favorites" */ '../components/favorites/Favorites.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
