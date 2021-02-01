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
import { mapState, mapActions } from 'vuex'
import EventCard from '@/components/EventCard'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  created() {
    this.fetchEvents({ perPage: 3, page: this.page })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.perPage
    },
    ...mapState(['event', 'user'])
  },
  methods: mapActions('event', ['fetchEvents'])
}
</script>

<style scoped></style>
