import type { ProgressGradient, ProgressStatus } from './public-types'
import { type CSSProperties, defineComponent, h, type PropType } from 'vue'
import { NBaseIcon } from '../../_internal'
import {
  ErrorIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon
} from '../../_internal/icons'

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
      type: String as PropType<ProgressStatus>,
      required: true
    },
    strokeWidth: {
      type: Number,
      required: true
    },
    fillColor: [String, Object] as PropType<string | ProgressGradient>,
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
      required: true
    },
    gapOffsetDegree: {
      type: Number,
      default: 0
    }
  },
  setup(props, { slots }) {
    function getPathStyles(
      percent: number,
      offsetDegree: number,
      strokeColor?: string | ProgressGradient,
      type?: 'rail' | 'fill'
    ): { pathString: string, pathStyle: CSSProperties } {
      const { gapDegree, viewBoxWidth, strokeWidth } = props
      const radius = 50
      const beginPositionX = 0
      const beginPositionY = radius
      const endPositionX = 0
      const endPositionY = 2 * radius
      const centerX = 50 + strokeWidth / 2
      const pathString = `M ${centerX},${centerX} m ${beginPositionX},${beginPositionY}
      a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
      a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`
      const len = Math.PI * 2 * radius
      const pathStyle: CSSProperties = {
        stroke:
          type === 'rail'
            ? (strokeColor as string)
            : typeof props.fillColor === 'object'
              ? 'url(#gradient)'
              : (strokeColor as string),
        strokeDasharray: `${(percent / 100) * (len - gapDegree)}px ${
          viewBoxWidth * 8
        }px`,
        strokeDashoffset: `-${gapDegree / 2}px`,
        transformOrigin: offsetDegree ? 'center' : undefined,
        transform: offsetDegree ? `rotate(${offsetDegree}deg)` : undefined
      }
      return {
        pathString,
        pathStyle
      }
    }

    const createGradientNode = (): false | JSX.Element => {
      const isGradient = typeof props.fillColor === 'object'
      const from = isGradient ? props.fillColor.stops[0] : ''
      const to = isGradient ? props.fillColor.stops[1] : ''
      return (
        isGradient && (
          <defs>
            <linearGradient id="gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stop-color={from} />
              <stop offset="100%" stop-color={to} />
            </linearGradient>
          </defs>
        )
      )
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
        gapOffsetDegree,
        clsPrefix
      } = props
      const { pathString: railPathString, pathStyle: railPathStyle }
        = getPathStyles(100, 0, railColor, 'rail')
      const { pathString: fillPathString, pathStyle: fillPathStyle }
        = getPathStyles(percentage, offsetDegree, fillColor, 'fill')
      const viewBoxSize = 100 + strokeWidth
      return (
        <div class={`${clsPrefix}-progress-content`} role="none">
          <div class={`${clsPrefix}-progress-graph`} aria-hidden>
            <div
              class={`${clsPrefix}-progress-graph-circle`}
              style={{
                transform: gapOffsetDegree
                  ? `rotate(${gapOffsetDegree}deg)`
                  : undefined
              }}
            >
              <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
                {createGradientNode()}
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
                      percentage === 0
                      && `${clsPrefix}-progress-graph-circle-fill--empty`
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
