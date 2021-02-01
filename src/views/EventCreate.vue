<template>
  <div>
    <form @submit.prevent="createEvent">
      <label for="category">Select a category</label>
      <select name="category" id="category" v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>

      <h3>Name & description of your event</h3>
      <div class="field">
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          v-model="event.title"
          placeholder="Add an event title"
        />
      </div>
      <div class="field">
        <label for="description">Description</label>
        <input
          type="text"
          id="description"
          v-model="event.description"
          placeholder="Add a description"
        />
      </div>

      <h3>Where is your event held?</h3>
      <div class="field">
        <label for="location">Location</label>
        <input
          type="text"
          id="location"
          v-model="event.location"
          placeholder="Add a location"
        />
      </div>

      <h3>When is your event starting?</h3>
      <div class="field">
        <label for="date">Date</label>
        <datepicker
          id="date"
          v-model="event.date"
          placeholder="Select a date"
        />
      </div>
      <div class="field">
        <label for="time">Select a time</label>
        <select name="time" id="time" v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>

      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'EventCreate',
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }

    return {
      event: this.createFreshEventObject(),
      categories: this.$store.state.categories,
      times
    }
  },
  methods: {
    createFreshEventObject() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)

      return {
        id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    },
    createEvent() {
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })

          this.event = this.createFreshEventObject()
        })
        .catch(err => {
          console.error('An error occurred while creating an event', {
            error: err.response
          })
        })
    }
  }
}
</script>

<style scoped></style>
