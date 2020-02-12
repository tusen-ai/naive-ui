<template>
  <div
    class="n-menu"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme,
      [`n-menu--${mode}`]: mode,
      'n-menu--collapsed': collapsed,
      'n-menu--transition-disabled': transitionDisabled
    }"
  >
    <ul class="n-menu-list">
      <slot />
    </ul>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

export default {
  name: 'Menu',
  provide () {
    return {
      NMenu: this,
      NSubmenu: null
    }
  },
  mixins: [withapp, themeable],
  model: {
    prop: 'value',
    model: 'select'
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    collapsedWidth: {
      type: Number,
      default: null
    },
    iconSize: {
      type: Number,
      default: 20
    },
    collapsedIconSize: {
      type: Number,
      default: null
    },
    overlayWidth: {
      type: Number,
      default: null
    },
    overlayMinWidth: {
      type: Number,
      default: 180
    },
    rootIndent: {
      type: Number,
      default: null
    },
    indent: {
      type: Number,
      default: 32
    },
    defaultOpenNames: {
      type: Array,
      default: () => []
    },
    openNames: {
      type: Array,
      default: undefined
    },
    value: {
      type: String,
      default: null
    },
    mode: {
      type: String,
      default: 'vertical'
    },
    /** private */
    insidePopover: {
      type: Boolean,
      default: false
    },
    submenuCollapsable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      transitionDisabled: true,
      internalOpenNames: this.openNames || this.defaultOpenNames
    }
  },
  computed: {
    synthesizedOpenNames () {
      if (this.openNames !== undefined) return this.openNames || []
      else return this.internalOpenNames
    }
  },
  mounted () {
    this.disableTransitionOneTick()
  },
  methods: {
    handleSelect (value) {
      this.$emit('select', value)
      this.$emit('input', value)
    },
    toggleOpenName (name) {
      const currentOpenNames = Array.from(this.synthesizedOpenNames)
      const index = currentOpenNames.findIndex(openName => openName === name)
      if (~index) {
        currentOpenNames.splice(index, 1)
      } else {
        currentOpenNames.push(name)
      }
      if (this.openNames === undefined) {
        this.internalOpenNames = currentOpenNames
      }
      this.$emit('open-names-change', currentOpenNames)
    },
    handleOpenNamesChange (names) {
      if (this.openName === undefined) {
        this.internalOpenNames = names
      }
      this.$emit('open-names-change', names)
    },
    disableTransitionOneTick () {
      this.transitionDisabled = true
      this.$nextTick().then(() => {
        this.transitionDisabled = false
      })
    }
  }
}
</script>
