<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asthemecontext from '../../../mixins/asthemecontext'

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
  mixins: [withapp, themeable, asthemecontext],
  props: {
    current: {
      type: Number,
      default: null,
      required: false
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
        [`n-${this.synthesizedTheme}-theme`]: this.synthesizedTheme,
        [`n-steps--${this.size}-size`]: true,
        'n-steps--vertical': this.vertical
      }
    }, stepsWithIndex({ ...this.$props }, this.$slots.default))
  }
}
</script>
