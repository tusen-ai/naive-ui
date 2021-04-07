import {
  h,
  defineComponent,
  CSSProperties,
  inject,
  renderSlot,
  getCurrentInstance,
  PropType
} from 'vue'
import { pxfy } from 'seemly'
import { gridInjectionKey } from './Grid'
import type { NGridInjection } from './Grid'
import { keysOf } from '../../_utils'

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

export default defineComponent({
  __GRID_ITEM__: true,
  name: 'GridItem',
  alias: ['Gi'],
  props: gridItemProps,
  setup (props) {
    const NGrid = inject(gridInjectionKey, null) as NGridInjection
    const self = getCurrentInstance()
    return {
      NGrid,
      deriveStyle: () => {
        // Here is quite a hack, I hope there is a better way to solve it
        const {
          privateSpan = defaultSpan,
          privateShow = true,
          privateColStart = undefined,
          privateOffset = 0
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        } = self!.vnode.props as GridItemVNodeProps
        const { xGap } = NGrid
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
    return (
      <div
        style={
          ([
            this.NGrid?.itemStyle,
            this.deriveStyle()
          ] as unknown) as CSSProperties
        }
      >
        {renderSlot(this.$slots, 'default', { overflow: this.NGrid.overflow })}
      </div>
    )
  }
})
