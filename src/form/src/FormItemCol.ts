import { h, ref, defineComponent } from 'vue'
import NCol, { colProps, colPropKeys } from '../../legacy-grid/src/Col'
import { keep, keysOf } from '../../_utils'
import NFormItem, { formItemProps, formItemPropKeys } from './FormItem'
import { FormItemInst } from './interface'

export const formItemColProps = {
  ...colProps,
  ...formItemProps
} as const

export const formItemColPropKeys = keysOf(formItemColProps)

export default defineComponent({
  name: 'FormItemCol',
  props: formItemColProps,
  setup () {
    const formItemInstRef = ref<FormItemInst | null>(null)
    const validate: FormItemInst['validate'] = ((...args: any[]) => {
      const { value } = formItemInstRef
      if (value) {
        return (value.validate as any)(...args)
      }
    }) as any
    const restoreValidation: FormItemInst['restoreValidation'] = () => {
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
