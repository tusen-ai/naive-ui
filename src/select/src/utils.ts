import { TreeMateOptions } from 'treemate'
import type {
  BaseOption,
  GroupOption,
  IgnoredOption,
  Option,
  Options
} from './interface'

export function getKey (option: Option): string | number {
  if (getIsGroup(option)) return (option as GroupOption).name
  return option.value
}

export function getIsGroup (option: Option): boolean {
  return option.type === 'group'
}

export function getIgnored (option: Option): boolean {
  return !!option.ignored
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
  filter: (pattern: string, option: Option) => boolean,
  pattern: string
): Options {
  if (!filter) return originalOpts
  function traverse (options: Options): Options {
    if (!Array.isArray(options)) return []
    const filteredOptions = []
    for (const option of options) {
      if ('type' in option && option.type === 'group') {
        const children = traverse(option.children)
        if (children.length) {
          filteredOptions.push(
            Object.assign({}, option, {
              children
            })
          )
        }
      } else if (filter(pattern, option)) {
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
    if (option.type === 'group') {
      option.children.forEach((groupOption: GroupOption) => {
        valOptMap.set(groupOption.value, groupOption)
      })
    } else {
      valOptMap.set(option.value, option)
    }
  })
  return valOptMap
}
