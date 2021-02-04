import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import store from '@/store'
import EventList from '@/views/EventList'
import NotFound from '@/views/NotFound'
import NetworkIssue from '@/components/NetworkIssue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    props: true,
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
      store
        .dispatch('event/fetchEvent', routeTo.params.id)
        .then(event => {
          routeTo.params.event = event
          next()
        })
        .catch(err => {
          if (err.response && err.response.status === 404) {
            next({ name: '404', params: { resource: 'event' } })
          } else {
            next({ name: 'network-issue' })
          }
        })
    }
  },
  {
    path: '/404',
    name: '404',
    props: true,
    component: NotFound
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path: '*',
    redirect: { name: '404', params: { resource: 'page' } }
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
