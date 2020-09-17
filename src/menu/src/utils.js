import { h } from 'vue'
import omit from '../../_utils/vue/omit'
import NMenuItemGroup from './MenuItemGroup'
import NSubmenu from './Submenu'
import NMenuItem from './MenuItem'
import { warn } from '../../_utils/naive/warn'

function getWrappedItem (item, level) {
  const clonedItem = {
    ...item,
    key: item.key ?? item.name,
    internalKey: item.key ?? item.name,
    level,
    root: level === 0
  }
  const { children } = item
  if (children) {
    clonedItem.children = getWrappedItems(children, level + 1)
  }
  return clonedItem
}

export function getWrappedItems (items, level = 0) {
  return items.map(item => getWrappedItem(item, level))
}

export function getActivePath (menuItems, activeName) {
  const path = []
  function traverse (items) {
    for (const item of items) {
      if (item.children) {
        path.push(item.name)
        if (__DEV__ && activeName === item.name) {
          warn('menu', `Menu can't select a subment name.`)
        }
        if (traverse(item.children)) return true
        path.pop()
      } else {
        if (activeName === item.name) {
          path.push(item.name)
          return true
        }
      }
    }
    return false
  }
  traverse(menuItems)
  return path
}

export function itemRenderer (item, insidePopover = false) {
  const props = {
    insidePopover,
    ...item
  }
  if (item.children) {
    if (item.group || item.type === 'group') {
      return h(NMenuItemGroup, omit(props, ['disabled', 'group', 'type', 'name']))
    }
    return h(NSubmenu, omit(props, ['name']))
  } else {
    return h(NMenuItem, omit(props, ['children', 'name']))
  }
}
