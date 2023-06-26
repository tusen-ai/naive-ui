import {
  h,
  defineComponent,
  inject,
  getCurrentInstance,
  type PropType,
  computed
} from 'vue'
import { pxfy } from 'seemly'
import { keysOf } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { gridInjectionKey } from './config'

export const defaultSpan = 1

interface GridItemVNodeProps {
  privateOffset?: number
  privateSpan?: number
  privateColStart?: number
  privateShow?: boolean
}

export const gridItemProps = {
  span: {
    type: [Number, String] as PropType<string | number>,
    default: defaultSpan
  },
  offset: {
    type: [Number, String] as PropType<string | number>,
    default: 0
  },
  suffix: Boolean,
  // private props
  privateOffset: Number,
  privateSpan: Number,
  privateColStart: Number,
  privateShow: {
    type: Boolean,
    default: true
  }
} as const

export const gridItemPropKeys = keysOf(gridItemProps)

export type GridItemProps = ExtractPublicPropTypes<typeof gridItemProps>

export default defineComponent({
  __GRID_ITEM__: true,
  name: 'GridItem',
  alias: ['Gi'],
  props: gridItemProps,
  setup () {
    const {
      isSsrRef,
      xGapRef,
      itemStyleRef,
      overflowRef,
      layoutShiftDisabledRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(gridInjectionKey)!
    const self = getCurrentInstance()
    return {
      overflow: overflowRef,
      itemStyle: itemStyleRef,
      layoutShiftDisabled: layoutShiftDisabledRef,
      mergedXGap: computed(() => {
        return pxfy(xGapRef.value || 0)
      }),
      deriveStyle: () => {
        void isSsrRef.value
        // Here is quite a hack, I hope there is a better way to solve it
        const {
          privateSpan = defaultSpan,
          privateShow = true,
          privateColStart = undefined,
          privateOffset = 0
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        } = self!.vnode.props as GridItemVNodeProps
        const { value: xGap } = xGapRef
        const mergedXGap = pxfy(xGap || 0)
        return {
          display: !privateShow ? 'none' : '',
          gridColumn: `${
            privateColStart ?? `span ${privateSpan}`
          } / span ${privateSpan}`,
          marginLeft: privateOffset
            ? `calc((100% - (${privateSpan} - 1) * ${mergedXGap}) / ${privateSpan} * ${privateOffset} + ${mergedXGap} * ${privateOffset})`
            : ''
        }
      }
    }
  },
  render () {
    if (this.layoutShiftDisabled) {
      const { span, offset, mergedXGap } = this
      return (
        <div
          style={{
            gridColumn: `span ${span} / span ${span}`,
            marginLeft: offset
              ? `calc((100% - (${span} - 1) * ${mergedXGap}) / ${span} * ${offset} + ${mergedXGap} * ${offset})`
              : ''
          }}
        >
          {this.$slots}
        </div>
      )
    }
    return (
      <div style={[this.itemStyle as any, this.deriveStyle()]}>
        {this.$slots.default?.({ overflow: this.overflow })}
      </div>
    )
  }
})
