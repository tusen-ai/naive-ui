import {
  h,
  defineComponent,
  computed,
  PropType,
  CSSProperties,
  ref,
  onMounted,
  onUnmounted
} from 'vue'
import { changeProcessingFillStrokeDasharray } from './utils'

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
    const processingFillStrokeDasharrayRef = ref<string[]>([])
    const timerRef = ref<number>(0)
    const setProcessingTimer = (): void => {
      const speedRef = ref<number>(1)
      timerRef.value = window.setInterval(() => {
        if (!processingFillStrokeDasharrayRef.value.length) {
          processingFillStrokeDasharrayRef.value = props.percentage.map(
            () => `0, ${props.viewBoxWidth * 8}`
          )
        } else {
          processingFillStrokeDasharrayRef.value.forEach((_, idx) => {
            const maxStrokeDasharray =
              ((Math.PI * props.percentage[idx]) / 100) *
              (props.viewBoxWidth / 2 -
                (props.strokeWidth / 2) * (1 + 2 * idx) -
                props.circleGap * idx) *
              2
            changeProcessingFillStrokeDasharray({
              processingFillStrokeDasharrayRef:
                processingFillStrokeDasharrayRef,
              maxStrokeDasharray,
              percentage: props.percentage[idx],
              rate: 0.0003,
              speedRef,
              viewBoxWidth: props.viewBoxWidth,
              idx
            })
          })
        }
      }, 30)
    }
    const clearProcessingTimer = (): void => {
      window.clearInterval(timerRef.value as any)
    }
    onMounted(() => {
      props.processing && setProcessingTimer()
    })
    onUnmounted(() => {
      props.processing && clearProcessingTimer()
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
        percentage,
        clsPrefix
      } = props
      return (
        <div class={`${clsPrefix}-progress-content`} role="none">
          <div class={`${clsPrefix}-progress-graph`} aria-hidden>
            <div class={`${clsPrefix}-progress-graph-circle`}>
              <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxWidth}`}>
                {percentage.map((p, index) => {
                  return (
                    <g key={index}>
                      <path
                        class={`${clsPrefix}-progress-graph-circle-rail`}
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
                          `${clsPrefix}-progress-graph-circle-fill`,
                          p === 0 &&
                            `${clsPrefix}-progress-graph-circle-fill--empty`
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
                      {props.processing && p !== 0 ? (
                        <path
                          class={[
                            `${clsPrefix}-progress-graph-circle-processing-fill`
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
                            strokeDasharray:
                              processingFillStrokeDasharrayRef.value[index],
                            strokeDashoffset: 0
                          }}
                        />
                      ) : null}
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
