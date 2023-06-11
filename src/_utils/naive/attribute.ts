import type { HTMLAttributes } from 'vue'

export function getTitleAttribute (value: unknown): HTMLAttributes['title'] {
  switch (typeof value) {
    case 'string':
      // The empty string should also be reset to undefined.
      return value || undefined
    case 'number':
      return String(value)
    default:
      return undefined
  }
}
