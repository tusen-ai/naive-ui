import type { TmNode } from './interface'
import {
  defineComponent,
  Fragment,
  h,
  inject,
  type PropType,
  provide
} from 'vue'
import { keysOf, render } from '../../_utils'
import {
  menuInjectionKey,
  menuItemGroupInjectionKey,
  submenuInjectionKey
} from './context'

import { useMenuChild } from './use-menu-child'
import { useMenuChildProps } from './use-menu-child-props'
import { itemRenderer } from './utils'

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

export const menuItemGroupPropKeys = keysOf(menuItemGroupProps)

export const NMenuOptionGroup = defineComponent({
  name: 'MenuOptionGroup',
  props: menuItemGroupProps,
  setup(props) {
    provide(submenuInjectionKey, null)
    const MenuChild = useMenuChild(props)
    provide(menuItemGroupInjectionKey, {
      paddingLeftRef: MenuChild.paddingLeft
    })
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
            {props.extra ? (
              <>
                {' '}
                {render(props.extra)}
              </>
            ) : null}
          </div>
          <div>
            {props.tmNodes.map(tmNode => itemRenderer(tmNode, menuProps))}
          </div>
        </div>
      )
    }
  }
})
