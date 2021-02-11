import { h, defineComponent, PropType, computed, CSSProperties } from 'vue'
import { NBaseIcon } from '../../_internal'
import {
  SuccessIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon
} from '../../_internal/icons'
import { Status } from './interface'

const iconMap = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />
}

export default defineComponent({
  name: 'ProgressCircle',
  props: {
    status: {
      type: String as PropType<Status>,
      required: true
    },
    strokeWidth: {
      type: Number,
      required: true
    },
    fillColor: String,
    railColor: String,
    railStyle: [String, Object] as PropType<string | CSSProperties>,
    percentage: {
      type: Number,
      required: true
    },
    showIndicator: {
      type: Boolean,
      reqiuired: true
    },
    indicatorTextColor: String,
    unit: String,
    viewBoxWidth: {
      type: Number,
      required: true
    }
  },
  setup (props, { slots }) {
    const strokeDasharrayRef = computed(() => {
      return `${Math.PI * props.percentage}, ${props.viewBoxWidth * 8}`
    })
    return () => {
      const {
        fillColor,
        railColor,
        railStyle,
        strokeWidth,
        status,
        percentage,
        showIndicator,
        indicatorTextColor,
        unit
      } = props
      return (
        <div class="n-progress-content">
          <div class="n-progress-graph">
            <div class="n-progress-graph-circle">
              <svg viewBox="0 0 110 110">
                <g>
                  <path
                    class="n-progress-graph-circle-rail"
                    d="m 55 5 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100"
                    stroke-width={strokeWidth * 1.1}
                    stroke-linecap="round"
                    fill="none"
                    style={
                      [
                        {
                          strokeDashoffset: 0,
                          stroke: railColor
                        },
                        railStyle
                      ] as any
                    }
                  />
                </g>
                <g>
                  <path
                    class={[
                      'n-progress-graph-circle-fill',
                      {
                        'n-progress-graph-circle-fill--empty': percentage === 0
                      }
                    ]}
                    d="m 55 5 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100"
                    stroke-width={strokeWidth * 1.1}
                    stroke-linecap="round"
                    fill="none"
                    style={{
                      strokeDasharray: strokeDasharrayRef.value,
                      strokeDashoffset: 0,
                      stroke: fillColor
                    }}
                  />
                </g>
              </svg>
            </div>
          </div>
          {showIndicator ? (
            <div>
              {slots.default ? (
                <div class="n-progress-custom-content">{slots.default()}</div>
              ) : status !== 'default' ? (
                <div class="n-progress-icon">
                  <NBaseIcon>
                    {{
                      default: () => iconMap[status]
                    }}
                  </NBaseIcon>
                </div>
              ) : (
                <div
                  class="n-progress-text"
                  style={{
                    color: indicatorTextColor
                  }}
                >
                  <span class="n-progress-text__percentage">{percentage}</span>
                  <span class="n-progress-text__unit">{unit}</span>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )
    }
  }
})
