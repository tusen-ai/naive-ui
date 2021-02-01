import { h, defineComponent, PropType, computed } from 'vue'
import { NBaseIcon } from '../../_internal'
import {
  CheckmarkIcon as SuccessIcon,
  CloseIcon as ErrorIcon,
  WarningIcon,
  InfoIcon as InfoCircleIcon
} from '../../_internal/icons'
import { Status } from './interface'

const iconMap = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  warning: <WarningIcon />,
  info: <InfoCircleIcon />
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
    fillColor: {
      type: String,
      default: undefined
    },
    railColor: {
      type: String,
      default: undefined
    },
    percentage: {
      type: Number,
      required: true
    },
    showIndicator: {
      type: Boolean,
      reqiuired: true
    },
    indicatorTextColor: {
      type: String,
      default: undefined
    },
    unit: {
      type: String,
      default: undefined
    },
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
                    style={{
                      strokeDashoffset: 0,
                      stroke: railColor
                    }}
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
