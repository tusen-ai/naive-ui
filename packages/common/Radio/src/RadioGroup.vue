<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import hollowoutable from '../../../mixins/hollowoutable'

function mapSlot (h, defaultSlot, currentComponent) {
  /**
   * connect current component's v-model to child instance
   */
  // const wrapInstance = instance => {
  //   if (instance.componentOptions.tag === 'n-radio' || instance.componentOptions.tag === 'n-radio-button') {
  //     instance.componentOptions.propsData.privateValue = currentComponent.value
  //     instance.componentOptions.listeners = {
  //       ...instance.componentOptions.listeners,
  //       input: (v) => {
  //         currentComponent.$emit('input', v)
  //       }
  //     }
  //     return instance
  //   } else return null
  // }
  const mappedSlot = []
  for (let i = 0; i < defaultSlot.length; ++i) {
    const wrappedInstance = defaultSlot[i] // wrapInstance(defaultSlot[i])
    if (wrappedInstance === null) {
      console.error('[naive ui]: Please don\'t use tags other than `n-radio` and `n-radio-button` in `n-radio-group`.')
      continue
    }
    if (i === 0 || wrappedInstance.componentOptions.tag === 'n-radio') {
      mappedSlot.push(wrappedInstance)
    } else {
      const lastInstanceComponentOptions = mappedSlot[mappedSlot.length - 1].componentOptions
      const lastInstanceChecked = currentComponent.$props.value === lastInstanceComponentOptions.propsData.value
      const lastInstanceDisabled = lastInstanceComponentOptions.propsData.disabled
      const currentInstanceChecked = currentComponent.$props.value === wrappedInstance.componentOptions.propsData.value
      const currentInstanceDisabled = wrappedInstance.componentOptions.propsData.disabled

      let lastInstancePriority
      let currentInstancePriority
      if (currentComponent.synthesizedTheme === 'dark') {
        console.log('dark theme')
        /**
         * Priority of button splitor:
         * !disabled  checked >
         * !disabled !checked >
         *  disabled  checked >
         *  disabled !checked
         */
        lastInstancePriority = (!lastInstanceDisabled ? 2 : 0) + (lastInstanceChecked ? 1 : 0)
        currentInstancePriority = (!currentInstanceDisabled ? 2 : 0) + (currentInstanceChecked ? 1 : 0)
      } else {
        console.log('light theme')
        /**
         * Priority of button splitor:
         * !disabled  checked >
         *  disabled  checked >
         * !disabled !checked >
         *  disabled !checked
         */
        lastInstancePriority = (lastInstanceChecked ? 2 : 0) + (!lastInstanceDisabled ? 1 : 0)
        currentInstancePriority = (currentInstanceChecked ? 2 : 0) + (!currentInstanceDisabled ? 1 : 0)
      }
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
  mixins: [withapp, themeable, hollowoutable],
  provide () {
    return {
      NRadioGroup: this
    }
  },
  props: {
    value: {
      type: [Boolean, String, Number],
      default: null
    }
  },
  render (h) {
    // console.log('render radio')
    return h('div', {
      staticClass: 'n-radio-group',
      class: {
        [`n-${this.synthesizedTheme}-theme`]: this.synthesizedTheme
      }
    }, mapSlot(h, this.$slots.default, this))
  }
}
</script>
