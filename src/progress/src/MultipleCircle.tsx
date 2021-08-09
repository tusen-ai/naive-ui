import { h, defineComponent, computed, PropType, CSSProperties } from 'vue'
import CircleProcessing from './CircleProcessing'

function circlePath (r: number, sw: number, vw: number = 100): string {
  return `m ${vw / 2} ${vw / 2 - r} a ${r} ${r} 0 1 1 0 ${
    2 * r
  } a ${r} ${r} 0 1 1 0 -${2 * r}`
}

export default defineComponent({
  name: 'ProgressMultipleCircle',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    viewBoxWidth: {
      type: Number,
      required: true
    },
    percentage: {
      type: Array as PropType<number[]>,
      required: true
    },
    processing: Boolean,
    strokeWidth: {
      type: Number,
      required: true
    },
    circleGap: {
      type: Number,
      required: true
    },
    showIndicator: {
      type: Boolean,
      required: true
    },
    fillColor: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    railColor: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    railStyle: {
      type: Array as PropType<Array<string | CSSProperties>>,
      default: () => []
    }
  },
  setup (props, { slots }) {
    const strokeDasharrayRef = computed(() => {
      const strokeDasharrays = props.percentage.map(
        (v, i) =>
          `${
            ((Math.PI * v) / 100) *
            (props.viewBoxWidth / 2 -
              (props.strokeWidth / 2) * (1 + 2 * i) -
              props.circleGap * i) *
            2
          }, ${props.viewBoxWidth * 8}`
      )
      return strokeDasharrays
    })
    const maxStrokeDasharrayRef = computed(() => {
      return strokeDasharrayRef.value.map((item) => {
        return parseFloat(item.split(',')[0])
      })
    })
    const getCircleRadius = (
      viewBoxWidth: number,
      strokeWidth: number,
      index: number,
      circleGap: number
    ): number => {
      return (
        viewBoxWidth / 2 -
        (strokeWidth / 2) * (1 + 2 * index) -
        circleGap * index
      )
    }
    return () => {
      const {
        viewBoxWidth,
        strokeWidth,
        circleGap,
        showIndicator,
        fillColor,
        railColor,
        railStyle,
        percentage,
        clsPrefix,
        processing
      } = props
      return (
        <div class={`${clsPrefix}-progress-content`} role="none">
          <div class={`${clsPrefix}-progress-graph`} aria-hidden>
            <div class={`${clsPrefix}-progress-graph-circle`}>
              <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxWidth}`}>
                {percentage.map((p, index) => {
                  const circleRadius = getCircleRadius(
                    viewBoxWidth,
                    strokeWidth,
                    index,
                    circleGap
                  )
                  const pathD = circlePath(
                    circleRadius,
                    strokeWidth,
                    viewBoxWidth
                  )
                  return (
                    <g key={index}>
                      <path
                        class={`${clsPrefix}-progress-graph-circle-rail`}
                        d={pathD}
                        stroke-width={strokeWidth}
                        stroke-linecap="round"
                        fill="none"
                        style={
                          [
                            {
                              strokeDashoffset: 0,
                              stroke: railColor[index]
                            },
                            railStyle[index]
                          ] as any
                        }
                      />
                      <path
                        class={[
                          `${clsPrefix}-progress-graph-circle-fill`,
                          p === 0 &&
                            `${clsPrefix}-progress-graph-circle-fill--empty`
                        ]}
                        d={pathD}
                        stroke-width={strokeWidth}
                        stroke-linecap="round"
                        fill="none"
                        style={{
                          strokeDasharray: strokeDasharrayRef.value[index],
                          strokeDashoffset: 0,
                          stroke: fillColor[index]
                        }}
                      />
                      {processing && p && (
                        <CircleProcessing
                          clsPrefix={clsPrefix}
                          strokeWidth={strokeWidth}
                          viewBoxWidth={viewBoxWidth}
                          maxStrokeDasharray={
                            maxStrokeDasharrayRef.value[index]
                          }
                          circleRadius={circleRadius}
                          pathD={pathD}
                        />
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>
          {showIndicator && slots.default ? (
            <div>
              <div class={`${clsPrefix}-progress-text`}>{slots.default()}</div>
            </div>
          ) : null}
        </div>
      )
    }
  }
})
