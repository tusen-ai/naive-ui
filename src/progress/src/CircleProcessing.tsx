import {
  defineComponent,
  ref,
  computed,
  onBeforeUnmount,
  h,
  Fragment,
  watch,
  toRefs
} from 'vue'
import { calcPointPos, setProcessingTimer, clearProcessingTimer } from './utils'
import { createId } from 'seemly'

export default defineComponent({
  name: 'ProgressCircleProcessing',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    strokeWidth: {
      type: Number,
      required: true
    },
    viewBoxWidth: {
      type: Number,
      required: true
    },
    maxStrokeDasharray: {
      type: Number,
      required: true
    },
    pathD: {
      type: String,
      required: true
    },
    circleRadius: {
      type: Number,
      required: true
    }
  },
  setup (props) {
    const {
      viewBoxWidth: viewBoxWidthRef,
      maxStrokeDasharray: maxStrokeDasharrayRef
    } = toRefs(props)
    const processingFillStrokeDasharrayRef = ref<string>('')
    const timer: number = 0
    const randomId: string = createId()
    const sleepingRef = ref<boolean>(false)
    const curArcLength = computed(() => {
      if (!processingFillStrokeDasharrayRef.value) {
        return 0
      }
      return parseFloat(processingFillStrokeDasharrayRef.value.split(',')[0])
    })
    const darkestPointPosRef = computed(() => {
      return calcPointPos(props.circleRadius, props.maxStrokeDasharray, 1)
    })
    const lightestCurPointPosRef = computed(() => {
      return calcPointPos(props.circleRadius, curArcLength.value, 0.66)
    })
    watch(
      [viewBoxWidthRef, maxStrokeDasharrayRef],
      () => {
        clearProcessingTimer(timer)
        processingFillStrokeDasharrayRef.value = `0, ${props.viewBoxWidth * 8}`
        const timeNow: number = Date.now()
        setProcessingTimer({
          timer,
          timeNow,
          sleepingRef,
          processingFillStrokeDasharrayRef,
          randomId,
          viewBoxWidth: viewBoxWidthRef.value,
          maxStrokeDasharray: maxStrokeDasharrayRef.value,
          num: 0
        })
      },
      {
        immediate: true
      }
    )
    onBeforeUnmount(() => {
      clearProcessingTimer(timer)
    })
    return {
      darkestPointPos: darkestPointPosRef,
      lightestCurPointPos: lightestCurPointPosRef,
      sleeping: sleepingRef,
      processingFillStrokeDasharray: processingFillStrokeDasharrayRef,
      randomId
    }
  },
  render () {
    const {
      sleeping,
      clsPrefix,
      strokeWidth,
      processingFillStrokeDasharray,
      randomId,
      darkestPointPos,
      lightestCurPointPos,
      pathD
    } = this
    return (
      <>
        <defs>
          <linearGradient
            id={`ProgressCircleGradient${randomId}`}
            x1={darkestPointPos[0]}
            y1={darkestPointPos[1]}
            x2={lightestCurPointPos[0]}
            y2={lightestCurPointPos[1]}
          >
            <stop offset="0%" stop-color="rgba(255, 255, 255, 0.05)" />
            <stop offset="100%" stop-color="rgba(255, 255, 255, 0.3)" />
          </linearGradient>
        </defs>
        {!sleeping ? (
          <path
            class={[`${clsPrefix}-progress-graph-circle-processing-fill`]}
            d={pathD}
            stroke-width={strokeWidth}
            stroke-linecap="round"
            fill="none"
            style={{
              animation:
                'animation: circle-progress-processing-animation 2s var(--bezier) infinite',
              strokeDasharray: processingFillStrokeDasharray,
              strokeDashoffset: 0,
              stroke: `url(#ProgressCircleGradient${randomId})`
            }}
          />
        ) : null}
      </>
    )
  }
})
