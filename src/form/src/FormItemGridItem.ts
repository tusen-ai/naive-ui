import { h, ref, defineComponent } from 'vue'
import NGridItem, {
  gridItemProps,
  gridItemPropKeys
} from '../../grid/src/GridItem'
import { keep, keysOf } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import NFormItem, { formItemProps, formItemPropKeys } from './FormItem'
import type { FormItemInst } from './interface'

export const formItemGiProps = {
  ...gridItemProps,
  ...formItemProps
} as const

export const formItemGiPropKeys = keysOf(formItemGiProps)

export type FormItemGiProps = ExtractPublicPropTypes<typeof formItemGiProps>

export default defineComponent({
  __GRID_ITEM__: true,
  name: 'FormItemGridItem',
  alias: ['FormItemGi'],
  props: formItemGiProps,
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
        value.restoreValidation()
      }
    }
    return {
      formItemInstRef,
      validate,
      restoreValidation
    }
  },
  render () {
    return h(NGridItem, keep(this.$.vnode.props || {}, gridItemPropKeys), {
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
