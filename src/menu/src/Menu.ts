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
import { createTreeMate, Key, RawNode } from 'treemate'
import { useCompitable, useMergedState } from 'vooks'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, warn } from '../../_utils'
import { itemRenderer } from './utils'
import { menuLight } from '../styles'
import type { MenuTheme } from '../styles'
import { MenuInjection } from './use-menu-child'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'Menu',
  props: {
    ...(useTheme.props as ThemeProps<MenuTheme>),
    items: {
      type: Array as PropType<RawNode[]>,
      required: true
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
    value: {
      type: [String, Number] as PropType<Key>,
      default: undefined
    },
    defaultValue: {
      type: [String, Number] as PropType<Key>,
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
    'onUpdate:expandedKeys': {
      type: Function as PropType<(value: Key[]) => void>,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: Function as PropType<(value: Key) => void>,
      default: undefined
    },
    // deprecated
    onOpenNamesChange: {
      type: Function as PropType<(value: Key[]) => void>,
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
      type: Function as PropType<(value: Key) => void>,
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
      type: Function as PropType<(value: Key[]) => void>,
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
      createTreeMate(props.items, {
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
        disabled: toRef(props, 'disabled'),
        mergedValue: mergedValueRef,
        mergedExpandedKeys: mergedExpandedKeysRef,
        activePath: activePathRef,
        doSelect,
        toggleExpand
      })
    )
    function doSelect (value: Key, item: RawNode) {
      const { 'onUpdate:value': onUpdateValue, onSelect } = props
      if (onUpdateValue) {
        call(onUpdateValue, value, item)
      }
      if (onSelect) {
        call(onSelect, value, item)
      }
      uncontrolledValueRef.value = value
    }
    function doUpdateExpandedKeys (value: Key[]) {
      const {
        'onUpdate:expandedKeys': onUpdateExpandedKeys,
        onExpandedNamesChange,
        onOpenNamesChange
      } = props
      if (onUpdateExpandedKeys) {
        call(onUpdateExpandedKeys, value)
      }
      // deprecated
      if (onExpandedNamesChange) {
        call(onExpandedNamesChange, value)
      }
      if (onOpenNamesChange) {
        call(onOpenNamesChange, value)
      }
      uncontrolledExpandedKeysRef.value = value
    }
    function toggleExpand (key: Key) {
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
