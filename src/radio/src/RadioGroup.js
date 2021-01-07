import { h, defineComponent, computed } from 'vue'
import { useTheme, useFormItem } from '../../_mixins'
import { getSlot, flatten, warn, createKey } from '../../_utils'
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

      /**
       * Priority of button splitor:
       * !disabled  checked >
       *  disabled  checked >
       * !disabled !checked >
       *  disabled !checked
       */
      const lastInstancePriority =
        (lastInstanceChecked ? 2 : 0) + (!lastInstanceDisabled ? 1 : 0)
      const currentInstancePriority =
        (currentInstanceChecked ? 2 : 0) + (!currentInstanceDisabled ? 1 : 0)
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
    ...useTheme.props,
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
    const formItem = useFormItem(props)
    const themeRef = useTheme('Radio', 'RadioGroup', style, radioLight, props)
    const { mergedSize: mergedSizeRef } = formItem
    return {
      ...formItem,
      cssVars: computed(() => {
        const { value: size } = mergedSizeRef
        const {
          common: { cubicBezierEaseInOut },
          self: {
            buttonBorderColor,
            buttonBorderColorActive,
            buttonBorderRadius,
            buttonBoxShadow,
            buttonBoxShadowFocus,
            buttonBoxShadowHover,
            buttonColorActive,
            buttonTextColor,
            buttonTextColorActive,
            buttonTextColorHover,
            opacityDisabled,
            [createKey('buttonHeight', size)]: height
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--button-border-color': buttonBorderColor,
          '--button-border-color-active': buttonBorderColorActive,
          '--button-border-radius': buttonBorderRadius,
          '--button-box-shadow': buttonBoxShadow,
          '--button-box-shadow-focus': buttonBoxShadowFocus,
          '--button-box-shadow-hover': buttonBoxShadowHover,
          '--button-color-active': buttonColorActive,
          '--button-text-color': buttonTextColor,
          '--button-text-color-hover': buttonTextColorHover,
          '--button-text-color-active': buttonTextColorActive,
          '--height': height,
          '--opacity-disabled': opacityDisabled
        }
      })
    }
  },
  render () {
    const { children, isButtonGroup } = mapSlot(flatten(getSlot(this)), this)
    return h(
      'div',
      {
        class: [
          'n-radio-group',
          {
            'n-radio-group--button-group': isButtonGroup
          }
        ],
        style: this.cssVars
      },
      children
    )
  }
})
