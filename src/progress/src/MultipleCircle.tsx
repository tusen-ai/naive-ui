import { h, defineComponent, computed, PropType, CSSProperties } from 'vue'

function circlePath (r: number, sw: number, vw: number = 100): string {
  return `m ${vw / 2} ${vw / 2 - r} a ${r} ${r} 0 1 1 0 ${
    2 * r
  } a ${r} ${r} 0 1 1 0 -${2 * r}`
}

export default defineComponent({
  name: 'ProgressMultipleCircle',
  props: {
    viewBoxWidth: {
      type: Number,
      required: true
    },
    percentage: {
      type: Array as PropType<number[]>,
      required: true
    },
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
      default: []
    },
    railColor: {
      type: Array as PropType<string[]>,
      default: []
    },
    railStyle: {
      type: Array as PropType<Array<string | CSSProperties>>,
      default: []
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
    return () => {
      const {
        viewBoxWidth,
        strokeWidth,
        circleGap,
        showIndicator,
        fillColor,
        railColor,
        railStyle,
        percentage
      } = props
      return (
        <div class="n-progress-content">
          <div class="n-progress-graph">
            <div class="n-progress-graph-circle">
              <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxWidth}`}>
                {percentage.map((p, index) => {
                  return (
                    <g key={index}>
                      <path
                        class="n-progress-graph-circle-rail"
                        d={circlePath(
                          viewBoxWidth / 2 -
                            (strokeWidth / 2) * (1 + 2 * index) -
                            circleGap * index,
                          strokeWidth,
                          viewBoxWidth
                        )}
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
                          'n-progress-graph-circle-fill',
                          {
                            'n-progress-graph-circle-fill--empty': p === 0
                          }
                        ]}
                        d={circlePath(
                          viewBoxWidth / 2 -
                            (strokeWidth / 2) * (1 + 2 * index) -
                            circleGap * index,
                          strokeWidth,
                          viewBoxWidth
                        )}
                        stroke-width={strokeWidth}
                        stroke-linecap="round"
                        fill="none"
                        style={{
                          strokeDasharray: strokeDasharrayRef.value[index],
                          strokeDashoffset: 0,
                          stroke: fillColor[index]
                        }}
                      />
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>
          {showIndicator && slots.default ? (
            <div>
              <div class="n-progress-text">{slots.default()}</div>
            </div>
          ) : null}
        </div>
      )
    }
  }
})
