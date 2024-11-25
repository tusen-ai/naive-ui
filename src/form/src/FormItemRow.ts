import type { ExtractPublicPropTypes } from '../../_utils'
import type { FormItemColRef } from './interface'
import { defineComponent, h, ref } from 'vue'
import { keep } from '../../_utils'
import NRow, { rowPropKeys, rowProps } from '../../legacy-grid/src/Row'
import NFormItemCol, {
  formItemColPropKeys,
  formItemColProps
} from './FormItemCol'

export const formItemRowProps = {
  ...rowProps,
  ...formItemColProps
}

export type FormItemRowProps = ExtractPublicPropTypes<typeof formItemRowProps>

export default defineComponent({
  name: 'FormItemRow',
  props: formItemRowProps,
  setup() {
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
  render() {
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
