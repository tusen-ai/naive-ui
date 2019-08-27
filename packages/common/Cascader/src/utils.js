function getType () {
  if (this.multiple && !this.enableAllOptions) return 'multiple'
  if (this.multiple && this.enableAllOptions) return 'multiple-all-options'
  if (!this.multiple && this.enableAllOptions) return 'single-all-options'
  else {
    return 'single'
  }
}

function validateType (type) {
  return ['multiple', 'multiple-all-options', 'single', 'single-all-options'].includes(type)
}

function isLeaf (option) {
  return !(Array.isArray(option.children) && option.children)
}

function traverseWithCallback (options, beforeCallback, afterCallback) {
  if (Array.isArray(options)) {
    for (const option of options) {
      if (beforeCallback) beforeCallback(option)
      if (option.children) traverseWithCallback(option.children, beforeCallback, afterCallback)
      if (afterCallback) afterCallback(option)
    }
  }
}

function minus (arrA, arrB) {
  const set = new Set(arrA)
  arrB.forEach(v => {
    if (set.has(v)) {
      set.delete(v)
    }
  })
  return Array.from(set)
}

function merge (arrA, arrB) {
  const mergedSet = new Set(arrA)
  arrB.forEach(v => mergedSet.add(v))
  return Array.from(mergedSet)
}

export {
  getType,
  validateType,
  isLeaf,
  traverseWithCallback,
  minus,
  merge
}
