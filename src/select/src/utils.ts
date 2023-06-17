import { type TreeMateOptions } from 'treemate'
import type {
  SelectBaseOption,
  SelectGroupOption,
  SelectIgnoredOption,
  SelectMixedOption,
  SelectOption
} from './interface'

export function getIsGroup (option: SelectMixedOption): boolean {
  return option.type === 'group'
}

export function getIgnored (option: SelectMixedOption): boolean {
  return option.type === 'ignored'
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

export function createTmOptions (
  valueField: string,
  childrenField: string
): TreeMateOptions<SelectBaseOption, SelectGroupOption, SelectIgnoredOption> {
  const options: TreeMateOptions<
  SelectBaseOption,
  SelectGroupOption,
  SelectIgnoredOption
  > = {
    getIsGroup,
    getIgnored,
    getKey (option: SelectMixedOption): string | number {
      if (getIsGroup(option)) {
        return (
          ((option as SelectGroupOption).name as any) ||
          (option as SelectGroupOption).key ||
          'key-required'
        )
      }
      // Required for non-custom label & value field
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return (option as SelectBaseOption | SelectIgnoredOption)[
        valueField
      ] as NonNullable<SelectOption['value']>
    },
    getChildren (option) {
      return option[childrenField] as SelectBaseOption[]
    }
  }
  return options
}

export function filterOptions (
  originalOpts: SelectMixedOption[],
  filter: (pattern: string, option: SelectBaseOption) => boolean,
  pattern: string,
  childrenField: string
): SelectMixedOption[] {
  if (!filter) return originalOpts
  function traverse (options: SelectMixedOption[]): SelectMixedOption[] {
    if (!Array.isArray(options)) return []
    const filteredOptions: SelectMixedOption[] = []
    for (const option of options) {
      if (getIsGroup(option)) {
        const children = traverse(option[childrenField] as SelectBaseOption[])
        if (children.length) {
          filteredOptions.push(
            Object.assign({}, option, {
              [childrenField]: children
            })
          )
        }
      } else if (getIgnored(option)) {
        continue
      } else if (filter(pattern, option as SelectBaseOption)) {
        filteredOptions.push(option)
      }
    }
    return filteredOptions
  }
  return traverse(originalOpts)
}

export function createValOptMap (
  options: SelectMixedOption[],
  valueField: string,
  childrenField: string
): Map<string | number, SelectBaseOption> {
  const valOptMap = new Map<string | number, SelectBaseOption>()
  options.forEach((option) => {
    if (getIsGroup(option)) {
      ;(option[childrenField] as SelectBaseOption[]).forEach(
        (selectGroupOption: SelectBaseOption) => {
          valOptMap.set(
            selectGroupOption[valueField] as NonNullable<
            SelectBaseOption['value']
            >,
            selectGroupOption
          )
        }
      )
    } else {
      valOptMap.set(
        option[valueField] as NonNullable<SelectBaseOption['value']>,
        option as SelectBaseOption
      )
    }
  })
  return valOptMap
}
