import { h, ref, defineComponent } from 'vue'
import NCol from '../../grid/src/Col.vue'
import { keep } from '../../_utils'
import NFormItem from './FormItem.vue'

const formItemPropsKey = Object.keys(NFormItem.props)
const colPropsKey = Object.keys(NCol.props)

export default defineComponent({
  name: 'FormItemCol',
  props: {
    ...NCol.props,
    ...NFormItem.props
  },
  setup () {
    const formItemRef = ref(null)
    const validate = (...args) => {
      const { value } = formItemRef
      if (value) {
        return value.validate(...args)
      }
    }
    const clearValidationEffect = (...args) => {
      const { value } = formItemRef
      if (value) {
        return value.clearValidationEffect(...args)
      }
    }
    return {
      validate,
      clearValidationEffect
    }
  },
  render () {
    return h(NCol, keep(this.$props, colPropsKey), {
      default: () => {
        return h(
          NFormItem,
          {
            ref: 'formItemRef',
            ...keep(this.$props, formItemPropsKey)
          },
          this.$slots
        )
      }
    })
  }
})
