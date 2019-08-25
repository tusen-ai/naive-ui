
import cloneDeep from 'lodash/cloneDeep'

export default function processedOptions (options) {
  const decoratedOptions = cloneDeep(options).map((option, index) => {
    return {
      ...option,
      id: index
    }
  })
  const length = decoratedOptions.length
  decoratedOptions.forEach((option, i) => {
    option.prev = decoratedOptions[(i + length - 1) % length]
    option.next = decoratedOptions[(i + length + 1) % length]
  })
  return decoratedOptions
}
