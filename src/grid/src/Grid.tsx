import { h, defineComponent, computed, CSSProperties } from 'vue'
import { pxfy } from 'seemly'

export default defineComponent({
  name: 'Grid',
  props: {
    cols: {
      type: Number,
      default: 24
    },
    xGap: {
      type: Number,
      default: 0
    },
    yGap: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    return {
      gridStyle: computed<CSSProperties>(() => {
        const { cols, xGap, yGap } = props
        return {
          display: 'flex',
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          columnGap: pxfy(xGap),
          rowGap: pxfy(yGap)
        }
      })
    }
  },
  render () {
    return <div class="n-grid">{this.$slots}</div>
  }
})
