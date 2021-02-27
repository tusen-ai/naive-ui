import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  defineComponent,
  CSSProperties,
  PropType,
  h
} from 'vue'
import { getScrollParent, unwrapElement } from 'seemly'
import { useStyle } from '../../_mixins'
import { warn, keysOf } from '../../_utils'
import style from './styles/index.cssr'

export const affixProps = {
  listenTo: {
    type: [String, Object] as PropType<
    string | (() => HTMLElement) | undefined
    >,
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
    type: Function as PropType<(() => HTMLElement) | undefined>,
    validator: () => {
      warn('affix', '`target` is deprecated, please use `listen-to` instead.')
      return true
    },
    default: undefined
  }
} as const

export const affixPropKeys = keysOf(affixProps)

export default defineComponent({
  name: 'Affix',
  props: affixProps,
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
    const init = (): void => {
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
    const handleScroll = (): void => {
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
      selfRef,
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
  },
  render () {
    return (
      <div
        ref="selfRef"
        class={[
          'n-affix',
          {
            'n-affix--affixed': this.affixed,
            'n-affix--absolute-positioned': this.position === 'absolute'
          }
        ]}
        style={this.mergedstyle}
      >
        {this.$slots}
      </div>
    )
  }
})
