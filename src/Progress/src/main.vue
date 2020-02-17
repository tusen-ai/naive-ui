<template>
  <div
    class="n-progress"
    :class="{
      [`n-progress--${status}`]: status,
      [`n-progress--${type}`]: type,
      [`n-${syntheticTheme}-theme`]: syntheticTheme
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
          class="n-progress-graph-circle"
        >
          <svg viewBox="0 0 110 110">
            <g>
              <path
                class="n-progress-graph-circle-rail"
                d="m 55 5 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100"
                :stroke-width="strokeWidth * 1.1"
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
                class="n-progress-graph-circle-fill"
                d="m 55 5 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100"
                :stroke-width="strokeWidth * 1.1"
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
      <div v-if="showIndicator">
        <div
          v-if="$slots.default"
          class="n-progress-custom-content"
        >
          <slot />
        </div>
        <div
          v-else-if="status !== 'default'"
          class="n-progress-icon"
        >
          <n-icon>
            <component :is="iconType" />
          </n-icon>
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
          class="n-progress-graph-line"
          :class="{
            [`n-progress-graph-line--indicator-${syntheticIndicatorPlacement}`]: true
          }"
        >
          <div
            class="n-progress-graph-line-rail"
            :style="{
              backgroundColor: safeRailColor,
              height: styleHeight,
              borderRadius: styleBorderRadius
            }"
          >
            <div
              class="n-progress-graph-line-fill"
              :class="{
                'n-progress-graph-line-fill--processing': processing
              }"
              :style="{
                maxWidth: fillStyleMaxWidth + '%',
                backgroundColor: safeColor,
                height: styleHeight,
                borderRadius: styleBorderRadius
              }"
            >
              <div
                v-if="syntheticIndicatorPlacement === 'inside'"
                class="n-progress-graph-line-indicator"
              >
                {{ percentage + unit }}
              </div>
            </div>
          </div>
          <div
            v-if="syntheticIndicatorPlacement === 'inside-label'"
            ref="indicator"
            class="n-progress-graph-line-indicator"
            :style="indicatorPercentageIsCaculated ? {
              right: `${indicatorPercentage}%`,
              backgroundColor: safeColor,
              color: indicatorTextColor
            } : {
              visibility: 'hidden',
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
      <div v-if="showIndicator && syntheticIndicatorPlacement === 'outside'">
        <div
          v-if="$slots.default"
          class="n-progress-custom-content"
          :style="{
            color: indicatorTextColor
          }"
        >
          <slot />
        </div>
        <div
          v-else-if="status === 'default'"
          class="n-progress-icon n-progress-icon--as-text"
          :style="{
            color: indicatorTextColor
          }"
        >
          {{ percentage }}{{ unit }}
        </div>
        <div
          v-else-if="status"
          class="n-progress-icon"
        >
          <n-icon>
            <component :is="iconType" />
          </n-icon>
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
          class="n-progress-graph-circle"
        >
          <svg :viewBox="`0 0 ${viewBoxWidth} ${viewBoxWidth}`">
            <g
              v-for="(p, index) in percentage"
              :key="index"
            >
              <path
                class="n-progress-graph-circle-rail"
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
                class="n-progress-graph-circle-fill"
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
      <div v-if="showIndicator && this.$slots.default">
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
import mdCheckmark from '../../_icons/md-checkmark'
import mdClose from '../../_icons/md-close'
import mdAlert from '../../_icons/md-alert'
import mdInformationCircle from '../../_icons/md-information-circle'
import mdCheckmarkCircle from '../../_icons/md-checkmark-circle'
import mdCloseCircle from '../../_icons/md-close-circle'
import fontawareable from '../../_mixins/fontawarable'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import formatLength from '../../_utils/css/formatLength'

function circlePath (r, sw, vw = 100) {
  return `m ${vw / 2} ${vw / 2 - r} a ${r} ${r} 0 1 1 0 ${2 * r} a ${r} ${r} 0 1 1 0 -${2 * r}`
}

export default {
  name: 'NProgress',
  components: {
    NIcon,
    mdCheckmark,
    mdClose,
    mdAlert,
    mdInformationCircle,
    mdCheckmarkCircle,
    mdCloseCircle
  },
  mixins: [withapp, themeable, fontawareable],
  props: {
    processing: {
      type: Boolean,
      default: false
    },
    type: {
      validator (type) {
        return ['line', 'circle', 'multiple-circle'].includes(type)
      },
      default: 'line'
    },
    status: {
      validator (status) {
        return ['success', 'error', 'warning', 'info', 'default'].includes(status)
      },
      default: 'default'
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
      default: 7
    },
    percentage: {
      type: [Number, Array],
      default: 0
    },
    unit: {
      type: String,
      default: '%'
    },
    showIndicator: {
      type: Boolean,
      default: true
    },
    indicatorPosition: {
      validator (value) {
        return ['inside', 'inside-label', 'outside'].includes(value)
      },
      default: 'outside'
    },
    indicatorPlacement: {
      validator (value) {
        return ['inside', 'inside-label', 'outside'].includes(value)
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
    },
    height: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      indicatorPercentage: 50,
      indicatorPercentageIsCaculated: false
    }
  },
  computed: {
    styleHeight () {
      return formatLength(this.height)
    },
    styleBorderRadius () {
      if (this.height) return formatLength(this.height / 2)
      return null
    },
    syntheticIndicatorPlacement () {
      return this.indicatorPlacement || this.indicatorPosition
    },
    fillStyleMaxWidth () {
      return Math.max(this.percentage - (this.syntheticIndicatorPlacement === 'inside-label' ? 2 : 0), 0)
    },
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
        } else if (this.status === 'info') {
          return 'md-information-circle'
        }
      } else if (this.type === 'line') {
        if (this.status === 'success') {
          return 'md-checkmark-circle'
        } else if (this.status === 'error') {
          return 'md-close-circle'
        } else if (this.status === 'warning') {
          return 'md-alert'
        } else if (this.status === 'info') {
          return 'md-information-circle'
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
      if (this.syntheticIndicatorPlacement === 'inside-label') {
        this.$nextTick().then(() => {
          this.indicatorPercentage = this.calcIndicatorPercentage()
        })
      }
    }
  },
  methods: {
    handleFontReady () {
      if (this.syntheticIndicatorPlacement === 'inside-label') {
        this.$nextTick().then(() => {
          this.indicatorPercentage = this.calcIndicatorPercentage()
          this.$nextTick().then(() => {
            this.$refs.indicator.getBoundingClientRect()
            this.indicatorPercentageIsCaculated = true
          })
        })
      }
    },
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
