import {
  h,
  defineComponent,
  provide,
  PropType,
  Fragment,
  InjectionKey,
  inject
} from 'vue'
import { render as Render } from '../../_utils'
import { useMenuChild, useMenuChildProps } from './use-menu-child'
import type { MenuOptionGroupInjection } from './use-menu-child'
import { itemRenderer } from './utils'
import { TmNode } from './interface'
import { submenuInjectionKey } from './Submenu'
import { menuInjectionKey } from './Menu'

export const menuItemGroupProps = {
  ...useMenuChildProps,
  tmNodes: {
    type: Array as PropType<TmNode[]>,
    required: true
  }
} as const

export const menuItemGroupInjectionKey: InjectionKey<MenuOptionGroupInjection> = Symbol(
  'menu-item-group'
)

export default defineComponent({
  name: 'MenuOptionGroup',
  props: menuItemGroupProps,
  setup (props) {
    provide(submenuInjectionKey, null)
    const MenuChild = useMenuChild(props)
    provide(menuItemGroupInjectionKey, {
      paddingLeftRef: MenuChild.paddingLeft
    })
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { mergedClsPrefixRef } = inject(menuInjectionKey)!
    return function () {
      const { value: cPrefix } = mergedClsPrefixRef
      const paddingLeft = MenuChild.paddingLeft.value
      return (
        <div class={`${cPrefix}-menu-item-group`}>
          <span
            class={`${cPrefix}-menu-item-group-title`}
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
