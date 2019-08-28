/**
 * For Cascader Component to use
 */

import cloneDeep from 'lodash/cloneDeep'

function isLeaf (option) {
  if (option.isLeaf === true) {
    return true
  } else if (option.isLeaf === false) {
    return false
  } else if (hasChildren(option)) {
    /**
     * I don't take length into consideration because it may cause some problem
     * when lazy load data
     */
    return false
  }
  return true
}

function processedOption (option, activeIds, trackId, loadingId) {
  return {
    ...option,
    active: activeIds.has(option.id),
    hasChildren: hasChildren(option),
    checkboxChecked: checkboxChecked(option),
    checkboxIndeterminate: checkboxIndeterminate(option),
    isLeaf: isLeaf(option),
    tracked: tracked(option, trackId),
    determined: !Number.isNaN(option.leafCount),
    loading: option.id === loadingId
  }
}

function tracked (option, trackId) {
  return option.id === trackId
}

function checkboxChecked (option) {
  if (option.type === 'multiple') {
    if (option.isLeaf) {
      return option.checked
    } else {
      if (Number.isNaN(option.leafCount)) {
        return false
      } else {
        return option.leafCount === option.checkedLeafCount
      }
    }
  } else {
    return option.checked
  }
}

function checkboxIndeterminate (option) {
  if (option.type === 'multiple') {
    if (!option.isLeaf) {
      return option.hasCheckedLeaf && !checkboxChecked(option)
    }
  } return false
}

function hasChildren (option) {
  return Array.isArray(option.children)
}

function loaded (option) {
  if (!isLeaf(option) && !hasChildren(option)) {
    return false
  }
  return true
}

function markAvailableSiblingIds (options) {
  const length = options.length
  if (length === 0) return
  let lastAvailableOption = null
  for (let i = 0; i < length; ++i) {
    const option = options[i]
    option.nextAvailableSiblingId = null
    option.prevAvailableSiblingId = null
  }
  for (let i = 0; i <= length * 2; ++i) {
    const option = options[i % length]
    if (lastAvailableOption) {
      option.prevAvailableSiblingId = lastAvailableOption.id
    }
    if (!option.disabled) {
      lastAvailableOption = option
    }
  }
  lastAvailableOption = null
  for (let i = length * 2; i >= 0; --i) {
    const option = options[i % length]
    if (lastAvailableOption) {
      option.nextAvailableSiblingId = lastAvailableOption.id
    }
    if (!option.disabled) {
      lastAvailableOption = option
    }
  }
}

function markFirstAvailableChildId (options) {
  for (const option of options) {
    if (option.isLeaf) {
      option.firstAvailableChildId = null
    } else {
      if (hasChildren(option)) {
        const firstChildOption = option.children[0]
        if (firstChildOption) {
          if (firstChildOption.disabled) {
            option.firstAvailableChildId = firstChildOption.nextAvailableSiblingId
          } else {
            option.firstAvailableChildId = firstChildOption.id
          }
        }
      } else {
        option.firstAvailableChildId = null
      }
    }
  }
}

function availableParentId (parent, depth) {
  if (!parent || parent.disabled || depth === 1) {
    return null
  }
  return parent.id
}

function rootedOptions (options) {
  return cloneDeep([{
    isLeaf: false,
    children: options || null
  }])
}

/**
 *
 * @param {*} options
 * @param {Map} patches
 */
function patchedOptions (options, patches) {
  // console.log('patchedOptions input', options, patches)
  function traverse (options, depth = 0, parentId = 0) {
    if (!Array.isArray(options)) return
    for (let i = 0; i < options.length; ++i) {
      const option = options[i]
      const id = `${parentId}_${i + 1}`
      // console.log('iterate on option', id)
      if (!hasChildren(option)) {
        if (patches.has(id)) {
          // console.log('patched on option', id)
          option.children = patches.get(id)
          option.loaded = true
        }
      }
      traverse(option.children, depth + 1, id)
    }
  }
  traverse(options)
  // console.log('patchedOptions output', options)
  return cloneDeep(options)
}

function linkedCascaderOptions (options, type) {
  const linkedCascaderOptions = options
  const path = []
  function traverse (options, parent = null, depth = 0, parentId = 0) {
    if (!Array.isArray(options)) return
    const length = options.length
    for (let i = 0; i < length; ++i) {
      const option = options[i]
      if (depth > 0) path.push(option.label)
      /**
       * option.type determine option ui status
       */
      option.type = type
      /**
       * options.availableParentId to support keyup left
       */
      option.availableParentId = availableParentId(parent, depth)
      /**
       * option.depth to support find submenu
       */
      option.depth = depth
      /**
       * options.id to suport track option
       */
      option.id = `${parentId}_${i + 1}`
      /**
       * options.path to support ui status
       */
      option.path = cloneDeep(path)
      /**
       * options.isLeaf to support ui status and lazy load
       */
      option.isLeaf = isLeaf(option)
      /**
       * option.loaded to support lazy load
       */
      option.loaded = loaded(option)
      /**
       * option.availableLeafCount to support ui status
       * option.leafCount to support ui status
       */
      if (!option.isLeaf) {
        if (option.loaded) {
          traverse(option.children, option, depth + 1, option.id)
          option.leafCount = 0
          option.availableLeafCount = 0
          option.children.forEach(child => {
            if (!child.disabled) {
              option.availableLeafCount += child.availableLeafCount
            }
            option.leafCount += child.leafCount
          })
        } else {
          option.availableLeafCount = NaN
          option.leafCount = NaN
        }
      } else {
        if (option.disabled) {
          option.availableLeafCount = 0
        } else {
          option.availableLeafCount = 1
        }
        option.leafCount = 1
      }
      if (depth > 0) path.pop()
    }
    markAvailableSiblingIds(options)
    markFirstAvailableChildId(options)
  }
  traverse(linkedCascaderOptions)
  return linkedCascaderOptions
}

function menuOptions (linkedCascaderOptions, value, type) {
  const valueSet = new Set(value)
  const checkedOptions = []
  function traverse (options, depth = 0) {
    if (!Array.isArray(options)) return
    const length = options.length
    for (let i = 0; i < length; ++i) {
      const option = options[i]
      option.checkedLeafCount = 0
      option.checkedAvailableLeafCount = 0
      option.hasCheckedLeaf = false
      if (type === 'multiple') {
        if (option.loaded) {
          if (!option.isLeaf) {
            traverse(option.children, depth + 1)
            option.children.forEach(child => {
              option.checkedLeafCount += child.checkedLeafCount
              option.checkedAvailableLeafCount += child.checkedAvailableLeafCount
              option.hasCheckedLeaf = !!(option.hasCheckedLeaf || child.hasCheckedLeaf)
            })
          } else {
            option.checked = valueSet.has(option.value)
            if (option.checked) {
              checkedOptions.push(option)
              option.checkedLeafCount = 1
              if (option.disabled) {
                option.availableLeafCount = 0
              } else {
                option.availableLeafCount = 1
              }
              option.hasCheckedLeaf = true
            }
          }
        } else {
          option.checkedLeafCount = NaN
          option.checkedAvailableLeafCount = NaN
        }
      } else if (type === 'multiple-all-options') {
        if (option.loaded && !option.isLeaf) {
          traverse(option.children, option, depth + 1)
        } else {
          option.checkedLeafCount = NaN
        }
        option.checked = valueSet.has(option.value)
        checkedOptions.push(option)
      } else if (type === 'single' || type === 'single-all-options') {
        if (hasChildren(option)) {
          traverse(option.children, option, depth + 1)
        }
        option.checked = (option.value === value)
      }
    }
  }
  traverse(linkedCascaderOptions)
  // console.log('menuOptions', linkedCascaderOptions)
  return linkedCascaderOptions
}

function optionPath (options, optionId) {
  const path = []
  if (optionId === null) return path
  let done = false
  function traverseOptions (options) {
    if (!Array.isArray(options) || !options.length) return
    for (const option of options) {
      if (done) return
      path.push(option)
      if (option.id === optionId) {
        done = true
        return
      }
      if (option.children) {
        traverseOptions(option.children)
      }
      if (done) return
      path.pop(option)
    }
  }
  traverseOptions(options)
  return path
}

function menuModel (options, activeId, trackId, loadingId) {
  // console.log('menuModel params', options, activeId, trackId, loadingId)
  const activeOptionPath = optionPath(options, activeId)
  const activeIds = new Set(activeOptionPath.map(option => option.id))
  const firstSubmenu = options[0].children
  // console.log('firstSubmenu', firstSubmenu)
  // console.log('menuModel', options, activeId, trackId, activeOptionPath)
  const model = []
  if (firstSubmenu !== null) {
    model.push(firstSubmenu.map(option => {
      return processedOption(option, activeIds, trackId, loadingId)
    }))
  } else {
    model.push([])
  }
  for (const option of activeOptionPath) {
    /**
     * pass root option
     */
    if (option.depth === 0) continue
    if (hasChildren(option)) {
      model.push(option.children.map(option => {
        return processedOption(option, activeIds, trackId, loadingId)
      }))
    }
  }
  // console.log('menuModel model', model)
  return model
}

function firstOptionId (options) {
  // console.log(options)
  return options[0].firstAvailableChildId
}

export {
  firstOptionId,
  rootedOptions,
  patchedOptions,
  linkedCascaderOptions,
  menuOptions,
  menuModel
}
