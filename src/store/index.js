import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'John Wick' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    event: {},
    events: [],
    eventsTotal: 0
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    }
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvent({ commit, getters }, id) {
      const event = getters.getEventById(id)

      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then(res => {
            commit('SET_EVENT', res.data)
          })
          .catch(err => {
            console.error(
              `An error occurred while trying to fetch an event with ID:${id}`,
              {
                error: err.response
              }
            )
          })
      }
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(res => {
          commit('SET_EVENTS_TOTAL', res.headers['x-total-count'])
          commit('SET_EVENTS', res.data)
        })
        .catch(err => {
          console.error('An error occurred while fetching events', {
            error: err.response
          })
        })
    }
  },
  modules: {},
  getters: {
    categoriesLength: state => {
      return state.categories.length
    },
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
