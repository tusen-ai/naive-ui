import {
  type ExtractPropTypes,
  type PropType,
  type VNode,
  type VNodeChild,
  computed,
  defineComponent,
  h,
  inject,
  mergeProps,
  provide,
  ref,
  toRef,
  watchEffect
} from 'vue'
import { type Key, createTreeMate } from 'treemate'
import { useCompitable, useMergedState } from 'vooks'
import {
  type FollowerPlacement,
  VOverflow,
  type VOverflowInst,
  VResizeObserver
} from 'vueuc'
import { createId } from 'seemly'
import { layoutSiderInjectionKey } from '../../layout/src/interface'
import type { DropdownProps } from '../../dropdown'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import { menuLight } from '../styles'
import type { MenuTheme } from '../styles'
import { isIgnoredNode, itemRenderer } from './utils'
import type {
  MenuGroupOption,
  MenuIgnoredOption,
  MenuInst,
  MenuMixedOption,
  MenuNodeProps,
  MenuOption,
  OnUpdateKeys,
  OnUpdateKeysImpl,
  OnUpdateValue,
  OnUpdateValueImpl
} from './interface'
import { useCheckDeprecated } from './useCheckDeprecated'
import { menuInjectionKey } from './context'
import { NSubmenu } from './Submenu'
import style from './styles/index.cssr'

export const menuProps = {
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
  disabledField: {
    type: String,
    default: 'disabled'
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
  show: {
    type: Boolean,
    default: true
  },
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
  dropdownProps: Object as PropType<DropdownProps>,
  accordion: Boolean,
  nodeProps: Function as PropType<MenuNodeProps>,
  dropdownPlacement: {
    type: String as PropType<FollowerPlacement>,
    default: 'bottom'
  },
  responsive: Boolean,
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

export default defineComponent({
  name: 'Menu',
  inheritAttrs: false,
  props: menuProps,
  setup(props) {
    if (__DEV__) {
      useCheckDeprecated(props)
    }
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Menu',
      '-menu',
      style,
      menuLight,
      props,
      mergedClsPrefixRef
    )

    const layoutSider = inject(layoutSiderInjectionKey, null)

    const mergedCollapsedRef = computed(() => {
      const { collapsed } = props
      if (collapsed !== undefined)
        return collapsed
      if (layoutSider) {
        const { collapseModeRef, collapsedRef } = layoutSider
        if (collapseModeRef.value === 'width') {
          return collapsedRef.value ?? false
        }
      }
      return false
    })

    const treeMateRef = computed(() => {
      const { keyField, childrenField, disabledField } = props
      return createTreeMate<MenuOption, MenuGroupOption, MenuIgnoredOption>(
        props.items || props.options,
        {
          getIgnored(node) {
            return isIgnoredNode(node)
          },
          getChildren(node) {
            return node[childrenField]
          },
          getDisabled(node) {
            return (node as any)[disabledField]
          },
          getKey(node) {
            return (node[keyField] as Key) ?? node.name
          }
        }
      )
    })
    const treeKeysLevelOneRef = computed(
      () => new Set(treeMateRef.value.treeNodes.map(e => e.key))
    )

    const { watchProps } = props

    const uncontrolledValueRef = ref<Key | null>(null)
    if (watchProps?.includes('defaultValue')) {
      watchEffect(() => {
        uncontrolledValueRef.value = props.defaultValue
      })
    }
    else {
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
        : props.defaultExpandedNames
          || props.defaultExpandedKeys
          || treeMateRef.value.getPath(mergedValueRef.value, {
            includeSelf: false
          }).keyPath
    }
    if (watchProps?.includes('defaultExpandedKeys')) {
      watchEffect(initUncontrolledExpandedKeys)
    }
    else {
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
    function doSelect(value: Key, item: MenuOption): void {
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
    function doUpdateExpandedKeys(value: Key[]): void {
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
    function toggleExpand(key: Key): void {
      const currentExpandedKeys = Array.from(mergedExpandedKeysRef.value)
      const index = currentExpandedKeys.findIndex(
        expanededKey => expanededKey === key
      )
      if (~index) {
        currentExpandedKeys.splice(index, 1)
      }
      else {
        if (props.accordion) {
          if (treeKeysLevelOneRef.value.has(key)) {
            const closeKeyIndex = currentExpandedKeys.findIndex(e =>
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
    const showOption: MenuInst['showOption'] = (key?: Key): void => {
      const selectedKeyPath = treeMateRef.value.getPath(
        key ?? mergedValueRef.value,
        {
          includeSelf: false
        }
      ).keyPath
      if (!selectedKeyPath.length)
        return
      const currentExpandedKeys = Array.from(mergedExpandedKeysRef.value)
      const nextExpandedKeys = new Set([
        ...currentExpandedKeys,
        ...selectedKeyPath
      ])
      if (props.accordion) {
        treeKeysLevelOneRef.value.forEach((firstLevelKey) => {
          if (
            nextExpandedKeys.has(firstLevelKey)
            && !selectedKeyPath.includes(firstLevelKey)
          ) {
            nextExpandedKeys.delete(firstLevelKey)
          }
        })
      }
      doUpdateExpandedKeys(Array.from(nextExpandedKeys))
    }
    const cssVarsRef = computed(() => {
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
        vars['--n-item-text-color-hover'] = self.itemTextColorHoverInverted
        vars['--n-item-text-color-active'] = self.itemTextColorActiveInverted
        vars['--n-item-text-color-child-active']
          = self.itemTextColorChildActiveInverted
        vars['--n-item-text-color-child-active-hover']
          = self.itemTextColorChildActiveInverted
        vars['--n-item-text-color-active-hover']
          = self.itemTextColorActiveHoverInverted
        vars['--n-item-icon-color'] = self.itemIconColorInverted
        vars['--n-item-icon-color-hover'] = self.itemIconColorHoverInverted
        vars['--n-item-icon-color-active'] = self.itemIconColorActiveInverted
        vars['--n-item-icon-color-active-hover']
          = self.itemIconColorActiveHoverInverted
        vars['--n-item-icon-color-child-active']
          = self.itemIconColorChildActiveInverted
        vars['--n-item-icon-color-child-active-hover']
          = self.itemIconColorChildActiveHoverInverted
        vars['--n-item-icon-color-collapsed']
          = self.itemIconColorCollapsedInverted
        vars['--n-item-text-color-horizontal']
          = self.itemTextColorHorizontalInverted
        vars['--n-item-text-color-hover-horizontal']
          = self.itemTextColorHoverHorizontalInverted
        vars['--n-item-text-color-active-horizontal']
          = self.itemTextColorActiveHorizontalInverted
        vars['--n-item-text-color-child-active-horizontal']
          = self.itemTextColorChildActiveHorizontalInverted
        vars['--n-item-text-color-child-active-hover-horizontal']
          = self.itemTextColorChildActiveHoverHorizontalInverted
        vars['--n-item-text-color-active-hover-horizontal']
          = self.itemTextColorActiveHoverHorizontalInverted
        vars['--n-item-icon-color-horizontal']
          = self.itemIconColorHorizontalInverted
        vars['--n-item-icon-color-hover-horizontal']
          = self.itemIconColorHoverHorizontalInverted
        vars['--n-item-icon-color-active-horizontal']
          = self.itemIconColorActiveHorizontalInverted
        vars['--n-item-icon-color-active-hover-horizontal']
          = self.itemIconColorActiveHoverHorizontalInverted
        vars['--n-item-icon-color-child-active-horizontal']
          = self.itemIconColorChildActiveHorizontalInverted
        vars['--n-item-icon-color-child-active-hover-horizontal']
          = self.itemIconColorChildActiveHoverHorizontalInverted
        vars['--n-arrow-color'] = self.arrowColorInverted
        vars['--n-arrow-color-hover'] = self.arrowColorHoverInverted
        vars['--n-arrow-color-active'] = self.arrowColorActiveInverted
        vars['--n-arrow-color-active-hover']
          = self.arrowColorActiveHoverInverted
        vars['--n-arrow-color-child-active']
          = self.arrowColorChildActiveInverted
        vars['--n-arrow-color-child-active-hover']
          = self.arrowColorChildActiveHoverInverted
        vars['--n-item-color-hover'] = self.itemColorHoverInverted
        vars['--n-item-color-active'] = self.itemColorActiveInverted
        vars['--n-item-color-active-hover'] = self.itemColorActiveHoverInverted
        vars['--n-item-color-active-collapsed']
          = self.itemColorActiveCollapsedInverted
      }
      else {
        vars['--n-group-text-color'] = self.groupTextColor
        vars['--n-color'] = self.color
        vars['--n-item-text-color'] = self.itemTextColor
        vars['--n-item-text-color-hover'] = self.itemTextColorHover
        vars['--n-item-text-color-active'] = self.itemTextColorActive
        vars['--n-item-text-color-child-active'] = self.itemTextColorChildActive
        vars['--n-item-text-color-child-active-hover']
          = self.itemTextColorChildActiveHover
        vars['--n-item-text-color-active-hover'] = self.itemTextColorActiveHover
        vars['--n-item-icon-color'] = self.itemIconColor
        vars['--n-item-icon-color-hover'] = self.itemIconColorHover
        vars['--n-item-icon-color-active'] = self.itemIconColorActive
        vars['--n-item-icon-color-active-hover'] = self.itemIconColorActiveHover
        vars['--n-item-icon-color-child-active'] = self.itemIconColorChildActive
        vars['--n-item-icon-color-child-active-hover']
          = self.itemIconColorChildActiveHover
        vars['--n-item-icon-color-collapsed'] = self.itemIconColorCollapsed
        vars['--n-item-text-color-horizontal'] = self.itemTextColorHorizontal
        vars['--n-item-text-color-hover-horizontal']
          = self.itemTextColorHoverHorizontal
        vars['--n-item-text-color-active-horizontal']
          = self.itemTextColorActiveHorizontal
        vars['--n-item-text-color-child-active-horizontal']
          = self.itemTextColorChildActiveHorizontal
        vars['--n-item-text-color-child-active-hover-horizontal']
          = self.itemTextColorChildActiveHoverHorizontal
        vars['--n-item-text-color-active-hover-horizontal']
          = self.itemTextColorActiveHoverHorizontal
        vars['--n-item-icon-color-horizontal'] = self.itemIconColorHorizontal
        vars['--n-item-icon-color-hover-horizontal']
          = self.itemIconColorHoverHorizontal
        vars['--n-item-icon-color-active-horizontal']
          = self.itemIconColorActiveHorizontal
        vars['--n-item-icon-color-active-hover-horizontal']
          = self.itemIconColorActiveHoverHorizontal
        vars['--n-item-icon-color-child-active-horizontal']
          = self.itemIconColorChildActiveHorizontal
        vars['--n-item-icon-color-child-active-hover-horizontal']
          = self.itemIconColorChildActiveHoverHorizontal
        vars['--n-arrow-color'] = self.arrowColor
        vars['--n-arrow-color-hover'] = self.arrowColorHover
        vars['--n-arrow-color-active'] = self.arrowColorActive
        vars['--n-arrow-color-active-hover'] = self.arrowColorActiveHover
        vars['--n-arrow-color-child-active'] = self.arrowColorChildActive
        vars['--n-arrow-color-child-active-hover']
          = self.arrowColorChildActiveHover
        vars['--n-item-color-hover'] = self.itemColorHover
        vars['--n-item-color-active'] = self.itemColorActive
        vars['--n-item-color-active-hover'] = self.itemColorActiveHover
        vars['--n-item-color-active-collapsed'] = self.itemColorActiveCollapsed
      }
      return vars
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'menu',
        computed(() => (props.inverted ? 'a' : 'b')),
        cssVarsRef,
        props
      )
      : undefined

    const ellipsisNodeId = createId()
    const overflowRef = ref<VOverflowInst | null>(null)
    const counterRef = ref<HTMLElement | null>(null)
    let isFirstResize = true
    const onResize = (): void => {
      if (isFirstResize) {
        isFirstResize = false
      }
      else {
        overflowRef.value?.sync({
          showAllItemsBeforeCalculate: true
        })
      }
    }
    function getCounter(): HTMLElement | null {
      return document.getElementById(ellipsisNodeId)
    }
    const ellipsisFromIndexRef = ref(-1)
    function onUpdateCount(count: number): void {
      ellipsisFromIndexRef.value = props.options.length - count
    }
    function onUpdateOverflow(overflow: boolean): void {
      if (!overflow) {
        ellipsisFromIndexRef.value = -1
      }
    }
    const ellipsisOptionRef = computed<MenuOption>(() => {
      const ellipsisFromIndex = ellipsisFromIndexRef.value
      const option: MenuOption = {
        children:
          ellipsisFromIndex === -1 ? [] : props.options.slice(ellipsisFromIndex)
      }
      return option
    })
    const ellipsisTreeMateRef = computed(() => {
      const { childrenField, disabledField, keyField } = props
      return createTreeMate<MenuOption, MenuGroupOption, MenuIgnoredOption>(
        [ellipsisOptionRef.value],
        {
          getIgnored(node) {
            return isIgnoredNode(node)
          },
          getChildren(node) {
            return node[childrenField]
          },
          getDisabled(node) {
            return (node as any)[disabledField]
          },
          getKey(node) {
            return (node[keyField] as Key) ?? node.name
          }
        }
      )
    })
    const emptyTmNodeRef = computed(() => {
      return createTreeMate<MenuOption, MenuGroupOption, MenuIgnoredOption>([
        {}
      ]).treeNodes[0]
    })
    function renderCounter(): VNodeChild {
      if (ellipsisFromIndexRef.value === -1) {
        // Only a placeholder
        return (
          <NSubmenu
            root
            level={0}
            key="__ellpisisGroupPlaceholder__"
            internalKey="__ellpisisGroupPlaceholder__"
            title="···"
            tmNode={emptyTmNodeRef.value}
            domId={ellipsisNodeId}
            isEllipsisPlaceholder
          />
        )
      }
      const tmNode = ellipsisTreeMateRef.value.treeNodes[0]
      const activePath = activePathRef.value
      const childActive = !!tmNode.children?.some((tmNode) => {
        return activePath.includes(tmNode.key)
      })
      return (
        <NSubmenu
          level={0}
          root
          key="__ellpisisGroup__"
          internalKey="__ellpisisGroup__"
          title="···"
          virtualChildActive={childActive}
          tmNode={tmNode}
          domId={ellipsisNodeId}
          rawNodes={(tmNode.rawNode as MenuOption).children || []}
          tmNodes={tmNode.children || []}
          isEllipsisPlaceholder
        />
      )
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
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      overflowRef,
      counterRef,
      updateCounter: () => {},
      onResize,
      onUpdateOverflow,
      onUpdateCount,
      renderCounter,
      getCounter,
      onRender: themeClassHandle?.onRender,
      showOption,
      deriveResponsiveState: onResize
    } satisfies MenuInst & Record<string, unknown>
  },
  render() {
    const { mergedClsPrefix, mode, themeClass, onRender } = this
    onRender?.()
    const renderMenuItemNodes = (): VNodeChild[] =>
      this.tmNodes.map(tmNode => itemRenderer(tmNode, this.$props))
    const horizontal = mode === 'horizontal'
    const finalResponsive = horizontal && this.responsive
    const renderMainNode = (): VNode =>
      h(
        'div',
        mergeProps(this.$attrs, {
          role: mode === 'horizontal' ? 'menubar' : 'menu',
          class: [
            `${mergedClsPrefix}-menu`,
            themeClass,
            `${mergedClsPrefix}-menu--${mode}`,
            finalResponsive && `${mergedClsPrefix}-menu--responsive`,
            this.mergedCollapsed && `${mergedClsPrefix}-menu--collapsed`
          ],
          style: this.cssVars
        }),
        finalResponsive ? (
          <VOverflow
            ref="overflowRef"
            onUpdateOverflow={this.onUpdateOverflow}
            getCounter={this.getCounter}
            onUpdateCount={this.onUpdateCount}
            updateCounter={this.updateCounter}
            style={{
              width: '100%',
              display: 'flex',
              overflow: 'hidden'
            }}
          >
            {{
              default: renderMenuItemNodes,
              counter: this.renderCounter
            }}
          </VOverflow>
        ) : (
          renderMenuItemNodes()
        )
      )
    return finalResponsive ? (
      <VResizeObserver onResize={this.onResize}>
        {{ default: renderMainNode }}
      </VResizeObserver>
    ) : (
      renderMainNode()
    )
  }
})
