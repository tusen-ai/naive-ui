
/**
 * For Select Component to use
 */
const OPTION_TYPE = {
  OPTION: 0,
  RENDER: 1,
  GROUP_HEADER: 2
}

function valueToOptionMap (rawOptions) {
  const map = new Map()
  function traverse (options) {
    if (!Array.isArray(options)) return
    options.forEach(option => {
      if (typeof option === 'function') {
        // do nothing
      } else if (option.type === 'group') {
        traverse(option.children)
      } else {
        map.set(option.value, option)
      }
    })
  }
  traverse(rawOptions)
  return map
}

function filterOptions (optionsToBeFiltered, filter) {
  if (!filter) return optionsToBeFiltered
  function traverse (options) {
    if (!Array.isArray(options)) return []
    const filteredOptions = []
    for (let option of options) {
      if (typeof option === 'function') {
        filteredOptions.push(option)
      } else if (option.type === 'group') {
        const children = traverse(option.children)
        if (children.length) {
          filteredOptions.push(Object.assign({}, option, {
            children
          }))
        }
      } else {
        if (filter(option)) {
          filteredOptions.push(option)
        }
      }
    }
    return filteredOptions
  }
  return traverse(optionsToBeFiltered)
}

function flattenOptions (optionsToBeFlattened) {
  const flattenedOptions = []
  let index = 0
  function traverse (options, context = {}) {
    if (!Array.isArray(options)) return
    for (let option of options) {
      if (typeof option === 'function') {
        const wrappedOption = {
          type: OPTION_TYPE.RENDER,
          index: index,
          key: index,
          render: option,
          grouped: false
        }
        if (context.grouped) {
          wrappedOption.grouped = true
        }
        flattenedOptions.push(wrappedOption)
        index++
      } else if (option.type === 'group') {
        flattenedOptions.push({
          type: OPTION_TYPE.GROUP_HEADER,
          index: index,
          data: option,
          key: index
        })
        index++
        traverse(option.children, {
          grouped: true
        })
      } else {
        const wrappedOption = {
          type: OPTION_TYPE.OPTION,
          index: index++,
          data: option,
          key: option.value,
          grouped: false
        }
        if (context.grouped) {
          wrappedOption.grouped = true
        }
        flattenedOptions.push(wrappedOption)
      }
    }
  }
  traverse(optionsToBeFlattened)
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

export {
  getPrevAvailableIndex,
  getNextAvailableIndex,
  valueToOptionMap,
  filterOptions,
  flattenOptions,
  OPTION_TYPE
}
