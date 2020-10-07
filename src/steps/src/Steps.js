import { h } from 'vue'
import {
  configurable,
  themeable,
  hollowoutable,
  usecssr
} from '../../_mixins'
import { getSlot } from '../../_utils/vue'
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
    configurable,
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
          [`n-${this.mergedTheme}-theme`]: this.mergedTheme,
          [`n-steps--${this.size}-size`]: true,
          'n-steps--vertical': this.vertical,
          'n-steps--transition-disabled': this.transitionDisabled
        }
      ]
    }, stepsWithIndex({ ...this.$props }, getSlot(this)))
  }
}
