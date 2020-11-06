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
    <div
      ref="firstHandleRef"
      class="n-slider-handle"
      tabindex="0"
      :style="firstHandleStyle"
      @mousedown="handleFirstHandleMouseDown"
      @mouseenter="handleFirstHandleMouseEnter"
      @mouseleave="handleFirstHandleMouseLeave"
    />
    <div
      v-if="range"
      ref="secondHandleRef"
      class="n-slider-handle"
      tabindex="0"
      :style="secondHandleStyle"
      @mousedown="handleSecondHandleMouseDown"
      @mouseenter="handleSecondHandleMouseEnter"
      @mouseleave="handleSecondHandleMouseLeave"
    />
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
    <n-base-lazy-teleport
      :show="showTooltip"
      adjust-to
    >
      <div
        ref="offsetContainerRef"
        v-zindexable="{ enabled: showTooltip }"
        class="n-positioning-container"
        :class="{
          [namespace]: namespace
        }"
      >
        <div
          ref="trackingRef"
          class="n-positioning-content"
        >
          <transition
            name="n-fade-in-scale-up-transition"
            :appear="isMounted"
          >
            <div
              v-if="showTooltip"
              class="n-slider-handle-indicator"
              :class="{
                [`n-${mergedTheme}-theme`]: mergedTheme
              }"
            >
              {{ activeHandleValue === null ? tooltipHoverDisplayValue : activeHandleValue }}
            </div>
          </transition>
        </div>
      </div>
    </n-base-lazy-teleport>
  </div>
</template>

<script>
import { ref } from 'vue'
import {
  configurable,
  themeable,
  placeable,
  asformitem,
  usecssr
} from '../../_mixins'
import {
  zindexable
} from '../../_directives'
import styles from './styles'
import { warn } from '../../_utils/naive'
import { call } from '../../_utils/vue'
import { useIsMounted } from 'vooks'
import { NBaseLazyTeleport } from '../../_base'

function handleFirstHandleMouseMove (e) {
  const railRect = this.railRef.getBoundingClientRect()
  const offsetRatio = (e.clientX - railRect.left) / railRect.width
  const newValue = this.min + (this.max - this.min) * offsetRatio
  if (this.range) {
    this.emitInputEvent([this.memoziedOtherValue, newValue])
  } else {
    this.emitInputEvent(newValue)
  }
}

function handleSecondHandleMouseMove (e) {
  const railRect = this.railRef.getBoundingClientRect()
  const offsetRatio = (e.clientX - railRect.left) / railRect.width
  const newValue = this.min + (this.max - this.min) * offsetRatio
  if (this.range) {
    this.emitInputEvent([this.memoziedOtherValue, newValue])
  }
}

export default {
  name: 'Slider',
  directives: {
    zindexable
  },
  components: {
    NBaseLazyTeleport
  },
  mixins: [
    configurable,
    themeable,
    placeable,
    usecssr(styles),
    asformitem()
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
  setup () {
    return {
      isMounted: useIsMounted(),
      // https://github.com/vuejs/vue-next/issues/2283
      firstHandleRef: ref(null),
      secondHandleRef: ref(null),
      railRef: ref(null),
      offsetContainerRef: ref(null),
      trackingRef: ref(null)
    }
  },
  data () {
    return {
      unstableMemorizedRef: {},
      showTooltip: false,
      firstHandleActive: false,
      secondHandleActive: false,
      firstHandleClicked: false,
      secondHandleClicked: false,
      memoziedOtherValue: null,
      valueChangedByRailClick: true,
      tooltipHoverDisplayValue: ''
    }
  },
  computed: {
    __placeableEnabled () {
      return this.showTooltip
    },
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
          left: ((this.firstHandleValue - this.min) / (this.max - this.min) * 100) + '%',
          width: ((this.secondHandleValue - this.firstHandleValue) / (this.max - this.min) * 100) + '%'
        }
      } else {
        return {
          left: 0,
          width: ((this.firstHandleValue - this.min) / (this.max - this.min) * 100) + '%'
        }
      }
    },
    activeHandleValue () {
      if (this.firstHandleActive) {
        return this.firstHandleValue
      } else if (this.secondHandleActive) {
        return this.secondHandleValue
      }
      return null
    },
    firstHandleValue () {
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
    secondHandleValue () {
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
        left: ((this.firstHandleValue - this.min) / (this.max - this.min) * 100) + '%',
        zIndex: this.firstHandleActive ? 1 : 0
      }
    },
    secondHandleStyle () {
      return {
        left: ((this.secondHandleValue - this.min) / (this.max - this.min) * 100) + '%',
        zIndex: this.secondHandleActive ? 1 : 0
      }
    },
    active () {
      return this.firstHandleActive || this.secondHandleActive
    },
    clicked () {
      return this.firstHandleClicked || this.secondHandleClicked
    }
  },
  watch: {
    value (newValue, oldValue) {
      if (this.range && newValue) {
        if (oldValue && oldValue[1] !== newValue[1]) {
          this.$nextTick(() => {
            if (!this.valueChangedByRailClick) {
              this.firstHandleActive = false
              this.secondHandleActive = true
            } else {
              this.valueChangedByRailClick = false
            }
            this.switchFocus()
          })
        } else if (oldValue && oldValue[0] !== newValue[0]) {
          this.$nextTick(() => {
            if (!this.valueChangedByRailClick) {
              this.firstHandleActive = true
              this.secondHandleActive = false
            } else {
              this.valueChangedByRailClick = false
            }
            this.switchFocus()
          })
        } else if (newValue[0] === newValue[1]) {
          this.$nextTick(() => {
            if (!this.valueChangedByRailClick) {
              this.firstHandleActive = false
              this.secondHandleActive = true
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
              this.__placeableSyncPosition()
            }
          }
        } else {
          this.__placeableSyncPosition()
        }
      })
    }
  },
  beforeUnmount () {
    window.removeEventListener('mousemove', this.handleFirstHandleMouseMove)
    window.removeEventListener('mouseup', this.handleFirstHandleMouseUp)
    window.removeEventListener('mousemove', this.handleSecondHandleMouseMove)
    window.removeEventListener('mouseup', this.handleSecondHandleMouseUp)
  },
  methods: {
    __placeableTracked () {
      if (this.firstHandleActive) {
        return this.firstHandleRef
      } else if (this.secondHandleActive) {
        return this.secondHandleRef
      }
      return this.$el // for registering scroll listeners
    },
    __placeableTracking () {
      if (this.trackingRef) {
        return (this.unstableMemorizedRef.tracking = this.trackingRef)
      } else {
        return this.unstableMemorizedRef.tracking
      }
    },
    __placeableOffsetContainer () {
      if (this.offsetContainerRef) {
        return (this.unstableMemorizedRef.offsetContainer = this.offsetContainerRef)
      } else {
        return this.unstableMemorizedRef.offsetContainer
      }
    },
    __placeableBody () {
      return null
    },
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
    handleRailClick (e) {
      this.valueChangedByRailClick = true
      const railRect = this.railRef.getBoundingClientRect()
      const offsetRatio = (e.clientX - railRect.left) / railRect.width
      const newValue = this.min + (this.max - this.min) * offsetRatio
      if (!this.range) {
        this.emitInputEvent(newValue)
        this.firstHandleRef.focus()
      } else {
        if (this.value) {
          if (Math.abs(this.firstHandleValue - newValue) < Math.abs(this.secondHandleValue - newValue)) {
            this.emitInputEvent([newValue, this.secondHandleValue])
            this.firstHandleRef.focus()
          } else {
            this.emitInputEvent([this.firstHandleValue, newValue])
            this.secondHandleRef.focus()
          }
        } else {
          this.emitInputEvent([newValue, newValue])
          this.firstHandleRef.focus()
        }
      }
    },
    handleKeyDownRight () {
      let firstHandleFocused = false
      let handleValue = null
      if (document.activeElement === this.firstHandleRef) {
        firstHandleFocused = true
        handleValue = this.firstHandleValue
      } else {
        handleValue = this.secondHandleValue
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
          this.emitInputEvent([nextValue, this.secondHandleValue])
        } else {
          this.emitInputEvent([this.firstHandleValue, nextValue])
        }
      } else {
        this.emitInputEvent(nextValue)
      }
    },
    handleKeyDownLeft () {
      let firstHandleFocused = false
      let handleValue = null
      if (document.activeElement === this.firstHandleRef) {
        firstHandleFocused = true
        handleValue = this.firstHandleValue
      } else {
        handleValue = this.secondHandleValue
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
          this.emitInputEvent([nextValue, this.secondHandleValue])
        } else {
          this.emitInputEvent([this.firstHandleValue, nextValue])
        }
      } else {
        this.emitInputEvent(nextValue)
      }
    },
    switchFocus () {
      if (this.range) {
        const firstHandle = this.firstHandleRef
        const secondHandle = this.secondHandleRef
        if (firstHandle && secondHandle) {
          if (this.firstHandleActive && document.activeElement === secondHandle) {
            this.disableTransitionOneTick()
            firstHandle.focus()
          } else if (this.secondHandleActive && document.activeElement === firstHandle) {
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
        this.memoziedOtherValue = this.secondHandleValue
      }
      this.firstHandleActive = true
      this.firstHandleClicked = true
      window.addEventListener('mouseup', this.handleFirstHandleMouseUp)
      window.addEventListener('mousemove', this.handleFirstHandleMouseMove)
    },
    handleSecondHandleMouseDown () {
      if (this.range) {
        this.memoziedOtherValue = this.firstHandleValue
      }
      this.secondHandleActive = true
      this.secondHandleClicked = true
      window.addEventListener('mouseup', this.handleSecondHandleMouseUp)
      window.addEventListener('mousemove', this.handleSecondHandleMouseMove)
    },
    handleFirstHandleMouseUp (e) {
      this.secondHandleActive = false
      this.firstHandleActive = false
      this.secondHandleClicked = false
      this.firstHandleClicked = false
      if (!this.firstHandleRef.contains(e.target)) {
        this.showTooltip = false
      } else {
        this.tooltipHoverDisplayValue = this.firstHandleValue
      }
      window.removeEventListener('mouseup', this.handleFirstHandleMouseUp)
      window.removeEventListener('mousemove', this.handleFirstHandleMouseMove)
    },
    handleSecondHandleMouseUp (e) {
      this.secondHandleActive = false
      this.firstHandleActive = false
      this.secondHandleClicked = false
      this.firstHandleClicked = false
      if (!this.firstHandleRef.contains(e.target)) {
        this.showTooltip = false
      } else {
        this.tooltipHoverDisplayValue = this.secondHandleValue
      }
      window.removeEventListener('mouseup', this.handleSecondHandleMouseUp)
      window.removeEventListener('mousemove', this.handleSecondHandleMouseMove)
    },
    emitInputEvent (value) {
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
        this.showTooltip = true
        this.firstHandleActive = true
        this.tooltipHoverDisplayValue = this.firstHandleValue
        this.$nextTick(() => {
          this.__placeableSyncPosition()
        })
      }
    },
    handleFirstHandleMouseLeave () {
      if (!this.active) this.showTooltip = false
      if (this.active && !this.clicked) {
        this.secondHandleActive = false
        this.firstHandleActive = false
        this.showTooltip = false
      }
    },
    handleSecondHandleMouseEnter () {
      if (!this.active) {
        this.showTooltip = true
        this.secondHandleActive = true
        this.tooltipHoverDisplayValue = this.secondHandleValue
        this.$nextTick(() => {
          this.__placeableSyncPosition()
        })
      }
    },
    handleSecondHandleMouseLeave () {
      if (!this.active) this.showTooltip = false
      if (this.active && !this.clicked) {
        this.secondHandleActive = false
        this.firstHandleActive = false
        this.showTooltip = false
      }
    },
    disableTransitionOneTick () {
      const firstHandle = this.firstHandleRef
      if (firstHandle) {
        firstHandle.style.transition = 'none'
        this.$nextTick(() => {
          if (this.firstHandleRef) {
            this.firstHandleRef.style.transition = null
          }
        })
      }
      const secondHandle = this.secondHandleRef
      if (secondHandle) {
        secondHandle.style.transition = 'none'
        this.$nextTick(() => {
          if (this.secondHandleRef) {
            this.secondHandleRef.style.transition = null
          }
        })
      }
    }
  }
}
</script>
