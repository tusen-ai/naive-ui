<template>
  <li
    class="n-sub-menu"
  >
    <div
      class="n-sub-menu-header"
      :style="{paddingLeft: paddingLeft + 'px'}"
      :class="{
        'n-sub-menu-header--collapsed': isCollapsed,
        'n-sub-menu-header--active': !isCollapsed,
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
      <ul v-if="!isCollapsed" class="n-sub-menu-content">
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
    openNames () {
      return this.NMenu.openNames || this.NMenu.defaultOpenNames
    }
  },
  watch: {
    openNames (value) {
      this.setCollapsed()
    }
  },
  mounted () {
    this.setCollapsed()
  },
  methods: {
    clickCallback () {
      if (!this.disabled) {
        this.isCollapsed = !this.isCollapsed
        this.NMenu.openKeysChangeCallback(this.name)
        this.$emit('click', this)
      }
    },
    setCollapsed () {
      if (this.openNames && this.openNames.includes(this.name)) {
        this.isCollapsed = false
      } else {
        this.isCollapsed = true
      }
    }
  }
}
</script>
