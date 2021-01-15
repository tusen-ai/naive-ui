import {
  h,
  ref,
  defineComponent,
  PropType,
  provide,
  computed,
  reactive
} from 'vue'
import { useMemo } from 'vooks'
import { NFadeInExpandTransition } from '../../_base'
import { NDropdown } from '../../dropdown'
import NMenuItemContent from './MenuItemContent'
import { itemRenderer } from './utils'
import { useMenuChild } from './use-menu-child'
import type { SubmenuInjection } from './use-menu-child'
import { TreeNode, RawNode } from 'treemate'

export const submenuProps = {
  ...useMenuChild.props,
  rawNodes: {
    type: Array as PropType<RawNode[]>,
    required: true
  },
  tmNodes: {
    type: Array as PropType<TreeNode[]>,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Function,
    default: undefined
  },
  onClick: {
    type: Function,
    default: undefined
  }
} as const

export default defineComponent({
  name: 'Submenu',
  props: submenuProps,
  setup (props) {
    const MenuChild = useMenuChild(props)
    const { NMenu, NSubmenu } = MenuChild
    const mergedDisabledRef = computed(() => {
      const { disabled } = props
      if (NSubmenu && NSubmenu.mergedDisabled) return true
      if (NMenu.disabled) return true
      return disabled
    })
    const dropdownShowRef = ref(false)
    provide<SubmenuInjection>(
      'NSubmenu',
      reactive({
        paddingLeft: MenuChild.paddingLeft,
        mergedDisabled: mergedDisabledRef
      })
    )
    provide('NMenuItemGroup', null)
    function doClick () {
      const { onClick } = props
      if (onClick) onClick()
    }
    function handleClick () {
      if (!mergedDisabledRef.value) {
        if (!NMenu.collapsed) {
          NMenu.toggleExpand(props.internalKey)
        }
        doClick()
      }
    }
    function handlePopoverShowChange (value: boolean) {
      dropdownShowRef.value = value
    }
    return {
      NMenu,
      maxIconSize: MenuChild.maxIconSize,
      activeIconSize: MenuChild.activeIconSize,
      iconMarginRight: MenuChild.iconMarginRight,
      dropdownPlacement: MenuChild.dropdownPlacement,
      dropdownShow: dropdownShowRef,
      paddingLeft: MenuChild.paddingLeft,
      mergedDisabled: mergedDisabledRef,
      childActive: useMemo(() => {
        return NMenu.activePath.includes(props.internalKey)
      }),
      collapsed: computed(() => {
        if (NMenu.mode === 'horizontal') return false
        if (NMenu.collapsed) {
          return true
        }
        return !NMenu.mergedExpandedKeys.includes(props.internalKey)
      }),
      dropdownEnabled: computed(() => {
        return (
          !mergedDisabledRef.value &&
          (NMenu.mode === 'horizontal' || NMenu.collapsed)
        )
      }),
      handlePopoverShowChange,
      handleClick
    }
  },
  render () {
    const createSubmenuItem = () => {
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
      return h(NMenuItemContent, {
        paddingLeft,
        collapsed,
        disabled: mergedDisabled,
        iconMarginRight,
        maxIconSize,
        activeIconSize,
        title,
        showArrow: !(NMenu.mode === 'horizontal'),
        childActive: childActive,
        icon,
        hover: dropdownShow,
        onClick: handleClick
      })
    }
    const createSubmenuChildren = () => {
      return h(NFadeInExpandTransition, null, {
        default: () => {
          const { tmNodes, collapsed } = this
          return !collapsed
            ? h(
              'div',
              {
                class: 'n-submenu-children'
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
          value: this.NMenu.mergedValue,
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
                class: 'n-submenu'
              },
              [
                createSubmenuItem(),
                this.NMenu.mode === 'horizontal'
                  ? null
                  : createSubmenuChildren()
              ]
            )
        }
      )
      : h(
        'div',
        {
          class: 'n-submenu'
        },
        [createSubmenuItem(), createSubmenuChildren()]
      )
  }
})
