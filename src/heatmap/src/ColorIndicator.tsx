import type { PropType, SlotsType, VNode } from 'vue'
import { defineComponent, h } from 'vue'

interface HeatmapColorIndicatorSlots {
  'leading-text'?: () => VNode[]
  'trailing-text'?: () => VNode[]
}

export default defineComponent({
  name: 'HeatmapColorIndicator',
  slots: Object as SlotsType<HeatmapColorIndicatorSlots>,
  props: {
    colors: {
      type: Array as PropType<string[]>,
      required: true
    },
    clsPrefix: {
      type: String,
      required: true
    }
  },
  setup(props, { slots }) {
    return () => {
      const { colors, clsPrefix } = props
      return (
        <div class={`${clsPrefix}-heatmap-color-indicator`}>
          <span class={`${clsPrefix}-heatmap-color-indicator__label`}>
            {slots['leading-text']?.()}
          </span>
          <div class={`${clsPrefix}-heatmap-color-indicator__cells`}>
            {colors.map((color: string, index: number) => (
              <div
                key={index}
                class={`${clsPrefix}-heatmap-color-indicator__cell`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span class={`${clsPrefix}-heatmap-color-indicator__label`}>
            {slots['trailing-text']?.()}
          </span>
        </div>
      )
    }
  }
})
