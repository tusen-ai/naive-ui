import {
  h,
  ref,
  toRef,
  computed,
  defineComponent,
  provide,
  PropType,
  ExtractPropTypes,
  InjectionKey,
  CSSProperties,
  inject,
  VNodeChild,
  watchEffect
} from 'vue'
import { createTreeMate, Key } from 'treemate'
import { useCompitable, useMergedState } from 'vooks'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import { itemRenderer } from './utils'
import { menuLight } from '../styles'
import type { MenuTheme } from '../styles'
import { MenuInjection } from './use-menu-child'
import style from './styles/index.cssr'
import {
  MenuOption,
  MenuGroupOption,
  MenuIgnoredOption,
  MenuMixedOption,
  OnUpdateValue,
  OnUpdateKeys,
  OnUpdateValueImpl,
  OnUpdateKeysImpl
} from './interface'
import { layoutSiderInjectionKey } from '../../layout/src/interface'
import { FollowerPlacement } from 'vueuc'
import { useCheckDeprecated } from './useCheckDeprecated'
import { DropdownProps } from '../../dropdown'

const menuProps = {
  ...(useTheme.props as ThemeProps<MenuTheme>),
  options: {
    type: Array as PropType<MenuMixedOption[]>,
    default: () => []
  },
  collapsed: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  collapsedWidth: {
    type: Number,
    default: 48
  },
  iconSize: {
    type: Number,
    default: 20
  },
  collapsedIconSize: {
    type: Number,
    default: 24
  },
  rootIndent: Number,
  indent: {
    type: Number,
    default: 32
  },
  labelField: {
    type: String,
    default: 'label'
  },
  keyField: {
    type: String,
    default: 'key'
  },
  childrenField: {
    type: String,
    default: 'children'
  },
  defaultExpandAll: Boolean,
  defaultExpandedKeys: Array as PropType<Key[]>,
  expandedKeys: Array as PropType<Key[]>,
  value: [String, Number] as PropType<Key | null>,
  defaultValue: {
    type: [String, Number] as PropType<Key | null>,
    default: null
  },
  mode: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'vertical'
  },
  watchProps: {
    type: Array as PropType<Array<'defaultExpandedKeys' | 'defaultValue'>>,
    default: undefined
  },
  disabled: Boolean,
  inverted: Boolean,
  'onUpdate:expandedKeys': [Function, Array] as PropType<
  MaybeArray<OnUpdateKeys>
  >,
  onUpdateExpandedKeys: [Function, Array] as PropType<MaybeArray<OnUpdateKeys>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  expandIcon: Function as PropType<(option: MenuOption) => VNodeChild>,
  renderIcon: Function as PropType<(option: MenuOption) => VNodeChild>,
  renderLabel: Function as PropType<
  (option: MenuOption | MenuGroupOption) => VNodeChild
  >,
  renderExtra: Function as PropType<
  (option: MenuOption | MenuGroupOption) => VNodeChild
  >,
  /** TODO: deprecate it */
  dropdownPlacement: {
    type: String as PropType<FollowerPlacement>,
    default: 'bottom'
  },
  dropdownProps: Object as PropType<DropdownProps>,
  accordion: Boolean,
  // deprecated
  items: Array as PropType<Array<MenuOption | MenuGroupOption>>,
  onOpenNamesChange: [Function, Array] as PropType<MaybeArray<OnUpdateKeys>>,
  onSelect: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onExpandedNamesChange: [Function, Array] as PropType<
  MaybeArray<OnUpdateKeys>
  >,
  expandedNames: Array as PropType<Key[]>,
  defaultExpandedNames: Array as PropType<Key[]>
} as const

export type MenuSetupProps = ExtractPropTypes<typeof menuProps>

export type MenuProps = Partial<MenuSetupProps>

export const menuInjectionKey: InjectionKey<MenuInjection> = Symbol('menu')

export default defineComponent({
  name: 'Menu',
  props: menuProps,
  setup (props) {
    if (__DEV__) {
      useCheckDeprecated(props)
    }
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Menu',
      'Menu',
      style,
      menuLight,
      props,
      mergedClsPrefixRef
    )

    const layoutSider = inject(layoutSiderInjectionKey, null)

    const mergedCollapsedRef = computed(() => {
      const { collapsed } = props
      if (collapsed !== undefined) return collapsed
      if (layoutSider) {
        const { collapseModeRef, collapsedRef } = layoutSider
        if (collapseModeRef.value === 'width') {
          return collapsedRef.value ?? false
        }
      }
      return false
    })

    const treeMateRef = computed(() => {
      const { keyField, childrenField } = props
      return createTreeMate<MenuOption, MenuGroupOption, MenuIgnoredOption>(
        props.items || props.options,
        {
          getChildren (node) {
            return node[childrenField]
          },
          getKey (node) {
            return (node[keyField] as Key) ?? node.name
          }
        }
      )
    })
    const treeKeysLevelOneRef = computed(
      () => new Set(treeMateRef.value.treeNodes.map((e) => e.key))
    )

    const { watchProps } = props

    const uncontrolledValueRef = ref<Key | null>(null)
    if (watchProps?.includes('defaultValue')) {
      watchEffect(() => {
        uncontrolledValueRef.value = props.defaultValue
      })
    } else {
      uncontrolledValueRef.value = props.defaultValue
    }
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const uncontrolledExpandedKeysRef = ref<Key[]>([])
    const initUncontrolledExpandedKeys = (): void => {
      uncontrolledExpandedKeysRef.value = props.defaultExpandAll
        ? treeMateRef.value.getNonLeafKeys()
        : props.defaultExpandedNames ||
          props.defaultExpandedKeys ||
          treeMateRef.value.getPath(mergedValueRef.value, {
            includeSelf: false
          }).keyPath
    }
    if (watchProps?.includes('defaultExpandedKeys')) {
      watchEffect(initUncontrolledExpandedKeys)
    } else {
      initUncontrolledExpandedKeys()
    }
    const controlledExpandedKeysRef = useCompitable(props, [
      'expandedNames',
      'expandedKeys'
    ])
    const mergedExpandedKeysRef = useMergedState(
      controlledExpandedKeysRef,
      uncontrolledExpandedKeysRef
    )
    const tmNodesRef = computed(() => treeMateRef.value.treeNodes)
    const activePathRef = computed(() => {
      return treeMateRef.value.getPath(mergedValueRef.value).keyPath
    })
    provide(menuInjectionKey, {
      props,
      mergedCollapsedRef,
      mergedThemeRef: themeRef,
      mergedValueRef,
      mergedExpandedKeysRef,
      activePathRef,
      mergedClsPrefixRef,
      isHorizontalRef: computed(() => props.mode === 'horizontal'),
      invertedRef: toRef(props, 'inverted'),
      doSelect,
      toggleExpand
    })
    function doSelect (value: Key, item: MenuOption): void {
      const {
        'onUpdate:value': _onUpdateValue,
        onUpdateValue,
        onSelect
      } = props
      if (onUpdateValue) {
        call(onUpdateValue as OnUpdateValueImpl, value, item)
      }
      if (_onUpdateValue) {
        call(_onUpdateValue as OnUpdateValueImpl, value, item)
      }
      if (onSelect) {
        call(onSelect as OnUpdateValueImpl, value, item)
      }
      uncontrolledValueRef.value = value
    }
    function doUpdateExpandedKeys (value: Key[]): void {
      const {
        'onUpdate:expandedKeys': _onUpdateExpandedKeys,
        onUpdateExpandedKeys,
        onExpandedNamesChange,
        onOpenNamesChange
      } = props
      if (_onUpdateExpandedKeys) {
        call(_onUpdateExpandedKeys as OnUpdateKeysImpl, value)
      }
      if (onUpdateExpandedKeys) {
        call(onUpdateExpandedKeys as OnUpdateKeysImpl, value)
      }
      // deprecated
      if (onExpandedNamesChange) {
        call(onExpandedNamesChange as OnUpdateKeysImpl, value)
      }
      if (onOpenNamesChange) {
        call(onOpenNamesChange as OnUpdateKeysImpl, value)
      }
      uncontrolledExpandedKeysRef.value = value
    }
    function toggleExpand (key: Key): void {
      const currentExpandedKeys = Array.from(mergedExpandedKeysRef.value)
      const index = currentExpandedKeys.findIndex(
        (expanededKey) => expanededKey === key
      )
      if (~index) {
        currentExpandedKeys.splice(index, 1)
      } else {
        if (props.accordion) {
          if (treeKeysLevelOneRef.value.has(key)) {
            const closeKeyIndex = currentExpandedKeys.findIndex((e) =>
              treeKeysLevelOneRef.value.has(e)
            )
            if (closeKeyIndex > -1) {
              currentExpandedKeys.splice(closeKeyIndex, 1)
            }
          }
        }
        currentExpandedKeys.push(key)
      }
      doUpdateExpandedKeys(currentExpandedKeys)
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      controlledExpandedKeys: controlledExpandedKeysRef,
      uncontrolledExpanededKeys: uncontrolledExpandedKeysRef,
      mergedExpandedKeys: mergedExpandedKeysRef,
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      activePath: activePathRef,
      tmNodes: tmNodesRef,
      mergedTheme: themeRef,
      mergedCollapsed: mergedCollapsedRef,
      cssVars: computed(() => {
        const { inverted } = props
        const {
          common: { cubicBezierEaseInOut },
          self
        } = themeRef.value
        const {
          borderRadius,
          borderColorHorizontal,
          fontSize,
          itemHeight,
          dividerColor
        } = self
        const vars: any = {
          '--n-divider-color': dividerColor,
          '--n-bezier': cubicBezierEaseInOut,
          '--n-font-size': fontSize,
          '--n-border-color-horizontal': borderColorHorizontal,
          '--n-border-radius': borderRadius,
          '--n-item-height': itemHeight
        }
        if (inverted) {
          vars['--n-group-text-color'] = self.groupTextColorInverted
          vars['--n-color'] = self.colorInverted
          vars['--n-item-text-color'] = self.itemTextColorInverted
          vars['--n-arrow-color'] = self.arrowColorInverted
          vars['--n-arrow-color-hover'] = self.arrowColorHoverInverted
          vars['--n-arrow-color-active'] = self.arrowColorActiveInverted
          vars['--n-arrow-color-child-active'] =
            self.arrowColorChildActiveInverted
          vars['--n-item-icon-color'] = self.itemIconColorInverted
          vars['--n-item-text-color-hover'] = self.itemTextColorHoverInverted
          vars['--n-item-icon-color-hover'] = self.itemIconColorHoverInverted
          vars['--n-item-text-color-active'] = self.itemTextColorActiveInverted
          vars['--n-item-icon-color-active'] = self.itemIconColorActiveInverted
          vars['--n-item-icon-color-collapsed'] =
            self.itemIconColorCollapsedInverted
          vars['--n-item-color-active'] = self.itemColorActiveInverted
          vars['--n-item-color-active-collapsed'] =
            self.itemColorActiveCollapsedInverted
          vars['--n-item-text-color-child-active'] =
            self.itemTextColorChildActiveInverted
          vars['--n-item-icon-color-child-active'] =
            self.itemIconColorChildActiveInverted
        } else {
          vars['--n-group-text-color'] = self.groupTextColor
          vars['--n-color'] = self.color
          vars['--n-item-text-color'] = self.itemTextColor
          vars['--n-arrow-color'] = self.arrowColor
          vars['--n-arrow-color-hover'] = self.arrowColorHover
          vars['--n-arrow-color-active'] = self.arrowColorActive
          vars['--n-arrow-color-child-active'] = self.arrowColorChildActive
          vars['--n-item-icon-color'] = self.itemIconColor
          vars['--n-item-text-color-hover'] = self.itemTextColorHover
          vars['--n-item-icon-color-hover'] = self.itemIconColorHover
          vars['--n-item-text-color-active'] = self.itemTextColorActive
          vars['--n-item-icon-color-active'] = self.itemIconColorActive
          vars['--n-item-icon-color-collapsed'] = self.itemIconColorCollapsed
          vars['--n-item-color-active'] = self.itemColorActive
          vars['--n-item-color-active-collapsed'] =
            self.itemColorActiveCollapsed
          vars['--n-item-text-color-child-active'] =
            self.itemTextColorChildActive
          vars['--n-item-icon-color-child-active'] =
            self.itemIconColorChildActive
        }
        return vars
      })
    }
  },
  render () {
    const { mergedClsPrefix, mode } = this
    return (
      <div
        role={mode === 'horizontal' ? 'menubar' : 'menu'}
        class={[
          `${mergedClsPrefix}-menu`,
          `${mergedClsPrefix}-menu--${mode}`,
          this.mergedCollapsed && `${mergedClsPrefix}-menu--collapsed`
        ]}
        style={this.cssVars as CSSProperties}
      >
        {this.tmNodes.map((tmNode) => itemRenderer(tmNode, this.$props))}
      </div>
    )
  }
})
