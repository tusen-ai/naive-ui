<template>
  <n-base-select-menu
    :theme="'light'"
    :multiple="multiple"
    :tree-mate="treeMate"
    :size="size"
    :value="value"
    :width="width"
    :virtual-scroll="false"
    :scrollable="scrollable"
    @menu-toggle-option="handleMenuToggleOption"
  />
</template>

<script>
import { computed, defineComponent } from 'vue'
import { createTreeMate } from 'treemate'
import { NBaseSelectMenu } from '../../_base'
import { useTheme } from '../../_mixins'
import { call, warn } from '../../_utils'
import { popselectLight } from '../styles'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'PopselectPanel',
  components: {
    NBaseSelectMenu
  },
  inject: ['NPopselect'],
  props: {
    ...useTheme.props,
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
      default: undefined
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
        warn(
          'popselect',
          '`on-change` is deprecated, please use `on-update:value` instead.'
        )
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    useTheme('Popseelect', 'Popselect', style, popselectLight, props)
    return {
      treeMate: computed(() => {
        return createTreeMate(props.options, {
          getKey (node) {
            return node.value
          }
        })
      })
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
      const { 'onUpdate:value': onUpdateValue, onChange } = this
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
          const validValues = new Set(
            this.options.map((option) => option.value)
          )
          const newValue = this.value.filter((v) => validValues.has(v))
          const index = newValue.findIndex((v) => v === value)
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
})
</script>
