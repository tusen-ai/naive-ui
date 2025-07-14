import type { PopoverProps } from '../../popover/src/Popover'
import type { HeatmapDataItem, HeatmapTooltipSlotProps } from './public-types'
import { computed, defineComponent, h, type PropType, type VNode } from 'vue'
import Tooltip from '../../tooltip/src/Tooltip'

export default defineComponent({
  name: 'HeatmapRect',
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
    tooltip: {
      type: [Boolean, Object] as PropType<PopoverProps | false>,
      default: true
    },
    tooltipSlot: Function as PropType<
      (props: HeatmapTooltipSlotProps) => VNode[]
    >
  },
  setup(props) {
    const cssVarsRef = computed(() => ({
      '--n-rect-color': props.color
    }))

    const tooltipPropsRef = computed(() => {
      return typeof props.tooltip === 'object' ? props.tooltip : {}
    })

    const tooltipContentRef = computed(() => {
      if (props.tooltipSlot) {
        return props.tooltipSlot({
          timestamp: props.data.timestamp,
          value: props.data.value
        })
      }
      // Default tooltip content
      if (props.data.value !== null) {
        const date = new Date(props.data.timestamp).toLocaleDateString()
        return `${date}: ${props.data.value}`
      }
      return null
    })

    return {
      cssVars: cssVarsRef,
      tooltipProps: tooltipPropsRef,
      tooltipContent: tooltipContentRef
    }
  },
  render() {
    const {
      mergedClsPrefix,
      style,
      cssVars,
      tooltip,
      tooltipProps,
      tooltipContent,
      loading
    } = this

    const triggerNode = (
      <div
        class={[
          `${mergedClsPrefix}-heatmap-rect`,
          loading && `${mergedClsPrefix}-heatmap-rect--loading`
        ]}
        style={[cssVars, style]}
      />
    )

    return tooltip === false || loading ? (
      triggerNode
    ) : (
      <Tooltip trigger="hover" {...tooltipProps}>
        {{
          default: () => tooltipContent,
          trigger: () => triggerNode
        }}
      </Tooltip>
    )
  }
})
