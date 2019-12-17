
/**
 * For Select Component to use
 * Todo: Refactor to avoid link list, since it will make component intrinsic
 * logic more complex
 */
import cloneDeep from 'lodash/cloneDeep'

function markAvailableOptionIds (options) {
  const length = options.length
  if (length === 0) return
  let lastAvailableOption = null
  options.firstAvailableOptionId = null
  for (let i = 0; i < length; ++i) {
    const option = options[i]
    if (!option.disabled) {
      options.firstAvailableOptionId = option.id
      break
    }
  }
  for (let i = 0; i < length; ++i) {
    const option = options[i]
    option.nextAvailableOptionId = null
    option.prevAvailableOptionId = null
  }
  for (let i = 0; i <= length * 2; ++i) {
    const option = options[i % length]
    if (lastAvailableOption) {
      option.prevAvailableOptionId = lastAvailableOption.id
    }
    if (!option.disabled) {
      lastAvailableOption = option
    }
  }
  lastAvailableOption = null
  for (let i = length * 2; i >= 0; --i) {
    const option = options[i % length]
    if (lastAvailableOption) {
      option.nextAvailableOptionId = lastAvailableOption.id
    }
    if (!option.disabled) {
      lastAvailableOption = option
    }
  }
}

export default function linkedOptions (options) {
  const decoratedOptions = cloneDeep(options).map((option, index) => {
    return {
      ...option,
      id: index + 1
    }
  })
  markAvailableOptionIds(decoratedOptions)
  return decoratedOptions
}
