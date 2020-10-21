import { h } from 'vue'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asformitem from '../../_mixins/asformitem'
import { getSlot } from '../../_utils/vue'
import { warn, call } from '../../_utils'

export default {
  name: 'CheckboxGroup',
  mixins: [
    withapp,
    themeable,
    asformitem()
  ],
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
        if (__DEV__) warn('checkbox-group', '`on-change` is deprecated, please use `on-update:value` instead.')
        return true
      },
      default: undefined
    }
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
        let groupValue = Array.from(this.value)
        const index = groupValue.findIndex(value => value === checkboxValue)
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
    return h('div', {
      class: 'n-checkbox-group'
    }, getSlot(this))
  }
}
