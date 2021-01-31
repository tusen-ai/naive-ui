import { h, defineComponent, provide, PropType, reactive } from 'vue'
import { render } from '../../_utils'
import { useMenuChild } from './use-menu-child'
import type { MenuItemGroupInjection } from './use-menu-child'
import { itemRenderer } from './utils'
import { TmNode } from './interface'

export const menuItemGroupProps = {
  ...useMenuChild.props,
  tmNodes: {
    type: Array as PropType<TmNode[]>,
    required: true
  }
} as const

export default defineComponent({
  name: 'MenuItemGroup',
  props: menuItemGroupProps,
  setup (props) {
    provide('NSubmenu', null)
    const MenuChild = useMenuChild(props)
    provide<MenuItemGroupInjection>(
      'NMenuItemGroup',
      reactive({ paddingLeft: MenuChild.paddingLeft })
    )
    return function () {
      const paddingLeft = MenuChild.paddingLeft.value
      return h(
        'div',
        {
          class: 'n-menu-item-group'
        },
        [
          h(
            'span',
            {
              class: 'n-menu-item-group-title',
              style: paddingLeft && `padding-left: ${paddingLeft}px;`
            },
            [
              h(render, {
                render: props.title
              })
            ]
          ),
          h(
            'div',
            props.tmNodes.map((tmNode) => itemRenderer(tmNode))
          )
        ]
      )
    }
  }
})
