import { TreeMateOptions } from 'treemate'
import type {
  BaseOption,
  GroupOption,
  IgnoredOption,
  Option,
  Options
} from './interface'

export function getKey (option: Option): string | number {
  if (getIsGroup(option)) { return (option as GroupOption).name || option.value || 'key-required' }
  return (option as BaseOption | IgnoredOption).value
}

export function getIsGroup (option: Option): boolean {
  return option.type === 'group'
}

export function getIgnored (option: Option): boolean {
  return option.type === 'ignored'
}

export const tmOptions: TreeMateOptions<
BaseOption,
GroupOption,
IgnoredOption
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
  originalOpts: Options,
  filter: (pattern: string, option: BaseOption) => boolean,
  pattern: string
): Options {
  if (!filter) return originalOpts
  function traverse (options: Options): Options {
    if (!Array.isArray(options)) return []
    const filteredOptions = []
    for (const option of options) {
      if (getIsGroup(option)) {
        const children = traverse((option as GroupOption).children)
        if (children.length) {
          filteredOptions.push(
            Object.assign({}, option, {
              children
            })
          )
        }
      } else if (getIgnored(option)) {
        continue
      } else if (filter(pattern, option as BaseOption)) {
        filteredOptions.push(option)
      }
    }
    return filteredOptions
  }
  return traverse(originalOpts)
}

export function createValOptMap (
  options: Options
): Map<string | number, BaseOption> {
  const valOptMap = new Map()
  options.forEach((option) => {
    if (getIsGroup(option)) {
      ;(option as GroupOption).children.forEach((groupOption: BaseOption) => {
        valOptMap.set(groupOption.value, groupOption)
      })
    } else {
      valOptMap.set(option.value, option)
    }
  })
  return valOptMap
}
