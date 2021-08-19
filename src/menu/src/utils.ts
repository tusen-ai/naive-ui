import { h, VNode, VNodeChild } from 'vue'
import type { TreeNode } from 'treemate'
import { keep, keysOf } from '../../_utils'
import NMenuOptionGroup, { menuItemGroupProps } from './MenuOptionGroup'
import NSubmenu, { submenuProps } from './Submenu'
import NMenuOption, { menuItemProps } from './MenuOption'
import NMenuDivider from './MenuDivider'
import {
  MenuOption,
  MenuGroupOption,
  MenuIgnoredOption,
  MenuMixedOption
} from './interface'
import { MenuSetupProps } from './Menu'

const groupPropKeys = keysOf(menuItemGroupProps)
const itemPropKeys = keysOf(menuItemProps)
const submenuPropKeys = keysOf(submenuProps)

export function isDividerNode (rawNode: MenuMixedOption): boolean {
  return rawNode.type === 'divider'
}

export function isIgnoredNode (rawNode: MenuMixedOption): boolean {
  return rawNode.type === 'ignored'
}

export function itemRenderer (
  tmNode: TreeNode<MenuOption, MenuGroupOption, MenuIgnoredOption>,
  menuProps: MenuSetupProps,
  mergedClsPrefix: string
): VNode | undefined {

  if (isIgnoredNode(tmNode.rawNode)) {
    return undefined
  } else if (isDividerNode(tmNode.rawNode)) {
    return h(NMenuDivider, {
      clsPrefix: mergedClsPrefix,
      key: tmNode.key
    })
  }

  const { labelField } = menuProps
  const { key, level, isGroup } = tmNode
  const rawNode = tmNode.rawNode as MenuOption | MenuGroupOption
  const title = (rawNode.title || rawNode[labelField]) as
    | string
    | (() => VNodeChild)
    | undefined
  const extra = (rawNode.titleExtra || rawNode.extra)
  const props = {
    ...rawNode,
    title,
    extra,
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
        keep(props, groupPropKeys, { tmNodes: tmNode.children, key })
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
