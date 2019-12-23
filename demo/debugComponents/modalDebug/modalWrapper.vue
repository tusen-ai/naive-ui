<template>
  <modal :is-active="isActive"/>
</template>

<script>
import modal from './modal'

export default {
  components: {
    modal
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  }
}
</script>