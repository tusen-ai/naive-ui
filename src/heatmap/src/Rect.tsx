import type { PropType, SlotsType, VNode } from 'vue'
import type { PopoverProps } from '../../popover/src/Popover'
import type { HeatmapDataItem } from './public-types'
import { computed, defineComponent, h } from 'vue'
import { resolveSlotWithTypedProps } from '../../_utils'
import Tooltip from '../../tooltip/src/Tooltip'

export interface RectSlots {
  tooltip?: (props: HeatmapDataItem) => VNode[]
}

export default defineComponent({
  name: 'HeatmapRect',
  slots: Object as SlotsType<RectSlots>,
  props: {
    mergedClsPrefix: {
      type: String,
      required: true
    },
    data: {
      type: Object as PropType<HeatmapDataItem>,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    style: Object,
    loading: Boolean,
    loadingClass: String,
    tooltip: {
      type: [Boolean, Object] as PropType<PopoverProps | boolean>,
      default: true
    }
  },
  setup(props) {
    const cssVarsRef = computed(() => ({
      '--n-rect-color': props.color
    }))

    const tooltipPropsRef = computed(() => {
      return typeof props.tooltip === 'object' ? props.tooltip : {}
    })

    const defaultTooltipContentRef = computed(() => {
      const date = new Date(props.data.timestamp).toLocaleDateString()
      return props.data.value !== null ? `${date} ${props.data.value}` : date
    })

    return {
      cssVars: cssVarsRef,
      tooltipProps: tooltipPropsRef,
      defaultTooltipContent: defaultTooltipContentRef
    }
  },
  render() {
    const {
      mergedClsPrefix,
      style,
      cssVars,
      tooltip,
      tooltipProps,
      defaultTooltipContent,
      loading,
      data
    } = this
    const triggerNode = (
      <div
        class={[
          `${mergedClsPrefix}-heatmap-rect`,
          loading && `${mergedClsPrefix}-heatmap-rect--loading`,
          loading && this.loadingClass
        ]}
        style={[cssVars, style]}
      />
    )

    return tooltip === false || loading ? (
      triggerNode
    ) : (
      <Tooltip trigger="hover" {...tooltipProps}>
        {{
          default: () =>
            resolveSlotWithTypedProps(this.$slots.tooltip, data, () => [
              <div>{defaultTooltipContent}</div>
            ]),
          trigger: () => triggerNode
        }}
      </Tooltip>
    )
  }
})
