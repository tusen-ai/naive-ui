import { TreeMateOptions } from 'treemate'
import type {
  SelectOption,
  SelectGroupOption,
  SelectIgnoredOption,
  SelectMixedOption
} from './interface'

export function getKey (option: SelectMixedOption): string | number {
  if (getIsGroup(option)) {
    return (
      ((option as SelectGroupOption).name as any) ||
      option.value ||
      'key-required'
    )
  }
  return (option as SelectOption | SelectIgnoredOption).value
}

export function getIsGroup (option: SelectMixedOption): boolean {
  return option.type === 'group'
}

export function getIgnored (option: SelectMixedOption): boolean {
  return option.type === 'ignored'
}

export const tmOptions: TreeMateOptions<
SelectOption,
SelectGroupOption,
SelectIgnoredOption
> = {
  getKey,
  getIsGroup,
  getIgnored
}

export function patternMatched (pattern: string, value: string): boolean {
  try {
    return !!(
      1 + value.toString().toLowerCase().indexOf(pattern.trim().toLowerCase())
    )
  } catch (err) {
    return false
  }
}

export function filterOptions (
  originalOpts: SelectMixedOption[],
  filter: (pattern: string, option: SelectOption) => boolean,
  pattern: string
): SelectMixedOption[] {
  if (!filter) return originalOpts
  function traverse (options: SelectMixedOption[]): SelectMixedOption[] {
    if (!Array.isArray(options)) return []
    const filteredOptions = []
    for (const option of options) {
      if (getIsGroup(option)) {
        const children = traverse((option as SelectGroupOption).children)
        if (children.length) {
          filteredOptions.push(
            Object.assign({}, option, {
              children
            })
          )
        }
      } else if (getIgnored(option)) {
        continue
      } else if (filter(pattern, option as SelectOption)) {
        filteredOptions.push(option)
      }
    }
    return filteredOptions
  }
  return traverse(originalOpts)
}

export function createValOptMap (
  options: SelectMixedOption[]
): Map<string | number, SelectOption> {
  const valOptMap = new Map()
  options.forEach((option) => {
    if (getIsGroup(option)) {
      ;(option as SelectGroupOption).children.forEach(
        (SelectGroupOption: SelectOption) => {
          valOptMap.set(SelectGroupOption.value, SelectGroupOption)
        }
      )
    } else {
      valOptMap.set(option.value, option)
    }
  })
  return valOptMap
}
