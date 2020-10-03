<template>
  <div
    class="n-base-tracking-rect"
    :class="{
      [`n-${theme}-theme`]: theme
    }"
  >
    <transition name="base-tracking-rect-transition">
      <div
        v-show="mergedShow"
        class="n-base-tracking-rect__body"
        :style="style"
      />
    </transition>
  </div>
</template>

<script>
import { ref, toRef, computed } from 'vue'
import { useMergedState, useCompitable } from '../../../_utils/composition'
import { usecssr } from '../../../_mixins'
import styles from './styles/index'

export default {
  name: 'BaseTrackingRect',
  mixins: [
    usecssr(styles)
  ],
  props: {
    theme: {
      type: String,
      default: undefined
    },
    show: {
      type: Boolean,
      default: undefined
    },
    top: {
      type: Number,
      default: undefined
    },
    height: {
      type: Number,
      default: undefined
    },
    // deprecated
    itemSize: {
      type: Number,
      default: undefined
    }
  },
  setup (props) {
    const uncontrolledShowRef = ref(false)
    const controlledShowRef = toRef(props, 'show')
    const mergedShowRef = useMergedState(controlledShowRef, uncontrolledShowRef)
    const compitableHeightRef = useCompitable(props, ['itemSize', 'height'])
    const uncontrolledTopRef = ref(null)
    const controlledTopRef = computed(() => {
      if (props.top !== undefined) return props.top
      return undefined
    })
    const mergedTopRef = useMergedState(controlledTopRef, uncontrolledTopRef)
    const styleRef = computed(() => {
      return {
        height: compitableHeightRef.value && (compitableHeightRef.value + 'px'),
        top: mergedTopRef.value && (mergedTopRef.value + 'px')
      }
    })
    return {
      mergedShow: mergedShowRef,
      uncontrolledShow: uncontrolledShowRef,
      uncontrolledTop: uncontrolledTopRef,
      compitableHeight: compitableHeightRef,
      style: styleRef,
      vanishTimerId: ref(null)
    }
  },
  methods: {
    hideTrackingRect (delay = 300) {
      this.vanishTimerId && window.clearTimeout(this.vanishTimerId)
      if (!delay) {
        this.vanishTimerId = null
        this.uncontrolledShow = false
      } else {
        this.vanishTimerId = window.setTimeout(() => {
          this.uncontrolledShow = false
        }, delay)
      }
    },
    updateTrackingRectTop (el, getLightBarTop = elm => elm.offsetTop) {
      if (!el) return
      this.vanishTimerId && window.clearTimeout(this.vanishTimerId)
      this.vanishTimerId = null
      this.uncontrolledShow = true
      this.uncontrolledTop = getLightBarTop(el)
    }
  }
}
</script>
