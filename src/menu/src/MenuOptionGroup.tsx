import { h, defineComponent, provide, PropType, Fragment, inject } from 'vue'
import { render } from '../../_utils'
import { useMenuChild } from './use-menu-child'
import { useMenuChildProps } from './use-menu-child-props'
// eslint-disable-next-line import/no-cycle
import { itemRenderer } from './utils'
import { TmNode } from './interface'
import {
  submenuInjectionKey,
  menuInjectionKey,
  menuItemGroupInjectionKey
} from './context'

export const menuItemGroupProps = {
  ...useMenuChildProps,
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
      return (
        <div class={`${mergedClsPrefix}-menu-item-group`} role="group">
          <span
            class={`${mergedClsPrefix}-menu-item-group-title`}
            style={
              paddingLeft !== undefined
                ? `padding-left: ${paddingLeft}px;`
                : undefined
            }
          >
            {render(props.title)}
            {props.extra ? <> {render(props.extra)}</> : null}
          </span>
          <div>
            {props.tmNodes.map((tmNode) => itemRenderer(tmNode, menuProps))}
          </div>
        </div>
      )
    }
  }
})
