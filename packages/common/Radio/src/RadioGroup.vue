<script>
function mapSlot (defaultSlot, currentComponent) {
  return defaultSlot.map(el => {
    if (el.componentOptions.tag === 'n-radio') {
      el.componentOptions.propsData.privateValue = currentComponent.value
      el.componentOptions.listeners = {
        ...el.componentOptions.listeners,
        input: (v) => {
          currentComponent.$emit('input', v)
        }
      }
      return el
    } else return el
  })
}

export default {
  name: 'NRadioGroup',
  props: {
    value: {
      type: [Boolean, String, Number],
      default: null
    }
  },
  methods: {
    handleInput (value) {
      console.log('input')
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'n-radio-group'
    }, mapSlot(this.$slots.default, this))
  }
}
</script>
