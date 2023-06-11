import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  defineComponent,
  type CSSProperties,
  type PropType,
  h
} from 'vue'
import { unwrapElement, beforeNextFrameOnce } from 'seemly'
import { useConfig, useStyle } from '../../_mixins'
import { warn, keysOf } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { getScrollTop, getRect } from './utils'
import type { ScrollTarget } from './utils'
import style from './styles/index.cssr'

export const affixProps = {
  listenTo: [String, Object, Function] as PropType<
  string | ScrollTarget | (() => HTMLElement) | undefined
  >,
  top: Number,
  bottom: Number,
  triggerTop: Number,
  triggerBottom: Number,
  position: {
    type: String as PropType<'fix' | 'absolute'>,
    default: 'fix'
  },
  // deprecated
  offsetTop: {
    type: Number as PropType<number | undefined>,
    validator: () => {
      if (__DEV__) {
        warn(
          'affix',
          '`offset-top` is deprecated, please use `trigger-top` instead.'
        )
      }
      return true
    },
    default: undefined
  },
  offsetBottom: {
    type: Number as PropType<number | undefined>,
    validator: () => {
      if (__DEV__) {
        warn(
          'affix',
          '`offset-bottom` is deprecated, please use `trigger-bottom` instead.'
        )
      }
      return true
    },
    default: undefined
  },
  target: {
    type: Function as unknown as PropType<(() => HTMLElement) | undefined>,
    validator: () => {
      if (__DEV__) {
        warn('affix', '`target` is deprecated, please use `listen-to` instead.')
      }
      return true
    },
    default: undefined
  }
} as const

export const affixPropKeys = keysOf(affixProps)

export type AffixProps = ExtractPublicPropTypes<typeof affixProps>

export default defineComponent({
  name: 'Affix',
  props: affixProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    useStyle('-affix', style, mergedClsPrefixRef)
    let scrollTarget: ScrollTarget | null = null
    const stickToTopRef = ref(false)
    const stickToBottomRef = ref(false)
    const bottomAffixedTriggerScrollTopRef = ref<number | null>(null)
    const topAffixedTriggerScrollTopRef = ref<number | null>(null)
    const affixedRef = computed(() => {
      return stickToBottomRef.value || stickToTopRef.value
    })
    const mergedOffsetTopRef = computed(() => {
      return props.triggerTop ?? props.offsetTop ?? props.top
    })
    const mergedTopRef = computed(() => {
      return props.top ?? props.triggerTop ?? props.offsetTop
    })
    const mergedBottomRef = computed(() => {
      return props.bottom ?? props.triggerBottom ?? props.offsetBottom
    })
    const mergedOffsetBottomRef = computed(() => {
      return props.triggerBottom ?? props.offsetBottom ?? props.bottom
    })
    const selfRef = ref<Element | null>(null)
    const init = (): void => {
      const { target: getScrollTarget, listenTo } = props
      if (getScrollTarget) {
        // deprecated
        scrollTarget = getScrollTarget()
      } else if (listenTo) {
        scrollTarget = unwrapElement(listenTo)
      } else {
        scrollTarget = document
      }
      if (scrollTarget) {
        scrollTarget.addEventListener('scroll', handleScroll)
        handleScroll()
      } else if (__DEV__) {
        warn('affix', 'Target to be listened to is not valid.')
      }
    }
    function handleScroll (): void {
      beforeNextFrameOnce(_handleScroll)
    }

    function _handleScroll (): void {
      const { value: selfEl } = selfRef
      if (!scrollTarget || !selfEl) return
      const scrollTop = getScrollTop(scrollTarget)
      if (affixedRef.value) {
        if (scrollTop < (topAffixedTriggerScrollTopRef.value as number)) {
          stickToTopRef.value = false
          topAffixedTriggerScrollTopRef.value = null
        }
        if (scrollTop > (bottomAffixedTriggerScrollTopRef.value as number)) {
          stickToBottomRef.value = false
          bottomAffixedTriggerScrollTopRef.value = null
        }
        return
      }
      const containerRect = getRect(scrollTarget)
      const affixRect = selfEl.getBoundingClientRect()
      const pxToTop = affixRect.top - containerRect.top
      const pxToBottom = containerRect.bottom - affixRect.bottom
      const mergedOffsetTop = mergedOffsetTopRef.value
      const mergedOffsetBottom = mergedOffsetBottomRef.value
      if (mergedOffsetTop !== undefined && pxToTop <= mergedOffsetTop) {
        stickToTopRef.value = true
        topAffixedTriggerScrollTopRef.value =
          scrollTop - (mergedOffsetTop - pxToTop)
      } else {
        stickToTopRef.value = false
        topAffixedTriggerScrollTopRef.value = null
      }
      if (
        mergedOffsetBottom !== undefined &&
        pxToBottom <= mergedOffsetBottom
      ) {
        stickToBottomRef.value = true
        bottomAffixedTriggerScrollTopRef.value =
          scrollTop + mergedOffsetBottom - pxToBottom
      } else {
        stickToBottomRef.value = false
        bottomAffixedTriggerScrollTopRef.value = null
      }
    }
    onMounted(() => {
      init()
    })
    onBeforeUnmount(() => {
      if (!scrollTarget) return
      scrollTarget.removeEventListener('scroll', handleScroll)
    })
    return {
      selfRef,
      affixed: affixedRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedstyle: computed<CSSProperties>(() => {
        const style: CSSProperties = {}
        if (
          stickToTopRef.value &&
          mergedOffsetTopRef.value !== undefined &&
          mergedTopRef.value !== undefined
        ) {
          style.top = `${mergedTopRef.value}px`
        }
        if (
          stickToBottomRef.value &&
          mergedOffsetBottomRef.value !== undefined &&
          mergedBottomRef.value !== undefined
        ) {
          style.bottom = `${mergedBottomRef.value}px`
        }
        return style
      })
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        ref="selfRef"
        class={[
          `${mergedClsPrefix}-affix`,
          {
            [`${mergedClsPrefix}-affix--affixed`]: this.affixed,
            [`${mergedClsPrefix}-affix--absolute-positioned`]:
              this.position === 'absolute'
          }
        ]}
        style={this.mergedstyle}
      >
        {this.$slots}
      </div>
    )
  }
})
