import { h, nextTick, ref, toRef, computed, onMounted } from 'vue'
import { createTreeMate } from 'treemate'
import { useCompitable, useMergedState } from 'vooks'
import { useTheme } from '../../_mixins'
import { itemRenderer } from './utils'
import { menuLight } from '../styles'
import style from './styles/index.cssr.js'

export default {
  name: 'Menu',
  provide () {
    return {
      NMenu: this,
      NSubmenu: null
    }
  },
  props: {
    items: {
      type: Array,
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
      type: Array,
      default: () => []
    },
    expandedKeys: {
      type: Array,
      default: undefined
    },
    value: {
      type: String,
      default: undefined
    },
    defaultValue: {
      type: String,
      default: null
    },
    mode: {
      validator (value) {
        return ['vertical', 'horizontal'].includes(value)
      },
      default: 'vertical'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    'onUpdate:expandedKeys': {
      type: Function,
      default: () => {}
    },
    'onUpdate:value': {
      type: Function,
      default: () => {}
    },
    // deprecated
    onOpenNamesChange: {
      type: Function,
      default: () => {}
    },
    onSelect: {
      type: Function,
      default: () => {}
    },
    onExpandedNamesChange: {
      type: Function,
      default: () => {}
    },
    expandedNames: {
      type: Array,
      default: undefined
    },
    defaultExpandedNames: {
      type: Array,
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
    const controlledExpandedKeysRef = useCompitable(
      props,
      'expandedNames',
      'expandedKeys'
    )
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
    const transitionDisabledRef = ref(true)
    onMounted(() => {
      nextTick(() => {
        transitionDisabledRef.value = false
      })
    })
    return {
      controlledExpandedKeys: controlledExpandedKeysRef,
      uncontrolledExpanededKeys: uncontrolledExpandedKeysRef,
      mergedExpandedKeys: mergedExpandedKeysRef,
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      activePath: activePathRef,
      tmNodes: tmNodesRef,
      transitionDisabled: transitionDisabledRef,
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
            itemExtraTextColor,
            itemExtraTextColorHover,
            itemExtraTextColorChildActive,
            itemExtraTextColorActive,
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
          '--item-extra-text-color': itemExtraTextColor,
          '--item-text-color-hover': itemTextColorHover,
          '--item-icon-color-hover': itemIconColorHover,
          '--item-extra-text-color-hover': itemExtraTextColorHover,
          '--item-text-color-active': itemTextColorActive,
          '--item-icon-color-active': itemIconColorActive,
          '--item-extra-text-color-active': itemExtraTextColorActive,
          '--item-icon-color-collapsed': itemIconColorCollapsed,
          '--item-color-active': itemColorActive,
          '--item-text-color-child-active': itemTextColorChildActive,
          '--item-extra-text-color-child-active': itemExtraTextColorChildActive,
          '--item-icon-color-child-active': itemIconColorChildActive
        }
      })
    }
  },
  methods: {
    doSelect (value, item) {
      this['onUpdate:value'](value, item)
      // deprecated
      this.onSelect(value, item)
      this.uncontrolledValue = value
    },
    toggleExpand (key) {
      const currentExpandedKeys = Array.from(this.mergedExpandedKeys)
      const index = currentExpandedKeys.findIndex(
        (expanededKey) => expanededKey === key
      )
      if (~index) {
        currentExpandedKeys.splice(index, 1)
      } else {
        currentExpandedKeys.push(key)
      }
      if (this.controlledExpandedKeys === undefined) {
        this.uncontrolledExpanededKeys = currentExpandedKeys
      }
      this['onUpdate:expandedKeys'](currentExpandedKeys)
      // deprecated
      this.onExpandedNamesChange(currentExpandedKeys)
      this.onOpenNamesChange(currentExpandedKeys)
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
            'n-menu--collapsed': this.collapsed,
            'n-menu--transition-disabled': this.transitionDisabled
          }
        ],
        style: this.cssVars
      },
      this.tmNodes.map((tmNode) => itemRenderer(tmNode))
    )
  }
}
