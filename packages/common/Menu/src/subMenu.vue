<template>
  <li
    class="n-sub-menu"
  >
    <div
      class="n-sub-menu-header"
      :style="{paddingLeft: paddingLeft + 'px'}"
      :class="{
        'n-sub-menu-header--collapsed': collapsed,
        'n-sub-menu-header--active': !collapsed,
        'n-sub-menu-header--has-icon': hasIcon,
        'n-sub-menu-header--disabled': disabled,
      }"
      @click="clickCallback"
    >
      <span
        v-if="hasIcon"
        class="n-menu-title-icon"
      />
      <span>{{ title }}</span>
    </div>
    <fade-in-height-expand-transition>
      <ul v-if="!collapsed" class="n-sub-menu-content">
        <slot />
      </ul>
    </fade-in-height-expand-transition>
  </li>
</template>
<script>
import FadeInHeightExpandTransition from '../../../transition/FadeInHeightExpandTransition'

export default {
  name: 'NSubMenu',
  provide () {
    return {
      NSubMenu: this
    }
  },
  components: {
    FadeInHeightExpandTransition
  },
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
  data () {
    return {
      isCollapsed: true
    }
  },
  computed: {
    hasIcon () {
      return this.NMenu.haIcon && this.$parent.$options.name === 'NMenu'
    },
    paddingLeft () {
      let padding = this.NMenu.indent
      if (this.NSubMenu) {
        padding = padding + this.NSubMenu.paddingLeft
      }
      return padding
    },
    collapsed: {
      get: function () {
        let indexs = this.NMenu.openNames || this.NMenu.defaultOpenNames
        if (indexs && indexs.includes(this.name)) {
          this.isCollapsed = false
        } else {
          this.isCollapsed = true
        }
        return this.isCollapsed
      },
      set: function (val) {
        this.isCollapsed = val
      }
    }
  },
  methods: {
    clickCallback () {
      if (!this.disabled) {
        this.collapsed = !this.collapsed
        this.NMenu.openKeysChangeCallback(this.name)
        this.$emit('click', this)
      }
    }
  }
}
</script>
