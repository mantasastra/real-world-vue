<template>
  <div class="field">
    <label v-if="label">{{ label }}</label>
    <input :value="value" v-bind="$attrs" v-on="listeners" />
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    label: String,
    value: [String, Number]
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
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
