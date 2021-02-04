<template>
  <div>
    <h1>Event for {{ user.user.name }}</h1>
    <event-card v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page !== 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page</router-link
      >
      |
    </template>
    <template v-if="hasNextPage">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }"
        >Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store'
import EventCard from '@/components/EventCard'

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page || 1)

  store
    .dispatch('event/fetchEvents', {
      page: currentPage
    })
    .then(() => {
      routeTo.params.page = currentPage

      next()
    })
}

export default {
  name: 'EventList',
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },
  computed: {
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.event.perPage
    },
    ...mapState(['event', 'user'])
  }
}
</script>

<style scoped></style>
