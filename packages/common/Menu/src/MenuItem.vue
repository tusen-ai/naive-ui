<template>
  <li
    class="n-menu-item"
    :style="{ paddingLeft: paddingLeft + 'px' }"
    :class="{
      'n-menu-item--selected': isSelected,
      'n-menu-item--disabled': synthesizedDisabled
    }"
    @click="handleClick"
  >
    <!-- <span
      v-if="hasIcon"
      class="n-menu-title-icon"
    /> -->
    <slot>
      <render :render="title" />
    </slot>
  </li>
</template>
<script>
import registerable from '../../../mixins/registerable'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import render from '../../../utils/render'

export default {
  name: 'NMenuItem',
  components: {
    render
  },
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
    },
    NMenuItemGroup: {
      default: null
    }
  },
  props: {
    title: {
      type: [String, Function],
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
    paddingLeft () {
      if (this.NMenuItemGroup) {
        return this.NMenu.indent / 2 + this.NMenuItemGroup.paddingLeft
      } else if (this.NSubMenu) {
        return this.NMenu.indent + this.NSubMenu.paddingLeft
      } else {
        return this.NMenu.rootIndent || this.NMenu.indent
      }
    },
    synthesizedDisabled () {
      return ((this.NSubMenu && this.NSubMenu.synthesizedDisabled) || this.disabled)
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
    handleClick () {
      if (!this.synthesizedDisabled) {
        this.NMenu.handleSelect(this.name)
        this.$emit('click', this)
      }
    }
  }
}
</script>
