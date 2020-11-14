import { h } from 'vue'
import { omit } from '../../_utils/vue'
import NMenuItemGroup from './MenuItemGroup'
import NSubmenu from './Submenu'
import NMenuItem from './MenuItem.vue'

export function itemRenderer (tmNode, insidePopover = false) {
  const { rawNode, key, level } = tmNode
  const props = {
    insidePopover,
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
        omit(
          props,
          ['disabled', 'group', 'type', 'name', 'titleExtra', 'children'],
          { tmNodes: tmNode.children }
        )
      )
    }
    return h(NSubmenu, omit(props, ['children', 'name', 'type', 'titleExtra'], { tmNodes: tmNode.children }))
  } else {
    return h(NMenuItem, omit(props, ['children', 'name', 'titleExtra']))
  }
}
