<template>
  <n-base-select-menu
    :theme="mergedTheme"
    :multiple="multiple"
    :options="options"
    :size="size"
    :value="value"
    :width="width"
    :virtual-scroll="false"
    :scrollable="scrollable"
    @menu-toggle-option="handleMenuToggleOption"
  />
</template>

<script>
import NBaseSelectMenu from '../../_base/select-menu'
import {
  configurable,
  themeable,
  usecssr
} from '../../_mixins'
import styles from './styles'
import { call } from '../../_utils/vue'
import { warn } from '../../_utils/naive'

export default {
  components: {
    NBaseSelectMenu
  },
  cssrName: 'Popselect',
  inject: {
    NPopselect: {
      default: null
    }
  },
  mixins: [
    configurable,
    themeable,
    usecssr(styles)
  ],
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Array],
      default: null
    },
    cancelable: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: null
    },
    options: {
      type: Array,
      required: true
    },
    size: {
      type: String,
      default: 'medium'
    },
    scrollable: {
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
        warn('popselect', '`on-change` is deprecated, please use `on-update:value` instead.')
        return true
      },
      default: undefined
    }
  },
  watch: {
    options () {
      this.$nextTick(() => {
        this.syncPosition()
      })
    }
  },
  methods: {
    doUpdateValue (value) {
      const {
        'onUpdate:value': onUpdateValue,
        onChange
      } = this
      if (onUpdateValue) call(onUpdateValue, value)
      if (onChange) call(onChange, value)
    },
    syncPosition () {
      this.NPopselect.syncPosition()
    },
    setShow (value) {
      this.NPopselect.setShow(value)
    },
    handleMenuToggleOption (option) {
      this.toggle(option.value)
    },
    toggle (value) {
      if (this.multiple) {
        if (Array.isArray(this.value)) {
          const validValues = new Set(this.options.map(option => option.value))
          const newValue = this.value.filter((v) => validValues.has(v))
          const index = newValue.findIndex(v => v === value)
          if (~index) {
            newValue.splice(index, 1)
          } else {
            newValue.push(value)
          }
          this.doUpdateValue(newValue)
        } else {
          this.doUpdateValue([value])
        }
      } else {
        if (this.value === value && this.cancelable) {
          this.doUpdateValue(null)
        } else {
          this.doUpdateValue(value)
          this.setShow(false)
        }
      }
      this.$nextTick(() => {
        this.syncPosition()
      })
    }
  }
}
</script>
