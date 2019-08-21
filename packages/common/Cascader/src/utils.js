function type () {
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

export {
  type,
  validateType,
  isLeaf
}
