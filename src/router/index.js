import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '@/views/EventList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList
  },
  {
    path: '/event',
    name: 'event-show',
    component: () =>
      import(/* webpackChunkName: "eventShow" */ '../views/EventShow')
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: () =>
      import(/* webpackChunkName: "eventCreate" */ '../views/EventCreate')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
