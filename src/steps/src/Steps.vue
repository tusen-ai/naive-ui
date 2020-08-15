<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import hollowoutable from '../../_mixins/hollowoutable'
import getDefaultSlot from '../../_utils/vue/getDefaultSlot'

function stepWithIndex (step, i) {
  if (step.componentOptions) {
    step.componentOptions.propsData = Object.assign(step.componentOptions.propsData, {
      index: i + 1
    })
  }
  return step
}

function stepsWithIndex (props, steps) {
  return steps.map((step, i) => stepWithIndex(step, i, props))
}

export default {
  name: 'NSteps',
  provide () {
    return {
      NSteps: this
    }
  },
  mixins: [withapp, themeable, hollowoutable],
  props: {
    current: {
      type: Number,
      default: null
    },
    status: {
      type: String,
      default: 'process'
    },
    size: {
      type: String,
      default: 'medium'
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      transitionDisabled: true
    }
  },
  mounted () {
    this.$nextTick().then(() => {
      this.transitionDisabled = false
    })
  },
  render (h) {
    return h('div', {
      staticClass: 'n-steps',
      class: {
        [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme,
        [`n-steps--${this.size}-size`]: true,
        'n-steps--vertical': this.vertical,
        'n-steps--transition-disabled': this.transitionDisabled
      }
    }, stepsWithIndex({ ...this.$props }, getDefaultSlot(this)))
  }
}
</script>
