function createValidator (types) {
  return value => {
    for (let i = 0; i < types.length; ++i) {
      // eslint-disable-next-line valid-typeof
      if (typeof value === types[i]) return true
    }
    return false
  }
}

export default createValidator
