import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'HeatmapColorIndicator',
  props: {
    colors: {
      type: Array as PropType<string[]>,
      required: true
    },
    clsPrefix: {
      type: String,
      required: true
    },
    indicatorText: {
      type: Array as unknown as PropType<[string, string]>,
      required: true
    }
  },
  setup(props) {
    return () => {
      const { colors, clsPrefix, indicatorText } = props
      const [lessText, moreText] = indicatorText
      return (
        <div class={`${clsPrefix}-heatmap-color-indicator`}>
          <span class={`${clsPrefix}-heatmap-color-indicator__label`}>
            {lessText}
          </span>
          <div class={`${clsPrefix}-heatmap-color-indicator__cells`}>
            {colors.map((color, index) => (
              <div
                key={index}
                class={`${clsPrefix}-heatmap-color-indicator__cell`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span class={`${clsPrefix}-heatmap-color-indicator__label`}>
            {moreText}
          </span>
        </div>
      )
    }
  }
})
