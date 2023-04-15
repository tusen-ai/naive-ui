import { h, ref, defineComponent } from 'vue'
import NRow, { rowProps, rowPropKeys } from '../../legacy-grid/src/Row'
import { keep } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import NFormItemCol, {
  formItemColProps,
  formItemColPropKeys
} from './FormItemCol'
import type { FormItemColRef } from './interface'

export const formItemRowProps = {
  ...rowProps,
  ...formItemColProps
}

export type FormItemRowProps = ExtractPublicPropTypes<typeof formItemRowProps>

export default defineComponent({
  name: 'FormItemRow',
  props: formItemRowProps,
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
        value.restoreValidation()
      }
    }
    return {
      formItemColInstRef,
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
            ref: 'formItemColInstRef',
            ...colProps,
            span: 24
          },
          this.$slots
        )
      }
    })
  }
})
