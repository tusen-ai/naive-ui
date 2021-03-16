import { h, computed, defineComponent, toRef, PropType } from 'vue'
import { useMemo } from 'vooks'
import { NTooltip } from '../../tooltip'
import NMenuItemContent from './MenuItemContent'
import { useMenuChild } from './use-menu-child'
import { TmNode } from './interface'

export const menuItemProps = {
  ...useMenuChild.props,
  tmNode: {
    type: Object as PropType<TmNode>,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: Function,
  onClick: Function
} as const

export default defineComponent({
  name: 'MenuItem',
  props: menuItemProps,
  setup (props) {
    const MenuChild = useMenuChild(props)
    const { NSubmenu, NMenu } = MenuChild
    const submenuDisabledRef = NSubmenu
      ? toRef(NSubmenu, 'mergedDisabled')
      : { value: false }
    const mergedDisabledRef = computed(() => {
      return submenuDisabledRef.value || props.disabled
    })
    function doClick (e: MouseEvent): void {
      const { onClick } = props
      if (onClick) onClick(e)
    }
    function handleClick (e: MouseEvent): void {
      if (!mergedDisabledRef.value) {
        NMenu.doSelect(props.internalKey, props.tmNode.rawNode)
        doClick(e)
      }
    }
    return {
      dropdownPlacement: MenuChild.dropdownPlacement,
      paddingLeft: MenuChild.paddingLeft,
      iconMarginRight: MenuChild.iconMarginRight,
      maxIconSize: MenuChild.maxIconSize,
      activeIconSize: MenuChild.activeIconSize,
      mergedTheme: computed(() => NMenu.mergedTheme),
      dropdownEnabled: useMemo(() => {
        return (
          props.root &&
          NMenu.collapsed &&
          NMenu.mode !== 'horizontal' &&
          !mergedDisabledRef.value
        )
      }),
      // Vue has bug when using vooks.useMemo
      // menu item state won't be updated...
      // a minimal reproduction is needed
      selected: computed(() => {
        if (NMenu.mergedValue === props.internalKey) return true
        return false
      }),
      mergedDisabled: mergedDisabledRef,
      handleClick
    }
  },
  render () {
    return (
      <div
        class={[
          'n-menu-item',
          {
            'n-menu-item--selected': this.selected,
            'n-menu-item--disabled': this.mergedDisabled
          }
        ]}
      >
        <NTooltip
          theme={this.mergedTheme.peers.Tooltip}
          themeOverrides={this.mergedTheme.peerOverrides.Tooltip}
          trigger="hover"
          placement={this.dropdownPlacement}
          disabled={!this.dropdownEnabled}
        >
          {{
            default: () => this.title,
            trigger: () => {
              return h(NMenuItemContent, {
                paddingLeft: this.paddingLeft,
                iconMarginRight: this.iconMarginRight,
                maxIconSize: this.maxIconSize,
                activeIconSize: this.activeIconSize,
                title: this.title,
                extra: this.extra,
                disabled: this.mergedDisabled,
                icon: this.icon,
                onClick: this.handleClick
              })
            }
          }}
        </NTooltip>
      </div>
    )
  }
})
