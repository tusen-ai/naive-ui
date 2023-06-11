import {
  h,
  defineComponent,
  provide,
  type PropType,
  Fragment,
  inject
} from 'vue'
import { render } from '../../_utils'
import { useMenuChild } from './use-menu-child'
import { useMenuChildProps } from './use-menu-child-props'
// eslint-disable-next-line import/no-cycle
import { itemRenderer } from './utils'
import type { TmNode } from './interface'
import {
  submenuInjectionKey,
  menuInjectionKey,
  menuItemGroupInjectionKey
} from './context'

export const menuItemGroupProps = {
  ...useMenuChildProps,
  tmNode: {
    type: Object as PropType<TmNode>,
    required: true
  },
  tmNodes: {
    type: Array as PropType<TmNode[]>,
    required: true
  }
} as const

export const NMenuOptionGroup = defineComponent({
  name: 'MenuOptionGroup',
  props: menuItemGroupProps,
  setup (props) {
    provide(submenuInjectionKey, null)
    const MenuChild = useMenuChild(props)
    provide(menuItemGroupInjectionKey, {
      paddingLeftRef: MenuChild.paddingLeft
    })
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { mergedClsPrefixRef, props: menuProps } = inject(menuInjectionKey)!
    return function () {
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      const paddingLeft = MenuChild.paddingLeft.value
      const { nodeProps } = menuProps
      const attrs = nodeProps?.(props.tmNode.rawNode)
      return (
        <div class={`${mergedClsPrefix}-menu-item-group`} role="group">
          <div
            {...attrs}
            class={[`${mergedClsPrefix}-menu-item-group-title`, attrs?.class]}
            style={[
              attrs?.style || '',
              paddingLeft !== undefined ? `padding-left: ${paddingLeft}px;` : ''
            ]}
          >
            {render(props.title)}
            {props.extra ? <> {render(props.extra)}</> : null}
          </div>
          <div>
            {props.tmNodes.map((tmNode) => itemRenderer(tmNode, menuProps))}
          </div>
        </div>
      )
    }
  }
})
