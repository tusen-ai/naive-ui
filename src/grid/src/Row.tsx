import {
  defineComponent,
  h,
  renderSlot,
  PropType,
  provide,
  reactive,
  toRef
} from 'vue'
import { useMemo } from 'vooks'
import { formatLength } from '../../_utils'
import { useStyle } from '../../_mixins'
import style from './styles/index.cssr.js'

export interface RowInjection {
  gutter: any
  verticalGutter: number
  horizontalGutter: number
}

export default defineComponent({
  name: 'Row',
  props: {
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
        {renderSlot(this.$slots, 'default')}
      </div>
    )
  }
})
