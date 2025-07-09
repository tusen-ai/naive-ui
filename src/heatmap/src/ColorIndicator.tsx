import type { ExtractPublicPropTypes, PropType } from 'vue'
import { defineComponent, h } from 'vue'

export const colorIndicatorProps = {
  colors: {
    type: Array as PropType<string[]>,
    required: true
  },
  mergedClsPrefix: {
    type: String,
    required: true
  },
  indicatorText: {
    type: Array as unknown as PropType<[string, string]>,
    required: true
  }
} as const

export type ColorIndicatorProps = ExtractPublicPropTypes<
  typeof colorIndicatorProps
>

export default defineComponent({
  name: 'ColorIndicator',
  props: colorIndicatorProps,
  setup(props) {
    return () => {
      const { colors, mergedClsPrefix, indicatorText } = props
      const [lessText, moreText] = indicatorText
      return (
        <div class={`${mergedClsPrefix}-heatmap-color-indicator`}>
          <span class={`${mergedClsPrefix}-heatmap-color-indicator__label`}>
            {lessText}
          </span>
          <div class={`${mergedClsPrefix}-heatmap-color-indicator__cells`}>
            {colors.map((color, index) => (
              <div
                key={index}
                class={`${mergedClsPrefix}-heatmap-color-indicator__cell`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span class={`${mergedClsPrefix}-heatmap-color-indicator__label`}>
            {moreText}
          </span>
        </div>
      )
    }
  }
})
