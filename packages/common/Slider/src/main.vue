<template>
  <div
    class="n-slider"
    :class="{
      'n-slider--disabled': disabled,
      'n-slider--active': active,
      'n-slider--with-mark': marks
    }"
  >
    <div
      ref="rail"
      class="n-slider-rail"
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
          class="n-slider-dot simulate-transparent-background"
          :style="mark.style"
        />
      </div>
    </div>
    <div
      ref="firstHandle"
      class="n-slider-handle simulate-transparent-background"
      tabindex="0"
      :style="firstHandleStyle"
      @mousedown="handleFirstHandleMouseDown"
      @mouseenter="handleFirstHandleMouseEnter"
      @mouseleave="handleFirstHandleMouseLeave"
    />
    <div
      v-if="range"
      ref="secondHandle"
      class="n-slider-handle simulate-transparent-background"
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
    <div
      ref="contentContainer"
      class="n-detached-content-container"
    >
      <div

        ref="content"
        class="n-detached-content"
      >
        <transition name="n-fade-in-scale-up--transition">
          <div
            v-if="showTooltip"
            class="n-slider-handle-indicator"
          >
            {{ activeHandleValue || tooltipHoverDisplayValue }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import texttransparentable from '../../../mixins/texttransparentable'
import detachable from '../../../mixins/detachable'
import placeable from '../../../mixins/placeable'

function handleFirstHandleMouseMove (e) {
  const railRect = this.$refs.rail.getBoundingClientRect()
  const offsetRatio = (e.clientX - railRect.left) / railRect.width
  const newValue = this.min + (this.max - this.min) * offsetRatio
  if (this.range) {
    this.emitInputEvent([this.memoziedOtherValue, newValue])
  } else {
    this.emitInputEvent(newValue)
  }
}

function handleSecondHandleMouseMove (e) {
  const railRect = this.$refs.rail.getBoundingClientRect()
  const offsetRatio = (e.clientX - railRect.left) / railRect.width
  const newValue = this.min + (this.max - this.min) * offsetRatio
  if (this.range) {
    this.emitInputEvent([this.memoziedOtherValue, newValue])
  }
}

export default {
  name: 'NSlider',
  mixins: [texttransparentable, detachable, placeable],
  props: {
    marks: {
      type: Object,
      default: null
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
    }
  },
  data () {
    return {
      showTooltip: false,
      firstHandleActive: false,
      secondHandleActive: false,
      memoziedOtherValue: null,
      tooltipHoverDisplayValue: ''
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
    }
  },
  watch: {
    value (newValue, oldValue) {
      if (this.range && newValue && this.showTooltip) {
        if (oldValue && oldValue[1] !== newValue[1]) {
          this.$nextTick().then(() => {
            this.firstHandleActive = false
            this.secondHandleActive = true
            this.switchFocus()
          })
        } else if (oldValue && oldValue[0] !== newValue[0]) {
          this.$nextTick().then(() => {
            this.firstHandleActive = true
            this.secondHandleActive = false
            this.switchFocus()
          })
        } else if (newValue[0] === newValue[1]) {
          this.$nextTick().then(() => {
            this.firstHandleActive = false
            this.secondHandleActive = true
            this.switchFocus()
          })
        }
      }
      this.$nextTick().then(() => {
        this.updatePosition()
      })
    }
  },
  beforeDestroy () {
    window.removeEventListener('mousemove', this.throttledHandleFirstHandleMouseMove)
    window.removeEventListener('mouseup', this.handleFirstHandleMouseUp)
  },
  methods: {
    switchFocus () {
      if (this.range) {
        const firstHandle = this.$refs.firstHandle
        const secondHandle = this.$refs.secondHandle
        if (firstHandle && secondHandle) {
          if (this.firstHandleActive && document.activeElement === secondHandle) {
            this.blockTransitionOneTick()
            firstHandle.focus()
          } else if (this.secondHandleActive && document.activeElement === firstHandle) {
            this.blockTransitionOneTick()
            secondHandle.focus()
          }
        }
      }
    },
    getTrackedElement () {
      if (this.firstHandleActive) {
        return this.$refs.firstHandle
      } else if (this.secondHandleActive) {
        return this.$refs.secondHandle
      } else {
        return this.$el
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
      if (this.min !== null) {
        justifiedValue = Math.max(this.min, justifiedValue)
      }
      if (this.max !== null) {
        justifiedValue = Math.min(this.max, justifiedValue)
      }
      justifiedValue = Math.round(justifiedValue / this.step) * this.step
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
      window.addEventListener('mouseup', this.handleFirstHandleMouseUp)
      window.addEventListener('mousemove', this.throttledHandleFirstHandleMouseMove)
    },
    handleSecondHandleMouseDown () {
      if (this.range) {
        this.memoziedOtherValue = this.firstHandleValue
      }
      this.secondHandleActive = true
      window.addEventListener('mouseup', this.handleSecondHandleMouseUp)
      window.addEventListener('mousemove', this.throttledHandleSecondHandleMouseMove)
    },
    handleFirstHandleMouseUp (e) {
      this.secondHandleActive = false
      this.firstHandleActive = false
      if (!this.$refs.firstHandle.contains(e.target)) {
        this.showTooltip = false
      }
      window.removeEventListener('mouseup', this.handleFirstHandleMouseUp)
      window.removeEventListener('mousemove', this.throttledHandleFirstHandleMouseMove)
    },
    handleSecondHandleMouseUp (e) {
      this.secondHandleActive = false
      this.firstHandleActive = false
      if (!this.$refs.firstHandle.contains(e.target)) {
        this.showTooltip = false
      }
      window.removeEventListener('mouseup', this.handleSecondHandleMouseUp)
      window.removeEventListener('mousemove', this.throttledHandleSecondHandleMouseMove)
    },
    emitInputEvent (value) {
      if (this.range) {
        if (Array.isArray(value)) {
          if (value[0] > value[1]) {
            value = [this.justifyValue(value[1]), this.justifyValue(value[0])]
          } else {
            value = [this.justifyValue(value[0]), this.justifyValue(value[1])]
          }
          this.$emit('input', value)
        }
      } else {
        if (value > this.max) {
          if (this.value !== this.max) {
            this.$emit('input', this.max)
          }
        } else if (value < this.min) {
          if (this.value !== this.min) {
            this.$emit('input', this.min)
          }
        } else {
          if (this.value !== value) {
            this.$emit('input', this.justifyValue(value))
          }
        }
      }
    },
    throttledHandleFirstHandleMouseMove: throttle(function (e) { handleFirstHandleMouseMove.call(this, e) }, 60),
    throttledHandleSecondHandleMouseMove: throttle(function (e) { handleSecondHandleMouseMove.call(this, e) }, 60),
    handleFirstHandleMouseEnter () {
      if (!this.active) {
        this.showTooltip = true
        this.firstHandleActive = true
        this.tooltipHoverDisplayValue = this.firstHandleValue
        this.$nextTick().then(() => {
          this.updatePosition()
          this.firstHandleActive = false
        })
      }
    },
    handleFirstHandleMouseLeave () {
      if (!this.active) {
        this.showTooltip = false
      }
    },
    handleSecondHandleMouseEnter () {
      if (!this.active) {
        this.showTooltip = true
        this.secondHandleActive = true
        this.tooltipHoverDisplayValue = this.secondHandleValue
        this.$nextTick().then(() => {
          this.updatePosition()
          this.secondHandleActive = false
        })
      }
    },
    handleSecondHandleMouseLeave () {
      if (!this.active) {
        this.showTooltip = false
      }
    },
    blockTransitionOneTick () {
      const firstHandle = this.$refs.firstHandle
      if (firstHandle) {
        firstHandle.style.transition = 'none'
        this.$nextTick().then(() => {
          if (this.$refs.firstHandle) {
            this.$refs.firstHandle.style.transition = null
          }
        })
      }
      const secondHandle = this.$refs.secondHandle
      if (secondHandle) {
        secondHandle.style.transition = 'none'
        this.$nextTick().then(() => {
          if (this.$refs.secondHandle) {
            this.$refs.secondHandle.style.transition = null
          }
        })
      }
    }
  }
}
</script>
