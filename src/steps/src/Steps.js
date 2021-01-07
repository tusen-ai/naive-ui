import { h, defineComponent } from 'vue'
import { useTheme } from '../../_mixins'
import { getSlot } from '../../_utils'

function stepWithIndex (step, i) {
  if (!step.props) step.props = {}
  step.props.index = i + 1
  return step
}

function stepsWithIndex (props, steps) {
  return steps.map((step, i) => stepWithIndex(step, i, props))
}

export default defineComponent({
  name: 'Steps',
  provide () {
    return {
      NSteps: this
    }
  },
  props: {
    ...useTheme.props,
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
    return h(
      'div',
      {
        class: [
          'n-steps',
          {
            'n-steps--vertical': this.vertical
          }
        ]
      },
      stepsWithIndex({ ...this.$props }, getSlot(this))
    )
  }
})
