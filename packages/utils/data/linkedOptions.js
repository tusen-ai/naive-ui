
/**
 * For Select Component to use
 * Todo: Refactor to avoid link list, since it will make component intrinsic
 * logic more complex
 */
import cloneDeep from 'lodash/cloneDeep'

function markAvailableOptionValues (options) {
  const length = options.length
  if (length === 0) return
  let lastAvailableOption = null
  options.firstAvailableOptionValue = null
  for (let i = 0; i < length; ++i) {
    const option = options[i]
    if (!option.disabled) {
      options.firstAvailableOptionValue = option.value
      break
    }
  }
  for (let i = 0; i < length; ++i) {
    const option = options[i]
    option.nextAvailableOptionValue = null
    option.prevAvailableOptionValue = null
  }
  for (let i = 0; i <= length * 2; ++i) {
    const option = options[i % length]
    if (lastAvailableOption) {
      option.prevAvailableOptionValue = lastAvailableOption.value
    }
    if (!option.disabled) {
      lastAvailableOption = option
    }
  }
  lastAvailableOption = null
  for (let i = length * 2; i >= 0; --i) {
    const option = options[i % length]
    if (lastAvailableOption) {
      option.nextAvailableOptionValue = lastAvailableOption.value
    }
    if (!option.disabled) {
      lastAvailableOption = option
    }
  }
}

export default function linkedOptions (options) {
  const decoratedOptions = cloneDeep(options)
  markAvailableOptionValues(decoratedOptions)
  return decoratedOptions
}
