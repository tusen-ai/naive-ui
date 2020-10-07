<template>
  <teleport
    :to="mergedTo"
    :disabled="disabled"
  >
    <slot />
  </teleport>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'BaseTeleport',
  props: {
    to: {
      type: [String, Object],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    return {
      mergedTo: computed(() => {
        const { to } = props
        return to ?? 'body'
      })
    }
  }
}
</script>
