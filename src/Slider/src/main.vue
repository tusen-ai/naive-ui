<template>
  <div
    class="n-slider"
    :class="{
      'n-slider--disabled': disabled,
      'n-slider--active': active,
      'n-slider--with-mark': marks,
      [`n-${syntheticTheme}-theme`]: syntheticTheme
    }"
    @keydown.right="handleKeyDownRight"
    @keydown.left="handleKeyDownLeft"
  >
    <div
      ref="rail"
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
            backgroundColor: ascendantBackgroundColor,
            ...mark.style
          }"
        />
      </div>
    </div>
    <div
      ref="firstHandle"
      class="n-slider-handle"
      tabindex="0"
      :style="firstHandleStyle"
      @mousedown="handleFirstHandleMouseDown"
      @mouseenter="handleFirstHandleMouseEnter"
      @mouseleave="handleFirstHandleMouseLeave"
    />
    <div
      v-if="range"
      ref="secondHandle"
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
    <div
      ref="contentContainer"
      class="n-positioning-container"
      :class="{
        [namespace]: namespace
      }"
    >
      <div
        ref="content"
        class="n-positioning-content"
      >
        <transition name="n-slider-indicator-transition">
          <div
            v-if="showTooltip"
            class="n-slider-handle-indicator"
            :class="{
              [`n-${syntheticTheme}-theme`]: syntheticTheme
            }"
          >
            {{ activeHandleValue === null ? tooltipHoverDisplayValue : activeHandleValue }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash-es/throttle'
import hollowoutable from '../../_mixins/hollowoutable'
import detachable from '../../_mixins/detachable'
import placeable from '../../_mixins/placeable'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asformitem from '../../_mixins/asformitem'

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
  mixins: [withapp, themeable, hollowoutable, detachable, placeable, asformitem()],
  model: {
    prop: 'value',
    event: 'change'
  },
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
      firstHandleClicked: false,
      secondHandleClicked: false,
      memoziedOtherValue: null,
      valueChangedByRailClick: true,
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
        backgroundColor: this.ascendantBackgroundColor,
        left: ((this.firstHandleValue - this.min) / (this.max - this.min) * 100) + '%',
        zIndex: this.firstHandleActive ? 1 : 0
      }
    },
    secondHandleStyle () {
      return {
        backgroundColor: this.ascendantBackgroundColor,
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
          this.$nextTick().then(() => {
            if (!this.valueChangedByRailClick) {
              this.firstHandleActive = false
              this.secondHandleActive = true
            } else {
              this.valueChangedByRailClick = false
            }
            this.switchFocus()
          })
        } else if (oldValue && oldValue[0] !== newValue[0]) {
          this.$nextTick().then(() => {
            if (!this.valueChangedByRailClick) {
              this.firstHandleActive = true
              this.secondHandleActive = false
            } else {
              this.valueChangedByRailClick = false
            }
            this.switchFocus()
          })
        } else if (newValue[0] === newValue[1]) {
          this.$nextTick().then(() => {
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
      this.$nextTick().then(() => {
        if (this.range) {
          if (newValue && oldValue) {
            if (newValue[0] !== oldValue[0] || newValue[1] !== oldValue[1]) {
              this.updatePosition()
            }
          }
        } else {
          this.updatePosition()
        }
      })
    }
  },
  beforeDestroy () {
    window.removeEventListener('mousemove', this.throttledHandleFirstHandleMouseMove)
    window.removeEventListener('mouseup', this.handleFirstHandleMouseUp)
  },
  methods: {
    handleRailClick (e) {
      this.valueChangedByRailClick = true
      const railRect = this.$refs.rail.getBoundingClientRect()
      const offsetRatio = (e.clientX - railRect.left) / railRect.width
      const newValue = this.min + (this.max - this.min) * offsetRatio
      if (!this.range) {
        this.emitInputEvent(newValue)
        this.$refs.firstHandle.focus()
      } else {
        if (this.value) {
          if (Math.abs(this.firstHandleValue - newValue) < Math.abs(this.secondHandleValue - newValue)) {
            this.emitInputEvent([newValue, this.secondHandleValue])
            this.$refs.firstHandle.focus()
          } else {
            this.emitInputEvent([this.firstHandleValue, newValue])
            this.$refs.secondHandle.focus()
          }
        } else {
          this.emitInputEvent([newValue, newValue])
          this.$refs.firstHandle.focus()
        }
      }
    },
    handleKeyDownRight () {
      let firstHandleFocused = false
      let handleValue = null
      if (document.activeElement === this.$refs.firstHandle) {
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
      if (document.activeElement === this.$refs.firstHandle) {
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
        const firstHandle = this.$refs.firstHandle
        const secondHandle = this.$refs.secondHandle
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
      window.addEventListener('mousemove', this.throttledHandleFirstHandleMouseMove)
    },
    handleSecondHandleMouseDown () {
      if (this.range) {
        this.memoziedOtherValue = this.firstHandleValue
      }
      this.secondHandleActive = true
      this.secondHandleClicked = true
      window.addEventListener('mouseup', this.handleSecondHandleMouseUp)
      window.addEventListener('mousemove', this.throttledHandleSecondHandleMouseMove)
    },
    handleFirstHandleMouseUp (e) {
      this.secondHandleActive = false
      this.firstHandleActive = false
      this.secondHandleClicked = false
      this.firstHandleClicked = false
      if (!this.$refs.firstHandle.contains(e.target)) {
        this.showTooltip = false
      } else {
        this.tooltipHoverDisplayValue = this.firstHandleValue
      }
      window.removeEventListener('mouseup', this.handleFirstHandleMouseUp)
      window.removeEventListener('mousemove', this.throttledHandleFirstHandleMouseMove)
    },
    handleSecondHandleMouseUp (e) {
      this.secondHandleActive = false
      this.firstHandleActive = false
      this.secondHandleClicked = false
      this.firstHandleClicked = false
      if (!this.$refs.firstHandle.contains(e.target)) {
        this.showTooltip = false
      } else {
        this.tooltipHoverDisplayValue = this.secondHandleValue
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
          this.$emit('change', value)
        }
      } else {
        if (value > this.max) {
          if (this.value !== this.max) {
            this.$emit('change', this.max)
          }
        } else if (value < this.min) {
          if (this.value !== this.min) {
            this.$emit('change', this.min)
          }
        } else {
          if (this.value !== value) {
            this.$emit('change', this.justifyValue(value))
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
      if (!this.active || !this.clicked) {
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
      if (!this.active || !this.clicked) {
        this.showTooltip = false
      }
    },
    disableTransitionOneTick () {
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
