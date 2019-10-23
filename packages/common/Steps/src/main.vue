<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

function wrapStep (step, i) {
  if (step.componentOptions.tag === 'n-step') {
    step.componentOptions.propsData = {
      ...step.componentOptions.propsData,
      index: i + 1
    }
  }
  return step
}

function mapSteps (props, steps) {
  return steps.map((step, i) => wrapStep(step, i, props))
}

export default {
  name: 'NSteps',
  provide () {
    return {
      NSteps: this
    }
  },
  mixins: [withapp, themeable],
  props: {
    current: {
      type: Number,
      default: null,
      required: false
    },
    status: {
      type: String,
      default: 'process'
    }
  },
  render (h) {
    console.log(this.synthesizedTheme)
    return h('div', {
      staticClass: 'n-steps',
      class: {
        [`n-${this.synthesizedTheme}-theme`]: this.synthesizedTheme
      }
    }, mapSteps({ ...this.$props }, this.$slots.default))
  }
}
</script>
