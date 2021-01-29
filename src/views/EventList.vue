<template>
  <div>
    <h1>Event Listing</h1>
    <event-card v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventService from '@/services/EventService'
import EventCard from '@/components/EventCard'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  data() {
    return {
      events: []
    }
  },
  created() {
    EventService.getEvents()
      .then(res => {
        this.events = res.data
      })
      .catch(err => {
        console.error('An error occurred', err.response)
      })
  }
}
</script>

<style scoped></style>
