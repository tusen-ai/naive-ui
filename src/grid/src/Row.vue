<template>
  <div
    class="n-row"
    :class="{
      'n-row--flex': flex
    }"
    :style="{
      margin: styleMargin,
      width: styleWidth,
      alignItems: alignItems,
      justifyContent: justifyContent
    }"
  >
    <slot />
  </div>
</template>

<script>
import { formatLength } from '../../_utils'
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import styles from './styles'

export default {
  name: 'Row',
  cssrName: 'Grid',
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
  ],
  provide () {
    return {
      NRow: this
    }
  },
  props: {
    gutter: {
      type: [Array, Number, String],
      default: 0
    },
    flex: {
      type: Boolean,
      default: false
    },
    alignItems: {
      type: String,
      default: undefined
    },
    justifyContent: {
      type: String,
      default: undefined
    }
  },
  computed: {
    verticalGutter () {
      const gutter = this.gutter
      if (Array.isArray(gutter)) {
        return gutter[1] || 0
      }
      return 0
    },
    horizontalGutter () {
      const gutter = this.gutter
      if (Array.isArray(gutter)) {
        return gutter[0]
      }
      return gutter
    },
    styleMargin () {
      return `0px -${formatLength(this.horizontalGutter, { c: 0.5 })}`
    },
    styleWidth () {
      return `calc(100% + ${formatLength(this.horizontalGutter)})`
    }
  }
}
</script>
