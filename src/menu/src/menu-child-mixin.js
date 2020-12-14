import { nextTick } from 'vue'

export default {
  inject: {
    NMenu: {
      default: null
    },
    NSubmenu: {
      default: null
    },
    NMenuItemGroup: {
      default: null
    }
  },
  props: {
    internalKey: {
      type: String,
      required: true
    },
    root: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      required: true
    },
    title: {
      type: [String, Function],
      default: undefined
    },
    insidePopover: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      delayedPaddingLeft: undefined
    }
  },
  created () {
    this.delayedPaddingLeft = this.paddingLeft
  },
  watch: {
    paddingLeft (value) {
      nextTick(() => {
        this.delayedPaddingLeft = value
      })
    }
  },
  computed: {
    horizontal () {
      return this.NMenu.mode === 'horizontal'
    },
    popoverPlacement () {
      if (this.horizontal) {
        return 'bottom'
      }
      if ('tmNodes' in this) return 'right-start'
      return 'right'
    },
    menuCollapsed () {
      return this.NMenu.collapsed
    },
    maxIconSize () {
      return Math.max(this.collapsedIconSize, this.iconSize)
    },
    activeIconSize () {
      if (!this.horizontal && this.root && this.menuCollapsed) {
        return this.collapsedIconSize
      } else {
        return this.iconSize
      }
    },
    iconSize () {
      const { NMenu } = this
      return NMenu.iconSize
    },
    collapsedIconSize () {
      const {
        NMenu: { iconSize, collapsedIconSize }
      } = this
      return collapsedIconSize === undefined ? iconSize : collapsedIconSize
    },
    paddingLeft () {
      // TODO handle popover
      const {
        NMenu: { collapsedWidth, indent, rootIndent },
        NSubmenu,
        NMenuItemGroup,
        root,
        horizontal,
        collapsedIconSize,
        menuCollapsed,
        insidePopover,
        level
      } = this
      if (insidePopover && level === 1) return 18
      const mergedRootIndent = rootIndent === undefined ? indent : rootIndent
      const menuCollapsedPaddingLeft =
        collapsedWidth / 2 - collapsedIconSize / 2
      const menuCollapsedPaddingDiff = menuCollapsed
        ? mergedRootIndent - menuCollapsedPaddingLeft
        : 0
      if (root) {
        if (horizontal) return undefined
        return mergedRootIndent - menuCollapsedPaddingDiff
      }
      if (NMenuItemGroup) {
        return indent / 2 + NMenuItemGroup.paddingLeft
      }
      if (NSubmenu) {
        return indent + NSubmenu.paddingLeft
      }
      return undefined
    }
  }
}
