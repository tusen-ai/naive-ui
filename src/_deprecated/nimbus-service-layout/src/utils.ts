import { MenuItem } from '../../../menu'
import { Item } from './interface'

export function createItems (items: Item[]): MenuItem[] {
  return items.map((item) => {
    const isGroup = item.group || item.type === 'group'
    return {
      path: item.path,
      title: item.title || item.name,
      extra: item.extra || item.titleExtra,
      key: item.name || 'key-required',
      disabled: item.disabled,
      children: item.childItems ? createItems(item.childItems) : undefined,
      type: isGroup ? 'group' : undefined
    }
  })
}
