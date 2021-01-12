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
    }
  },
  computed: {
    horizontal () {
      return this.NMenu.mode === 'horizontal'
    },
    dropdownPlacement () {
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
      const {
        NMenu: { collapsedWidth, indent, rootIndent },
        NSubmenu,
        NMenuItemGroup,
        root,
        horizontal,
        maxIconSize,
        menuCollapsed
      } = this
      const mergedRootIndent = rootIndent === undefined ? indent : rootIndent
      if (root) {
        if (horizontal) return undefined
        if (menuCollapsed) return collapsedWidth / 2 - maxIconSize / 2
        return mergedRootIndent
      }
      if (NMenuItemGroup) {
        return indent / 2 + NMenuItemGroup.paddingLeft
      }
      if (NSubmenu) {
        return indent + NSubmenu.paddingLeft
      }
      return undefined
    },
    iconMarginRight () {
      const {
        NMenu: { collapsedWidth, indent, rootIndent },
        root,
        maxIconSize,
        horizontal,
        menuCollapsed
      } = this
      if (horizontal) return 8
      if (!root) return 8
      if (!menuCollapsed) return 8
      const mergedRootIndent = rootIndent === undefined ? indent : rootIndent
      return (
        mergedRootIndent + maxIconSize + 8 - (collapsedWidth + maxIconSize) / 2
      )
    }
  }
}
