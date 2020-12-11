<template>
  <div
    ref="placeholder"
    class="n-back-top-placeholder"
    style="display: none;"
    aria-hidden
  >
    <v-lazy-teleport
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
            <n-icon>
              <back-top-icon />
            </n-icon>
          </slot>
        </div>
      </transition>
    </v-lazy-teleport>
  </div>
</template>

<script>
import { ref, computed, toRef, watch, nextTick } from 'vue'
import { VLazyTeleport } from 'vueuc'
import { useIsMounted, useMergedState } from 'vooks'
import { getScrollParent, unwrapElement } from 'seemly'
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import { formatLength, warn } from '../../_utils'
import styles from './styles'
import BackTopIcon from './BackTopIcon.vue'

export default {
  name: 'BackTop',
  components: {
    VLazyTeleport,
    BackTopIcon
  },
  mixins: [
    configurable,
    themeable,
    withCssr(styles)
  ],
  inheritAttrs: false,
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
      default: 'body'
    },
    visibilityHeight: {
      type: Number,
      default: 180
    },
    listenTo: {
      type: [String, Object, Function],
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:show': {
      type: Function,
      default: () => {}
    },
    // deprecated
    target: {
      validator () {
        warn('back-top', '`target` is deprecated, please use `listen-to` instead.')
        return true
      },
      default: undefined
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
        (this.target && this.target()) ||
        unwrapElement(this.listenTo) ||
        getScrollParent(this.$refs.placeholder)
      if (__DEV__ && !scrollElement) {
        warn('back-top', 'Container of back-top element is not found. This could be a bug of naive-ui.')
      }
      this.scrollElement = scrollElement
      const { to } = this
      const target = typeof to === 'string' ? document.querySelector(to) : to
      if (__DEV__ && !target) {
        warn('back-top', 'Target is not found.')
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
