<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asthemecontext from '../../_mixins/asthemecontext'
import hollowoutable from '../../_mixins/hollowoutable'

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
  mixins: [withapp, themeable, asthemecontext, hollowoutable],
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
  render (h) {
    return h('div', {
      staticClass: 'n-steps',
      class: {
        [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme,
        [`n-steps--${this.size}-size`]: true,
        'n-steps--vertical': this.vertical
      }
    }, stepsWithIndex({ ...this.$props }, this.$slots.default))
  }
}
</script>
