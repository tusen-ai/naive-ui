import { h, ref, defineComponent } from 'vue'
import NRow from '../../grid/src/Row.vue'
import { keep } from '../../_utils'
import NFormItemCol from './FormItemCol.js'

const rowPropsKey = Object.keys(NRow.props)
const formItemColPropsKey = Object.keys(NFormItemCol.props)

export default defineComponent({
  name: 'FormItemRow',
  props: {
    ...NRow.props,
    ...NFormItemCol.props
  },
  setup () {
    const formItemColRef = ref(null)
    const validate = (...args) => {
      const { value } = formItemColRef
      if (value) {
        return value.validate(...args)
      }
    }
    const clearValidationEffect = (...args) => {
      const { value } = formItemColRef
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
    return h(NRow, keep(this.$props, rowPropsKey), {
      default: () =>
        h(
          NFormItemCol,
          {
            ref: 'formItemColRef',
            ...keep(this.$props, formItemColPropsKey),
            span: 24
          },
          this.$slots
        )
    })
  }
})
