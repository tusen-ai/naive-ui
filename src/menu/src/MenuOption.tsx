import { h, computed, defineComponent, type PropType } from 'vue'
import { useMemo } from 'vooks'
import { render } from '../../_utils'
import { NTooltip } from '../../tooltip'
import NMenuOptionContent from './MenuOptionContent'
import { useMenuChild } from './use-menu-child'
import { useMenuChildProps } from './use-menu-child-props'
import type { TmNode } from './interface'

export const menuItemProps = {
  ...useMenuChildProps,
  tmNode: {
    type: Object as PropType<TmNode>,
    required: true
  },
  disabled: Boolean,
  icon: Function,
  onClick: Function
} as const

export const NMenuOption = defineComponent({
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
      menuProps,
      dropdownEnabled: useMemo(() => {
        return (
          props.root &&
          mergedCollapsedRef.value &&
          menuProps.mode !== 'horizontal' &&
          !mergedDisabledRef.value
        )
      }),
      selected: useMemo(() => {
        if (NMenu.mergedValueRef.value === props.internalKey) return true
        return false
      }),
      mergedDisabled: mergedDisabledRef,
      handleClick
    }
  },
  render () {
    const {
      mergedClsPrefix,
      mergedTheme,
      tmNode,
      menuProps: { renderLabel, nodeProps }
    } = this
    const attrs = nodeProps?.(tmNode.rawNode)
    return (
      <div
        {...attrs}
        role="menuitem"
        class={[`${mergedClsPrefix}-menu-item`, attrs?.class]}
      >
        <NTooltip
          theme={mergedTheme.peers.Tooltip}
          themeOverrides={mergedTheme.peerOverrides.Tooltip}
          trigger="hover"
          placement={this.dropdownPlacement}
          disabled={!this.dropdownEnabled || this.title === undefined}
          internalExtraClass={['menu-tooltip']}
        >
          {{
            default: () =>
              renderLabel ? renderLabel(tmNode.rawNode) : render(this.title),
            trigger: () => (
              <NMenuOptionContent
                tmNode={tmNode}
                clsPrefix={mergedClsPrefix}
                paddingLeft={this.paddingLeft}
                iconMarginRight={this.iconMarginRight}
                maxIconSize={this.maxIconSize}
                activeIconSize={this.activeIconSize}
                selected={this.selected}
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
