import { h, VNode, VNodeChild } from 'vue'
import type { TreeNode } from 'treemate'
import { keep, keysOf } from '../../_utils'
import NMenuItemGroup, { menuItemGroupProps } from './MenuItemGroup'
import NSubmenu, { submenuProps } from './Submenu'
import NMenuItem, { menuItemProps } from './MenuItem'
import { MenuOption, MenuGroupOption } from './interface'

const groupPropKeys = keysOf(menuItemGroupProps)
const itemPropKeys = keysOf(menuItemProps)
const submenuPropKeys = keysOf(submenuProps)

export function itemRenderer (
  tmNode: TreeNode<MenuOption, MenuGroupOption>
): VNode {
  const { rawNode, key, level } = tmNode
  const props = {
    ...rawNode,
    title: (rawNode.title || rawNode.label) as string | (() => VNodeChild),
    extra: rawNode.titleExtra || rawNode.extra,
    key,
    internalKey: key, // since key can't be used as a prop
    level,
    root: level === 0
  }

  if (tmNode.children) {
    if (tmNode.isGroup) {
      return h(
        NMenuItemGroup,
        keep(props, groupPropKeys, { tmNodes: tmNode.children })
      )
    }
    return h(
      NSubmenu,
      keep(props, submenuPropKeys, {
        rawNodes: tmNode.rawNode.children,
        tmNodes: tmNode.children
      })
    )
  } else {
    return h(
      NMenuItem,
      keep(props, itemPropKeys, {
        tmNode
      })
    )
  }
}
