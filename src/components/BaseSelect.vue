<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      @change="updateValue"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <option
        v-for="option in options"
        :selected="option === value"
        :value="option"
        :key="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  inheritAttrs: false,
  props: {
    label: String,
    value: [String, Number],
    options: {
      type: Array,
      required: true
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style scoped></style>
