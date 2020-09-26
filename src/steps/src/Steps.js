import { h } from 'vue'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import hollowoutable from '../../_mixins/hollowoutable'
import usecssr from '../../_mixins/usecssr'
import getDefaultSlot from '../../_utils/vue/getDefaultSlot'
import styles from './styles/steps'
import { useDisabledUntilMounted } from '../../_utils/composition'

function stepWithIndex (step, i) {
  if (!step.props) step.props = {}
  step.props.index = i + 1
  return step
}

function stepsWithIndex (props, steps) {
  return steps.map((step, i) => stepWithIndex(step, i, props))
}

export default {
  name: 'Steps',
  provide () {
    return {
      NSteps: this
    }
  },
  mixins: [
    withapp,
    themeable,
    hollowoutable,
    usecssr(styles)
  ],
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
  setup () {
    return {
      transitionDisabled: useDisabledUntilMounted(1)
    }
  },
  render () {
    return h('div', {
      class: [
        'n-steps',
        {
          [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme,
          [`n-steps--${this.size}-size`]: true,
          'n-steps--vertical': this.vertical,
          'n-steps--transition-disabled': this.transitionDisabled
        }
      ]
    }, stepsWithIndex({ ...this.$props }, getDefaultSlot(this)))
  }
}
