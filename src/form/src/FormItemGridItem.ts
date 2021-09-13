import { h, ref, defineComponent, getCurrentInstance } from 'vue'
import NGridItem, {
  gridItemProps,
  GridItemVNodeProps
} from '../../grid/src/GridItem'
import { keep, keysOf } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import NFormItem, { formItemProps, formItemPropKeys } from './FormItem'
import { FormItemInst } from './interface'

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
  setup (props) {
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
    const self = getCurrentInstance()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const gridItemProps = self!.vnode.props as GridItemVNodeProps
    return h(NGridItem, gridItemProps, {
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
