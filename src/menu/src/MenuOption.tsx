import { h, computed, defineComponent, PropType } from 'vue'
import { useMemo } from 'vooks'
import { NTooltip } from '../../tooltip'
import NMenuOptionContent from './MenuOptionContent'
import { useMenuChild, useMenuChildProps } from './use-menu-child'
import { TmNode } from './interface'
import { render } from '../../_utils'

export const menuItemProps = {
  ...useMenuChildProps,
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
  name: 'MenuOption',
  props: menuItemProps,
  setup (props) {
    const MenuChild = useMenuChild(props)
    const { NSubmenu, NMenu } = MenuChild
    const { props: menuProps, mergedClsPrefixRef, mergedCollapsedRef } = NMenu
    const submenuDisabledRef = NSubmenu
      ? NSubmenu.mergedDisabledRef
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
      mergedClsPrefix: mergedClsPrefixRef,
      dropdownPlacement: MenuChild.dropdownPlacement,
      paddingLeft: MenuChild.paddingLeft,
      iconMarginRight: MenuChild.iconMarginRight,
      maxIconSize: MenuChild.maxIconSize,
      activeIconSize: MenuChild.activeIconSize,
      mergedTheme: NMenu.mergedThemeRef,
      dropdownEnabled: useMemo(() => {
        return (
          props.root &&
          mergedCollapsedRef.value &&
          menuProps.mode !== 'horizontal' &&
          !mergedDisabledRef.value
        )
      }),
      // Vue has bug when using vooks.useMemo
      // menu item state won't be updated...
      // a minimal reproduction is needed
      selected: computed(() => {
        if (NMenu.mergedValueRef.value === props.internalKey) return true
        return false
      }),
      mergedDisabled: mergedDisabledRef,
      handleClick
    }
  },
  render () {
    const { mergedClsPrefix, tmNode } = this
    return (
      <div
        role="menuitem"
        class={[
          `${mergedClsPrefix}-menu-item`,
          {
            [`${mergedClsPrefix}-menu-item--selected`]: this.selected,
            [`${mergedClsPrefix}-menu-item--disabled`]: this.mergedDisabled
          }
        ]}
      >
        <NTooltip
          theme={this.mergedTheme.peers.Tooltip}
          themeOverrides={this.mergedTheme.peerOverrides.Tooltip}
          trigger="hover"
          placement={this.dropdownPlacement}
          disabled={!this.dropdownEnabled || this.title === undefined}
        >
          {{
            default: () => h(render, { render: this.title }),
            trigger: () => (
              <NMenuOptionContent
                tmNode={tmNode}
                clsPrefix={mergedClsPrefix}
                paddingLeft={this.paddingLeft}
                iconMarginRight={this.iconMarginRight}
                maxIconSize={this.maxIconSize}
                activeIconSize={this.activeIconSize}
                title={this.title}
                extra={this.extra}
                disabled={this.mergedDisabled}
                icon={this.icon}
                onClick={this.handleClick}
              />
            )
          }}
        </NTooltip>
      </div>
    )
  }
})
