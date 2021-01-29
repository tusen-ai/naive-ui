import { defineComponent, h, PropType, provide, reactive, toRef } from 'vue'
import { useMemo } from 'vooks'
import { formatLength, keysOf } from '../../_utils'
import { useStyle } from '../../_mixins'
import style from './styles/index.cssr'

export interface RowInjection {
  gutter: any
  verticalGutter: number
  horizontalGutter: number
}

export const rowProps = {
  gutter: {
    type: [Array, Number, String] as PropType<
    string | number | [number, number]
    >,
    default: 0
  },
  flex: {
    type: Boolean,
    default: false
  },
  alignItems: String,
  justifyContent: String
} as const

export const rowPropKeys = keysOf(rowProps)

export default defineComponent({
  name: 'Row',
  props: rowProps,
  setup (props) {
    useStyle('Grid', style)
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
      return Number(gutter)
    })
    provide<RowInjection>(
      'NRow',
      reactive({
        gutter: toRef(props, 'gutter'),
        verticalGutter: verticalGutterRef,
        horizontalGutter: horizontalGutterRef
      })
    )
    return {
      styleMargin: useMemo(
        () => `0px -${formatLength(horizontalGutterRef.value, { c: 0.5 })}`
      ),
      styleWidth: useMemo(
        () => `calc(100% + ${formatLength(horizontalGutterRef.value)})`
      )
    }
  },
  render () {
    return (
      <div
        class={[
          'n-row',
          {
            'n-row--flex': this.flex
          }
        ]}
        style={{
          margin: this.styleMargin,
          width: this.styleWidth,
          alignItems: this.alignItems,
          justifyContent: this.justifyContent
        }}
      >
        {this.$slots}
      </div>
    )
  }
})
