import { h, ref } from 'vue'
import NFormItemCol from './FormItemCol.js'
import NRow from '../../grid/src/Row.vue'
import { keep } from '../../_utils/vue'

const rowPropsKey = Object.keys(NRow.props)
const formItemColPropsKey = Object.keys(NFormItemCol.props)

export default {
  name: 'FormItemRow',
  props: {
    ...NRow.props,
    ...NFormItemCol.props
  },
  setup () {
    return {
      formItemColRef: ref(null)
    }
  },
  methods: {
    validate (...args) {
      const {
        formItemColRef
      } = this
      if (formItemColRef) {
        return formItemColRef.validate(...args)
      }
    },
    clearValidationEffect (...args) {
      const {
        formItemColRef
      } = this
      if (formItemColRef) {
        return formItemColRef.clearValidationEffect(...args)
      }
    }
  },
  render () {
    return h(NRow, keep(
      this.$props,
      rowPropsKey
    ), {
      default: () => h(NFormItemCol, {
        ref: 'formItemColRef',
        span: 24,
        ...keep(this.$props, formItemColPropsKey)
      }, {
        default: this.$slots.default
      })
    })
  }
}
