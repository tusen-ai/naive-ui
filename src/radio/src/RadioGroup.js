import { h, defineComponent, computed } from 'vue'
import { useTheme, useFormItem } from '../../_mixins'
import { getSlot, flatten, warn } from '../../_utils'
import { radioLight } from '../styles'
import style from './styles/radio-group.cssr.js'

function mapSlot (defaultSlot, groupInstance) {
  const children = []
  let isButtonGroup = false
  for (let i = 0; i < defaultSlot.length; ++i) {
    const wrappedInstance = defaultSlot[i]
    const name = wrappedInstance.type?.name
    if (name === 'RadioButton') {
      isButtonGroup = true
    }
    if (__DEV__ && isButtonGroup && name !== 'RadioButton') {
      warn(
        'radio-group',
        '`n-radio-group` in button mode only takes `n-radio-button` as children.'
      )
      continue
    }
    const instanceProps = wrappedInstance.props
    if (name !== 'RadioButton') {
      children.push(wrappedInstance)
      continue
    }
    if (i === 0) {
      children.push(wrappedInstance)
    } else {
      const lastInstanceProps = children[children.length - 1].props
      const lastInstanceChecked =
        groupInstance.$props.value === lastInstanceProps.value
      const lastInstanceDisabled = lastInstanceProps.disabled
      const currentInstanceChecked =
        groupInstance.$props.value === instanceProps.value
      const currentInstanceDisabled = instanceProps.disabled
      let lastInstancePriority
      let currentInstancePriority
      if (groupInstance.mergedTheme === 'dark') {
        /**
         * Priority of button splitor:
         * !disabled  checked >
         * !disabled !checked >
         *  disabled  checked >
         *  disabled !checked
         */
        lastInstancePriority =
          (!lastInstanceDisabled ? 2 : 0) + (lastInstanceChecked ? 1 : 0)
        currentInstancePriority =
          (!currentInstanceDisabled ? 2 : 0) + (currentInstanceChecked ? 1 : 0)
      } else {
        /**
         * Priority of button splitor:
         * !disabled  checked >
         *  disabled  checked >
         * !disabled !checked >
         *  disabled !checked
         */
        lastInstancePriority =
          (lastInstanceChecked ? 2 : 0) + (!lastInstanceDisabled ? 1 : 0)
        currentInstancePriority =
          (currentInstanceChecked ? 2 : 0) + (!currentInstanceDisabled ? 1 : 0)
      }
      const lastInstanceClass = {
        'n-radio-group__splitor--disabled': lastInstanceDisabled,
        'n-radio-group__splitor--checked': lastInstanceChecked
      }
      const currentInstanceClass = {
        'n-radio-group__splitor--disabled': currentInstanceDisabled,
        'n-radio-group__splitor--checked': currentInstanceChecked
      }
      const splitorClass =
        lastInstancePriority < currentInstancePriority
          ? currentInstanceClass
          : lastInstanceClass
      children.push(
        h('div', {
          class: ['n-radio-group__splitor', splitorClass]
        }),
        wrappedInstance
      )
    }
  }
  return {
    children,
    isButtonGroup
  }
}

export default defineComponent({
  name: 'RadioGroup',
  provide () {
    return {
      NRadioGroup: this
    }
  },
  props: {
    name: {
      type: String,
      default: undefined
    },
    value: {
      type: [Boolean, String, Number],
      default: null
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: Function,
      default: undefined
    },
    // deprecated
    onChange: {
      validator () {
        if (__DEV__) {
          warn(
            'radio-group',
            '`on-change` is deprecated, please use `on-update:value` instead.'
          )
        }
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    useTheme('Radio', 'RadioGroup', style, radioLight, props)
    return {
      ...useFormItem(props),
      cssVars: computed(() => {})
    }
  },
  render () {
    const { children, isButtonGroup } = mapSlot(flatten(getSlot(this)), this)
    const { mergedSize } = this
    return h(
      'div',
      {
        class: [
          'n-radio-group',
          `n-radio-group--${mergedSize}-size`,
          {
            'n-radio-group--button-group': isButtonGroup
          }
        ]
      },
      children
    )
  }
})
