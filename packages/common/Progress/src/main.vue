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
                style="stroke-dashoffset: 0;"
              />
            </g>
            <g>
              <path
                class="n-progress-graph__circle-fill"
                d="m 55 5 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100"
                stroke-width="10"
                stroke-linecap="round"
                fill="none"
                :style="`stroke-dasharray: ${strokeDasharray}; stroke-dashoffset: 0;`"
              />
            </g>
          </svg>
        </div>
      </div>
      <div v-if="showIndicator && indicatorPosition === 'outside'">
        <div
          v-if="status"
          class="n-progress-icon"
        >
          <n-icon :type="iconType" />
        </div>
        <div
          v-else
          class="n-progress-text"
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
          <div class="n-progress-graph__line-rail">
            <div
              class="n-progress-graph__line-fill"
              :style="{
                maxWidth: percentage + '%'
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
              right: `${indicatorPercentage}%`
            } : {
              transition: 'none',
              right: `${indicatorPercentage}%`
            }"
          >
            {{ percentage + unit }}
          </div>
        </div>
      </div>
      <div v-if="showIndicator && indicatorPosition === 'outside'">
        <div
          v-if="status"
          class="n-progress-icon"
        >
          <n-icon :type="iconType" />
        </div>
        <div
          v-else
          class="n-progress-text"
        >
          <span class="n-progress-text__percentage">{{ percentage }}</span>
          <span class="n-progress-text__unit">{{ unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NIcon from '../../Icon'

export default {
  name: 'NProgress',
  components: {
    NIcon
  },
  props: {
    type: {
      validator (type) {
        return ['line', 'circle', 'double-circle'].includes(type)
      },
      default: 'line'
    },
    status: {
      validator (status) {
        return ['success', 'error', 'warning'].includes(status)
      },
      default: null
    },
    color: {
      type: String,
      default: null
    },
    percentage: {
      type: Number,
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
      validator (indicatorPosition) {
        return ['inside', 'inside-label', 'outside'].includes(indicatorPosition)
      },
      default: 'outside'
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
      return `${Math.PI * this.percentage}, 500`
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
        this.$nextTick().then(() => {
          this.indicatorPercentageIsCaculated = true
        })
      })
    }
  },
  methods: {
    calcIndicatorPercentage () {
      const lineRect = this.$refs.line.getBoundingClientRect()
      const indicator = this.$refs.indicator.getBoundingClientRect()
      const quotient = indicator.width / lineRect.width
      let indicatorPercentage = 100 - this.percentage - quotient / 2 * 100
      indicatorPercentage = Math.min(indicatorPercentage, 100 - quotient * 100)
      indicatorPercentage = Math.max(indicatorPercentage, 0)
      return indicatorPercentage
    }
  }
}
</script>
