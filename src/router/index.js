import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import EventList from '@/views/EventList'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: () =>
      import(/* webpackChunkName: "eventCreate" */ '@/views/EventCreate')
  },
  {
    path: '/event/:id',
    name: 'event-show',
    props: true,
    component: () =>
      import(/* webpackChunkName: "eventShow" */ '@/views/EventShow'),
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('event/fetchEvent', routeTo.params.id).then(() => {
        next()
      })
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
