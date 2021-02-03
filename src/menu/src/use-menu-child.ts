import { Key } from 'treemate'
import { inject, computed, ComputedRef, PropType } from 'vue'
import { MergedTheme } from '../../_mixins/use-theme'
import type { MenuTheme } from '../styles'
import { OnUpdateValueImpl } from './interface'

const ICON_MARGIN_RIGHT = 8

export interface MenuInjection {
  mergedValue: Key | null
  mode: 'vertical' | 'horizontal'
  collapsed: boolean
  iconSize: number
  collapsedIconSize?: number
  indent: number
  rootIndent: number
  collapsedWidth: number
  disabled: boolean
  mergedExpandedKeys: Key[]
  activePath: Key[]
  mergedTheme: MergedTheme<MenuTheme>
  doSelect: OnUpdateValueImpl
  toggleExpand: (key: Key) => void
}

export interface SubmenuInjection {
  paddingLeft: number | undefined
  mergedDisabled: boolean
}

export interface MenuItemGroupInjection {
  paddingLeft: number | undefined
}

export interface UseMenuChildProps {
  root: boolean
}

export interface UseMenuChild {
  dropdownPlacement: ComputedRef<'bottom' | 'right' | 'right-start'>
  activeIconSize: ComputedRef<number>
  maxIconSize: ComputedRef<number>
  paddingLeft: ComputedRef<number | undefined>
  iconMarginRight: ComputedRef<number>
  NMenu: MenuInjection
  NSubmenu: SubmenuInjection | null
}

function useMenuChild (props: UseMenuChildProps): UseMenuChild {
  const NMenu = inject<MenuInjection>('NMenu') as MenuInjection
  const NSubmenu = inject<SubmenuInjection | null>('NSubmenu', null)
  const NMenuItemGroup = inject<MenuItemGroupInjection | null>(
    'NMenuItemGroup',
    null
  )
  const horizontalRef = computed(() => {
    return NMenu.mode === 'horizontal'
  })
  const dropdownPlacementRef = computed(() => {
    if (horizontalRef.value) {
      return 'bottom'
    }
    if ('tmNodes' in props) return 'right-start'
    return 'right'
  })
  const maxIconSizeRef = computed(() => {
    return Math.max(NMenu.collapsedIconSize ?? NMenu.iconSize, NMenu.iconSize)
  })
  const activeIconSizeRef = computed(() => {
    if (!horizontalRef.value && props.root && NMenu.collapsed) {
      return NMenu.collapsedIconSize ?? NMenu.iconSize
    } else {
      return NMenu.iconSize
    }
  })
  const paddingLeftRef = computed(() => {
    if (horizontalRef.value) return undefined
    const { collapsedWidth, indent, rootIndent } = NMenu
    const { root } = props
    const mergedRootIndent = rootIndent === undefined ? indent : rootIndent
    if (root) {
      if (NMenu.collapsed) return collapsedWidth / 2 - maxIconSizeRef.value / 2
      return mergedRootIndent
    }
    if (NMenuItemGroup) {
      return indent / 2 + (NMenuItemGroup.paddingLeft as number)
    }
    if (NSubmenu) {
      return indent + (NSubmenu.paddingLeft as number)
    }
    return undefined as never
  })
  const iconMarginRightRef = computed(() => {
    const { collapsedWidth, indent, rootIndent } = NMenu
    const { value: maxIconSize } = maxIconSizeRef
    const { root } = props
    if (horizontalRef.value) return ICON_MARGIN_RIGHT
    if (!root) return ICON_MARGIN_RIGHT
    if (!NMenu.collapsed) return ICON_MARGIN_RIGHT
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

const menuChildProps = {
  internalKey: {
    type: [String, Number] as PropType<Key>,
    required: true
  },
  root: {
    type: Boolean,
    default: false
  },
  level: {
    type: Number,
    required: true
  },
  title: [String, Function] as PropType<string | Function>,
  extra: [String, Function] as PropType<string | Function>
} as const

useMenuChild.props = menuChildProps

export { useMenuChild }
