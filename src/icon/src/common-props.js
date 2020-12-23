export default {
  depth: {
    validator (value) {
      return [1, 2, 3, 4, 5, '1', '2', '3', '4', '5'].includes(value)
    },
    default: undefined
  }
}
