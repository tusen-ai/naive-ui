import { h, type VNode, type VNodeChild } from 'vue'
import type { TreeNode } from 'treemate'
import { keep, keysOf } from '../../_utils'
// eslint-disable-next-line import/no-cycle
import { NMenuOptionGroup, menuItemGroupProps } from './MenuOptionGroup'
// eslint-disable-next-line import/no-cycle
import { NSubmenu, submenuProps } from './Submenu'
import { NMenuOption, menuItemProps } from './MenuOption'
import NMenuDivider from './MenuDivider'
import type {
  MenuOption,
  MenuGroupOption,
  MenuIgnoredOption,
  MenuMixedOption
} from './interface'
import type { MenuSetupProps } from './Menu'

const groupPropKeys = keysOf(menuItemGroupProps)
const itemPropKeys = keysOf(menuItemProps)
const submenuPropKeys = keysOf(submenuProps)

export function isIgnoredNode (
  rawNode: MenuMixedOption
): rawNode is MenuIgnoredOption {
  return rawNode.type === 'divider' || rawNode.type === 'render'
}

export function isDividerNode (
  rawNode: MenuMixedOption
): rawNode is MenuIgnoredOption {
  return rawNode.type === 'divider'
}

export function itemRenderer (
  tmNode: TreeNode<MenuOption, MenuGroupOption, MenuIgnoredOption>,
  menuProps: MenuSetupProps
): VNode | null {
  const { rawNode } = tmNode
  const { show } = rawNode
  if (show === false) {
    return null
  }
  if (isIgnoredNode(rawNode)) {
    if (isDividerNode(rawNode)) {
      return <NMenuDivider key={tmNode.key} {...rawNode.props} />
    }
    return null
  }

  const { labelField } = menuProps
  const { key, level, isGroup } = tmNode
  const props = {
    ...rawNode,
    title: (rawNode.title || rawNode[labelField]) as
      | string
      | (() => VNodeChild)
      | undefined,
    extra: rawNode.titleExtra || rawNode.extra,
    key,
    internalKey: key, // since key can't be used as a prop
    level,
    root: level === 0,
    isGroup
  }

  if (tmNode.children) {
    if (tmNode.isGroup) {
      return h(
        NMenuOptionGroup,
        keep(props, groupPropKeys, { tmNode, tmNodes: tmNode.children, key })
      )
    }
    return h(
      NSubmenu,
      keep(props, submenuPropKeys, {
        key,
        rawNodes: rawNode[menuProps.childrenField] as any,
        tmNodes: tmNode.children,
        tmNode
      })
    )
  } else {
    return h(
      NMenuOption,
      keep(props, itemPropKeys, {
        key,
        tmNode
      })
    )
  }
}
