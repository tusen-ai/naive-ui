<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import hollowoutable from '../../_mixins/hollowoutable'
import asformitem from '../../_mixins/asformitem'

function mapSlot (h, defaultSlot, groupInstance) {
  const mappedSlot = []
  defaultSlot = defaultSlot || []
  for (let i = 0; i < defaultSlot.length; ++i) {
    const wrappedInstance = defaultSlot[i]
    const instanceOptions = wrappedInstance.componentOptions
    const instanceCtorOptions = instanceOptions && instanceOptions.Ctor.options
    if (
      !instanceOptions ||
      !['NRadio', 'NRadioButton'].includes(instanceCtorOptions.name)
    ) {
      console.error(
        '[naive ui/radio]: `n-radio-group` only taks `n-radio` and `n-radio-button` as children.'
      )
      continue
    }
    if (i === 0 || instanceCtorOptions.name === 'NRadio') {
      mappedSlot.push(wrappedInstance)
    } else {
      const lastInstanceComponentOptions = mappedSlot[mappedSlot.length - 1].componentOptions
      const lastInstanceChecked = groupInstance.$props.value === lastInstanceComponentOptions.propsData.value
      const lastInstanceDisabled = lastInstanceComponentOptions.propsData.disabled
      const currentInstanceChecked = groupInstance.$props.value === instanceOptions.propsData.value
      const currentInstanceDisabled = instanceOptions.propsData.disabled
      let lastInstancePriority
      let currentInstancePriority
      if (groupInstance.syntheticTheme === 'dark') {
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
  mixins: [withapp, themeable, hollowoutable, asformitem()],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    name: {
      type: String,
      default: null
    },
    value: {
      type: [Boolean, String, Number],
      default: null
    },
    size: {
      default: 'small',
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      radioButtonCount: 0,
      transitionDisabled: true
    }
  },
  mounted () {
    if (this.radioButtonCount > 0) {
      this.$nextTick().then(() => {
        this.transitionDisabled = false
      })
    }
  },
  provide () {
    return {
      NRadioGroup: this,
      NFormItem: null
    }
  },
  render (h) {
    const isButtonGroup = this.radioButtonCount > 0
    return h('div', {
      staticClass: 'n-radio-group',
      class: {
        [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme,
        [`n-radio-group--${this.size}-size`]: this.size,
        [`n-radio-group--button-group`]: isButtonGroup,
        [`n-radio-group--transition-disabled`]: isButtonGroup && this.transitionDisabled
      }
    }, mapSlot(h, this.$slots.default, this))
  }
}
</script>
