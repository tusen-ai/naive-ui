import { h } from 'vue'
import { keep } from '../../_utils'
import NMenuItemGroup from './MenuItemGroup'
import NSubmenu from './Submenu'
import NMenuItem from './MenuItem.vue'
import menuChildMixin from './menu-child-mixin'

const menuChildProps = Object.keys(menuChildMixin.props)
const menuItemProps = Object.keys(NMenuItem.props).concat(menuChildProps)
const submenuProps = Object.keys(NSubmenu.props).concat(menuChildProps)
const menuItemGroupProps = Object.keys(NMenuItemGroup.props).concat(
  menuChildProps
)

export function itemRenderer (tmNode) {
  const { rawNode, key, level } = tmNode
  const props = {
    ...rawNode,
    extra: rawNode.extra ?? rawNode.titleExtra,
    key,
    internalKey: key, // since key can't be used as a prop
    level,
    root: level === 0
  }
  if (tmNode.children) {
    if (tmNode.isGroup) {
      return h(
        NMenuItemGroup,
        keep(props, menuItemGroupProps, { tmNodes: tmNode.children })
      )
    }
    return h(
      NSubmenu,
      keep(props, submenuProps, {
        rawNodes: tmNode.rawNode.children,
        tmNodes: tmNode.children
      })
    )
  } else {
    return h(
      NMenuItem,
      keep(props, menuItemProps, {
        tmNode
      })
    )
  }
}
