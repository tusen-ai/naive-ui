import { defineComponent, h, PropType, computed, CSSProperties } from 'vue'
import { formatLength } from '../../_utils'
import { NBaseIcon } from '../../_internal'
import {
  WarningIcon,
  InfoIcon as InfoCircleIcon,
  ErrorIcon as ErrorCircleIcon,
  SuccessIcon as SuccessCircleIcon
} from '../../_internal/icons'
import { Status } from './interface'

const iconMap = {
  success: <SuccessCircleIcon />,
  error: <ErrorCircleIcon />,
  warning: <WarningIcon />,
  info: <InfoCircleIcon />
}

export default defineComponent({
  name: 'ProgressLine',
  props: {
    percentage: {
      type: Number,
      required: true
    },
    railColor: String,
    railStyle: [String, Object] as PropType<string | CSSProperties>,
    fillColor: String,
    status: {
      type: String as PropType<Status>,
      required: true
    },
    indicatorPlacement: {
      type: String as PropType<'inside' | 'outside'>,
      required: true
    },
    indicatorTextColor: String,
    unit: String,
    processing: {
      type: Boolean,
      required: true
    },
    showIndicator: {
      type: Boolean,
      required: true
    },
    height: [String, Number],
    railBorderRadius: [String, Number],
    fillBorderRadius: [String, Number]
  },
  setup (props, { slots }) {
    const styleHeightRef = computed(() => {
      return formatLength(props.height)
    })
    const styleRailBorderRadiusRef = computed(() => {
      if (props.railBorderRadius !== undefined) {
        return formatLength(props.railBorderRadius)
      }
      if (props.height !== undefined) {
        return formatLength(props.height, { c: 0.5 })
      }
      return ''
    })
    const styleFillBorderRadiusRef = computed(() => {
      if (props.fillBorderRadius !== undefined) {
        return formatLength(props.fillBorderRadius)
      }
      if (props.railBorderRadius !== undefined) {
        return formatLength(props.railBorderRadius)
      }
      if (props.height !== undefined) {
        return formatLength(props.height, { c: 0.5 })
      }
      return ''
    })
    return () => {
      const {
        indicatorPlacement,
        railColor,
        railStyle,
        percentage,
        unit,
        indicatorTextColor,
        status,
        showIndicator,
        fillColor,
        processing
      } = props
      return (
        <div class="n-progress-content">
          <div class="n-progress-graph">
            <div
              class={[
                'n-progress-graph-line',
                {
                  [`n-progress-graph-line--indicator-${indicatorPlacement}`]: true
                }
              ]}
            >
              <div
                class="n-progress-graph-line-rail"
                style={
                  [
                    {
                      backgroundColor: railColor,
                      height: styleHeightRef.value,
                      borderRadius: styleRailBorderRadiusRef.value
                    },
                    railStyle
                  ] as any
                }
              >
                <div
                  class={[
                    'n-progress-graph-line-fill',
                    {
                      'n-progress-graph-line-fill--processing': processing
                    }
                  ]}
                  style={{
                    maxWidth: `${props.percentage}%`,
                    backgroundColor: fillColor,
                    height: styleHeightRef.value,
                    borderRadius: styleFillBorderRadiusRef.value
                  }}
                >
                  {indicatorPlacement === 'inside' ? (
                    <div class="n-progress-graph-line-indicator">
                      {`${percentage}${unit || ''}`}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          {showIndicator && indicatorPlacement === 'outside' ? (
            <div>
              {slots.default ? (
                <div
                  class="n-progress-custom-content"
                  style={{
                    color: indicatorTextColor
                  }}
                >
                  {slots.default()}
                </div>
              ) : status === 'default' ? (
                <div
                  class="n-progress-icon n-progress-icon--as-text"
                  style={{
                    color: indicatorTextColor
                  }}
                >
                  {percentage}
                  {unit}
                </div>
              ) : (
                <div class="n-progress-icon">
                  <NBaseIcon>{{ default: () => iconMap[status] }}</NBaseIcon>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )
    }
  }
})
