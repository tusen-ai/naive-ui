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
  computed: {
    atRoot () {
      return !this.NSubmenu && !this.NMenuItemGroup
    },
    rootMenuInsidePopover () {
      return this.NMenu.insidePopover
    },
    renderContentAsPopover () {
      return this.atRoot && !this.rootMenuInsidePopover
    },
    rootMenuCollapsed () {
      return this.NMenu.collapsed
    },
    rootMenuValue () {
      return this.NMenu.value
    },
    maxIconSize () {
      return Math.max(this.collapsedIconSize, this.iconSize)
    },
    activeIconSize () {
      if (
        !this.rootMenuInsidePopover &&
        this.rootMenuCollapsed &&
        this.atRoot
      ) {
        return this.collapsedIconSize
      } else {
        return this.iconSize
      }
    },
    iconSize () {
      return this.NMenu && this.NMenu.iconSize
    },
    collapsedIconSize () {
      return this.NMenu.collapsedIconSize || this.NMenu.iconSize
    },
    paddingLeft () {
      if (this.atRoot && this.NMenu.collapsedWidth !== null && this.NMenu.collapsed) {
        return this.NMenu.collapsedWidth / 2 - this.iconSize / 2
      }
      if (this.NMenuItemGroup) {
        return this.NMenu.indent / 2 + this.NMenuItemGroup.paddingLeft
      } else if (this.NSubmenu) {
        return this.NMenu.indent + this.NSubmenu.paddingLeft
      } else {
        return this.NMenu.rootIndent || this.NMenu.indent
      }
    }
  }
}
