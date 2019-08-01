<script>
function wrapStep (step, i, active) {
  if (step.componentOptions.tag === 'n-step') {
    step.componentOptions.propsData = {
      ...step.componentOptions.propsData,
      index: i + 1,
      finished: !!active && active > i,
      active: active === i
    }
  }
  return step
}

function mapSteps (props, steps) {
  return steps.map((step, i) => wrapStep(step, i, props.active))
}

export default {
  name: 'NSteps',
  props: {
    active: {
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
