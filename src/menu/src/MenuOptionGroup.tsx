import type { TmNode } from './interface'
import {
  computed,
  defineComponent,
  Fragment,
  h,
  inject,
  type PropType,
  provide
} from 'vue'
import { keysOf, render } from '../../_utils'
import { menuInjectionKey, menuItemGroupInjectionKey } from './context'

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
    const MenuChild = useMenuChild(props)
    const { NSubmenu } = MenuChild
    const mergedDisabledRef = computed(() => {
      if (NSubmenu?.mergedDisabledRef.value)
        return true
      return props.tmNode.disabled
    })
    provide(menuItemGroupInjectionKey, {
      paddingLeftRef: MenuChild.paddingLeft,
      mergedDisabledRef
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
