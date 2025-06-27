import type { ExtractPublicPropTypes } from '../../_utils'
import type { PopoverProps } from '../../popover/src/Popover'
import type { RectData, ToolTipData } from './interface'
import { format } from 'date-fns'
import { computed, defineComponent, h, type PropType, type VNode } from 'vue'
import Tooltip from '../../tooltip/src/Tooltip'

export const rectProps = {
  mergedClsPrefix: {
    type: String,
    required: true
  },
  data: {
    type: Object as PropType<RectData>,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  unit: String,
  style: Object,
  loading: {
    type: Boolean,
    default: false
  },
  tooltip: {
    type: [Boolean, Object] as PropType<PopoverProps | boolean>,
    default: true
  },
  tooltipSlot: Function as PropType<(data: ToolTipData) => VNode[]>
} as const

export type RectProps = ExtractPublicPropTypes<typeof rectProps>

export default defineComponent({
  name: 'Rect',
  props: rectProps,
  setup(props) {
    const cssVarsRef = computed(() => ({
      '--n-rect-color': props.color
    }))

    const tooltipPropsRef = computed(() => {
      return typeof props.tooltip === 'object' ? props.tooltip : {}
    })

    const defaultTooltipContentRef = computed(() => {
      return `${props.data.value} ${props.unit ?? ''} ${format(new Date(props.data.date), 'yyyy-MM-dd')}`
    })

    const tooltipContentRef = computed(() => {
      return props.tooltipSlot
        ? props.tooltipSlot({
            date: props.data.date,
            value: props.data.value,
            unit: props.unit
          })
        : defaultTooltipContentRef.value
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
        style={{
          ...cssVars,
          ...style
        }}
      />
    )

    return !tooltip || loading ? (
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
