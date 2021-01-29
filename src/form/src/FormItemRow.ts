import { h, ref, defineComponent } from 'vue'
import NRow, { rowProps, rowPropKeys } from '../../grid/src/Row'
import { keep } from '../../_utils'
import NFormItemCol, {
  formItemColProps,
  formItemColPropKeys
} from './FormItemCol'
import { FormItemColRef } from './interface'

export default defineComponent({
  name: 'FormItemRow',
  props: {
    ...rowProps,
    ...formItemColProps
  },
  setup () {
    const formItemColInstRef = ref<FormItemColRef | null>(null)
    const validate: FormItemColRef['validate'] = ((...args: any[]) => {
      const { value } = formItemColInstRef
      if (value) {
        return (value.validate as any)(...args)
      }
    }) as any
    const restoreValidation: FormItemColRef['restoreValidation'] = () => {
      const { value } = formItemColInstRef
      if (value) {
        return value.restoreValidation()
      }
    }
    return {
      validate,
      restoreValidation
    }
  },
  render () {
    return h(NRow, keep(this.$props, rowPropKeys), {
      default: () => {
        const colProps = keep(this.$props, formItemColPropKeys)
        return h(
          NFormItemCol,
          {
            ref: 'formItemColRef',
            ...colProps,
            span: 24
          },
          this.$slots
        )
      }
    })
  }
})
