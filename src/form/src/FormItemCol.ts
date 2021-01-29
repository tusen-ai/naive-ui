import { h, ref, defineComponent } from 'vue'
import NCol, { colProps, colPropKeys } from '../../grid/src/Col'
import { keep, keysOf } from '../../_utils'
import NFormItem, { formItemProps, formItemPropKeys } from './FormItem'
import { FormItemRef } from './interface'

export const formItemColProps = {
  ...colProps,
  ...formItemProps
} as const

export const formItemColPropKeys = keysOf(formItemColProps)

export default defineComponent({
  name: 'FormItemCol',
  props: formItemColProps,
  setup () {
    const formItemInstRef = ref<FormItemRef | null>(null)
    const validate: FormItemRef['validate'] = ((...args: any[]) => {
      const { value } = formItemInstRef
      if (value) {
        return (value.validate as any)(...args)
      }
    }) as any
    const restoreValidation: FormItemRef['restoreValidation'] = () => {
      const { value } = formItemInstRef
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
    return h(NCol, keep(this.$props, colPropKeys), {
      default: () => {
        const itemProps = keep(this.$props, formItemPropKeys)
        return h(
          NFormItem,
          {
            ref: 'formItemInstRef',
            ...itemProps
          },
          this.$slots
        )
      }
    })
  }
})
