<template>
  <div>
    <slot />
  </div>
</template>

<script>
// private
import { provide } from 'vue'
import commonProps from './common-props'

export default {
  name: 'NIconConfigProvider',
  props: {
    ...commonProps
  },
  setup (props) {
    provide('NIconConfigProvider', props)
  }
}
</script>
