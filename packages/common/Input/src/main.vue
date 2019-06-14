<template>
  <div
    v-if="type==='textarea'"
    class="n-input"
  >
    <textarea
      class="inner-textarea"
      rows="3"
      :placeholder="placeholder"
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
    >
  </div>
</template>

<script>
export default {
  name: 'NInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    }
  }
}
</script>
