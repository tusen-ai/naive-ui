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
import { useTheme } from '../../_mixins'
import style from './styles/button-group/index.cssr.js'

export default {
  name: 'ButtonGroup',
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
  },
  setup (props) {
    useTheme('Button', 'ButtonGroup', style, undefined, props)
  }
}
</script>
