import { repeat } from 'seemly'
import { computed, defineComponent, h, nextTick, ref } from 'vue'
import { VResizeObserver } from 'vueuc'
import { useConfig, useTheme } from '../../_mixins'
import { marqueeLight } from '../styles'
import { marqueeProps } from './props'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'Marquee',
  props: marqueeProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props)
    useTheme(
      'Marquee',
      '-marquee',
      style,
      marqueeLight,
      props,
      mergedClsPrefixRef
    )

    const containerElRef = ref<HTMLDivElement | null>(null)

    const contentWidthRef = ref(-1)
    const containerWidthRef = ref(-1)

    const playStateRef = ref<'paused' | 'running'>('running')

    const repeatCountInOneGroupRef = computed(() => {
      if (!props.autoFill)
        return 1
      const { value: contentWidth } = contentWidthRef
      const { value: containerWidth } = containerWidthRef
      if (contentWidth === -1 || containerWidth === -1)
        return 1
      return Math.ceil(containerWidthRef.value / contentWidth)
    })

    const durationRef = computed(() => {
      const { value: contentWidth } = contentWidthRef
      if (contentWidth === -1)
        return 0
      return (contentWidth * repeatCountInOneGroupRef.value) / props.speed
    })

    const animationCssVarsRef = computed(() => {
      return {
        '--n-play': playStateRef.value,
        '--n-direction': 'normal',
        '--n-duration': `${durationRef.value}s`,
        '--n-delay': '0s',
        '--n-iteration-count': 'infinite',
        '--n-min-width': 'auto'
      }
    })

    function resetScrollState() {
      playStateRef.value = 'paused'
      nextTick().then(() => {
        void containerElRef.value?.offsetTop
        playStateRef.value = 'running'
      })
    }

    function handleContainerResize(entry: ResizeObserverEntry) {
      containerWidthRef.value = entry.contentRect.width
    }

    function handleContentResize(entry: ResizeObserverEntry) {
      contentWidthRef.value = entry.contentRect.width
    }

    function handleAnimationIteration() {
      resetScrollState()
    }

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      animationCssVars: animationCssVarsRef,
      containerElRef,
      repeatCountInOneGroup: repeatCountInOneGroupRef,
      handleContainerResize,
      handleContentResize,
      handleAnimationIteration
    }
  },
  render() {
    const {
      $slots,
      mergedClsPrefix,
      animationCssVars,
      repeatCountInOneGroup,
      handleAnimationIteration
    } = this
    const originalNode = (
      <VResizeObserver onResize={this.handleContentResize}>
        <div
          class={`${mergedClsPrefix}-marquee__item ${mergedClsPrefix}-marquee__original-item`}
        >
          {$slots}
        </div>
      </VResizeObserver>
    )
    const mirrorNode = (
      <div class={`${mergedClsPrefix}-marquee__item`}>{$slots}</div>
    )
    if (this.autoFill) {
      return (
        <VResizeObserver onResize={this.handleContainerResize}>
          <div
            class={`${mergedClsPrefix}-marquee ${mergedClsPrefix}-marquee--auto-fill`}
            ref="containerElRef"
            style={animationCssVars}
          >
            <div
              class={`${mergedClsPrefix}-marquee__group`}
              onAnimationiteration={handleAnimationIteration}
            >
              {originalNode}
              {repeat(repeatCountInOneGroup - 1, mirrorNode)}
            </div>
            <div class={`${mergedClsPrefix}-marquee__group`}>
              {repeat(repeatCountInOneGroup, mirrorNode)}
            </div>
          </div>
        </VResizeObserver>
      )
    }
    else {
      return (
        <div
          class={[`${mergedClsPrefix}-marquee`]}
          ref="containerElRef"
          style={animationCssVars}
        >
          <div
            class={`${mergedClsPrefix}-marquee__group`}
            onAnimationiteration={handleAnimationIteration}
          >
            {originalNode}
          </div>
          <div class={`${mergedClsPrefix}-marquee__group`}>{mirrorNode}</div>
        </div>
      )
    }
  }
})
