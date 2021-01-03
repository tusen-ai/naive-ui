<template>
  <div>
    <slot />
  </div>
</template>

<script>
// private
import { provide, defineComponent } from 'vue'
import commonProps from './common-props'

export default defineComponent({
  name: 'NIconConfigProvider',
  props: {
    ...commonProps
  },
  setup (props) {
    provide('NIconConfigProvider', props)
  }
})
</script>
