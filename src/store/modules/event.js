import EventService from '@/services/EventService'

export const state = {
  event: {},
  events: [],
  eventsTotal: 0
}

export const mutations = {
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
}

export const actions = {
  createEvent({ commit, rootState }, event) {
    EventService.postEvent(event).then(() => {
      console.log('User creating the event is', rootState.user.user.name)
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
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}
