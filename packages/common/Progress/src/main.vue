<template>
  <div
    class="n-progress"
    :class="{
      [`n-progress--${status}`]: status,
      [`n-progress--${type}`]: type
    }"
  >
    <div
      v-if="type === 'circle'"
      class="n-progress-content"
    >
      <div
        class="n-progress-graph"
      >
        <div
          class="n-progress-graph__circle"
        >
          <svg viewBox="0 0 110 110">
            <g>
              <path
                class="n-progress-graph__circle-rail"
                d="m 55 5 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100"
                stroke-width="10"
                stroke-linecap="round"
                fill="none"
                :style="{
                  'stroke-dashoffset': 0,
                  stroke: safeRailColor
                }"
              />
            </g>
            <g>
              <path
                class="n-progress-graph__circle-fill"
                d="m 55 5 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100"
                stroke-width="10"
                stroke-linecap="round"
                fill="none"
                :style="{
                  'stroke-dasharray': strokeDasharray,
                  'stroke-dashoffset': 0,
                  stroke: safeColor
                }"
              />
            </g>
          </svg>
        </div>
      </div>
      <div v-if="!noIndicator">
        <div
          v-if="$slots.default"
          class="n-progress-custom-content"
        >
          <slot />
        </div>
        <div
          v-else-if="status"
          class="n-progress-icon"
        >
          <n-icon :type="iconType" />
        </div>
        <div
          v-else
          class="n-progress-text"
          :style="{
            color: indicatorTextColor
          }"
        >
          <span class="n-progress-text__percentage">{{ percentage }}</span>
          <span class="n-progress-text__unit">{{ unit }}</span>
        </div>
      </div>
    </div>
    <div
      v-else-if="type === 'line'"
      class="n-progress-content"
    >
      <div class="n-progress-graph">
        <div
          ref="line"
          class="n-progress-graph__line"
          :class="{
            [`n-progress-graph__line--indicator-${indicatorPosition}`]: true
          }"
        >
          <div
            class="n-progress-graph__line-rail"
            :style="{
              backgroundColor: safeRailColor
            }"
          >
            <div
              class="n-progress-graph__line-fill"
              :style="{
                maxWidth: percentage + '%',
                backgroundColor: safeColor
              }"
            >
              <div
                v-if="indicatorPosition === 'inside'"
                class="n-progress-graph__line-indicator"
              >
                {{ percentage + unit }}
              </div>
            </div>
          </div>
          <div
            v-if="indicatorPosition === 'inside-label'"
            ref="indicator"
            class="n-progress-graph__line-indicator"
            :style="indicatorPercentageIsCaculated ? {
              right: `${indicatorPercentage}%`,
              backgroundColor: safeColor,
              color: indicatorTextColor
            } : {
              transition: 'none',
              right: `${indicatorPercentage}%`,
              backgroundColor: safeColor,
              color: indicatorTextColor
            }"
          >
            {{ percentage + unit }}
          </div>
        </div>
      </div>
      <div v-if="!noIndicator && indicatorPosition === 'outside'">
        <div
          v-if="$slots.default"
          class="n-progress-custom-content"
        >
          <slot />
        </div>
        <div
          v-else-if="status"
          class="n-progress-icon"
        >
          <n-icon :type="iconType" />
        </div>
        <div
          v-else
          class="n-progress-text"
          :style="{
            color: indicatorTextColor
          }"
        >
          <span class="n-progress-text__percentage">{{ percentage }}</span>
          <span class="n-progress-text__unit">{{ unit }}</span>
        </div>
      </div>
    </div>
    <div
      v-else-if="type==='multiple-circle'"
      class="n-progress-content"
    >
      <div
        class="n-progress-graph"
      >
        <div
          class="n-progress-graph__circle"
        >
          <svg :viewBox="`0 0 ${viewBoxWidth} ${viewBoxWidth}`">
            <g
              v-for="(p, index) in percentage"
              :key="index"
            >
              <path
                class="n-progress-graph__circle-rail"
                :d="circlePath(viewBoxWidth / 2 - strokeWidth / 2 * (1 + 2 * index) - circleGap * index, strokeWidth, viewBoxWidth)"
                :stroke-width="strokeWidth"
                stroke-linecap="round"
                fill="none"
                :style="{
                  'stroke-dashoffset': 0,
                  stroke: safeRailColor[index]
                }"
              />
              <path
                class="n-progress-graph__circle-fill"
                :d="circlePath(viewBoxWidth / 2 - strokeWidth / 2 * (1 + 2 * index) - circleGap * index, strokeWidth, viewBoxWidth)"
                :stroke-width="strokeWidth"
                stroke-linecap="round"
                fill="none"
                :style="{
                  'stroke-dasharray': strokeDasharray[index],
                  'stroke-dashoffset': 0,
                  stroke: safeColor[index]
                }"
              />
            </g>
          </svg>
        </div>
      </div>
      <div v-if="!noIndicator && this.$slots.default">
        <div
          class="n-progress-text"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NIcon from '../../Icon'

function circlePath (r, sw, vw = 100) {
  // console.log(r, sw, vw)
  // console.log(`m ${vw / 2} ${vw / 2 - r} a ${r} ${r} 0 1 1 0 ${2 * r} a ${r} ${r} 0 1 1 0 -${2 * r}`)
  return `m ${vw / 2} ${vw / 2 - r} a ${r} ${r} 0 1 1 0 ${2 * r} a ${r} ${r} 0 1 1 0 -${2 * r}`
}

export default {
  name: 'NProgress',
  components: {
    NIcon
  },
  props: {
    type: {
      validator (type) {
        return ['line', 'circle', 'multiple-circle'].includes(type)
      },
      default: 'line'
    },
    status: {
      validator (status) {
        return ['success', 'error', 'warning'].includes(status)
      },
      default: null
    },
    railColor: {
      type: [String, Array],
      default: null
    },
    color: {
      type: [String, Array],
      default: null
    },
    viewBoxWidth: {
      type: Number,
      default: 100
    },
    strokeWidth: {
      type: Number,
      default: 10
    },
    percentage: {
      type: [Number, Array],
      default: 0
    },
    unit: {
      type: String,
      default: '%'
    },
    noIndicator: {
      type: Boolean,
      default: false
    },
    indicatorPosition: {
      validator (indicatorPosition) {
        return ['inside', 'inside-label', 'outside'].includes(indicatorPosition)
      },
      default: 'outside'
    },
    indicatorTextColor: {
      type: String,
      default: null
    },
    circleGap: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      indicatorPercentage: 50,
      indicatorPercentageIsCaculated: false
    }
  },
  computed: {
    strokeDasharray () {
      if (this.type === 'multiple-circle') {
        const strokeDasharrays = this.percentage.map((v, i) => `${Math.PI * v / 100 * (this.viewBoxWidth / 2 - this.strokeWidth / 2 * (1 + 2 * i) - this.circleGap * i) * 2}, ${this.viewBoxWidth * 8}`)
        return strokeDasharrays
      } else {
        return `${Math.PI * this.percentage}, ${this.viewBoxWidth * 8}`
      }
    },
    iconType () {
      if (this.type === 'circle') {
        if (this.status === 'success') {
          return 'md-checkmark'
        } else if (this.status === 'error') {
          return 'md-close'
        } else if (this.status === 'warning') {
          return 'md-alert'
        }
      } else if (this.type === 'line') {
        if (this.status === 'success') {
          return 'md-checkmark-circle'
        } else if (this.status === 'error') {
          return 'md-close-circle'
        } else if (this.status === 'warning') {
          return 'md-alert'
        }
      } return ''
    },
    safeColor () {
      if (this.type === 'multiple-circle') {
        if (Array.isArray(this.color)) {
          return this.color
        } else return []
      } else {
        return this.color
      }
    },
    safeRailColor () {
      if (this.type === 'multiple-circle') {
        if (Array.isArray(this.railColor)) {
          return this.railColor
        } else return []
      } else {
        return this.railColor
      }
    }
  },
  watch: {
    percentage (newPercentage) {
      if (this.indicatorPosition === 'inside-label') {
        this.$nextTick().then(() => {
          this.indicatorPercentage = this.calcIndicatorPercentage()
        })
      }
    }
  },
  mounted () {
    if (this.indicatorPosition === 'inside-label') {
      this.$nextTick().then(() => {
        this.indicatorPercentage = this.calcIndicatorPercentage()
        console.log(this.indicatorPercentage)
        this.$nextTick().then(() => {
          this.$refs.indicator.getBoundingClientRect()
          this.indicatorPercentageIsCaculated = true
        })
      })
    }
  },
  methods: {
    circlePath: circlePath,
    calcIndicatorPercentage () {
      const lineRect = this.$refs.line.getBoundingClientRect()
      const indicator = this.$refs.indicator.getBoundingClientRect()
      const quotient = indicator.width / lineRect.width
      let indicatorPercentage = 100 - this.percentage
      indicatorPercentage = Math.min(indicatorPercentage, 100 - quotient * 100)
      indicatorPercentage = Math.max(indicatorPercentage, 0)
      return indicatorPercentage
    }
  }
}
</script>
