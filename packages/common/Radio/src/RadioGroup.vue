<script>

function mapSlot (h, defaultSlot, currentComponent) {
  /**
   * connect current component's v-model to child instance
   */
  const wrapInstance = instance => {
    if (instance.componentOptions.tag === 'n-radio' || instance.componentOptions.tag === 'n-radio-button') {
      instance.componentOptions.propsData.privateValue = currentComponent.value
      instance.componentOptions.listeners = {
        ...instance.componentOptions.listeners,
        input: (v) => {
          currentComponent.$emit('input', v)
        }
      }
      return instance
    } else return null
  }
  const mappedSlot = []
  for (let i = 0; i < defaultSlot.length; ++i) {
    const wrappedInstance = wrapInstance(defaultSlot[i])
    if (wrappedInstance === null) {
      console.error('[naive ui]: Please don\'t use tags other than `n-radio` and `n-radio-button` in `n-radio-group`.')
      continue
    }
    if (i === 0 || wrappedInstance.componentOptions.tag === 'n-radio') {
      mappedSlot.push(wrappedInstance)
    } else {
      const lastInstanceComponentOptions = mappedSlot[mappedSlot.length - 1].componentOptions
      const lastInstanceChecked = lastInstanceComponentOptions.propsData.privateValue === lastInstanceComponentOptions.propsData.value
      const lastInstanceDisabled = lastInstanceComponentOptions.propsData.disabled
      const currentInstanceChecked = wrappedInstance.componentOptions.propsData.privateValue === wrappedInstance.componentOptions.propsData.value
      const currentInstanceDisabled = wrappedInstance.componentOptions.propsData.disabled
      /**
       * Priority of button splitor:
       * !disabled  checked >
       * !disabled !checked >
       *  disabled  checked >
       *  disabled !checked
       */
      const lastInstancePriority = (!lastInstanceDisabled ? 2 : 0) + (lastInstanceChecked ? 1 : 0)
      const currentInstancePriority = (!currentInstanceDisabled ? 2 : 0) + (currentInstanceChecked ? 1 : 0)
      const lastInstanceClass = {
        'n-radio-group__splitor--disabled': lastInstanceDisabled,
        'n-radio-group__splitor--checked': lastInstanceChecked
      }
      const currentInstanceClass = {
        'n-radio-group__splitor--disabled': currentInstanceDisabled,
        'n-radio-group__splitor--checked': currentInstanceChecked
      }
      let splitorClass
      if (lastInstancePriority < currentInstancePriority) splitorClass = currentInstanceClass
      else splitorClass = lastInstanceClass
      mappedSlot.push(h('div', {
        staticClass: 'n-radio-group__splitor',
        class: splitorClass
      }), wrappedInstance)
    }
  }
  return mappedSlot
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
      // console.log('input')
    }
  },
  render (h) {
    // console.log('render radio')
    return h('div', {
      staticClass: 'n-radio-group'
    }, mapSlot(h, this.$slots.default, this))
  }
}
</script>
