
/**
 * For Select Component to use
 * Todo: Refactor to avoid link list, since it will make component intrinsic
 * logic more complex
 */
import cloneDeep from 'lodash-es/cloneDeep'

function markAvailableOptionValues (options) {
  const length = options.length
  if (length === 0) return
  // let lastAvailableOption = null
  let lastAvailableOptionIndex = null
  options.firstAvailableOptionValue = null
  options.firstAvailableOptionIndex = null
  for (let i = 0; i < length; ++i) {
    const option = options[i]
    if (!option.disabled && options.firstAvailableOptionIndex === null) {
      // options.firstAvailableOptionValue = option.value
      options.firstAvailableOptionIndex = i
    }
    // option.nextAvailableOptionValue = null
    option.nextAvailableOptionIndex = null
    // option.prevAvailableOptionValue = null
    option.prevAvailableOptionIndex = null
    option._index = i
  }
  for (let i = 0; i <= length * 2; ++i) {
    const option = options[i % length]
    if (lastAvailableOptionIndex !== null) {
      // option.prevAvailableOptionValue = lastAvailableOption.value
      option.prevAvailableOptionIndex = lastAvailableOptionIndex
    }
    if (!option.disabled) {
      // lastAvailableOption = option
      lastAvailableOptionIndex = i % length
    }
  }
  // lastAvailableOption = null
  lastAvailableOptionIndex = null
  for (let i = length * 2; i >= 0; --i) {
    const option = options[i % length]
    if (lastAvailableOptionIndex !== null) {
      // option.nextAvailableOptionValue = lastAvailableOption.value
      option.nextAvailableOptionIndex = lastAvailableOptionIndex
    }
    if (!option.disabled) {
      // lastAvailableOption = option
      lastAvailableOptionIndex = i % length
    }
  }
}

export default function linkedOptions (options) {
  const decoratedOptions = cloneDeep(options)
  markAvailableOptionValues(decoratedOptions)
  return decoratedOptions
}
