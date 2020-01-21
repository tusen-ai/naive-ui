
/**
 * For Select Component to use
 */
const OPTION_TYPE = {
  OPTION: 0,
  RENDER: 1
}

function flattenOptions (optionsToFlatten) {
  const flattenedOptions = []
  let index = 0
  function traverse (options) {
    if (!Array.isArray(options)) return
    for (let option of options) {
      if (typeof option === 'function') {
        flattenedOptions.push({
          type: OPTION_TYPE.RENDER,
          index: index++,
          key: index,
          data: option
        })
      } else if (option.type === 'group') {
        traverse(option.children)
      } else {
        flattenedOptions.push({
          type: OPTION_TYPE.OPTION,
          index: index++,
          data: option,
          key: option.value
        })
      }
    }
  }
  traverse(optionsToFlatten)
  return flattenedOptions
}

function getNextAvailableIndex (options, currentIndex) {
  return getAvailableIndex(options, currentIndex, 'next')
}

function getPrevAvailableIndex (options, currentIndex) {
  return getAvailableIndex(options, currentIndex, 'prev')
}

function getAvailableIndex (options, currentIndex, direction) {
  const length = options.length
  let iterationStartsAt = null
  let iterationEndsAt = null
  if (direction === 'next') {
    if (currentIndex !== null) {
      iterationStartsAt = currentIndex + 1
      iterationEndsAt = currentIndex + length
    } else {
      iterationStartsAt = 0
      iterationEndsAt = length
    }
  } else {
    if (currentIndex !== null) {
      iterationStartsAt = currentIndex + length - 1
      iterationEndsAt = currentIndex
    } else {
      iterationStartsAt = length
      iterationEndsAt = 0
    }
  }
  for (let i = iterationStartsAt; i !== iterationEndsAt;) {
    const option = options[i % length]
    if (option.type === OPTION_TYPE.OPTION) {
      const data = option.data
      if (!data.disabled) return [i % length]
    }
    if (direction === 'prev') {
      --i
    } else {
      ++i
    }
  }
  return null
}

function flattenedOptions (options) {
  const flattenedOptions = flattenOptions(options)
  return flattenedOptions
}

export {
  getPrevAvailableIndex,
  getNextAvailableIndex,
  flattenedOptions
}
