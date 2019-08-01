<script>
function wrapStep (step, i, current) {
  if (step.componentOptions.tag === 'n-step') {
    step.componentOptions.propsData = {
      ...step.componentOptions.propsData,
      index: i + 1,
      finished: !!current && current > i,
      active: current === i
    }
  }
  return step
}

function mapSteps (props, steps) {
  return steps.map((step, i) => wrapStep(step, i, props.current))
}

export default {
  name: 'NSteps',
  props: {
    current: {
      type: Number,
      default: null,
      required: false
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'n-steps'
    }, mapSteps(this.$props, this.$slots.default))
  }
}
</script>
