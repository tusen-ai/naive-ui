<template>
  <div
    class="n-menu"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme,
      'n-menu--collapsed': isCollapsed,
      'n-menu--active': !isCollapsed,
      [`n-menu--${mode}`]: mode,
    }"
  >
    <div
      class="n-menu-container"
      :class="{
        'n-menu-container--collapsed': isCollapsed,
        'n-menu-container--active': !isCollapsed,

      }"
    >
      <div
        class="n-menu-content"
        :class="{
          [`n-menu-content--${mode}`]: mode,
        }"
      >
        <ul class="n-menu-list">
          <slot />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'Menu',
  provide () {
    return {
      NMenu: this
    }
  },
  mixins: [withapp, themeable],
  props: {
    value: {
      type: String,
      default: null
    },
    indent: {
      type: Number,
      default: 32
    },
    mode: {
      type: String,
      default: 'vertical'
    },
    defaultOpenNames: {
      type: Array,
      default: () => {
        return undefined
      }
    },
    openNames: {
      type: Array,
      default: () => {
        return undefined
      }
    },
    hasIcon: {
      type: Boolean,
      default: false
    }

  },
  data () {
    return {
      componentName: 'NMenu',
      isCollapsed: false,
      currentOpenNames: this.openNames || this.defaultOpenNames || []
    }
  },
  watch: {
    openNames (val) {
      this.currentOpenNames = val
    },
    defaultOpenNames (val) {
      this.currentOpenNames = val
    }
  },
  methods: {
    toggle () {
      this.isCollapsed = !this.isCollapsed
    },
    changeSelect (value) {
      this.$emit('select', value)
      this.$emit('input', value)
    },
    openKeysChangeCallback (val) {
      let indexs = [...this.currentOpenNames]
      if (indexs.includes(val)) {
        indexs.splice(indexs.findIndex(item => item === val), 1)
      } else {
        indexs.push(val)
      }
      if (typeof (this.openNames) === 'undefined') {
        this.currentOpenNames = indexs
      }
      this.$emit('openNamesChange', indexs)
    }
  }
}
</script>
