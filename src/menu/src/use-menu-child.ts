import { Key } from 'treemate'
import { useMenuChildProps } from './use-menu-child-props'
import { inject, computed, ComputedRef, ExtractPropTypes, Ref } from 'vue'
import { MergedTheme } from '../../_mixins/use-theme'
import type { MenuTheme } from '../styles'
import { OnUpdateValueImpl } from './interface'
import { menuInjectionKey } from './Menu'
import { menuItemGroupInjectionKey } from './MenuOptionGroup'
import { submenuInjectionKey } from './Submenu'

const ICON_MARGIN_RIGHT = 8

export interface MenuInjection {
  props: {
    mode: 'vertical' | 'horizontal'
    collapsed: boolean
    iconSize: number
    collapsedIconSize: number | undefined
    indent: number
    rootIndent?: number
    collapsedWidth: number
    disabled: boolean
  }
  invertedRef: Ref<boolean>
  isHorizontalRef: Ref<boolean>
  mergedClsPrefixRef: Ref<string>
  mergedValueRef: Ref<Key | null>
  mergedExpandedKeysRef: Ref<Key[]>
  activePathRef: Ref<Key[]>
  mergedThemeRef: Ref<MergedTheme<MenuTheme>>
  doSelect: OnUpdateValueImpl
  toggleExpand: (key: Key) => void
}

export interface SubmenuInjection {
  paddingLeftRef: Ref<number | undefined>
  mergedDisabledRef: Ref<boolean>
}

export interface MenuOptionGroupInjection {
  paddingLeftRef: Ref<number | undefined>
}

export type UseMenuChildProps = ExtractPropTypes<typeof useMenuChildProps>

export interface UseMenuChild {
  dropdownPlacement: ComputedRef<'bottom' | 'right' | 'right-start'>
  activeIconSize: ComputedRef<number>
  maxIconSize: ComputedRef<number>
  paddingLeft: ComputedRef<number | undefined>
  iconMarginRight: ComputedRef<number>
  NMenu: MenuInjection
  NSubmenu: SubmenuInjection | null
}

export function useMenuChild (props: UseMenuChildProps): UseMenuChild {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const NMenu = inject(menuInjectionKey)!
  const { props: menuProps } = NMenu
  const NSubmenu = inject(submenuInjectionKey, null)
  const NMenuOptionGroup = inject<MenuOptionGroupInjection | null>(
    menuItemGroupInjectionKey,
    null
  )
  const horizontalRef = computed(() => {
    return menuProps.mode === 'horizontal'
  })
  const dropdownPlacementRef = computed(() => {
    if (horizontalRef.value) {
      return 'bottom'
    }
    if ('tmNodes' in props) return 'right-start'
    return 'right'
  })
  const maxIconSizeRef = computed(() => {
    return Math.max(
      menuProps.collapsedIconSize ?? menuProps.iconSize,
      menuProps.iconSize
    )
  })
  const activeIconSizeRef = computed(() => {
    if (!horizontalRef.value && props.root && menuProps.collapsed) {
      return menuProps.collapsedIconSize ?? menuProps.iconSize
    } else {
      return menuProps.iconSize
    }
  })
  const paddingLeftRef = computed(() => {
    if (horizontalRef.value) return undefined
    const { collapsedWidth, indent, rootIndent } = menuProps
    const { root, isGroup } = props
    const mergedRootIndent = rootIndent === undefined ? indent : rootIndent
    if (root) {
      if (menuProps.collapsed) {
        return collapsedWidth / 2 - maxIconSizeRef.value / 2
      }
      return mergedRootIndent
    }
    if (NMenuOptionGroup) {
      return indent / 2 + (NMenuOptionGroup.paddingLeftRef.value as number)
    }
    if (NSubmenu) {
      return (
        (isGroup ? indent / 2 : indent) +
        (NSubmenu.paddingLeftRef.value as number)
      )
    }
    return undefined as never
  })
  const iconMarginRightRef = computed(() => {
    const { collapsedWidth, indent, rootIndent } = menuProps
    const { value: maxIconSize } = maxIconSizeRef
    const { root } = props
    if (horizontalRef.value) return ICON_MARGIN_RIGHT
    if (!root) return ICON_MARGIN_RIGHT
    if (!menuProps.collapsed) return ICON_MARGIN_RIGHT
    const mergedRootIndent = rootIndent === undefined ? indent : rootIndent
    return (
      mergedRootIndent +
      maxIconSize +
      ICON_MARGIN_RIGHT -
      (collapsedWidth + maxIconSize) / 2
    )
  })
  return {
    dropdownPlacement: dropdownPlacementRef,
    activeIconSize: activeIconSizeRef,
    maxIconSize: maxIconSizeRef,
    paddingLeft: paddingLeftRef,
    iconMarginRight: iconMarginRightRef,
    NMenu,
    NSubmenu
  }
}

export { useMenuChildProps }
