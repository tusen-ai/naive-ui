<template>
  <div
    class="n-menu"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
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
import usecssr from '../../_mixins/usecssr'
import styles from './styles/index'

export default {
  name: 'Menu',
  provide () {
    return {
      NMenu: this,
      NSubmenu: null
    }
  },
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
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
      type: [Number, String],
      default: null
    },
    overlayMinWidth: {
      type: [Number, String],
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
    defaultExpandedNames: {
      type: Array,
      default: () => []
    },
    expandedNames: {
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
      internalExpandedNames: this.expandedNames || this.defaultExpandedNames
    }
  },
  computed: {
    syntheticExpandedNames () {
      if (this.expandedNames !== undefined) return this.expandedNames || []
      else return this.internalExpandedNames
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
      const currentExpandedNames = Array.from(this.syntheticExpandedNames)
      const index = currentExpandedNames.findIndex(openName => openName === name)
      if (~index) {
        currentExpandedNames.splice(index, 1)
      } else {
        currentExpandedNames.push(name)
      }
      if (this.expandedNames === undefined) {
        this.internalExpandedNames = currentExpandedNames
      }
      this.$emit('open-names-change', currentExpandedNames)
    },
    handleExpandedNamesChange (names) {
      if (this.openName === undefined) {
        this.internalExpandedNames = names
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
