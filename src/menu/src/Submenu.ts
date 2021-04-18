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
    const { props: menuProps } = NMenu
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
        if (!menuProps.collapsed) {
          NMenu.toggleExpand(props.internalKey)
        }
        doClick()
      }
    }
    function handlePopoverShowChange (value: boolean): void {
      dropdownShowRef.value = value
    }
    return {
      NMenu,
      cPrefix: NMenu.mergedClsPrefixRef,
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
        if (menuProps.collapsed) {
          return true
        }
        return !NMenu.mergedExpandedKeysRef.value.includes(props.internalKey)
      }),
      dropdownEnabled: computed(() => {
        return (
          !mergedDisabledRef.value &&
          (menuProps.mode === 'horizontal' || menuProps.collapsed)
        )
      }),
      handlePopoverShowChange,
      handleClick
    }
  },
  render () {
    const { cPrefix } = this
    const createSubmenuItem = (): VNode => {
      const {
        NMenu,
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
      return h(NMenuOptionContent, {
        paddingLeft,
        collapsed,
        disabled: mergedDisabled,
        iconMarginRight,
        maxIconSize,
        activeIconSize,
        title,
        showArrow: !(NMenu.props.mode === 'horizontal'),
        childActive: childActive,
        clsPrefix: cPrefix,
        icon,
        hover: dropdownShow,
        onClick: handleClick
      })
    }
    const createSubmenuChildren = (): VNode => {
      return h(NFadeInExpandTransition, null, {
        default: () => {
          const { tmNodes, collapsed } = this
          return !collapsed
            ? h(
              'div',
              {
                class: `${cPrefix}-submenu-children`
              },
              tmNodes.map((item) => itemRenderer(item))
            )
            : null
        }
      })
    }
    return this.root
      ? h(
        NDropdown,
        {
          builtinThemeOverrides: {
            fontSizeLarge: '14px',
            optionIconSizeLarge: '18px'
          },
          value: this.mergedValue,
          size: 'large',
          trigger: 'hover',
          disabled: !this.dropdownEnabled,
          placement: this.dropdownPlacement,
          'onUpdate:show': this.handlePopoverShowChange,
          options: this.rawNodes,
          onSelect: this.NMenu.doSelect
        },
        {
          default: () =>
            h(
              'div',
              {
                class: `${cPrefix}-submenu`
              },
              [
                createSubmenuItem(),
                this.NMenu.props.mode === 'horizontal'
                  ? null
                  : createSubmenuChildren()
              ]
            )
        }
      )
      : h(
        'div',
        {
          class: `${cPrefix}-submenu`
        },
        [createSubmenuItem(), createSubmenuChildren()]
      )
  }
})
