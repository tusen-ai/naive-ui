import { DESCRIPTION_ITEM_FLAG } from './utils'

export default {
  name: 'DescriptionsItem',
  [DESCRIPTION_ITEM_FLAG]: true,
  props: {
    label: {
      type: String,
      default: null
    },
    span: {
      type: Number,
      default: 1
    }
  },
  render () {
    return null
  }
}
