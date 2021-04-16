import {
  defineComponent,
  h,
  computed,
  ref,
  toRef,
  PropType,
  watch,
  provide,
  reactive,
  CSSProperties,
  InjectionKey
} from 'vue'
import { createTreeMate, Key, TreeMateOptions, TreeNode } from 'treemate'
import { useMergedState, useKeyboard, useMemo } from 'vooks'
import { useConfig, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { NPopover, popoverBaseProps } from '../../popover'
import {
  keep,
  call,
  createKey,
  MaybeArray,
  ExtractPublicPropTypes
} from '../../_utils'
import { dropdownLight } from '../styles'
import type { DropdownTheme } from '../styles'
import NDropdownMenu from './DropdownMenu'
import style from './styles/index.cssr'
import {
  DropdownGroupOption,
  DropdownIgnoredOption,
  DropdownOption,
  DropdownMixedOption,
  OnUpdateValue,
  OnUpdateValueImpl
} from './interface'

const treemateOptions: TreeMateOptions<
DropdownOption,
DropdownGroupOption,
DropdownIgnoredOption
> = {
  getKey (node) {
    return node.key
  },
  getDisabled (node) {
    return node.disabled === true
  },
  getIgnored (node) {
    return node.type === 'divider'
  }
}

export interface DropdownInjection {
  hoverKey: Key | null
  keyboardKey: Key | null
  lastToggledSubmenuKey: Key | null
  pendingKeyPath: Key[]
  activeKeyPath: Key[]
  animated: boolean
  mergedShow: boolean
  doSelect: OnUpdateValueImpl
  doUpdateShow: (value: boolean) => void
}

export const dropdownInjectionKey: InjectionKey<DropdownInjection> = Symbol(
  'dropdown'
)

const dropdownBaseProps = {
  animated: {
    type: Boolean,
    default: true
  },
  keyboard: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large' | 'huge'>,
    default: 'medium'
  },
  submenuWidth: {
    type: Number,
    default: null
  },
  submenuMinWidth: {
    type: Number,
    default: null
  },
  onSelect: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  options: {
    type: Array as PropType<DropdownMixedOption[]>,
    default: () => []
  },
  // for menu
  value: [String, Number] as PropType<Key | null>
} as const

const popoverPropKeys = Object.keys(popoverBaseProps) as Array<
keyof typeof popoverBaseProps
>

const dropdownProps = {
  ...popoverBaseProps,
  ...dropdownBaseProps,
  ...(useTheme.props as ThemeProps<DropdownTheme>)
} as const

export type DropdownProps = ExtractPublicPropTypes<typeof dropdownProps>

export default defineComponent({
  name: 'Dropdown',
  props: dropdownProps,
  setup (props) {
    const uncontrolledShowRef = ref(false)
    const mergedShowRef = useMergedState(
      toRef(props, 'show'),
      uncontrolledShowRef
    )
    const treemateRef = computed(() => {
      return createTreeMate<
      DropdownOption,
      DropdownGroupOption,
      DropdownIgnoredOption
      >(props.options, treemateOptions)
    })
    const tmNodesRef = computed(() => {
      return treemateRef.value.treeNodes
    })

    const hoverKeyRef = ref<Key | null>(null)
    const keyboardKeyRef = ref<Key | null>(null)
    const lastToggledSubmenuKeyRef = ref<Key | null>(null)
    const pendingKeyRef = computed(() => {
      return (
        hoverKeyRef.value ??
        keyboardKeyRef.value ??
        lastToggledSubmenuKeyRef.value ??
        null
      )
    })

    const pendingKeyPathRef = computed(
      () => treemateRef.value.getPath(pendingKeyRef.value).keyPath
    )

    const activeKeyPathRef = computed(
      () => treemateRef.value.getPath(props.value).keyPath
    )

    const keyboardEnabledRef = useMemo(() => {
      return props.keyboard && mergedShowRef.value
    })

    useKeyboard(
      {
        keydown: {
          ArrowUp: {
            prevent: true,
            handler: handleKeyDownUp
          },
          ArrowRight: {
            prevent: true,
            handler: handleKeyDownRight
          },
          ArrowDown: {
            prevent: true,
            handler: handleKeyDownDown
          },
          ArrowLeft: {
            prevent: true,
            handler: handleKeyDownLeft
          },
          Escape: handleKeyDownEsc
        },
        keyup: {
          Enter: handleKeyUpEnter
        }
      },
      keyboardEnabledRef
    )

    const { mergedClsPrefix } = useConfig(props)

    const themeRef = useTheme(
      'Dropdown',
      'Dropdown',
      style,
      dropdownLight,
      props,
      mergedClsPrefix
    )

    provide(
      dropdownInjectionKey,
      reactive({
        hoverKey: hoverKeyRef,
        keyboardKey: keyboardKeyRef,
        lastToggledSubmenuKey: lastToggledSubmenuKeyRef,
        pendingKeyPath: pendingKeyPathRef,
        activeKeyPath: activeKeyPathRef,
        animated: toRef(props, 'animated'),
        mergedShow: mergedShowRef,
        doSelect,
        doUpdateShow
      })
    )
    // watch
    watch(mergedShowRef, (value) => {
      if (!value) clearPendingState()
    })
    // methods
    function doSelect (key: Key, node: DropdownOption): void {
      const { onSelect } = props
      if (onSelect) call(onSelect as OnUpdateValueImpl, key, node)
    }
    function doUpdateShow (value: boolean): void {
      const { 'onUpdate:show': onUpdateShow } = props
      if (onUpdateShow) call(onUpdateShow, value)
      uncontrolledShowRef.value = value
    }
    function clearPendingState (): void {
      hoverKeyRef.value = null
      keyboardKeyRef.value = null
      lastToggledSubmenuKeyRef.value = null
    }
    function handleKeyDownEsc (): void {
      doUpdateShow(false)
    }
    function handleKeyDownLeft (): void {
      handleKeyDown('left')
    }
    function handleKeyDownRight (): void {
      handleKeyDown('right')
    }
    function handleKeyDownUp (): void {
      handleKeyDown('up')
    }
    function handleKeyDownDown (): void {
      handleKeyDown('down')
    }
    function handleKeyUpEnter (): void {
      const pendingNode = getPendingNode()
      if (pendingNode?.isLeaf) {
        doSelect(pendingNode.key, pendingNode.rawNode)
        doUpdateShow(false)
      }
    }
    function getPendingNode (): TreeNode<DropdownOption> | null {
      const { value: treeMate } = treemateRef
      const { value: pendingKey } = pendingKeyRef
      if (!treeMate || pendingKey === null) return null
      return treeMate.getNode(pendingKey) ?? null
    }
    function handleKeyDown (direction: 'up' | 'right' | 'down' | 'left'): void {
      const { value: pendingKey } = pendingKeyRef
      const {
        value: { getFirstAvailableNode }
      } = treemateRef
      let nextKeyboardKey = null
      if (pendingKey === null) {
        const firstNode = getFirstAvailableNode()
        if (firstNode !== null) {
          nextKeyboardKey = firstNode.key
        }
      } else {
        const currentNode = getPendingNode()
        if (currentNode) {
          let nextNode
          switch (direction) {
            case 'down':
              nextNode = currentNode.getNext()
              break
            case 'up':
              nextNode = currentNode.getPrev()
              break
            case 'right':
              nextNode = currentNode.getChild()
              break
            case 'left':
              nextNode = currentNode.getParent()
              break
          }
          if (nextNode) nextKeyboardKey = nextNode.key
        }
      }
      if (nextKeyboardKey !== null) {
        hoverKeyRef.value = null
        keyboardKeyRef.value = nextKeyboardKey
      }
    }
    return {
      cPrefix: mergedClsPrefix,
      mergedTheme: themeRef,
      // data
      tmNodes: tmNodesRef,
      // show
      mergedShow: mergedShowRef,
      // methods
      doUpdateShow,
      cssVars: computed(() => {
        const { size } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            padding,
            color,
            dividerColor,
            borderRadius,
            boxShadow,
            suffixColor,
            prefixColor,
            optionColorHover,
            optionTextColor,
            optionTextColorActive,
            groupHeaderTextColor,
            [createKey('optionIconSuffixWidth', size)]: optionIconSuffixWidth,
            [createKey('optionSuffixWidth', size)]: optionSuffixWidth,
            [createKey('optionIconPrefixWidth', size)]: optionIconPrefixWidth,
            [createKey('optionPrefixWidth', size)]: optionPrefixWidth,
            [createKey('fontSize', size)]: fontSize,
            [createKey('optionHeight', size)]: optionHeight,
            [createKey('optionIconSize', size)]: optionIconSize
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--font-size': fontSize,
          '--option-color-hover': optionColorHover,
          '--divider-color': dividerColor,
          '--color': color,
          '--padding': padding,
          '--border-radius': borderRadius,
          '--box-shadow': boxShadow,
          '--option-height': optionHeight,
          '--option-prefix-width': optionPrefixWidth,
          '--option-icon-prefix-width': optionIconPrefixWidth,
          '--option-suffix-width': optionSuffixWidth,
          '--option-icon-suffix-width': optionIconSuffixWidth,
          '--option-text-color': optionTextColor,
          '--option-text-color-active': optionTextColorActive,
          '--prefix-color': prefixColor,
          '--suffix-color': suffixColor,
          '--group-header-text-color': groupHeaderTextColor,
          '--option-icon-size': optionIconSize
        }
      })
    }
  },
  render () {
    return h(
      NPopover,
      keep(this.$props, popoverPropKeys, {
        show: this.mergedShow,
        onUpdateShow: this.doUpdateShow,
        showArrow: false,
        raw: true,
        shadow: false,
        theme: this.mergedTheme.peers.Popover,
        themeOverrides: this.mergedTheme.peerOverrides.Popover,
        internalExtraClass: 'dropdown'
      }),
      {
        trigger: this.$slots.default,
        default: () => {
          return h(NDropdownMenu, {
            clsPrefix: this.cPrefix,
            tmNodes: this.tmNodes,
            style: this.cssVars as CSSProperties
          })
        }
      }
    )
  }
})
