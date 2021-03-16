import {
  h,
  ref,
  toRef,
  computed,
  defineComponent,
  provide,
  reactive,
  PropType
} from 'vue'
import { createTreeMate, Key } from 'treemate'
import { useCompitable, useMergedState } from 'vooks'
import { useTheme } from '../../_mixins'
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

export default defineComponent({
  name: 'Menu',
  props: {
    ...(useTheme.props as ThemeProps<MenuTheme>),
    items: {
      type: Array as PropType<Array<MenuOption | MenuGroupOption>>,
      default: () => []
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    collapsedWidth: {
      type: Number,
      default: undefined
    },
    iconSize: {
      type: Number,
      default: 20
    },
    collapsedIconSize: {
      type: Number,
      default: 24
    },
    rootIndent: {
      type: Number,
      default: undefined
    },
    indent: {
      type: Number,
      default: 32
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
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
    disabled: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:expandedKeys': Function as PropType<MaybeArray<OnUpdateKeys>>,
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': Function as PropType<MaybeArray<OnUpdateValue>>,
    // deprecated
    onOpenNamesChange: {
      type: Function as PropType<MaybeArray<OnUpdateKeys>>,
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
      type: Function as PropType<MaybeArray<OnUpdateValue>>,
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
      type: Function as PropType<MaybeArray<OnUpdateKeys>>,
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
  },
  setup (props) {
    const themeRef = useTheme('Menu', 'Menu', style, menuLight, props)

    const treeMateRef = computed(() =>
      createTreeMate<MenuOption, MenuGroupOption>(props.items, {
        getKey (node) {
          return node.key ?? node.name
        }
      })
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
    provide<MenuInjection>(
      'NMenu',
      reactive({
        mergedTheme: themeRef,
        mode: toRef(props, 'mode'),
        collapsed: toRef(props, 'collapsed'),
        iconSize: toRef(props, 'iconSize'),
        indent: toRef(props, 'indent'),
        rootIndent: toRef(props, 'rootIndent'),
        collapsedWidth: toRef(props, 'collapsedWidth'),
        collapsedIconSize: toRef(props, 'collapsedIconSize'),
        disabled: toRef(props, 'disabled'),
        mergedValue: mergedValueRef,
        mergedExpandedKeys: mergedExpandedKeysRef,
        activePath: activePathRef,
        doSelect,
        toggleExpand
      })
    )
    function doSelect (value: Key, item: MenuOption): void {
      const { 'onUpdate:value': onUpdateValue, onSelect } = props
      if (onUpdateValue) {
        call(onUpdateValue as OnUpdateValueImpl, value, item)
      }
      if (onSelect) {
        call(onSelect as OnUpdateValueImpl, value, item)
      }
      uncontrolledValueRef.value = value
    }
    function doUpdateExpandedKeys (value: Key[]): void {
      const {
        'onUpdate:expandedKeys': onUpdateExpandedKeys,
        onExpandedNamesChange,
        onOpenNamesChange
      } = props
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
      controlledExpandedKeys: controlledExpandedKeysRef,
      uncontrolledExpanededKeys: uncontrolledExpandedKeysRef,
      mergedExpandedKeys: mergedExpandedKeysRef,
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      activePath: activePathRef,
      tmNodes: tmNodesRef,
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut },
          self: {
            borderRadius,
            groupTextColor,
            itemColorActive,
            itemTextColor,
            itemTextColorHover,
            itemTextColorChildActive,
            itemTextColorActive,
            itemIconColor,
            itemIconColorHover,
            itemIconColorActive,
            itemIconColorChildActive,
            itemIconColorCollapsed,
            borderColorHorizontal,
            arrowColor,
            fontSize
          }
        } = themeRef.value
        return {
          '--group-text-color': groupTextColor,
          '--bezier': cubicBezierEaseInOut,
          '--item-text-color': itemTextColor,
          '--font-size': fontSize,
          '--border-color-horizontal': borderColorHorizontal,
          '--border-radius': borderRadius,
          '--arrow-color': arrowColor,
          '--item-icon-color': itemIconColor,
          '--item-text-color-hover': itemTextColorHover,
          '--item-icon-color-hover': itemIconColorHover,
          '--item-text-color-active': itemTextColorActive,
          '--item-icon-color-active': itemIconColorActive,
          '--item-icon-color-collapsed': itemIconColorCollapsed,
          '--item-color-active': itemColorActive,
          '--item-text-color-child-active': itemTextColorChildActive,
          '--item-icon-color-child-active': itemIconColorChildActive
        }
      })
    }
  },
  render () {
    return h(
      'div',
      {
        class: [
          'n-menu',
          `n-menu--${this.mode}`,
          {
            'n-menu--collapsed': this.collapsed
          }
        ],
        style: this.cssVars
      },
      this.tmNodes.map((tmNode) => itemRenderer(tmNode))
    )
  }
})
