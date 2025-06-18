import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'

export interface ColorIndicatorProps {
  colors: string[]
  mergedClsPrefix: string
}

export const colorIndicatorProps = {
  colors: {
    type: Array as PropType<string[]>,
    required: true
  },
  mergedClsPrefix: {
    type: String,
    required: true
  }
} as const

export default defineComponent({
  name: 'ColorIndicator',
  props: colorIndicatorProps,
  setup(props) {
    return () => {
      const { colors, mergedClsPrefix } = props
      return (
        <div class={`${mergedClsPrefix}-heatmap__color-indicator`}>
          <span class={`${mergedClsPrefix}-heatmap__color-indicator-text`}>
            Less
          </span>
          <div class={`${mergedClsPrefix}-heatmap__color-squares`}>
            {colors.map((color, index) => (
              <div
                key={index}
                class={`${mergedClsPrefix}-heatmap__color-square`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span class={`${mergedClsPrefix}-heatmap__color-indicator-text`}>
            More
          </span>
        </div>
      )
    }
  }
})
