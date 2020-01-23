<template>
  <div
    class="n-menu"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme,
      [`n-menu--${mode}`]: mode,
      'n-menu--collapsed': collapsed
    }"
  >
    <ul class="n-menu-list">
      <slot />
    </ul>
  </div>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'Menu',
  provide () {
    return {
      NMenu: this,
      NSubmenu: null
    }
  },
  mixins: [withapp, themeable],
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    collapsedWidth: {
      type: Number,
      default: null
    },
    collapsedIconSize: {
      type: Number,
      default: undefined
    },
    value: {
      type: String,
      default: null
    },
    rootIndent: {
      type: Number,
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
    iconSize: {
      type: Number,
      default: 20
    },
    defaultOpenNames: {
      type: Array,
      default: undefined
    },
    openNames: {
      type: Array,
      default: undefined
    },
    inPopover: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      internalOpenNames: this.openNames || this.defaultOpenNames || []
    }
  },
  computed: {
    synthesizedOpenNames () {
      if (this.openNames !== undefined) return this.openNames || []
      else return this.internalOpenNames
    }
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
    }
  }
}
</script>
