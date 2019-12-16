<template>
  <li
    class="n-menu-item"
    :style="{paddingLeft: paddingLeft + 'px'}"
    :class="{
      'n-menu-item--selected': isSelected,
      'n-menu-item--disabled': isDisabled
    }"
    @click="clickCallback"
  >
    <span
      v-if="hasIcon"
      class="n-menu-title-icon"
    />
    <span>{{ title }}{{ isDisabled }}</span>
  </li>
</template>
<script>
import registerable from '../../../mixins/registerable'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NMenuItem',
  componentName: 'NMenuItem',
  mixins: [
    registerable('NMenu'),
    withapp,
    themeable
  ],
  inject: {
    NMenu: {
      default: null
    },
    NSubMenu: {
      default: null
    }
  },
  props: {
    title: {
      type: String,
      default: null
    },
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasIcon () {
      return this.NMenu.hasIcon && this.$parent.componentName === 'NMenu'
    },
    paddingLeft () {
      let padding = this.NMenu.indent
      if (this.NSubMenu) {
        padding = padding + this.NSubMenu.paddingLeft
      }
      return padding
    },
    isDisabled () {
      return ((this.NSubMenu && this.NSubMenu.disabled) || this.disabled)
    },
    isSelected () {
      if (this.NMenu.value === this.name) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    clickCallback () {
      if (!this.disabled) {
        this.NMenu.changeSelect(this.name)
        this.$emit('click', this)
      }
    }
  }
}
</script>
