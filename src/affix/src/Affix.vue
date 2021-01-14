<template>
  <div
    ref="selfRef"
    class="n-affix"
    :class="{
      [`n-affix--affixed`]: affixed,
      [`n-affix--absolute-positioned`]: position === 'absolute'
    }"
    :style="mergedstyle"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  defineComponent,
  CSSProperties,
  PropType
} from 'vue'
import { getScrollParent, unwrapElement } from 'seemly'
import { useConfig, useStyle } from '../../_mixins'
import { warn } from '../../_utils'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'Affix',
  props: {
    listenTo: {
      type: [String, Object],
      default: undefined
    },
    offsetTop: {
      type: Number,
      default: undefined
    },
    top: {
      type: Number,
      default: undefined
    },
    offsetBottom: {
      type: Number,
      default: undefined
    },
    bottom: {
      type: Number,
      default: undefined
    },
    position: {
      type: String,
      default: 'fix'
    },
    // deprecated
    target: {
      type: (undefined as unknown) as PropType<() => HTMLElement>,
      validator: () => {
        warn('affix', '`target` is deprecated, please use `listen-to` instead.')
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    useStyle('Affix', style)
    const scrollElementRef = ref<HTMLElement | null>(null)
    const stickToTopRef = ref(false)
    const stickToBottomRef = ref(false)
    const bottomAffixedTriggerScrollTopRef = ref<number | null>(null)
    const topAffixedTriggerScrollTopRef = ref<number | null>(null)
    const affixedRef = computed(() => {
      return stickToBottomRef.value || stickToTopRef.value
    })
    const mergedOffsetTopRef = computed(() => {
      const { offsetTop, top } = props
      return offsetTop === undefined ? top : offsetTop
    })
    const mergedTopRef = computed(() => {
      const { offsetTop, top } = props
      return top === undefined ? offsetTop : top
    })
    const mergedBottomRef = computed(() => {
      const { offsetBottom, bottom } = props
      return bottom === undefined ? offsetBottom : bottom
    })
    const mergedOffsetBottomRef = computed(() => {
      const { offsetBottom, bottom } = props
      return offsetBottom === undefined ? bottom : offsetBottom
    })
    const selfRef = ref<Element | null>(null)
    const init = () => {
      const { target: getScrollTarget, listenTo } = props
      let scrollElement
      if (getScrollTarget) {
        // deprecated
        scrollElement = getScrollTarget()
      } else if (listenTo) {
        scrollElement = unwrapElement(listenTo)
      } else {
        scrollElement = getScrollParent(selfRef.value)
      }
      if (scrollElement) {
        scrollElementRef.value = scrollElement
      } else if (__DEV__) {
        warn('affix', 'Target to be listened to is not valid.')
      }
      if (scrollElement) {
        scrollElement.addEventListener('scroll', handleScroll)
        handleScroll()
      }
    }
    const handleScroll = () => {
      const { value: containerEl } = scrollElementRef
      const { value: selfEl } = selfRef
      if (!containerEl || !selfEl) return
      if (affixedRef.value) {
        if (
          containerEl.scrollTop <
          (topAffixedTriggerScrollTopRef.value as number)
        ) {
          stickToTopRef.value = false
          topAffixedTriggerScrollTopRef.value = null
        }
        if (
          containerEl.scrollTop >
          (bottomAffixedTriggerScrollTopRef.value as number)
        ) {
          stickToBottomRef.value = false
          bottomAffixedTriggerScrollTopRef.value = null
        }
        return
      }
      const containerRect = containerEl.getBoundingClientRect()
      const affixRect = selfEl.getBoundingClientRect()
      const pxToTop = affixRect.top - containerRect.top
      const pxToBottom = containerRect.bottom - affixRect.bottom
      const mergedOffsetTop = mergedOffsetTopRef.value
      const mergedOffsetBottom = mergedOffsetBottomRef.value
      if (mergedOffsetTop !== undefined && pxToTop <= mergedOffsetTop) {
        stickToTopRef.value = true
        topAffixedTriggerScrollTopRef.value =
          containerEl.scrollTop - (mergedOffsetTop - pxToTop)
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
          containerEl.scrollTop + mergedOffsetBottom - pxToBottom
      } else {
        stickToBottomRef.value = false
        bottomAffixedTriggerScrollTopRef.value = null
      }
    }
    onMounted(() => {
      init()
    })
    onBeforeUnmount(() => {
      const scrollElement = scrollElementRef.value
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll)
      }
    })
    return {
      ...useConfig(props),
      selfRef,
      scrollElement: scrollElementRef,
      stickToTop: stickToTopRef,
      stickToBottom: stickToBottomRef,
      bottomAffixedTriggerScrollTop: bottomAffixedTriggerScrollTopRef,
      topAffixedTriggerScrollTop: topAffixedTriggerScrollTopRef,
      affixed: affixedRef,
      mergedstyle: computed<CSSProperties>(() => {
        const style: CSSProperties = {}
        if (stickToTopRef.value && mergedOffsetTopRef.value !== undefined) {
          style.top = `${mergedTopRef.value}px`
        }
        if (
          stickToBottomRef.value &&
          mergedOffsetBottomRef.value !== undefined
        ) {
          style.bottom = `${mergedBottomRef.value}px`
        }
        return style
      })
    }
  }
})
</script>
