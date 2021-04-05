export function findMenuValue (options, path) {
  for (const option of options) {
    if (option.children) {
      const value = findMenuValue(option.children, path)
      if (value) return value
    }
    if (option.path === path) {
      return option.key
    }
  }
  return undefined
}
