<template>
  <div>
    <h1>Event Listing</h1>
    <event-card />
    <p>
      <router-link :to="{ name: 'event-show', params: { id: '1' } }"
        >First Event</router-link
      >
    </p>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard'

export default {
  name: 'EventList',
  components: {
    EventCard
  }
}
</script>

<style scoped></style>
