<template>
  <div
    class="n-button-group"
    :class="{
      'n-button-group--vertical': vertical
    }"
  >
    <slot />
  </div>
</template>

<script>
import usecssr from '../../_mixins/usecssr'
import styles from './styles/index.js'

export default {
  name: 'NButtonGroup',
  mixins: [
    usecssr(styles)
  ],
  provide () {
    return {
      NButtonGroup: this
    }
  },
  props: {
    size: {
      validator (value) {
        return ['tiny', 'small', 'medium', 'large'].includes(value)
      },
      default: null
    },
    vertical: {
      type: Boolean,
      default: false
    }
  }
}
</script>
