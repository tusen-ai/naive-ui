import { defineComponent } from 'vue'
import { DESCRIPTION_ITEM_FLAG } from './utils'

export default defineComponent({
  name: 'DescriptionsItem',
  [DESCRIPTION_ITEM_FLAG]: true,
  props: {
    label: {
      type: String,
      default: undefined
    },
    span: {
      type: Number,
      default: 1
    }
  },
  render () {
    return null
  }
})
