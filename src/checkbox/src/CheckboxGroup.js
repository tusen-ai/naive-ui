import { h } from 'vue'
import { useFormItem } from '../../_mixins'
import { warn, call, getSlot } from '../../_utils'

export default {
  name: 'CheckboxGroup',
  provide () {
    return {
      NCheckboxGroup: this
    }
  },
  props: {
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: undefined
    },
    value: {
      type: Array,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array],
      default: undefined
    },
    // deprecated
    onChange: {
      validator () {
        if (__DEV__) {
          warn(
            'checkbox-group',
            '`on-change` is deprecated, please use `on-update:value` instead.'
          )
        }
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    return useFormItem(props)
  },
  computed: {
    valueSet () {
      if (Array.isArray(this.value)) return new Set(this.value)
      return null
    }
  },
  methods: {
    toggleCheckbox (checked, checkboxValue) {
      const {
        onChange,
        'onUpdate:value': onUpdateValue,
        nTriggerFormInput,
        nTriggerFormChange
      } = this
      if (Array.isArray(this.value)) {
        const groupValue = Array.from(this.value)
        const index = groupValue.findIndex((value) => value === checkboxValue)
        if (checked) {
          if (!~index) {
            groupValue.push(checkboxValue)
            if (onUpdateValue) call(onUpdateValue, groupValue)
            nTriggerFormInput()
            nTriggerFormChange()
            // deprecated
            if (onChange) call(onChange, groupValue)
          }
        } else {
          if (~index) {
            groupValue.splice(index, 1)
            if (onUpdateValue) call(onUpdateValue, groupValue)
            if (onChange) call(onChange, groupValue) // deprecated
            nTriggerFormInput()
            nTriggerFormChange()
          }
        }
      } else {
        if (checked) {
          if (onUpdateValue) call(onUpdateValue, [checkboxValue])
          if (onChange) call(onChange, [checkboxValue]) // deprecated
          nTriggerFormInput()
          nTriggerFormChange()
        } else {
          if (onUpdateValue) call(onUpdateValue, [])
          if (onChange) call(onChange, []) // deprecated
          nTriggerFormInput()
          nTriggerFormChange()
        }
      }
    }
  },
  render () {
    return h(
      'div',
      {
        class: 'n-checkbox-group'
      },
      getSlot(this)
    )
  }
}
