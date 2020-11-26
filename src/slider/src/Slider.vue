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
    <div
      ref="railRef"
      class="n-slider-rail"
      @click="handleRailClick"
    >
      <div
        class="n-slider-rail__fill"
        :style="fillStyle"
      />
      <div
        v-if="marks"
        class="n-slider-dots"
      >
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
    <v-binder
      v-if="range"
    >
      <v-target>
        <div
          ref="handleRef2"
          class="n-slider-handle"
          tabindex="0"
          :style="secondHandleStyle"
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
    <div
      v-if="marks"
      class="n-slider-marks"
    >
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
import {
  VBinder,
  VTarget,
  VFollower
} from 'vueuc'
import { useIsMounted, useMergedState } from 'vooks'
import { on, off } from 'evtd'
import {
  configurable,
  themeable,
  asFormItem,
  withCssr
} from '../../_mixins'
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
  mixins: [
    configurable,
    themeable,
    withCssr(styles),
    asFormItem()
  ],
  props: {
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
      default: null
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
        if (__DEV__) warn('slider', '`on-change` is deprecated, please use `on-update:value` instead.')
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const handleActive1Ref = ref(false)
    const handleActive2Ref = ref(false)
    const controlledShowTooltipRef = toRef(props, 'showTooltip')
    const mergedShowTooltip1Ref = useMergedState(
      controlledShowTooltipRef,
      handleActive1Ref
    )
    const mergedShowTooltip2Ref = useMergedState(
      controlledShowTooltipRef,
      handleActive2Ref
    )
    const handleClicked1Ref = ref(false)
    const handleClicked2Ref = ref(false)
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
      isMounted: useIsMounted(),
      adjustedTo: useAdjustedTo(props),
      mergedShowTooltip1: mergedShowTooltip1Ref,
      mergedShowTooltip2: mergedShowTooltip2Ref,
      handleActive1: handleActive1Ref,
      handleActive2: handleActive2Ref,
      handleClicked1: handleClicked1Ref,
      handleClicked2: handleClicked2Ref,
      memoziedOtherValue: ref(null),
      valueChangedByRailClick: ref(true),
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
            left: ((Number(value) - this.min) / (this.max - this.min) * 100) + '%'
          }
        })
      }
      return marks
    },
    fillStyle () {
      if (this.range) {
        return {
          left: ((this.handleValue1 - this.min) / (this.max - this.min) * 100) + '%',
          width: ((this.handleValue2 - this.handleValue1) / (this.max - this.min) * 100) + '%'
        }
      } else {
        return {
          left: 0,
          width: ((this.handleValue1 - this.min) / (this.max - this.min) * 100) + '%'
        }
      }
    },
    handleValue1 () {
      if (this.range) {
        if (this.value) {
          if (this.value[0] > this.value[1]) {
            return this.justifyValue(this.value[1])
          } else {
            return this.justifyValue(this.value[0])
          }
        } return null
      } else {
        return this.justifyValue(this.value)
      }
    },
    handleValue2 () {
      if (this.range && this.value) {
        if (this.value[0] > this.value[1]) {
          return this.justifyValue(this.value[0])
        } else {
          return this.justifyValue(this.value[1])
        }
      }
      return null
    },
    firstHandleStyle () {
      return {
        left: ((this.handleValue1 - this.min) / (this.max - this.min) * 100) + '%',
        zIndex: this.handleClicked1 ? 1 : 0
      }
    },
    secondHandleStyle () {
      return {
        left: ((this.handleValue2 - this.min) / (this.max - this.min) * 100) + '%',
        zIndex: this.handleClicked2 ? 1 : 0
      }
    }
  },
  watch: {
    value (newValue, oldValue) {
      if (this.range && newValue) {
        if (oldValue && oldValue[1] !== newValue[1]) {
          this.$nextTick(() => {
            if (!this.valueChangedByRailClick) {
              this.handleActive1 = false
              this.handleActive2 = true
            } else {
              this.valueChangedByRailClick = false
            }
            this.switchFocus()
          })
        } else if (oldValue && oldValue[0] !== newValue[0]) {
          this.$nextTick(() => {
            if (!this.valueChangedByRailClick) {
              this.handleActive1 = true
              this.handleActive2 = false
            } else {
              this.valueChangedByRailClick = false
            }
            this.switchFocus()
          })
        } else if (newValue[0] === newValue[1]) {
          this.$nextTick(() => {
            if (!this.valueChangedByRailClick) {
              this.handleActive1 = false
              this.handleActive2 = true
            } else {
              this.valueChangedByRailClick = false
            }
            this.switchFocus()
          })
        }
      }
      this.$nextTick(() => {
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
    off('mousemove', window, this.handleFirstHandleMouseMove)
    off('mouseup', window, this.handleFirstHandleMouseUp)
    off('mousemove', window, this.handleSecondHandleMouseMove)
    off('mouseup', window, this.handleSecondHandleMouseUp)
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
    handleRailClick (e) {
      this.valueChangedByRailClick = true
      const railRect = this.railRef.getBoundingClientRect()
      const offsetRatio = (e.clientX - railRect.left) / railRect.width
      const newValue = this.min + (this.max - this.min) * offsetRatio
      if (!this.range) {
        this.dispatchValueUpdate(newValue)
        this.handleRef1.focus()
      } else {
        if (this.value) {
          if (Math.abs(this.handleValue1 - newValue) < Math.abs(this.handleValue2 - newValue)) {
            this.dispatchValueUpdate([newValue, this.handleValue2])
            this.handleRef1.focus()
          } else {
            this.dispatchValueUpdate([this.handleValue1, newValue])
            this.handleRef2.focus()
          }
        } else {
          this.dispatchValueUpdate([newValue, newValue])
          this.handleRef1.focus()
        }
      }
    },
    handleKeyDownRight () {
      let firstHandleFocused = false
      let handleValue = null
      if (document.activeElement === this.handleRef1) {
        firstHandleFocused = true
        handleValue = this.handleValue1
      } else {
        handleValue = this.handleValue2
      }
      let nextValue = Math.floor(handleValue / this.step) * this.step + this.step
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
          this.dispatchValueUpdate([nextValue, this.handleValue2])
        } else {
          this.dispatchValueUpdate([this.handleValue1, nextValue])
        }
      } else {
        this.dispatchValueUpdate(nextValue)
      }
    },
    handleKeyDownLeft () {
      let firstHandleFocused = false
      let handleValue = null
      if (document.activeElement === this.handleRef1) {
        firstHandleFocused = true
        handleValue = this.handleValue1
      } else {
        handleValue = this.handleValue2
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
          this.dispatchValueUpdate([nextValue, this.handleValue2])
        } else {
          this.dispatchValueUpdate([this.handleValue1, nextValue])
        }
      } else {
        this.dispatchValueUpdate(nextValue)
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
          } else if (this.handleActive2 && document.activeElement === firstHandle) {
            this.disableTransitionOneTick()
            secondHandle.focus()
          }
        }
      }
    },
    getClosestMarkValue (currentValue) {
      if (this.marks) {
        const markValues = Object.keys(this.marks).map(key => Number(key))
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
    justifyValue (value) {
      let justifiedValue = value
      justifiedValue = Math.max(this.min, justifiedValue)
      justifiedValue = Math.min(this.max, justifiedValue)
      justifiedValue = Math.round((justifiedValue - this.min) / this.step) * this.step + this.min
      if (this.marks) {
        const closestMarkValue = this.getClosestMarkValue(value)
        if (closestMarkValue !== null && Math.abs(justifiedValue - value) > Math.abs(closestMarkValue - value)) {
          justifiedValue = closestMarkValue
        }
      }
      return justifiedValue
    },
    handleFirstHandleMouseDown () {
      if (this.range) {
        this.memoziedOtherValue = this.handleValue2
      }
      this.handleActive1 = true
      this.handleClicked1 = true
      on('mouseup', window, this.handleFirstHandleMouseUp)
      on('mousemove', window, this.handleFirstHandleMouseMove)
    },
    handleSecondHandleMouseDown () {
      if (this.range) {
        this.memoziedOtherValue = this.handleValue1
      }
      this.handleActive2 = true
      this.handleClicked2 = true
      on('mouseup', window, this.handleSecondHandleMouseUp)
      on('mousemove', window, this.handleSecondHandleMouseMove)
    },
    handleFirstHandleMouseUp (e) {
      this.handleClicked2 = false
      this.handleClicked1 = false
      if (!this.handleRef1.contains(e.target)) {
        this.doUpdateShow(false, undefined)
      }
      off('mouseup', window, this.handleFirstHandleMouseUp)
      off('mousemove', window, this.handleFirstHandleMouseMove)
    },
    handleSecondHandleMouseUp (e) {
      this.handleClicked2 = false
      this.handleClicked1 = false
      if (!this.handleRef1.contains(e.target)) {
        this.doUpdateShow(undefined, false)
      }
      off('mouseup', window, this.handleSecondHandleMouseUp)
      off('mousemove', window, this.handleSecondHandleMouseMove)
    },
    dispatchValueUpdate (value) {
      if (this.range) {
        if (Array.isArray(value)) {
          if (value[0] > value[1]) {
            value = [this.justifyValue(value[1]), this.justifyValue(value[0])]
          } else {
            value = [this.justifyValue(value[0]), this.justifyValue(value[1])]
          }
          this.doUpdateValue(value)
        }
      } else {
        if (value > this.max) {
          if (this.value !== this.max) {
            this.doUpdateValue(this.max)
          }
        } else if (value < this.min) {
          if (this.value !== this.min) {
            this.doUpdateValue(this.min)
          }
        } else {
          if (this.value !== value) {
            this.doUpdateValue(this.justifyValue(value))
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
        this.handleActive1 = true
        this.$nextTick(() => {
          this.syncPosition()
        })
      }
    },
    handleFirstHandleMouseLeave () {
      if (!this.active) {
        this.doUpdateShow(false, false)
      } else if (!this.clicked) {
        this.handleActive2 = false
        this.handleActive1 = false
        this.doUpdateShow(false, false)
      }
    },
    handleSecondHandleMouseEnter () {
      if (!this.active) {
        this.doUpdateShow(undefined, true)
        this.handleActive2 = true
        this.$nextTick(() => {
          this.syncPosition()
        })
      }
    },
    handleSecondHandleMouseLeave () {
      if (!this.active) {
        this.doUpdateShow(false, false)
      } else if (!this.clicked) {
        this.handleActive2 = false
        this.handleActive1 = false
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
