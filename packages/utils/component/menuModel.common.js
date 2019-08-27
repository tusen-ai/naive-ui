const cloneDeep = require('lodash/cloneDeep')

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

function processedOption (option, activeIds, trackedId) {
  return {
    ...option,
    active: activeIds.has(option.id),
    hasChildren: hasChildren(option),
    checkboxChecked: checkboxChecked(option),
    checkboxIndeterminate: checkboxIndeterminate(option),
    isLeaf: isLeaf(option),
    tracked: tracked(option, trackedId)
  }
}

function tracked (option, trackedId) {
  return option.id === trackedId
}

function checkboxChecked (option) {
  if (option.type === 'multiple') {
    if (Array.isArray(option.children) && option.children.length) {
      return option.leafCount === option.checkedLeafCount
    } else {
      return option.checked
    }
  } else {
    return option.checked
  }
}

function checkboxIndeterminate (option) {
  if (option.type === 'multiple') {
    return !option.checked && option.checkedLeafCount !== 0 && option.checkedLeafCount !== option.leafCount
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

/**
 *
 * @param {Array} options
 * @param {*} option
 * @param {Number} optionIndex
 */
function getNextAvailableSiblingId (options, option, optionIndex) {
  if (option.disabled) return null
  const length = options.length
  for (let i = 1; i < options.length; ++i) {
    const nextSiblingId = (optionIndex + i + length) % length
    const nextSibling = options[nextSiblingId]
    if (!nextSibling.disabled) return nextSiblingId
  }
  return null
}

function getPrevAvailableSiblingId (options, option, optionIndex) {
  const length = options.length
  for (let i = 1; i < options.length; ++i) {
    const prevSiblingId = (optionIndex + i + length) % length
    const prevSibling = options[prevSiblingId]
    if (!prevSibling.disabled) return prevSiblingId
  }
  return null
}

function markAvailableSiblingIds (options) {
  const length = options.length
  let lastAvailableOption = null
  let lastDisabledOption = null
  for (let i = 0; i < length * 2; ++i) {
    const option = options[i % length]
    if (option.disabled) {
      if (lastAvailableOption !== null) {
        option.prevAvailableSiblingId = lastAvailableOption.id
      } else {
        option.prevAvailableSiblingId = null
        option.nextAvailableSiblingId = null
      }
      lastDisabledOption = option
    } else {
      if (lastAvailableOption !== null) {
        lastAvailableOption.nextAvailableSiblingId = option.id
        option.prevAvailableSiblingId = lastAvailableOption.id
      } else {
        option.prevAvailableSiblingId = null
        option.nextAvailableSiblingId = null
      }
      if (lastDisabledOption !== null) {
        lastDisabledOption.nextAvailableSiblingId = option.id
      }
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
    value: null,
    label: null,
    children: options || []
  }])
}

/**
 *
 * @param {*} options
 * @param {Map} patches
 */
function patchedOptions (options, patches) {
  function traverse (options) {
    if (!Array.isArray(options)) return
    for (const option of options) {
      if (!hasChildren(option)) {
        if (patches.has(option)) {
          option.children = patches.get(option)
        }
      }
      traverse(options)
    }
  }
  traverse(options)
  return options
}

function linkedOptions (options, type) {
  const linkedOptions = options
  const path = []
  let id = 0
  function traverse (options, parent = null, depth = 0) {
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
      option.id = id++
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
          traverse(option.children, option, depth + 1)
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
  traverse(linkedOptions)
  return linkedOptions
}

function menuOptions (linkedOptions, values, value, type) {
  const valueSet = new Set(values)
  const checkedOptions = []
  function traverse (options, parent = null, depth = 0) {
    if (!Array.isArray(options)) return
    const length = options.length
    for (let i = 0; i < length; ++i) {
      const option = options[i]
      option.checkedLeafCount = 0
      option.hasCheckedLeaf = false
      if (type === 'multiple') {
        if (option.loaded) {
          if (!option.isLeaf) {
            traverse(option.children, option, depth + 1)
            option.children.forEach(child => {
              option.checkedLeafCount += child.checkedLeafCount
              option.hasCheckedLeaf = !!(option.hasCheckedLeaf || child.hasCheckedLeaf)
            })
          } else {
            option.checked = valueSet.has(option.value)
            if (option.checked) {
              checkedOptions.push(option)
              option.checkedLeafCount = 1
              option.hasCheckedLeaf = true
            }
          }
        } else {
          option.checkedLeafCount = NaN
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
  traverse(linkedOptions)
  return linkedOptions
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

function menuModel (options, activeId, trackedId) {
  const activeOptionPath = optionPath(options, activeId)
  const activeIds = new Set(activeOptionPath.map(option => option.id))
  const model = [options.map(option => {
    return processedOption(option, activeIds, trackedId)
  })]
  for (const option of activeOptionPath) {
    /**
     * pass root option
     */
    if (option.id === 0) continue
    if (hasChildren(option)) {
      model.push(option.children.map(option => {
        return processedOption(option, activeIds, trackedId)
      }))
    }
  }
  console.log(model.length)
  return model
}

module.exports = {
  rootedOptions,
  patchedOptions,
  linkedOptions,
  menuOptions
}

const params = [[
  {
    'children': [
      {
        'label': 'China',
        'value': 'china',
        'children': [
          {
            'label': 'Bejing',
            'value': 'beijing',
            'disabled': true,
            'children': [
              {
                'label': 'Haidian',
                'value': 'haidian',
                'disabled': true,
                'type': 'multiple',
                'availableParentId': null,
                'depth': 3,
                'id': 3,
                'path': [
                  'China',
                  'Bejing',
                  'Haidian'
                ],
                'isLeaf': true,
                'loaded': true,
                'availableLeafCount': 0,
                'leafCount': 1,
                'prevAvailableSiblingId': 4,
                'nextAvailableSiblingId': 4,
                'firstAvailableChildId': null,
                'checkedLeafCount': 0,
                'hasCheckedLeaf': false,
                'checked': false
              },
              {
                'label': 'Chaoyang',
                'value': 'chaoyang',
                'type': 'multiple',
                'availableParentId': null,
                'depth': 3,
                'id': 4,
                'path': [
                  'China',
                  'Bejing',
                  'Chaoyang'
                ],
                'isLeaf': true,
                'loaded': true,
                'availableLeafCount': 1,
                'leafCount': 1,
                'prevAvailableSiblingId': 4,
                'nextAvailableSiblingId': 4,
                'firstAvailableChildId': null,
                'checkedLeafCount': 1,
                'hasCheckedLeaf': true,
                'checked': true
              }
            ],
            'type': 'multiple',
            'availableParentId': 1,
            'depth': 2,
            'id': 2,
            'path': [
              'China',
              'Bejing'
            ],
            'isLeaf': false,
            'loaded': true,
            'leafCount': 2,
            'availableLeafCount': 1,
            'prevAvailableSiblingId': 5,
            'nextAvailableSiblingId': 5,
            'firstAvailableChildId': 4,
            'checkedLeafCount': 1,
            'hasCheckedLeaf': true
          },
          {
            'label': 'Shanghai',
            'value': 'shanghai',
            'children': [
              {
                'label': 'Hongqiao',
                'value': 'hongqiao',
                'disabled': true,
                'type': 'multiple',
                'availableParentId': 5,
                'depth': 3,
                'id': 6,
                'path': [
                  'China',
                  'Shanghai',
                  'Hongqiao'
                ],
                'isLeaf': true,
                'loaded': true,
                'availableLeafCount': 0,
                'leafCount': 1,
                'prevAvailableSiblingId': 7,
                'nextAvailableSiblingId': 7,
                'firstAvailableChildId': null,
                'checkedLeafCount': 0,
                'hasCheckedLeaf': false,
                'checked': false
              },
              {
                'label': 'Pudong',
                'value': 'Pudong',
                'type': 'multiple',
                'availableParentId': 5,
                'depth': 3,
                'id': 7,
                'path': [
                  'China',
                  'Shanghai',
                  'Pudong'
                ],
                'isLeaf': true,
                'loaded': true,
                'availableLeafCount': 1,
                'leafCount': 1,
                'prevAvailableSiblingId': 7,
                'nextAvailableSiblingId': 7,
                'firstAvailableChildId': null,
                'checkedLeafCount': 0,
                'hasCheckedLeaf': false,
                'checked': false
              }
            ],
            'type': 'multiple',
            'availableParentId': 1,
            'depth': 2,
            'id': 5,
            'path': [
              'China',
              'Shanghai'
            ],
            'isLeaf': false,
            'loaded': true,
            'leafCount': 2,
            'availableLeafCount': 1,
            'prevAvailableSiblingId': 5,
            'nextAvailableSiblingId': 5,
            'firstAvailableChildId': 7,
            'checkedLeafCount': 0,
            'hasCheckedLeaf': false
          }
        ],
        'type': 'multiple',
        'availableParentId': 0,
        'depth': 1,
        'id': 1,
        'path': [
          'China'
        ],
        'isLeaf': false,
        'loaded': true,
        'leafCount': 4,
        'availableLeafCount': 1,
        'prevAvailableSiblingId': 8,
        'nextAvailableSiblingId': 8,
        'firstAvailableChildId': 5,
        'checkedLeafCount': 1,
        'hasCheckedLeaf': true
      },
      {
        'label': 'USA',
        'value': 'usa',
        'children': [
          {
            'label': 'California',
            'value': 'california',
            'children': [
              {
                'label': 'Los Angeles',
                'value': 'los angeles',
                'disabled': true,
                'type': 'multiple',
                'availableParentId': 9,
                'depth': 3,
                'id': 10,
                'path': [
                  'USA',
                  'California',
                  'Los Angeles'
                ],
                'isLeaf': true,
                'loaded': true,
                'availableLeafCount': 0,
                'leafCount': 1,
                'prevAvailableSiblingId': null,
                'nextAvailableSiblingId': null,
                'firstAvailableChildId': null,
                'checkedLeafCount': 0,
                'hasCheckedLeaf': false,
                'checked': false
              },
              {
                'label': 'San Francisco',
                'value': 'san francisco',
                'disabled': true,
                'type': 'multiple',
                'availableParentId': 9,
                'depth': 3,
                'id': 11,
                'path': [
                  'USA',
                  'California',
                  'San Francisco'
                ],
                'isLeaf': true,
                'loaded': true,
                'availableLeafCount': 0,
                'leafCount': 1,
                'prevAvailableSiblingId': null,
                'nextAvailableSiblingId': null,
                'firstAvailableChildId': null,
                'checkedLeafCount': 1,
                'hasCheckedLeaf': true,
                'checked': true
              }
            ],
            'type': 'multiple',
            'availableParentId': 8,
            'depth': 2,
            'id': 9,
            'path': [
              'USA',
              'California'
            ],
            'isLeaf': false,
            'loaded': true,
            'leafCount': 2,
            'availableLeafCount': 0,
            'prevAvailableSiblingId': 9,
            'nextAvailableSiblingId': 9,
            'firstAvailableChildId': null,
            'checkedLeafCount': 1,
            'hasCheckedLeaf': true
          }
        ],
        'type': 'multiple',
        'availableParentId': 0,
        'depth': 1,
        'id': 8,
        'path': [
          'USA'
        ],
        'isLeaf': false,
        'loaded': true,
        'leafCount': 2,
        'availableLeafCount': 0,
        'prevAvailableSiblingId': 1,
        'nextAvailableSiblingId': 1,
        'firstAvailableChildId': 9,
        'checkedLeafCount': 1,
        'hasCheckedLeaf': true
      }
    ],
    'type': 'multiple',
    'availableParentId': null,
    'depth': 0,
    'id': 0,
    'path': [],
    'isLeaf': false,
    'loaded': true,
    'leafCount': 6,
    'availableLeafCount': 1,
    'prevAvailableSiblingId': 0,
    'nextAvailableSiblingId': 0,
    'firstAvailableChildId': 1,
    'checkedLeafCount': 2,
    'hasCheckedLeaf': true
  }
], 9, 9]

// 5, 7, null, ['chaoyang', 'san francisco'], 'multiple']

const fs = require('fs')
fs.writeFileSync(require('path').resolve(__dirname, 'test.json'), JSON.stringify(menuModel(...params), 0, 2))
