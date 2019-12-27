function createValueAttribute (value) {
  if (typeof value === 'string') {
    return 's-' + value
  } else if (typeof value === 'number') {
    return 'd-' + String(value)
  } else {
    console.error(['[naive-ui/select-option]: option value is neither string or number'])
    return 'invalid'
  }
}

exports.createValueAttribute = createValueAttribute
