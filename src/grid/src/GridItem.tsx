import { h, defineComponent, computed, CSSProperties, inject } from 'vue'
import { pxfy } from 'seemly'
import { gridInjectionKey } from './Grid'
import type { NGridInjection } from './Grid'

export const defaultSpan = 1

export default defineComponent({
  name: 'GridItem',
  props: {
    span: {
      type: [Number, String],
      default: defaultSpan
    },
    offset: {
      type: [Number, String],
      default: 0
    },
    suffix: Boolean,
    // private props
    privateOffset: {
      type: Number,
      default: 0
    },
    privateSpan: {
      type: Number,
      default: defaultSpan
    },
    privateColStart: Number,
    privateShow: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const NGrid = inject(gridInjectionKey, null) as NGridInjection
    return {
      NGrid,
      style: computed<CSSProperties>(() => {
        const {
          privateShow,
          privateColStart,
          privateSpan,
          privateOffset
        } = props
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
      })
    }
  },
  render () {
    return (
      <div
        style={
          ([this.NGrid?.itemStyle, this.style] as unknown) as CSSProperties
        }
      >
        {this.$slots}
      </div>
    )
  }
})
