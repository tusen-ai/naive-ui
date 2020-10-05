import { h, ref } from 'vue'
import NFormItem from './FormItem.vue'
import NCol from '../../grid/src/Col.vue'
import { keep } from '../../_utils/vue'

const formItemPropsKey = Object.keys(NFormItem.props)
const colPropsKey = Object.keys(NCol.props)

export default {
  name: 'FormItemCol',
  props: {
    ...NCol.props,
    ...NFormItem.props
  },
  setup () {
    return {
      formItemRef: ref(null)
    }
  },
  methods: {
    validate (...args) {
      const {
        formItemRef
      } = this
      if (formItemRef) {
        return formItemRef.validate(...args)
      }
    },
    clearValidationEffect (...args) {
      const {
        formItemRef
      } = this
      if (formItemRef) {
        return formItemRef.clearValidationEffect(...args)
      }
    }
  },
  render () {
    return h(NCol, keep(
      this.$props,
      colPropsKey
    ), {
      default: () => {
        return h(NFormItem, {
          ref: 'formItemRef',
          ...keep(this.$props, formItemPropsKey)
        }, {
          default: this.$slots.default
        })
      }
    })
  }
}
