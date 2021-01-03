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
import { defineComponent } from 'vue'
import { useMemo } from 'vooks'
import { formatLength } from '../../_utils'
import { useTheme } from '../../_mixins'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'Row',
  provide () {
    return {
      NRow: this
    }
  },
  props: {
    ...useTheme.props,
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
  setup (props) {
    useTheme('Grid', 'Grid', style, null, null)
    const verticalGutterRef = useMemo(() => {
      const { gutter } = props
      if (Array.isArray(gutter)) {
        return gutter[1] || 0
      }
      return 0
    })
    const horizontalGutterRef = useMemo(() => {
      const { gutter } = props
      if (Array.isArray(gutter)) {
        return gutter[0]
      }
      return gutter
    })
    return {
      verticalGutter: verticalGutterRef,
      horizontalGutter: horizontalGutterRef,
      styleMargin: useMemo(
        () => `0px -${formatLength(horizontalGutterRef.value, { c: 0.5 })}`
      ),
      styleWidth: useMemo(
        () => `calc(100% + ${formatLength(horizontalGutterRef.value)})`
      )
    }
  }
})
</script>
