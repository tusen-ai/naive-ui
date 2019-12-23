<template>
  <modal v-model="value"/>
</template>

<script>
import modal from './modal'

export default {
  components: {
    modal
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>