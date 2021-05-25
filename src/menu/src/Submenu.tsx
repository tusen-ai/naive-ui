import {
  h,
  ref,
  defineComponent,
  PropType,
  provide,
  computed,
  VNode,
  VNodeChild,
  InjectionKey
} from 'vue'
import { useMemo } from 'vooks'
import { NFadeInExpandTransition } from '../../_internal'
import { NDropdown } from '../../dropdown'
import NMenuOptionContent from './MenuOptionContent'
import { itemRenderer } from './utils'
import { useMenuChild, useMenuChildProps } from './use-menu-child'
import type { SubmenuInjection } from './use-menu-child'
import { TreeNode } from 'treemate'
import { MenuGroupOption, MenuOption } from './interface'
import { menuItemGroupInjectionKey } from './MenuOptionGroup'

export const submenuProps = {
  ...useMenuChildProps,
  rawNodes: {
    type: Array as PropType<Array<MenuOption | MenuGroupOption>>,
    default: () => []
  },
  tmNodes: {
    type: Array as PropType<Array<TreeNode<MenuOption, MenuGroupOption>>>,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: Function as PropType<() => VNodeChild>,
  onClick: Function as PropType<() => void>
} as const

export const submenuInjectionKey: InjectionKey<SubmenuInjection> = Symbol(
  'submenu'
)

export default defineComponent({
  name: 'Submenu',
  props: submenuProps,
  setup (props) {
    const MenuChild = useMenuChild(props)
    const { NMenu, NSubmenu } = MenuChild
    const { props: menuProps, mergedCollapsedRef } = NMenu
    const mergedDisabledRef = computed(() => {
      const { disabled } = props
      if (NSubmenu?.mergedDisabledRef.value) return true
      if (menuProps.disabled) return true
      return disabled
    })
    const dropdownShowRef = ref(false)
    provide(submenuInjectionKey, {
      paddingLeftRef: MenuChild.paddingLeft,
      mergedDisabledRef
    })
    provide(menuItemGroupInjectionKey, null)
    function doClick (): void {
      const { onClick } = props
      if (onClick) onClick()
    }
    function handleClick (): void {
      if (!mergedDisabledRef.value) {
        if (!mergedCollapsedRef.value) {
          NMenu.toggleExpand(props.internalKey)
        }
        doClick()
      }
    }
    function handlePopoverShowChange (value: boolean): void {
      dropdownShowRef.value = value
    }
    return {
      doSelect: NMenu.doSelect,
      inverted: NMenu.invertedRef,
      isHorizontal: NMenu.isHorizontalRef,
      mergedClsPrefix: NMenu.mergedClsPrefixRef,
      maxIconSize: MenuChild.maxIconSize,
      activeIconSize: MenuChild.activeIconSize,
      iconMarginRight: MenuChild.iconMarginRight,
      dropdownPlacement: MenuChild.dropdownPlacement,
      dropdownShow: dropdownShowRef,
      paddingLeft: MenuChild.paddingLeft,
      mergedDisabled: mergedDisabledRef,
      mergedValue: NMenu.mergedValueRef,
      childActive: useMemo(() => {
        return NMenu.activePathRef.value.includes(props.internalKey)
      }),
      collapsed: computed(() => {
        if (menuProps.mode === 'horizontal') return false
        if (mergedCollapsedRef.value) {
          return true
        }
        return !NMenu.mergedExpandedKeysRef.value.includes(props.internalKey)
      }),
      dropdownEnabled: computed(() => {
        return (
          !mergedDisabledRef.value &&
          (menuProps.mode === 'horizontal' || mergedCollapsedRef.value)
        )
      }),
      handlePopoverShowChange,
      handleClick
    }
  },
  render () {
    const { mergedClsPrefix } = this
    const createSubmenuItem = (): VNode => {
      const {
        isHorizontal,
        paddingLeft,
        collapsed,
        mergedDisabled,
        maxIconSize,
        activeIconSize,
        title,
        childActive,
        icon,
        handleClick,
        dropdownShow,
        iconMarginRight
      } = this
      return (
        <NMenuOptionContent
          paddingLeft={paddingLeft}
          collapsed={collapsed}
          disabled={mergedDisabled}
          iconMarginRight={iconMarginRight}
          maxIconSize={maxIconSize}
          activeIconSize={activeIconSize}
          title={title}
          showArrow={!isHorizontal}
          childActive={childActive}
          clsPrefix={mergedClsPrefix}
          icon={icon}
          hover={dropdownShow}
          onClick={handleClick}
        />
      )
    }
    const createSubmenuChildren = (): VNode => {
      return (
        <NFadeInExpandTransition>
          {{
            default: () => {
              const { tmNodes, collapsed } = this
              return !collapsed ? (
                <div class={`${mergedClsPrefix}-submenu-children`}>
                  {tmNodes.map((item) => itemRenderer(item))}
                </div>
              ) : null
            }
          }}
        </NFadeInExpandTransition>
      )
    }
    return this.root ? (
      <NDropdown
        builtinThemeOverrides={{
          fontSizeLarge: '14px',
          optionIconSizeLarge: '18px'
        }}
        value={this.mergedValue}
        size="large"
        trigger="hover"
        disabled={!this.dropdownEnabled}
        placement={this.dropdownPlacement}
        onUpdateShow={this.handlePopoverShowChange}
        options={this.rawNodes}
        onSelect={this.doSelect}
        inverted={this.inverted}
      >
        {{
          default: () => (
            <div class={`${mergedClsPrefix}-submenu`}>
              {createSubmenuItem()}
              {this.isHorizontal ? null : createSubmenuChildren()}
            </div>
          )
        }}
      </NDropdown>
    ) : (
      <div class={`${mergedClsPrefix}-submenu`}>
        {createSubmenuItem()}
        {createSubmenuChildren()}
      </div>
    )
  }
})
