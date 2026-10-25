import type { MenuOption } from 'naive-ui'

type MenuOptionWithPath = MenuOption & {
  path?: string
  children?: MenuOptionWithPath[]
}

export function findMenuValue(
  options: MenuOptionWithPath[],
  path: string
): MenuOption['key'] | undefined {
  for (const option of options) {
    if (option.children) {
      const value = findMenuValue(option.children, path)
      if (value)
        return value
    }
    if (option.path === path) {
      return option.key
    }
  }
  return undefined
}
