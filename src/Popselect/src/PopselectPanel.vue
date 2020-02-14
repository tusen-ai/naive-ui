<template>
  <n-base-select-menu
    :theme="syntheticTheme"
    :multiple="multiple"
    :options="options"
    :loading="loading"
    :is-option-selected="isSelected"
    :width="width"
    :virtual-scroll="false"
    size="small"
    @menu-toggle-option="handleMenuToggleOption"
  />
</template>

<script>
import NBaseSelectMenu from '../../_base/SelectMenu'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  components: {
    NBaseSelectMenu
  },
  mixins: [withapp, themeable],
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      validator () {
        return true
      },
      default: null
    },
    cancelable: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    controller: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    options () {
      this.$nextTick().then(() => {
        this.controller && this.controller.updatePosition()
      })
    },
    loading () {
      this.$nextTick().then(() => {
        this.controller && this.controller.updatePosition()
      })
    }
  },
  methods: {
    isSelected (option) {
      if (!option) return false
      const value = option.value
      if (this.multiple) {
        if (Array.isArray(this.value)) return !!~this.value.findIndex(v => v === value)
      } else {
        return this.value === value
      }
      return false
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
          this.$emit('input', newValue)
          this.$emit('change', newValue)
        } else {
          this.$emit('input', [value])
          this.$emit('change', [value])
        }
      } else {
        if (this.value === value && this.cancelable) {
          this.$emit('input', null)
          this.$emit('change', null)
        } else {
          this.$emit('input', value)
          this.$emit('change', value)
          this.controller && this.controller.hide()
        }
      }
      this.$nextTick().then(() => {
        this.controller.updatePosition()
      })
    }
  }
}
</script>
