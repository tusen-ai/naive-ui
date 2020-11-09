import { h } from 'vue'
import {
  configurable,
  themeable,
  withCssr
} from '../../_mixins'
import { getSlot } from '../../_utils/vue'
import styles from './styles/steps'

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
    withCssr(styles)
  ],
  props: {
    current: {
      type: Number,
      default: undefined
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
  render () {
    return h('div', {
      class: [
        'n-steps',
        {
          [`n-${this.mergedTheme}-theme`]: this.mergedTheme,
          [`n-steps--${this.size}-size`]: true,
          'n-steps--vertical': this.vertical
        }
      ]
    }, stepsWithIndex({ ...this.$props }, getSlot(this)))
  }
}
