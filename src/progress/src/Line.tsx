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
    clsPrefix: {
      type: String,
      required: true
    },
    percentage: {
      type: Number,
      default: 0
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
    unit: {
      type: String,
      default: '%'
    },
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
        processing,
        clsPrefix
      } = props
      return (
        <div class={`${clsPrefix}-progress-content`} role="none">
          <div class={`${clsPrefix}-progress-graph`} aria-hidden>
            <div
              class={[
                `${clsPrefix}-progress-graph-line`,
                {
                  [`${clsPrefix}-progress-graph-line--indicator-${indicatorPlacement}`]:
                    true
                }
              ]}
            >
              <div
                class={`${clsPrefix}-progress-graph-line-rail`}
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
                    `${clsPrefix}-progress-graph-line-fill`,
                    processing &&
                      `${clsPrefix}-progress-graph-line-fill--processing`
                  ]}
                  style={{
                    maxWidth: `${props.percentage}%`,
                    backgroundColor: fillColor,
                    height: styleHeightRef.value,
                    lineHeight: styleHeightRef.value,
                    borderRadius: styleFillBorderRadiusRef.value
                  }}
                >
                  {indicatorPlacement === 'inside' ? (
                    <div
                      class={`${clsPrefix}-progress-graph-line-indicator`}
                      style={{
                        color: indicatorTextColor
                      }}
                    >
                      {percentage}
                      {unit}
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
                  class={`${clsPrefix}-progress-custom-content`}
                  style={{
                    color: indicatorTextColor
                  }}
                  role="none"
                >
                  {slots.default()}
                </div>
              ) : status === 'default' ? (
                <div
                  role="none"
                  class={`${clsPrefix}-progress-icon ${clsPrefix}-progress-icon--as-text`}
                  style={{
                    color: indicatorTextColor
                  }}
                >
                  {percentage}
                  {unit}
                </div>
              ) : (
                <div class={`${clsPrefix}-progress-icon`} aria-hidden>
                  <NBaseIcon clsPrefix={clsPrefix}>
                    {{ default: () => iconMap[status] }}
                  </NBaseIcon>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )
    }
  }
})
