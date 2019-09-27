import Vue from 'vue'
import Router from 'vue-router'
import NeoSearch from './views/NeoSearch.vue'
import ApodSearch from './views/ApodSearch.vue'
import MarsWeather from './views/MarsWeather.vue'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/neosearch',
      name: 'neosearch',
      component: NeoSearch,
    },
    {
      path: '/apod',
      name: 'apod',
      component: ApodSearch,
    },
    {
      path: '/weather',
      name: 'weather',
      component: MarsWeather,
    },
  ],
})
