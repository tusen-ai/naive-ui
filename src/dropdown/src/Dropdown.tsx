import {
  defineComponent,
  h,
  computed,
  ref,
  toRef,
  type PropType,
  watch,
  provide,
  type Ref,
  mergeProps
} from 'vue'
import { createTreeMate, type Key, type TreeNode } from 'treemate'
import { useMergedState, useKeyboard, useMemo } from 'vooks'
import { type FollowerPlacement } from 'vueuc'
import type { InternalRenderBody } from '../../popover/src/interface'
import { popoverBaseProps } from '../../popover/src/Popover'
import type { PopoverInternalProps } from '../../popover/src/Popover'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { NPopover } from '../../popover'
import {
  keep,
  call,
  createKey,
  type MaybeArray,
  type ExtractPublicPropTypes,
  createRefSetter
} from '../../_utils'
import { dropdownLight } from '../styles'
import type { DropdownTheme } from '../styles'
import NDropdownMenu from './DropdownMenu'
import style from './styles/index.cssr'
import type {
  DropdownOption,
  DropdownRenderOption,
  DropdownGroupOption,
  DropdownMixedOption,
  DropdownIgnoredOption,
  OnUpdateValue,
  OnUpdateValueImpl,
  RenderLabel,
  RenderIcon,
  RenderLabelImpl,
  RenderIconImpl,
  RenderOption,
  NodeProps,
  RenderOptionImpl,
  DropdownMenuProps
} from './interface'
import { dropdownInjectionKey } from './context'

export interface DropdownInjection {
  renderLabelRef: Ref<RenderLabelImpl | undefined>
  renderIconRef: Ref<RenderIconImpl | undefined>
  renderOptionRef: Ref<RenderOptionImpl | undefined>
  menuPropsRef: Ref<DropdownMenuProps | undefined>
  nodePropsRef: Ref<NodeProps | undefined>
  hoverKeyRef: Ref<Key | null>
  keyboardKeyRef: Ref<Key | null>
  lastToggledSubmenuKeyRef: Ref<Key | null>
  pendingKeyPathRef: Ref<Key[]>
  activeKeyPathRef: Ref<Key[]>
  animatedRef: Ref<boolean>
  mergedShowRef: Ref<boolean>
  labelFieldRef: Ref<string>
  childrenFieldRef: Ref<string>
  doSelect: OnUpdateValueImpl
  doUpdateShow: (value: boolean) => void
}

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
  inverted: Boolean,
  placement: {
    type: String as PropType<FollowerPlacement>,
    default: 'bottom'
  },
  onSelect: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  options: {
    type: Array as PropType<DropdownMixedOption[]>,
    default: () => []
  },
  menuProps: Function as PropType<DropdownMenuProps>,
  showArrow: Boolean,
  renderLabel: Function as PropType<RenderLabel>,
  renderIcon: Function as PropType<RenderIcon>,
  renderOption: Function as PropType<RenderOption>,
  nodeProps: Function as PropType<NodeProps>,
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
  // for menu, not documented
  value: [String, Number] as PropType<Key | null>
} as const

const popoverPropKeys = Object.keys(popoverBaseProps) as Array<
keyof typeof popoverBaseProps
>

export const dropdownProps = {
  ...popoverBaseProps,
  ...dropdownBaseProps,
  ...(useTheme.props as ThemeProps<DropdownTheme>)
} as const

export type DropdownProps = ExtractPublicPropTypes<typeof dropdownProps>

export default defineComponent({
  name: 'Dropdown',
  inheritAttrs: false,
  props: dropdownProps,
  setup (props) {
    const uncontrolledShowRef = ref(false)
    const mergedShowRef = useMergedState(
      toRef(props, 'show'),
      uncontrolledShowRef
    )
    const treemateRef = computed(() => {
      const { keyField, childrenField } = props
      return createTreeMate<
      DropdownOption | DropdownRenderOption,
      DropdownGroupOption,
      DropdownIgnoredOption
      >(props.options, {
        getKey (node) {
          return node[keyField] as any
        },
        getDisabled (node) {
          return node.disabled === true
        },
        getIgnored (node) {
          return node.type === 'divider' || node.type === 'render'
        },
        getChildren (node) {
          return node[childrenField] as any
        }
      })
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
            handler: handleKeydownUp
          },
          ArrowRight: {
            prevent: true,
            handler: handleKeydownRight
          },
          ArrowDown: {
            prevent: true,
            handler: handleKeydownDown
          },
          ArrowLeft: {
            prevent: true,
            handler: handleKeydownLeft
          },
          Enter: {
            prevent: true,
            handler: handleKeydownEnter
          },
          Escape: handleKeydownEsc
        }
      },
      keyboardEnabledRef
    )

    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)

    const themeRef = useTheme(
      'Dropdown',
      '-dropdown',
      style,
      dropdownLight,
      props,
      mergedClsPrefixRef
    )

    provide(dropdownInjectionKey, {
      labelFieldRef: toRef(props, 'labelField'),
      childrenFieldRef: toRef(props, 'childrenField'),
      renderLabelRef: toRef(props, 'renderLabel') as Ref<
      RenderLabelImpl | undefined
      >,
      renderIconRef: toRef(props, 'renderIcon') as Ref<
      RenderIconImpl | undefined
      >,
      hoverKeyRef,
      keyboardKeyRef,
      lastToggledSubmenuKeyRef,
      pendingKeyPathRef,
      activeKeyPathRef,
      animatedRef: toRef(props, 'animated'),
      mergedShowRef,
      nodePropsRef: toRef(props, 'nodeProps'),
      renderOptionRef: toRef(props, 'renderOption') as Ref<
      RenderOptionImpl | undefined
      >,
      menuPropsRef: toRef(props, 'menuProps'),
      doSelect,
      doUpdateShow
    })
    // watch
    watch(mergedShowRef, (value) => {
      if (!props.animated && !value) {
        clearPendingState()
      }
    })
    // methods
    function doSelect (key: Key, node: DropdownOption): void {
      const { onSelect } = props
      if (onSelect) call(onSelect as OnUpdateValueImpl, key, node)
    }
    function doUpdateShow (value: boolean): void {
      const { 'onUpdate:show': _onUpdateShow, onUpdateShow } = props
      if (_onUpdateShow) call(_onUpdateShow, value)
      if (onUpdateShow) call(onUpdateShow, value)
      uncontrolledShowRef.value = value
    }
    function clearPendingState (): void {
      hoverKeyRef.value = null
      keyboardKeyRef.value = null
      lastToggledSubmenuKeyRef.value = null
    }
    function handleKeydownEsc (): void {
      doUpdateShow(false)
    }
    function handleKeydownLeft (): void {
      handleKeydown('left')
    }
    function handleKeydownRight (): void {
      handleKeydown('right')
    }
    function handleKeydownUp (): void {
      handleKeydown('up')
    }
    function handleKeydownDown (): void {
      handleKeydown('down')
    }
    function handleKeydownEnter (): void {
      const pendingNode = getPendingNode()
      if (pendingNode?.isLeaf && mergedShowRef.value) {
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
    function handleKeydown (direction: 'up' | 'right' | 'down' | 'left'): void {
      const { value: pendingKey } = pendingKeyRef
      const {
        value: { getFirstAvailableNode }
      } = treemateRef
      let nextKeyboardKey: Key | null = null
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
    const cssVarsRef = computed(() => {
      const { size, inverted } = props
      const {
        common: { cubicBezierEaseInOut },
        self
      } = themeRef.value
      const {
        padding,
        dividerColor,
        borderRadius,
        optionOpacityDisabled,
        [createKey('optionIconSuffixWidth', size)]: optionIconSuffixWidth,
        [createKey('optionSuffixWidth', size)]: optionSuffixWidth,
        [createKey('optionIconPrefixWidth', size)]: optionIconPrefixWidth,
        [createKey('optionPrefixWidth', size)]: optionPrefixWidth,
        [createKey('fontSize', size)]: fontSize,
        [createKey('optionHeight', size)]: optionHeight,
        [createKey('optionIconSize', size)]: optionIconSize
      } = self
      const vars: any = {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-font-size': fontSize,
        '--n-padding': padding,
        '--n-border-radius': borderRadius,
        '--n-option-height': optionHeight,
        '--n-option-prefix-width': optionPrefixWidth,
        '--n-option-icon-prefix-width': optionIconPrefixWidth,
        '--n-option-suffix-width': optionSuffixWidth,
        '--n-option-icon-suffix-width': optionIconSuffixWidth,
        '--n-option-icon-size': optionIconSize,
        '--n-divider-color': dividerColor,
        '--n-option-opacity-disabled': optionOpacityDisabled
      }
      // writing like this is the fastest method
      if (inverted) {
        vars['--n-color'] = self.colorInverted
        vars['--n-option-color-hover'] = self.optionColorHoverInverted
        vars['--n-option-color-active'] = self.optionColorActiveInverted
        vars['--n-option-text-color'] = self.optionTextColorInverted
        vars['--n-option-text-color-hover'] = self.optionTextColorHoverInverted
        vars['--n-option-text-color-active'] =
          self.optionTextColorActiveInverted
        vars['--n-option-text-color-child-active'] =
          self.optionTextColorChildActiveInverted
        vars['--n-prefix-color'] = self.prefixColorInverted
        vars['--n-suffix-color'] = self.suffixColorInverted
        vars['--n-group-header-text-color'] = self.groupHeaderTextColorInverted
      } else {
        vars['--n-color'] = self.color
        vars['--n-option-color-hover'] = self.optionColorHover
        vars['--n-option-color-active'] = self.optionColorActive
        vars['--n-option-text-color'] = self.optionTextColor
        vars['--n-option-text-color-hover'] = self.optionTextColorHover
        vars['--n-option-text-color-active'] = self.optionTextColorActive
        vars['--n-option-text-color-child-active'] =
          self.optionTextColorChildActive
        vars['--n-prefix-color'] = self.prefixColor
        vars['--n-suffix-color'] = self.suffixColor
        vars['--n-group-header-text-color'] = self.groupHeaderTextColor
      }
      return vars
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'dropdown',
        computed(() => `${props.size[0]}${props.inverted ? 'i' : ''}`),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      // data
      tmNodes: tmNodesRef,
      // show
      mergedShow: mergedShowRef,
      // methods
      handleAfterLeave: () => {
        if (!props.animated) return
        clearPendingState()
      },
      doUpdateShow,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const renderPopoverBody: InternalRenderBody = (
      className,
      ref,
      style,
      onMouseenter,
      onMouseleave
    ) => {
      const { mergedClsPrefix, menuProps } = this
      this.onRender?.()
      const menuNodeProps =
        menuProps?.(
          undefined,
          this.tmNodes.map((v) => v.rawNode)
        ) || {}
      const dropdownProps = {
        ref: createRefSetter(ref),
        class: [className, `${mergedClsPrefix}-dropdown`, this.themeClass],
        clsPrefix: mergedClsPrefix,
        tmNodes: this.tmNodes,
        style: [...style, this.cssVars as any],
        showArrow: this.showArrow,
        arrowStyle: this.arrowStyle,
        scrollable: this.scrollable,
        onMouseenter,
        onMouseleave
      }
      return h(
        NDropdownMenu,
        mergeProps(
          this.$attrs,
          dropdownProps,
          menuNodeProps
        ) as typeof dropdownProps
      )
    }
    const { mergedTheme } = this
    const popoverProps: PopoverInternalProps = {
      show: this.mergedShow,
      theme: mergedTheme.peers.Popover,
      themeOverrides: mergedTheme.peerOverrides.Popover,
      internalOnAfterLeave: this.handleAfterLeave,
      internalRenderBody: renderPopoverBody,
      onUpdateShow: this.doUpdateShow,
      'onUpdate:show': undefined
    }
    return (
      <NPopover {...keep(this.$props, popoverPropKeys)} {...popoverProps}>
        {{
          trigger: () => this.$slots.default?.()
        }}
      </NPopover>
    )
  }
})
