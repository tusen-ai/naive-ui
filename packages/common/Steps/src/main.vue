<script>
function wrapStep (step, i, { current, finishStatus, currentStatus }) {
  if (step.componentOptions.tag === 'n-step') {
    step.componentOptions.propsData = {
      ...step.componentOptions.propsData,
      index: i + 1,
      finished: !!current && current > i,
      active: current === i,
      finishStatus,
      currentStatus
    }
  }
  return step
}

function mapSteps (props, steps) {
  return steps.map((step, i) => wrapStep(step, i, props))
}

export default {
  name: 'NSteps',
  props: {
    current: {
      type: Number,
      default: null,
      required: false
    },
    finishStatus: {
      type: String,
      default: 'success',
      validator (finishStatus) {
        return ['process', 'success', 'error'].includes(finishStatus)
      }
    },
    currentStatus: {
      type: String,
      default: 'process',
      validator (currentStatus) {
        return ['process', 'success', 'error'].includes(currentStatus)
      }
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'n-steps'
    }, mapSteps({ ...this.$props }, this.$slots.default))
  }
}
</script>
