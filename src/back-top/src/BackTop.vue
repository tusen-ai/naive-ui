<template>
  <div
    ref="placeholder"
    class="n-back-top-placeholder"
    style="display: none;"
    aria-hidden
  >
    <n-lazy-teleport
      :to="to"
      :show="mergedShow"
    >
      <transition
        name="n-fade-in-scale-up-transition"
        :appear="isMounted"
        @after-enter="handleAfterEnter"
      >
        <div
          v-if="mergedShow"
          :class="{
            [`n-${mergedTheme}-theme`]: mergedTheme,
            'n-back-top--transition-disabled': transitionDisabled
          }"
          :style="{
            ...mergedStyle,
            right: styleRight,
            bottom: styleBottom
          }"
          class="n-back-top"
          v-bind="$attrs"
          @click="handleClick"
        >
          <slot>
            <div class="n-back-top__default-button">
              <svg
                viewBox="0 0 40 40"
              >
                <title>BackTop</title>
                <g>
                  <path
                    d="M30,8A20,20,0,1,0,50,28,20,20,0,0,0,30,8Zm8,23.8a1.65,1.65,0,0,1-2.36,0l-4-3.94V36.4a1.67,1.67,0,0,1-3.34,0V28l-4,3.76a1.65,1.65,0,0,1-2.36,0,1.48,1.48,0,0,1,0-2.25l7-6.67a1.65,1.65,0,0,1,2.36,0L38,29.45A1.59,1.59,0,0,1,38,31.8Zm2.36-10.61H19.67a1.6,1.6,0,1,1,0-3.19H40.33a1.6,1.6,0,1,1,0,3.19Z"
                    transform="translate(-10 -8)"
                  />
                </g>
              </svg>
            </div>
          </slot>
        </div>
      </transition>
    </n-lazy-teleport>
  </div>
</template>

<script>
import { ref, computed, toRef, watch, nextTick } from 'vue'
import getScrollParent from '../../_utils/dom/getScrollParent'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import formatLength from '../../_utils/css/formatLength'
import usecssr from '../../_mixins/usecssr'
import styles from './styles'
import { warn } from '../../_utils/naive/warn'
import getTarget from '../../_utils/dom/get-target'
import NLazyTeleport from '../../_base/lazy-teleport'
import { useIsMounted, useMergedState } from '../../_utils/composition'

export default {
  name: 'BackTop',
  components: {
    NLazyTeleport
  },
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
  props: {
    show: {
      type: Boolean,
      default: undefined
    },
    right: {
      type: [Number, String],
      default: 40
    },
    bottom: {
      type: [Number, String],
      default: 40
    },
    to: {
      type: [String, Object],
      default: undefined
    },
    visibilityHeight: {
      type: Number,
      default: 180
    },
    onClick: {
      type: Function,
      default: () => {}
    },
    listenTo: {
      type: [String, Object],
      default: null
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:show': {
      type: Function,
      default: () => {}
    },
    // deprecated
    target: {
      type: Function,
      default: null
    },
    onShow: {
      type: Function,
      default: () => {}
    },
    onHide: {
      type: Function,
      default: () => {}
    }
  },
  setup (props) {
    const scrollTopRef = ref(null)
    const uncontrolledShowRef = computed(() => {
      if (scrollTopRef.value === null) return false
      return scrollTopRef.value >= props.visibilityHeight
    })
    const DomInfoReadyRef = ref(false)
    watch(uncontrolledShowRef, (value) => {
      if (DomInfoReadyRef.value) {
        props['onUpdate:show'](value)
      }
    })
    const controlledShowRef = toRef(props, 'show')
    const mergedShowRef = useMergedState(
      controlledShowRef,
      uncontrolledShowRef
    )
    // deprecated
    watch(mergedShowRef, (value) => {
      if (DomInfoReadyRef.value) {
        if (value) props.onShow()
        props.onHide()
      }
    })
    return {
      mergedShow: mergedShowRef,
      isMounted: useIsMounted(),
      scrollElement: ref(null),
      scrollTop: scrollTopRef,
      transitionDisabled: ref(true),
      scrollListenerRegistered: ref(false),
      DomInfoReady: DomInfoReadyRef
    }
  },
  computed: {
    styleRight () {
      return formatLength(this.right)
    },
    styleBottom () {
      return formatLength(this.bottom)
    }
  },
  mounted () {
    this.init()
    this.transitionDisabled = this.mergedShow
  },
  beforeUnmount () {
    if (this.scrollElement) {
      this.scrollElement.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    init () {
      if (this.scrollListenerRegistered) return
      this.scrollListenerRegistered = true
      const scrollElement =
        getTarget(this.listenTo) ||
        (this.target && this.target()) ||
        getScrollParent(this.$refs.placeholder)
      if (__DEV__ && !scrollElement) {
        warn('anchor', 'Container of back-top element is not found. This could be a bug of naive-ui.')
      }
      this.scrollElement = scrollElement
      const { to } = this
      const target = typeof to === 'string' ? document.querySelector(to) : to
      if (__DEV__ && !target) {
        warn('anchor', 'Target is not found.')
      }
      if (scrollElement) {
        scrollElement.addEventListener('scroll', this.handleScroll)
        this.handleScroll()
      }
    },
    handleClick (e) {
      const { scrollElement } = this
      if (scrollElement.nodeName === '#document') {
        scrollElement.documentElement.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        scrollElement.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
      this.onClick(e)
    },
    handleScroll () {
      const { scrollElement } = this
      if (scrollElement.nodeName === '#document') {
        this.scrollTop = scrollElement.documentElement.scrollTop
      } else {
        this.scrollTop = scrollElement.scrollTop
      }
      if (!this.DomInfoReady) {
        nextTick(() => {
          this.DomInfoReady = true
        })
      }
    },
    handleAfterEnter () {
      this.transitionDisabled = false
    }
  }
}
</script>
