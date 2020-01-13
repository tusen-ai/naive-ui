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
    isRoot: true,
    isLeaf: false,
    key: Symbol('n-tree-root'),
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
  function traverse (items, depth = 0, parentId = 0) {
    if (!Array.isArray(items)) return
    for (let i = 0; i < items.length; ++i) {
      const option = items[i]
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

function dropIsValid ([sourceNode, targetNode, type]) {
  if (sourceNode.key === targetNode.key) return false
  if (type === 'append') {
    if (targetNode.key === sourceNode.parent.key) return false
    let parent = targetNode.parent
    while (!parent.isRoot) {
      if (parent.key === sourceNode.key) {
        return false
      }
      parent = parent.parent
    }
  } else if (type === 'insertBefore' || type === 'insertAfter') {
    let parent = targetNode.parent
    while (!parent.isRoot) {
      if (parent.key === sourceNode.key) {
        return false
      }
      parent = parent.parent
    }
  } else return false
  return true
}

function treedOptions (options) {
  const decoratedOptions = rootedOptions(options)
  function traverse (root, parent = null) {
    root.parent = parent
    if (Array.isArray(root.children)) {
      root.children.forEach(child => traverse(child, root))
    }
  }
  traverse(decoratedOptions[0])
  return decoratedOptions
}

function applyDrop ([sourceNode, targetNode, type]) {
  if (type === 'append') {
    const parent = sourceNode.parent
    const index = parent.children.findIndex(child => child.key === sourceNode.key)
    if (~index) {
      parent.children.splice(index, 1)
      if (!parent.children.length) {
        parent.children = null
        parent.isLeaf = true
      }
    } else {
      throw new Error('[naive-ui/n-tree]: switch error')
    }
    if (Array.isArray(targetNode.children)) {
      if (type === 'append') {
        targetNode.children.push(sourceNode)
      } else {
        targetNode.children.unshift(sourceNode)
      }
    } else {
      targetNode.isLeaf = false
      targetNode.children = [sourceNode]
    }
    sourceNode.parent = targetNode
  } else if (type === 'insertBefore' || type === 'insertAfter') {
    let parent = sourceNode.parent
    const sourceIndex = parent.children.findIndex(child => child.key === sourceNode.key)
    if (~sourceIndex) {
      parent.children.splice(sourceIndex, 1)
      if (!parent.children.length) {
        parent.children = null
        parent.isLeaf = true
      }
    } else {
      throw new Error('[naive-ui/n-tree]: switch error')
    }
    parent = targetNode.parent
    let targetIndex = parent.children.findIndex(child => child.key === targetNode.key)
    if (type === 'insertAfter') targetIndex += 1
    if (~targetIndex) {
      parent.children.splice(targetIndex, 0, sourceNode)
      if (!parent.children.length) {
        parent.children = null
        parent.isLeaf = true
      }
    } else {
      throw new Error('[naive-ui/n-tree]: switch error')
    }
    sourceNode.parent = targetNode.parent
  }
}

function linkedCascaderOptions (options, type) {
  const cascaderOptions = options
  const path = []
  function traverse (items, parent = null, depth = 0, parentId = 0) {
    if (!Array.isArray(items)) return
    const length = items.length
    for (let i = 0; i < length; ++i) {
      const option = items[i]
      if (depth > 0) {
        path.push({
          value: option.value,
          label: option.label
        })
      }
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
       * options.id to support track option
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
    markAvailableSiblingIds(items)
    markFirstAvailableChildId(items)
  }
  traverse(cascaderOptions)
  return cascaderOptions
}

function menuOptions (cascaderOptions, value, type) {
  const valueSet = new Set(value)
  function traverse (options) {
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
            traverse(option.children)
            option.children.forEach(child => {
              option.checkedLeafCount += child.checkedLeafCount
              option.checkedAvailableLeafCount += child.checkedAvailableLeafCount
              option.hasCheckedLeaf = !!(option.hasCheckedLeaf || child.hasCheckedLeaf)
            })
          } else {
            option.checked = valueSet.has(option.value)
            if (option.checked) {
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
          traverse(option.children)
        } else {
          option.checkedLeafCount = NaN
        }
        option.checked = valueSet.has(option.value)
      } else if (type === 'single' || type === 'single-all-options') {
        if (hasChildren(option)) {
          traverse(option.children)
        }
        option.checked = (option.value === value)
      }
    }
  }
  traverse(cascaderOptions)
  /** create a new Object for change detection */
  return [cascaderOptions[0]]
}

function optionPath (options, optionId) {
  const path = []
  if (optionId === null) return path
  let done = false
  function traverseOptions (items) {
    if (!Array.isArray(items) || !items.length) return
    for (const option of items) {
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
      model.push(option.children.map(item => {
        return processedOption(item, activeIds, trackId, loadingId)
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
  dropIsValid,
  applyDrop,
  treedOptions,
  linkedCascaderOptions,
  menuOptions,
  menuModel
}
