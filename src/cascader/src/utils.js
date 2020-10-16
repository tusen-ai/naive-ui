function traverseWithCallback (options, beforeCallback, afterCallback) {
  if (Array.isArray(options)) {
    for (const option of options) {
      if (beforeCallback) beforeCallback(option)
      if (option.children) traverseWithCallback(option.children, beforeCallback, afterCallback)
      if (afterCallback) afterCallback(option)
    }
  }
}

function getPickerElement (instance) {
  return instance.NCascader.triggerRef.$el
}

function createSelectOptions (tmNodes, leafOnly) {
  const selectOptions = []
  const path = []
  traverseWithCallback(tmNodes, tmNode => {
    if (
      tmNode.isLeaf ||
      !leafOnly
    ) {
      if (tmNode.disabled) return
      const { rawNode } = tmNode
      path.push(rawNode)
      selectOptions.push({
        label: path.map(rawNodeInPath => rawNodeInPath.label).join('/'),
        value: rawNode.value,
        path: Array.from(path)
      })
    }
  }, () => {
    path.pop()
  })
  return selectOptions
}

export {
  traverseWithCallback,
  createSelectOptions,
  getPickerElement
}
