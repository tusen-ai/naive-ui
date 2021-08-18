import { h, VNode, VNodeChild } from 'vue'
import type { TreeNode } from 'treemate'
import { keep, keysOf } from '../../_utils'
import NMenuOptionGroup, { menuItemGroupProps } from './MenuOptionGroup'
import NSubmenu, { submenuProps } from './Submenu'
import NMenuOption, { menuItemProps } from './MenuOption'
import {
  MenuOption,
  MenuGroupOption,
  MenuIgnoredOption,
  MenuMixedOption
} from './interface'
import { MenuSetupProps } from './Menu'
import NMenuOptionDivider from './MenuOptionDivider'

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
  const { labelField } = menuProps
  const { rawNode, key, level, isGroup } = tmNode
  const isIgnored = rawNode.type === 'ignored' || rawNode.type === 'divider'
  const title = (isIgnored ? undefined : rawNode.title || rawNode[labelField]) as
    | string
    | (() => VNodeChild)
    | undefined
  const extra = (isIgnored ? undefined : rawNode.titleExtra || rawNode.extra)
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
  } else if (isDividerNode(rawNode)) {
    return h(NMenuOptionDivider, {
      clsPrefix: mergedClsPrefix,
      key: tmNode.key
    })
  } else if (isIgnoredNode(rawNode)) {
    return undefined
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
