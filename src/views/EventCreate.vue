<template>
  <div>
    <form @submit.prevent="createEvent">
      <base-select
        label="Select a category"
        v-model="event.category"
        :options="categories"
      />

      <h3>Name & description of your event</h3>
      <base-input
        label="Title"
        type="text"
        placeholder="Add an event title"
        v-model="event.title"
        class="field"
      />
      <base-input
        label="Description"
        type="text"
        placeholder="Add a description"
        v-model="event.description"
        class="field"
      />

      <h3>Where is your event held?</h3>
      <base-input
        label="Location"
        type="text"
        placeholder="Add a location"
        v-model="event.location"
        class="field"
      />

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
import NProgress from 'nprogress'

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
      NProgress.start()

      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })

          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          NProgress.done()
        })
    }
  }
}
</script>

<style scoped></style>
