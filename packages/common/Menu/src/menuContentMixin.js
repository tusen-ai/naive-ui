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
    },
    PenetratedNSubmenu: {
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
      return !this.rootMenuIsHorizontal && this.NMenu.collapsed
    },
    rootMenuValue () {
      return this.NMenu.value
    },
    rootMenuMode () {
      return this.NMenu.mode
    },
    rootMenuIsHorizontal () {
      return this.rootMenuMode === 'horizontal'
    },
    menuItemPopoverPlacement () {
      if (this.rootMenuMode === 'horizontal') {
        return 'bottom'
      }
      return 'right'
    },
    submenuPopoverPlacement () {
      if (this.rootMenuMode === 'horizontal') {
        return 'bottom'
      }
      return 'right-start'
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
      return this.NMenu.collapsedIconSize === null ? this.NMenu.iconSize : this.NMenu.collapsedIconSize
    },
    paddingLeft () {
      if (this.rootMenuIsHorizontal) return null
      if (this.atRoot && this.NMenu.collapsedWidth !== null && this.NMenu.collapsed) {
        return this.NMenu.collapsedWidth / 2 - this.iconSize / 2
      }
      if (this.NMenuItemGroup) {
        return this.NMenu.indent / 2 + this.NMenuItemGroup.paddingLeft
      } else if (this.NSubmenu) {
        return this.NMenu.indent + this.NSubmenu.paddingLeft
      } else {
        return this.NMenu.rootIndent === null ? this.NMenu.indent : this.NMenu.rootIndent
      }
    }
  }
}
