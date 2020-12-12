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
import { configurable, themeable, withCssr } from '../../_mixins'
import styles from './styles/index.js'

export default {
  name: 'ButtonGroup',
  mixins: [configurable, themeable, withCssr(styles)],
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
      default: undefined
    },
    vertical: {
      type: Boolean,
      default: false
    }
  }
}
</script>
