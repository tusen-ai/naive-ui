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
  inject
} from 'vue'
import { createTreeMate, Key } from 'treemate'
import { useCompitable, useMergedState } from 'vooks'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, MaybeArray, warn } from '../../_utils'
import { itemRenderer } from './utils'
import { menuLight } from '../styles'
import type { MenuTheme } from '../styles'
import { MenuInjection } from './use-menu-child'
import style from './styles/index.cssr'
import {
  MenuOption,
  MenuGroupOption,
  OnUpdateValue,
  OnUpdateKeys,
  OnUpdateValueImpl,
  OnUpdateKeysImpl
} from './interface'
import { layoutSiderInjectionKey } from '../../layout/src/interface'

const menuProps = {
  ...(useTheme.props as ThemeProps<MenuTheme>),
  options: {
    type: Array as PropType<Array<MenuOption | MenuGroupOption>>,
    default: () => []
  },
  items: {
    type: Array as PropType<Array<MenuOption | MenuGroupOption> | undefined>,
    validator: () => {
      if (__DEV__) {
        warn('menu', '`items` is deprecated, please use `options` instead.')
      }
      return true
    },
    default: undefined
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
  defaultExpandAll: Boolean,
  defaultExpandedKeys: {
    type: Array as PropType<Key[]>,
    default: () => []
  },
  expandedKeys: {
    type: Array as PropType<Key[]>,
    default: undefined
  },
  value: [String, Number] as PropType<Key | null>,
  defaultValue: {
    type: [String, Number] as PropType<Key | null>,
    default: null
  },
  mode: {
    type: String as PropType<'vertical' | 'horizontal'>,
    default: 'vertical'
  },
  disabled: Boolean,
  inverted: Boolean,
  'onUpdate:expandedKeys': [Function, Array] as PropType<
  MaybeArray<OnUpdateKeys>
  >,
  onUpdateExpandedKeys: [Function, Array] as PropType<MaybeArray<OnUpdateKeys>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  // deprecated
  onOpenNamesChange: {
    type: [Function, Array] as PropType<MaybeArray<OnUpdateKeys>>,
    validator: () => {
      warn(
        'menu',
        '`on-open-names-change` is deprecated, please use `on-update:expanded-keys` instead.'
      )
      return true
    },
    default: undefined
  },
  onSelect: {
    type: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
    validator: () => {
      warn(
        'menu',
        '`on-select` is deprecated, please use `on-update:value` instead.'
      )
      return true
    },
    default: undefined
  },
  onExpandedNamesChange: {
    type: [Function, Array] as PropType<MaybeArray<OnUpdateKeys>>,
    validator: () => {
      warn(
        'menu',
        '`on-expanded-names-change` is deprecated, please use `on-update:expanded-keys` instead.'
      )
      return true
    },
    default: undefined
  },
  expandedNames: {
    type: Array as PropType<Key[]>,
    validator: () => {
      warn(
        'menu',
        '`expanded-names` is deprecated, please use `expanded-keys` instead.'
      )
      return true
    },
    default: undefined
  },
  defaultExpandedNames: {
    type: Array as PropType<Key[]>,
    validator: () => {
      warn(
        'menu',
        '`default-expanded-names` is deprecated, please use `default-expanded-keys` instead.'
      )
      return true
    },
    default: undefined
  }
} as const

export type MenuSetupProps = ExtractPropTypes<typeof menuProps>

export type MenuProps = Partial<MenuSetupProps>

export const menuInjectionKey: InjectionKey<MenuInjection> = Symbol('menu')

export default defineComponent({
  name: 'Menu',
  props: menuProps,
  setup (props) {
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

    const treeMateRef = computed(() =>
      createTreeMate<MenuOption, MenuGroupOption>(
        props.items || props.options,
        {
          getKey (node) {
            return node.key ?? node.name
          }
        }
      )
    )
    const uncontrolledExpandedKeysRef = ref(
      props.defaultExpandAll
        ? treeMateRef.value.getNonLeafKeys()
        : props.defaultExpandedNames || props.defaultExpandedKeys
    )
    const controlledExpandedKeysRef = useCompitable(props, [
      'expandedNames',
      'expandedKeys'
    ])
    const mergedExpandedKeysRef = useMergedState(
      controlledExpandedKeysRef,
      uncontrolledExpandedKeysRef
    )
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
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
        const { borderRadius, borderColorHorizontal, fontSize } = self
        const vars: any = {
          '--bezier': cubicBezierEaseInOut,
          '--font-size': fontSize,
          '--border-color-horizontal': borderColorHorizontal,
          '--border-radius': borderRadius
        }
        if (inverted) {
          vars['--group-text-color'] = self.groupTextColorInverted
          vars['--color'] = self.colorInverted
          vars['--item-text-color'] = self.itemTextColorInverted
          vars['--arrow-color'] = self.arrowColorInverted
          vars['--arrow-color-hover'] = self.arrowColorHoverInverted
          vars['--arrow-color-active'] = self.arrowColorActiveInverted
          vars['--arrow-color-child-active'] =
            self.arrowColorChildActiveInverted
          vars['--item-icon-color'] = self.itemIconColorInverted
          vars['--item-text-color-hover'] = self.itemTextColorHoverInverted
          vars['--item-icon-color-hover'] = self.itemIconColorHoverInverted
          vars['--item-text-color-active'] = self.itemTextColorActiveInverted
          vars['--item-icon-color-active'] = self.itemIconColorActiveInverted
          vars['--item-icon-color-collapsed'] =
            self.itemIconColorCollapsedInverted
          vars['--item-color-active'] = self.itemColorActiveInverted
          vars['--item-color-active-collapsed'] =
            self.itemColorActiveCollapsedInverted
          vars['--item-text-color-child-active'] =
            self.itemTextColorChildActiveInverted
          vars['--item-icon-color-child-active'] =
            self.itemIconColorChildActiveInverted
        } else {
          vars['--group-text-color'] = self.groupTextColor
          vars['--color'] = self.color
          vars['--item-text-color'] = self.itemTextColor
          vars['--arrow-color'] = self.arrowColor
          vars['--arrow-color-hover'] = self.arrowColorHover
          vars['--arrow-color-active'] = self.arrowColorActive
          vars['--arrow-color-child-active'] = self.arrowColorChildActive
          vars['--item-icon-color'] = self.itemIconColor
          vars['--item-text-color-hover'] = self.itemTextColorHover
          vars['--item-icon-color-hover'] = self.itemIconColorHover
          vars['--item-text-color-active'] = self.itemTextColorActive
          vars['--item-icon-color-active'] = self.itemIconColorActive
          vars['--item-icon-color-collapsed'] = self.itemIconColorCollapsed
          vars['--item-color-active'] = self.itemColorActive
          vars['--item-color-active-collapsed'] = self.itemColorActiveCollapsed
          vars['--item-text-color-child-active'] = self.itemTextColorChildActive
          vars['--item-icon-color-child-active'] = self.itemIconColorChildActive
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
        {this.tmNodes.map((tmNode) => itemRenderer(tmNode))}
      </div>
    )
  }
})
