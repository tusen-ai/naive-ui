<template>
  <div
    class="n-slider"
    :class="{
      'n-slider--disabled': disabled,
      'n-slider--active': active,
      'n-slider--with-mark': marks,
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
    @keydown.right="handleKeyDownRight"
    @keydown.left="handleKeyDownLeft"
  >
    <div ref="railRef" class="n-slider-rail" @click="handleRailClick">
      <div class="n-slider-rail__fill" :style="fillStyle" />
      <div v-if="marks" class="n-slider-dots">
        <div
          v-for="mark in computedMarks"
          :key="mark.label"
          class="n-slider-dot"
          :style="{
            ...mark.style
          }"
        />
      </div>
    </div>
    <v-binder>
      <v-target>
        <div
          ref="handleRef1"
          class="n-slider-handle"
          tabindex="0"
          :style="firstHandleStyle"
          @focus="handleHandleFocus1"
          @blur="handleHandleBlur1"
          @mousedown="handleFirstHandleMouseDown"
          @mouseenter="handleFirstHandleMouseEnter"
          @mouseleave="handleFirstHandleMouseLeave"
        />
      </v-target>
      <v-follower
        ref="followerRef1"
        :show="mergedShowTooltip1"
        :to="adjustedTo"
        :placement="placement"
        :container-class="namespace"
      >
        <transition
          name="n-fade-in-scale-up-transition"
          :appear="isMounted"
          :css="!(active && prevActive)"
        >
          <div
            v-if="mergedShowTooltip1"
            class="n-slider-handle-indicator"
            :class="{
              [`n-${mergedTheme}-theme`]: mergedTheme
            }"
          >
            {{ handleValue1 }}
          </div>
        </transition>
      </v-follower>
    </v-binder>
    <v-binder v-if="range">
      <v-target>
        <div
          ref="handleRef2"
          class="n-slider-handle"
          tabindex="0"
          :style="secondHandleStyle"
          @focus="handleHandleFocus2"
          @blur="handleHandleBlur2"
          @mousedown="handleSecondHandleMouseDown"
          @mouseenter="handleSecondHandleMouseEnter"
          @mouseleave="handleSecondHandleMouseLeave"
        />
      </v-target>
      <v-follower
        ref="followerRef2"
        :show="mergedShowTooltip2"
        :to="adjustedTo"
        :placement="placement"
        :container-class="namespace"
      >
        <transition
          name="n-fade-in-scale-up-transition"
          :appear="isMounted"
          :css="!(active && prevActive)"
        >
          <div
            v-if="mergedShowTooltip2"
            class="n-slider-handle-indicator"
            :class="{
              [`n-${mergedTheme}-theme`]: mergedTheme
            }"
          >
            {{ handleValue2 }}
          </div>
        </transition>
      </v-follower>
    </v-binder>
    <div v-if="marks" class="n-slider-marks">
      <div
        v-for="mark in computedMarks"
        :key="mark.label"
        class="n-slider-mark"
        :style="mark.style"
      >
        {{ mark.label }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRef, computed, watch, nextTick } from 'vue'
import { VBinder, VTarget, VFollower } from 'vueuc'
import { useIsMounted, useMergedState } from 'vooks'
import { on, off } from 'evtd'
import { configurable, themeable, asFormItem, withCssr } from '../../_mixins'
import styles from './styles'
import { warn, call, useAdjustedTo } from '../../_utils'

function handleFirstHandleMouseMove (e) {
  const railRect = this.railRef.getBoundingClientRect()
  const offsetRatio = (e.clientX - railRect.left) / railRect.width
  const newValue = this.min + (this.max - this.min) * offsetRatio
  if (this.range) {
    this.dispatchValueUpdate([this.memoziedOtherValue, newValue])
  } else {
    this.dispatchValueUpdate(newValue)
  }
}

function handleSecondHandleMouseMove (e) {
  const railRect = this.railRef.getBoundingClientRect()
  const offsetRatio = (e.clientX - railRect.left) / railRect.width
  const newValue = this.min + (this.max - this.min) * offsetRatio
  if (this.range) {
    this.dispatchValueUpdate([this.memoziedOtherValue, newValue])
  }
}

export default {
  name: 'Slider',
  components: {
    VBinder,
    VTarget,
    VFollower
  },
  mixins: [configurable, themeable, withCssr(styles), asFormItem()],
  props: {
    defaultValue: {
      type: [Number, Array],
      default: null
    },
    marks: {
      type: Object,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    range: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Number, Array],
      default: undefined
    },
    placement: {
      type: String,
      default: 'top'
    },
    showTooltip: {
      type: Boolean,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: Function,
      default: undefined
    },
    // deprecated
    onChange: {
      validator () {
        if (__DEV__) {
          warn(
            'slider',
            '`on-change` is deprecated, please use `on-update:value` instead.'
          )
        }
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )

    const handleActive1Ref = ref(false)
    const handleActive2Ref = ref(false)
    const handleClicked1Ref = ref(false)
    const handleClicked2Ref = ref(false)

    const controlledShowTooltipRef = toRef(props, 'showTooltip')
    const mergedShowTooltip1Ref = useMergedState(
      controlledShowTooltipRef,
      handleActive1Ref
    )
    const mergedShowTooltip2Ref = useMergedState(
      controlledShowTooltipRef,
      handleActive2Ref
    )

    const activeRef = computed(() => {
      return handleActive1Ref.value || handleActive2Ref.value
    })
    const prevActiveRef = ref(activeRef.value)
    watch(activeRef, (value) => {
      nextTick(() => {
        prevActiveRef.value = value
      })
    })
    const clickedRef = computed(() => {
      return handleClicked1Ref.value || handleClicked2Ref.value
    })
    return {
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      isMounted: useIsMounted(),
      adjustedTo: useAdjustedTo(props),
      mergedShowTooltip1: mergedShowTooltip1Ref,
      mergedShowTooltip2: mergedShowTooltip2Ref,
      handleActive1: handleActive1Ref,
      handleActive2: handleActive2Ref,
      handleClicked1: handleClicked1Ref,
      handleClicked2: handleClicked2Ref,
      memoziedOtherValue: ref(null),
      changeSource: ref(null),
      active: activeRef,
      prevActive: prevActiveRef,
      clicked: clickedRef,
      // https://github.com/vuejs/vue-next/issues/2283
      handleRef1: ref(null),
      handleRef2: ref(null),
      railRef: ref(null),
      followerRef1: ref(null),
      followerRef2: ref(null)
    }
  },
  computed: {
    computedMarks () {
      const marks = []
      for (const value of Object.keys(this.marks)) {
        marks.push({
          label: this.marks[value],
          style: {
            left:
              ((Number(value) - this.min) / (this.max - this.min)) * 100 + '%'
          }
        })
      }
      return marks
    },
    fillStyle () {
      if (this.range) {
        return {
          left:
            ((this.handleValue1 - this.min) / (this.max - this.min)) * 100 +
            '%',
          width:
            ((this.handleValue2 - this.handleValue1) / (this.max - this.min)) *
              100 +
            '%'
        }
      } else {
        return {
          left: 0,
          width:
            ((this.handleValue1 - this.min) / (this.max - this.min)) * 100 + '%'
        }
      }
    },
    handleValue1 () {
      const { mergedValue, sanitizeValue } = this
      if (this.range) {
        if (mergedValue) {
          if (mergedValue[0] > mergedValue[1]) {
            return sanitizeValue(mergedValue[1])
          } else {
            return sanitizeValue(mergedValue[0])
          }
        }
        return null
      } else {
        return sanitizeValue(mergedValue)
      }
    },
    handleValue2 () {
      const { mergedValue, range } = this
      if (range && mergedValue) {
        if (mergedValue[0] > mergedValue[1]) {
          return this.sanitizeValue(mergedValue[0])
        } else {
          return this.sanitizeValue(mergedValue[1])
        }
      }
      return null
    },
    firstHandleStyle () {
      return {
        left:
          ((this.handleValue1 - this.min) / (this.max - this.min)) * 100 + '%',
        zIndex: this.handleClicked1 ? 1 : 0
      }
    },
    secondHandleStyle () {
      return {
        left:
          ((this.handleValue2 - this.min) / (this.max - this.min)) * 100 + '%',
        zIndex: this.handleClicked2 ? 1 : 0
      }
    }
  },
  watch: {
    mergedValue (newValue, oldValue) {
      const { changeSource } = this
      if (this.range && newValue) {
        if (oldValue && oldValue[1] !== newValue[1]) {
          this.$nextTick(() => {
            if (!(changeSource === 'click')) {
              this.doUpdateShow(false, true)
            }
            this.switchFocus()
          })
        } else if (oldValue && oldValue[0] !== newValue[0]) {
          this.$nextTick(() => {
            if (!(changeSource === 'click')) {
              this.doUpdateShow(true, false)
            }
            this.switchFocus()
          })
        } else if (newValue[0] === newValue[1]) {
          this.$nextTick(() => {
            if (!(changeSource === 'click')) {
              this.doUpdateShow(false, true)
            }
            this.switchFocus()
          })
        }
      }
      this.$nextTick(() => {
        // dom has changed but event is not fired, use marco task to make sure
        // relevant event handler is called
        setTimeout(() => {
          this.changeSource = null
        }, 0)
        if (this.range) {
          if (newValue && oldValue) {
            if (newValue[0] !== oldValue[0] || newValue[1] !== oldValue[1]) {
              this.syncPosition()
            }
          }
        } else {
          this.syncPosition()
        }
      })
    }
  },
  beforeUnmount () {
    off('mousemove', document, this.handleFirstHandleMouseMove)
    off('mousemove', document, this.handleSecondHandleMouseMove)
    off('mouseup', document, this.handleHandleMouseUp)
  },
  methods: {
    doUpdateValue (value) {
      const {
        onChange,
        'onUpdate:value': onUpdateValue,
        nTriggerFormInput,
        nTriggerFormChange
      } = this
      if (onChange) call(onChange, value)
      if (onUpdateValue) call(onUpdateValue, value)
      this.uncontrolledValue = value
      nTriggerFormInput()
      nTriggerFormChange()
    },
    doUpdateShow (show1, show2) {
      if (show1 !== undefined) {
        this.handleActive1 = show1
      }
      if (show2 !== undefined) {
        this.handleActive2 = show2
      }
    },
    syncPosition () {
      const { followerRef1, followerRef2 } = this
      if (followerRef1) followerRef1.syncPosition()
      if (followerRef2) followerRef2.syncPosition()
    },
    handleHandleFocus1 () {
      if (this.clicked) return
      this.doUpdateShow(true, false)
    },
    handleHandleFocus2 () {
      if (this.clicked) return
      this.doUpdateShow(false, true)
    },
    handleHandleBlur1 () {
      if (this.clicked) return
      this.doUpdateShow(false, false)
    },
    handleHandleBlur2 () {
      if (this.clicked) return
      this.doUpdateShow(false, false)
    },
    handleRailClick (e) {
      const railRect = this.railRef.getBoundingClientRect()
      const offsetRatio = (e.clientX - railRect.left) / railRect.width
      const newValue = this.min + (this.max - this.min) * offsetRatio
      if (!this.range) {
        this.dispatchValueUpdate(newValue, { source: 'click' })
        this.handleRef1.focus()
      } else {
        if (this.mergedValue) {
          if (
            Math.abs(this.handleValue1 - newValue) <
            Math.abs(this.handleValue2 - newValue)
          ) {
            this.dispatchValueUpdate([newValue, this.handleValue2], {
              source: 'click'
            })
            this.handleRef1.focus()
          } else {
            this.dispatchValueUpdate([this.handleValue1, newValue], {
              source: 'click'
            })
            this.handleRef2.focus()
          }
        } else {
          this.dispatchValueUpdate([newValue, newValue], { source: 'click' })
          this.handleRef1.focus()
        }
      }
    },
    handleKeyDownRight () {
      if (this.clicked) return
      let firstHandleFocused = false
      let handleValue = null
      if (document.activeElement === this.handleRef1) {
        firstHandleFocused = true
        handleValue = this.handleValue1
      } else {
        handleValue = this.handleValue2
      }
      let nextValue =
        Math.floor(handleValue / this.step) * this.step + this.step
      if (this.marks) {
        for (let key of Object.keys(this.marks)) {
          key = Number(key)
          if (key > handleValue && key < nextValue) {
            nextValue = key
          }
        }
      }
      if (this.range) {
        if (firstHandleFocused) {
          this.dispatchValueUpdate([nextValue, this.handleValue2], {
            source: 'keyboard'
          })
        } else {
          this.dispatchValueUpdate([this.handleValue1, nextValue], {
            source: 'keyboard'
          })
        }
      } else {
        this.dispatchValueUpdate(nextValue, { source: 'keyboard' })
      }
    },
    handleKeyDownLeft () {
      if (this.clicked) return
      let firstHandleFocused = false
      let handleValue = null
      if (document.activeElement === this.handleRef1) {
        firstHandleFocused = true
        handleValue = this.handleValue1
      } else if (document.activeElement === this.handleRef2) {
        handleValue = this.handleValue2
      } else {
        return
      }
      let nextValue = Math.ceil(handleValue / this.step) * this.step - this.step
      if (this.marks) {
        for (let key of Object.keys(this.marks)) {
          key = Number(key)
          if (key < handleValue && key > nextValue) {
            nextValue = key
          }
        }
      }
      if (this.range) {
        if (firstHandleFocused) {
          this.dispatchValueUpdate([nextValue, this.handleValue2], {
            source: 'keyboard'
          })
        } else {
          this.dispatchValueUpdate([this.handleValue1, nextValue], {
            source: 'keyboard'
          })
        }
      } else {
        this.dispatchValueUpdate(nextValue, { source: 'keyboard' })
      }
    },
    switchFocus () {
      if (this.range) {
        const firstHandle = this.handleRef1
        const secondHandle = this.handleRef2
        if (firstHandle && secondHandle) {
          if (this.handleActive1 && document.activeElement === secondHandle) {
            this.disableTransitionOneTick()
            firstHandle.focus()
            if (this.handleClicked2) {
              this.handleClicked2 = false
              this.handleClicked1 = true
            }
          } else if (
            this.handleActive2 &&
            document.activeElement === firstHandle
          ) {
            this.disableTransitionOneTick()
            secondHandle.focus()
            if (this.handleClicked1) {
              this.handleClicked1 = false
              this.handleClicked2 = true
            }
          }
        }
      }
    },
    getClosestMarkValue (currentValue) {
      if (this.marks) {
        const markValues = Object.keys(this.marks).map((key) => Number(key))
        let diff = null
        let closestValue = null
        for (const value of markValues) {
          if (closestValue === null) {
            closestValue = value
            diff = Math.abs(value - currentValue)
          } else {
            const newDiff = Math.abs(value - currentValue)
            if (newDiff < diff) {
              closestValue = value
              diff = newDiff
            }
          }
        }
        return closestValue
      }
    },
    sanitizeValue (value) {
      let justifiedValue = value
      justifiedValue = Math.max(this.min, justifiedValue)
      justifiedValue = Math.min(this.max, justifiedValue)
      justifiedValue =
        Math.round((justifiedValue - this.min) / this.step) * this.step +
        this.min
      if (this.marks) {
        const closestMarkValue = this.getClosestMarkValue(value)
        if (
          closestMarkValue !== null &&
          Math.abs(justifiedValue - value) > Math.abs(closestMarkValue - value)
        ) {
          justifiedValue = closestMarkValue
        }
      }
      return justifiedValue
    },
    handleFirstHandleMouseDown () {
      if (this.range) {
        this.memoziedOtherValue = this.handleValue2
      }
      this.doUpdateShow(true, false)
      this.handleClicked1 = true
      on('mouseup', document, this.handleHandleMouseUp)
      on('mousemove', document, this.handleFirstHandleMouseMove)
    },
    handleSecondHandleMouseDown () {
      if (this.range) {
        this.memoziedOtherValue = this.handleValue1
      }
      this.doUpdateShow(false, true)
      this.handleClicked2 = true
      on('mouseup', document, this.handleHandleMouseUp)
      on('mousemove', document, this.handleSecondHandleMouseMove)
    },
    handleHandleMouseUp (e) {
      if (
        !this.handleRef1.contains(e.target) &&
        (this.range ? !this.handleRef2.contains(e.target) : true)
      ) {
        this.doUpdateShow(false, false)
      }
      this.handleClicked2 = false
      this.handleClicked1 = false
      off('mouseup', document, this.handleHandleMouseUp)
      off('mousemove', document, this.handleFirstHandleMouseMove)
      off('mousemove', document, this.handleSecondHandleMouseMove)
    },
    dispatchValueUpdate (value, options = { source: null }) {
      const { source } = options
      const { range, sanitizeValue } = this
      if (range) {
        if (Array.isArray(value)) {
          if (value[0] > value[1]) {
            value = [sanitizeValue(value[1]), sanitizeValue(value[0])]
          } else {
            value = [sanitizeValue(value[0]), sanitizeValue(value[1])]
          }
          const { mergedValue: oldValue } = this
          if (
            !Array.isArray(oldValue) ||
            oldValue[0] !== value[0] ||
            oldValue[1] !== value[1]
          ) {
            this.changeSource = source
            this.doUpdateValue(value)
          }
        }
      } else {
        const { mergedValue: oldValue, max, min } = this
        if (value > max) {
          if (oldValue !== max) {
            this.changeSource = source
            this.doUpdateValue(this.max)
          }
        } else if (value < min) {
          if (oldValue !== min) {
            this.changeSource = source
            this.doUpdateValue(min)
          }
        } else {
          const newValue = this.sanitizeValue(value)
          if (oldValue !== newValue) {
            this.changeSource = source
            this.doUpdateValue(newValue)
          }
        }
      }
    },
    /** do not throttle to make ui sync with action after final move */
    handleFirstHandleMouseMove,
    handleSecondHandleMouseMove,
    handleFirstHandleMouseEnter () {
      if (!this.active) {
        this.doUpdateShow(true, undefined)
        this.$nextTick(() => {
          this.syncPosition()
        })
      }
    },
    handleFirstHandleMouseLeave () {
      if (this.changeSource === 'keyboard') return
      if (!this.active) {
        this.doUpdateShow(false, false)
      } else if (!this.clicked) {
        this.doUpdateShow(false, false)
      }
    },
    handleSecondHandleMouseEnter () {
      if (!this.active) {
        this.doUpdateShow(undefined, true)
        this.$nextTick(() => {
          this.syncPosition()
        })
      }
    },
    handleSecondHandleMouseLeave () {
      if (this.changeSource === 'keyboard') return
      if (!this.active) {
        this.doUpdateShow(false, false)
      } else if (!this.clicked) {
        this.doUpdateShow(false, false)
      }
    },
    disableTransitionOneTick () {
      const { handleRef1, handleRef2 } = this
      if (handleRef1) {
        handleRef1.style.transition = 'none'
        this.$nextTick(() => {
          const { handleRef1 } = this
          if (handleRef1) {
            handleRef1.style.transition = ''
          }
        })
      }
      if (handleRef2) {
        handleRef2.style.transition = 'none'
        this.$nextTick(() => {
          const { handleRef2 } = this
          if (handleRef2) {
            handleRef2.style.transition = ''
          }
        })
      }
    }
  }
}
</script>
