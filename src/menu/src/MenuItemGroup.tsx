import { h, defineComponent, provide, PropType, reactive, Fragment } from 'vue'
import { render as Render } from '../../_utils'
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
      return (
        <div class="n-menu-item-group">
          <span
            class="n-menu-item-group-title"
            style={
              paddingLeft !== undefined
                ? `padding-left: ${paddingLeft}px;`
                : undefined
            }
          >
            <Render render={props.title} />
            {props.extra ? (
              <>
                {' '}
                <Render render={props.extra} />
              </>
            ) : null}
          </span>
          <div>{props.tmNodes.map((tmNode) => itemRenderer(tmNode))}</div>
        </div>
      )
    }
  }
})
