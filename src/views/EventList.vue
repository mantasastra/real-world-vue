<template>
  <div>
    <h1>Event Listing</h1>
    <event-card />
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
