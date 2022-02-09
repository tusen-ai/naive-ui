import { h, defineComponent, PropType, CSSProperties } from 'vue'
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
    clsPrefix: {
      type: String,
      required: true
    },
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
      default: 0
    },
    offsetDegree: {
      type: Number,
      default: 0
    },
    showIndicator: {
      type: Boolean,
      required: true
    },
    indicatorTextColor: String,
    unit: String,
    viewBoxWidth: {
      type: Number,
      required: true
    },
    gapDegree: {
      type: Number as PropType<number>,
      default: 0
    },
    gapPosition: {
      type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
      default: 'bottom'
    }
  },
  setup (props, { slots }) {
    function getPathStyles (
      percent: number,
      offsetDegree: number,
      strokeColor?: string
    ): { pathString: string, pathStyle: CSSProperties } {
      const { gapPosition, gapDegree, railStyle, viewBoxWidth } = props
      const radius = 50
      let beginPositionX = 0
      let beginPositionY = -radius
      let endPositionX = 0
      let endPositionY = -2 * radius
      switch (gapPosition) {
        case 'left':
          beginPositionX = -radius
          beginPositionY = 0
          endPositionX = 2 * radius
          endPositionY = 0
          break
        case 'right':
          beginPositionX = radius
          beginPositionY = 0
          endPositionX = -2 * radius
          endPositionY = 0
          break
        case 'bottom':
          beginPositionY = radius
          endPositionY = 2 * radius
          break
        default:
      }
      const pathString = `M 55,55 m ${beginPositionX},${beginPositionY}
      a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
      a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`
      const len = Math.PI * 2 * radius
      const pathStyle = {
        stroke: strokeColor,
        strokeDasharray: `${(percent / 100) * (len - gapDegree)}px ${
          viewBoxWidth * 8
        }px`,
        strokeDashoffset: `-${
          gapDegree / 2 + (Math.PI / 3.6) * offsetDegree
        }px`,
        railStyle
      }
      return {
        pathString,
        pathStyle
      }
    }
    return () => {
      const {
        fillColor,
        railColor,
        strokeWidth,
        offsetDegree,
        status,
        percentage,
        showIndicator,
        indicatorTextColor,
        unit,
        clsPrefix
      } = props
      const { pathString: railPathString, pathStyle: railPathStyle } =
        getPathStyles(100, 0, railColor)
      const { pathString: fillPathString, pathStyle: fillPathStyle } =
        getPathStyles(percentage, offsetDegree, fillColor)
      return (
        <div class={`${clsPrefix}-progress-content`} role="none">
          <div class={`${clsPrefix}-progress-graph`} aria-hidden>
            <div class={`${clsPrefix}-progress-graph-circle`}>
              <svg viewBox="0 0 110 110">
                <g>
                  <path
                    class={`${clsPrefix}-progress-graph-circle-rail`}
                    d={railPathString}
                    stroke-width={strokeWidth}
                    stroke-linecap="round"
                    fill="none"
                    style={railPathStyle}
                  />
                </g>
                <g>
                  <path
                    class={[
                      `${clsPrefix}-progress-graph-circle-fill`,
                      percentage === 0 &&
                        `${clsPrefix}-progress-graph-circle-fill--empty`
                    ]}
                    d={fillPathString}
                    stroke-width={strokeWidth}
                    stroke-linecap="round"
                    fill="none"
                    style={fillPathStyle}
                  />
                </g>
              </svg>
            </div>
          </div>
          {showIndicator ? (
            <div>
              {slots.default ? (
                <div class={`${clsPrefix}-progress-custom-content`} role="none">
                  {slots.default()}
                </div>
              ) : status !== 'default' ? (
                <div class={`${clsPrefix}-progress-icon`} aria-hidden>
                  <NBaseIcon clsPrefix={clsPrefix}>
                    {{
                      default: () => iconMap[status]
                    }}
                  </NBaseIcon>
                </div>
              ) : (
                <div
                  class={`${clsPrefix}-progress-text`}
                  style={{
                    color: indicatorTextColor
                  }}
                  role="none"
                >
                  <span class={`${clsPrefix}-progress-text__percentage`}>
                    {percentage}
                  </span>
                  <span class={`${clsPrefix}-progress-text__unit`}>{unit}</span>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )
    }
  }
})
