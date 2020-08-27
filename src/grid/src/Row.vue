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
import formatLength from '../../_utils/css/formatLength'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/row.js'

export default {
  provide () {
    return {
      NRow: this
    }
  },
  name: 'Row',
  mixins: [
    usecssr(styles)
  ],
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
      default: null
    },
    justifyContent: {
      type: String,
      default: null
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
      return `0px -${formatLength(this.horizontalGutter, 0.5)}`
    },
    styleWidth () {
      return `calc(100% + ${formatLength(this.horizontalGutter)})`
    }
  }
}
</script>
