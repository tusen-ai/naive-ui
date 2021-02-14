import { MenuOption } from '../../../menu'
import { Item } from './interface'

export function createItems (items: Item[]): MenuOption[] {
  return items.map((item) => {
    const isGroup = item.group || item.type === 'group'
    const children = item.childItems || item.children
    const key = item.name || item.key
    const extra = item.extra || item.titleExtra
    const label = (item.label as string | undefined) || item.title || key || ''
    const menuOption: MenuOption = {
      path: item.path,
      label: label,
      extra: extra,
      key: key || 'key-required',
      disabled: item.disabled,
      children: children ? createItems(children) : undefined,
      type: isGroup ? 'group' : undefined
    }
    return menuOption
  })
}
