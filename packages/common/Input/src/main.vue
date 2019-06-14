<template>
  <div
    v-if="type==='textarea'"
    class="n-input"
  >
    <textarea
      class="inner-textarea"
      rows="3"
      :placeholder="placeholder"
      :value="value"
      @input="handleInput"
    />
  </div>
  <div
    v-else
    class="n-input"
  >
    <input
      type="text"
      class="inner-input"
      placeholder="placeholder"
      :value="value"
      @input="handleInput"
    >
  </div>
</template>

<script>
export default {
  name: 'NInput',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInput (e) {
      console.log(e.target.value)
      this.$emit('change', e.target.value)
    }
  }
}
</script>
