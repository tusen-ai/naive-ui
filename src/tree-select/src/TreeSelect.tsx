import {
  h,
  defineComponent,
  PropType,
  ref,
  toRef,
  Transition,
  withDirectives,
  computed,
  CSSProperties,
  provide,
  watchEffect,
  HTMLAttributes,
  VNodeChild
} from 'vue'
import {
  FollowerPlacement,
  VBinder,
  VFollower,
  VTarget,
  FollowerInst
} from 'vueuc'
import { useIsMounted, useMergedState } from 'vooks'
import { clickoutside } from 'vdirs'
import { createTreeMate, CheckStrategy } from 'treemate'
import { getPreciseEventTarget, happensIn } from 'seemly'
import type { FormValidationStatus } from '../../form/src/interface'
import { Key, InternalTreeInst, TreeOption } from '../../tree/src/interface'
import type { SelectBaseOption, SelectOption } from '../../select/src/interface'
import { createTreeMateOptions, treeSharedProps } from '../../tree/src/Tree'
import type { OnUpdateExpandedKeysImpl } from '../../tree/src/Tree'
import {
  NInternalSelection,
  InternalSelectionInst,
  NBaseFocusDetector
} from '../../_internal'
import { NTree } from '../../tree'
import { NEmpty } from '../../empty'
import {
  useConfig,
  useFormItem,
  useLocale,
  useTheme,
  useThemeClass
} from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  call,
  ExtractPublicPropTypes,
  markEventEffectPerformed,
  MaybeArray,
  resolveSlot,
  resolveWrappedSlot,
  useAdjustedTo,
  useOnResize,
  warnOnce
} from '../../_utils'
import { treeSelectLight, TreeSelectTheme } from '../styles'
import type {
  OnUpdateIndeterminateKeysImpl,
  OnUpdateValue,
  OnUpdateValueImpl,
  TreeSelectInst,
  TreeSelectNodeProps,
  TreeSelectOption,
  TreeSelectRenderLabel,
  TreeSelectRenderPrefix,
  TreeSelectRenderSuffix,
  TreeSelectRenderTag,
  Value
} from './interface'
import { treeSelectInjectionKey } from './interface'
import {
  treeOption2SelectOption,
  treeOption2SelectOptionWithPath
} from './utils'
import style from './styles/index.cssr'
import { useMergedCheckStrategy } from '../../tree/src/utils'

type OnLoad = (node: TreeSelectOption) => Promise<void>

export const treeSelectProps = {
  ...(useTheme.props as ThemeProps<TreeSelectTheme>),
  bordered: {
    type: Boolean,
    default: true
  },
  cascade: Boolean,
  checkable: Boolean,
  clearable: Boolean,
  clearFilterAfterSelect: {
    type: Boolean,
    default: true
  },
  consistentMenuWidth: {
    type: Boolean,
    default: true
  },
  defaultShow: Boolean,
  defaultValue: {
    type: [String, Number, Array] as PropType<
    string | number | Array<string | number> | null
    >,
    default: null
  },
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  filterable: Boolean,
  checkStrategy: {
    type: String as PropType<CheckStrategy>,
    default: 'all'
  },
  loading: Boolean,
  maxTagCount: [String, Number] as PropType<number | 'responsive'>,
  multiple: Boolean,
  showPath: Boolean,
  separator: {
    type: String,
    default: ' / '
  },
  options: {
    type: Array as PropType<TreeSelectOption[]>,
    default: () => []
  },
  placeholder: String,
  placement: {
    type: String as PropType<FollowerPlacement>,
    default: 'bottom-start'
  },
  show: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  size: String as PropType<'small' | 'medium' | 'large'>,
  value: [String, Number, Array] as PropType<
  string | number | Array<string | number> | null
  >,
  to: useAdjustedTo.propTo,
  menuProps: Object as PropType<HTMLAttributes>,
  virtualScroll: {
    type: Boolean,
    default: true
  },
  status: String as PropType<FormValidationStatus>,
  renderTag: Function as PropType<TreeSelectRenderTag>,
  ...treeSharedProps,
  renderLabel: Function as PropType<TreeSelectRenderLabel>,
  renderPrefix: Function as PropType<TreeSelectRenderPrefix>,
  renderSuffix: Function as PropType<TreeSelectRenderSuffix>,
  nodeProps: Function as PropType<TreeSelectNodeProps>,
  onBlur: Function as PropType<(e: FocusEvent) => void>,
  onFocus: Function as PropType<(e: FocusEvent) => void>,
  onLoad: Function as PropType<OnLoad>,
  onUpdateShow: [Function, Array] as PropType<
  MaybeArray<(show: boolean) => void>
  >,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  'onUpdate:show': [Function, Array] as PropType<
  MaybeArray<(show: boolean) => void>
  >,
  /**
   * @deprecated
   */
  leafOnly: Boolean
} as const

export type TreeSelectProps = ExtractPublicPropTypes<typeof treeSelectProps>

export default defineComponent({
  name: 'TreeSelect',
  props: treeSelectProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.leafOnly) {
          warnOnce(
            'tree-select',
            '`leaf-only` is deprecated, please use `check-strategy="child"` instead.'
          )
        }
      })
    }
    const followerInstRef = ref<FollowerInst | null>(null)
    const triggerInstRef = ref<InternalSelectionInst | null>(null)
    const treeInstRef = ref<InternalTreeInst | null>(null)
    const menuElRef = ref<HTMLDivElement | null>(null)
    const { mergedClsPrefixRef, namespaceRef, inlineThemeDisabled } =
      useConfig(props)
    const { localeRef } = useLocale('Select')
    const {
      mergedSizeRef,
      mergedDisabledRef,
      mergedStatusRef,
      nTriggerFormBlur,
      nTriggerFormChange,
      nTriggerFormFocus,
      nTriggerFormInput
    } = useFormItem(props)
    const uncontrolledValueRef = ref<Value>(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const uncontrolledShowRef = ref(props.defaultShow)
    const controlledShowRef = toRef(props, 'show')
    const mergedShowRef = useMergedState(controlledShowRef, uncontrolledShowRef)
    const patternRef = ref('')
    const mergedFilterRef = computed(() => {
      const { filter } = props
      if (filter) return filter
      const { labelField } = props
      return (pattern: string, node: TreeSelectOption): boolean => {
        if (!pattern.length) return true
        return ((node as any)[labelField] as string)
          .toLowerCase()
          .includes(pattern.toLowerCase())
      }
    })
    // used to resolve selected options
    const dataTreeMateRef = computed(() =>
      createTreeMate<TreeSelectOption>(
        props.options,
        createTreeMateOptions(
          props.keyField,
          props.childrenField,
          props.disabledField,
          undefined
        )
      )
    )
    const { value: initMergedValue } = mergedValueRef
    const pendingNodeKeyRef = ref(
      props.checkable
        ? null
        : Array.isArray(initMergedValue) && initMergedValue.length
          ? initMergedValue[initMergedValue.length - 1]
          : null
    )
    const mergedCascadeRef = computed(() => {
      return props.multiple && props.cascade && props.checkable
    })
    // The same logic as tree, now it's not that complex so I don't extract a
    // function to reuse it.
    const uncontrolledExpandedKeysRef = ref(
      props.defaultExpandAll
        ? undefined // leave it, n-tree will handle it
        : props.defaultExpandedKeys || props.expandedKeys
    )
    const controlledExpandedKeysRef = toRef(props, 'expandedKeys')
    const mergedExpandedKeysRef = useMergedState(
      controlledExpandedKeysRef,
      uncontrolledExpandedKeysRef
    )
    const focusedRef = ref(false)
    const mergedPlaceholderRef = computed(() => {
      const { placeholder } = props
      if (placeholder !== undefined) return placeholder
      return localeRef.value.placeholder
    })
    const treeSelectedKeysRef = computed<Key[]>(() => {
      if (props.checkable) return []
      return treeCheckedKeysRef.value
    })
    const treeCheckedKeysRef = computed<Key[]>(() => {
      const { value: mergedValue } = mergedValueRef
      if (props.multiple) {
        if (Array.isArray(mergedValue)) return mergedValue
        else return []
      } else {
        if (mergedValue === null || Array.isArray(mergedValue)) return []
        else return [mergedValue]
      }
    })
    const selectedOptionRef = computed(() => {
      const { multiple, showPath, separator, labelField } = props
      if (multiple) return null
      const { value: mergedValue } = mergedValueRef
      if (!Array.isArray(mergedValue) && mergedValue !== null) {
        const { value: treeMate } = dataTreeMateRef
        const tmNode = treeMate.getNode(mergedValue)
        if (tmNode !== null) {
          return showPath
            ? treeOption2SelectOptionWithPath(
              tmNode,
              treeMate.getPath(mergedValue).treeNodePath,
              separator,
              labelField
            )
            : treeOption2SelectOption(tmNode, labelField)
        }
      }
      return null
    })
    const selectedOptionsRef = computed(() => {
      const { multiple, showPath, separator } = props
      if (!multiple) return null
      const { value: mergedValue } = mergedValueRef
      if (Array.isArray(mergedValue)) {
        const res: SelectBaseOption[] = []
        const { value: treeMate } = dataTreeMateRef
        const { checkedKeys } = treeMate.getCheckedKeys(mergedValue, {
          checkStrategy: props.checkStrategy,
          cascade: mergedCascadeRef.value,
          allowNotLoaded: props.allowCheckingNotLoaded
        })
        const { labelField } = props
        checkedKeys.forEach((value) => {
          const tmNode = treeMate.getNode(value)
          if (tmNode !== null) {
            res.push(
              showPath
                ? treeOption2SelectOptionWithPath(
                  tmNode,
                  treeMate.getPath(value).treeNodePath,
                  separator,
                  labelField
                )
                : treeOption2SelectOption(tmNode, labelField)
            )
          }
        })
        return res
      }
      return []
    })
    const menuPaddingRef = computed(() => {
      const {
        self: { menuPadding }
      } = themeRef.value
      return menuPadding
    })
    function focusSelection (): void {
      triggerInstRef.value?.focus()
    }
    function focusSelectionInput (): void {
      triggerInstRef.value?.focusInput()
    }
    function doUpdateShow (value: boolean): void {
      const { onUpdateShow, 'onUpdate:show': _onUpdateShow } = props
      if (onUpdateShow) call(onUpdateShow, value)
      if (_onUpdateShow) call(_onUpdateShow, value)
      uncontrolledShowRef.value = value
    }
    function doUpdateValue (
      value: string | number | Array<string | number> | null,
      option: TreeSelectOption | null | Array<TreeSelectOption | null>,
      meta:
      | {
        node: TreeSelectOption
        action: 'select' | 'unselect'
      }
      | {
        node: TreeSelectOption | null
        action: 'delete'
      }
      | {
        node: null
        action: 'clear'
      }
    ): void {
      const { onUpdateValue, 'onUpdate:value': _onUpdateValue } = props
      if (onUpdateValue) {
        call(onUpdateValue as OnUpdateValueImpl, value, option, meta)
      }
      if (_onUpdateValue) {
        call(_onUpdateValue as OnUpdateValueImpl, value, option, meta)
      }
      uncontrolledValueRef.value = value
      nTriggerFormInput()
      nTriggerFormChange()
    }
    function doUpdateIndeterminateKeys (
      value: string | number | Array<string | number> | null,
      option: TreeSelectOption | null | Array<TreeSelectOption | null>
    ): void {
      const {
        onUpdateIndeterminateKeys,
        'onUpdate:indeterminateKeys': _onUpdateIndeterminateKeys
      } = props
      if (onUpdateIndeterminateKeys) {
        call(
          onUpdateIndeterminateKeys as OnUpdateIndeterminateKeysImpl,
          value,
          option
        )
      }
      if (_onUpdateIndeterminateKeys) {
        call(
          _onUpdateIndeterminateKeys as OnUpdateIndeterminateKeysImpl,
          value,
          option
        )
      }
    }
    function doUpdateExpandedKeys (
      keys: Key[],
      option: Array<TreeSelectOption | null>,
      meta:
      | {
        node: TreeSelectOption
        action: 'expand' | 'collapse'
      }
      | {
        node: null
        action: 'filter'
      }
    ): void {
      const {
        onUpdateExpandedKeys,
        'onUpdate:expandedKeys': _onUpdateExpandedKeys
      } = props
      if (onUpdateExpandedKeys) {
        call(
          onUpdateExpandedKeys as OnUpdateExpandedKeysImpl,
          keys,
          option,
          meta
        )
      }
      if (_onUpdateExpandedKeys) {
        call(
          _onUpdateExpandedKeys as OnUpdateExpandedKeysImpl,
          keys,
          option,
          meta
        )
      }
      uncontrolledExpandedKeysRef.value = keys
    }
    function doFocus (e: FocusEvent): void {
      const { onFocus } = props
      if (onFocus) onFocus(e)
      nTriggerFormFocus()
    }
    function doBlur (e: FocusEvent): void {
      closeMenu()
      const { onBlur } = props
      if (onBlur) onBlur(e)
      nTriggerFormBlur()
    }
    function closeMenu (): void {
      doUpdateShow(false)
    }
    function openMenu (): void {
      if (!mergedDisabledRef.value) {
        patternRef.value = ''
        doUpdateShow(true)
        if (props.filterable) {
          focusSelectionInput()
        }
      }
    }
    function handleMenuLeave (): void {
      patternRef.value = ''
    }
    function handleMenuClickoutside (e: MouseEvent): void {
      if (mergedShowRef.value) {
        if (
          !triggerInstRef.value?.$el.contains(
            getPreciseEventTarget(e) as Node | null
          )
        ) {
          // outside select, don't need to return focus
          closeMenu()
        }
      }
    }
    function handleTriggerClick (): void {
      if (mergedDisabledRef.value) return
      if (!mergedShowRef.value) {
        openMenu()
      } else {
        if (!props.filterable) {
          // already focused, don't need to return focus
          closeMenu()
        }
      }
    }
    function getOptionsByKeys (keys: Key[]): Array<TreeSelectOption | null> {
      const {
        value: { getNode }
      } = dataTreeMateRef
      return keys.map((key) => getNode(key)?.rawNode || null)
    }
    function handleUpdateCheckedKeys (
      keys: Key[],
      _: unknown,
      meta: { node: TreeOption | null, action: 'check' | 'uncheck' }
    ): void {
      const options = getOptionsByKeys(keys)
      const action = meta.action === 'check' ? 'select' : 'unselect'
      const node = meta.node as TreeSelectOption
      if (props.multiple) {
        doUpdateValue(keys, options, { node, action })
        if (props.filterable) {
          focusSelectionInput()
          if (props.clearFilterAfterSelect) patternRef.value = ''
        }
      } else {
        keys.length
          ? doUpdateValue(keys[0], options[0] || null, {
            node,
            action
          })
          : doUpdateValue(null, null, { node, action })
        closeMenu()
        // Currently it is not necessary. However if there is an action slot,
        // it will be useful. So just leave it here.
        focusSelection()
      }
    }
    function handleUpdateIndeterminateKeys (keys: Key[]): void {
      if (props.checkable) {
        doUpdateIndeterminateKeys(keys, getOptionsByKeys(keys))
      }
    }
    function handleTriggerFocus (e: FocusEvent): void {
      if (menuElRef.value?.contains(e.relatedTarget as Element)) return
      focusedRef.value = true
      doFocus(e)
    }
    function handleTriggerBlur (e: FocusEvent): void {
      if (menuElRef.value?.contains(e.relatedTarget as Element)) return
      focusedRef.value = false
      doBlur(e)
    }
    function handleMenuFocusin (e: FocusEvent): void {
      if (
        menuElRef.value?.contains(e.relatedTarget as Element) ||
        triggerInstRef.value?.$el?.contains(e.relatedTarget as Element)
      ) {
        return
      }
      focusedRef.value = true
      doFocus(e)
    }
    function handleMenuFocusout (e: FocusEvent): void {
      if (
        menuElRef.value?.contains(e.relatedTarget as Element) ||
        triggerInstRef.value?.$el?.contains(e.relatedTarget as Element)
      ) {
        return
      }
      focusedRef.value = false
      doBlur(e)
    }
    function handleClear (e: MouseEvent): void {
      e.stopPropagation()
      const { multiple } = props
      if (!multiple && props.filterable) {
        closeMenu()
      }
      if (multiple) {
        doUpdateValue([], [], { node: null, action: 'clear' })
      } else {
        doUpdateValue(null, null, { node: null, action: 'clear' })
      }
    }
    function handleDeleteOption (option: SelectBaseOption): void {
      // only work for multiple mode
      const { value: mergedValue } = mergedValueRef
      if (Array.isArray(mergedValue)) {
        const { value: treeMate } = dataTreeMateRef
        // all visible checked keys
        const { checkedKeys: checkedKeysValue } = treeMate.getCheckedKeys(
          mergedValue,
          {
            cascade: mergedCascadeRef.value,
            allowNotLoaded: props.allowCheckingNotLoaded
          }
        )
        const index = checkedKeysValue.findIndex((key) => key === option.value)
        if (~index) {
          const checkedKeyToBeRemoved = checkedKeysValue[index]
          const checkOptionToBeRemoved = getOptionsByKeys([
            checkedKeyToBeRemoved
          ])[0]
          if (props.checkable) {
            const { checkedKeys } = treeMate.uncheck(
              option.value,
              checkedKeysValue,
              {
                checkStrategy: props.checkStrategy,
                cascade: mergedCascadeRef.value,
                allowNotLoaded: props.allowCheckingNotLoaded
              }
            )
            doUpdateValue(checkedKeys, getOptionsByKeys(checkedKeys), {
              node: checkOptionToBeRemoved,
              action: 'delete'
            })
          } else {
            const nextValue = Array.from(checkedKeysValue)
            nextValue.splice(index, 1)
            doUpdateValue(nextValue, getOptionsByKeys(nextValue), {
              node: checkOptionToBeRemoved,
              action: 'delete'
            })
          }
        }
      }
    }
    function handlePatternInput (e: InputEvent): void {
      const { value } = e.target as unknown as HTMLInputElement
      patternRef.value = value
    }
    function treeHandleKeydown (e: KeyboardEvent): void {
      const { value: treeInst } = treeInstRef
      if (treeInst) {
        treeInst.handleKeydown(e)
      }
    }
    function handleKeydown (e: KeyboardEvent): void {
      if (e.key === 'Enter') {
        if (mergedShowRef.value) {
          treeHandleKeydown(e)
          if (!props.multiple) {
            closeMenu()
            focusSelection()
          }
        } else {
          openMenu()
        }
        e.preventDefault()
      } else if (e.key === 'Escape') {
        if (mergedShowRef.value) {
          markEventEffectPerformed(e)
          closeMenu()
          focusSelection()
        }
      } else {
        if (mergedShowRef.value) {
          treeHandleKeydown(e)
        } else if (e.key === 'ArrowDown') {
          openMenu()
        }
      }
    }
    function handleTabOut (): void {
      closeMenu()
      focusSelection()
    }
    function handleMenuMousedown (e: MouseEvent): void {
      // If there's an action slot later, we need to check if mousedown happens
      // in action panel
      if (!happensIn(e, 'action')) e.preventDefault()
    }
    const selectionRenderTagRef = computed(() => {
      const { renderTag } = props
      if (!renderTag) return undefined
      return function selectionRenderTag ({
        option,
        handleClose
      }: {
        option: SelectOption
        handleClose: () => void
      }): VNodeChild {
        const { value } = option
        if (value !== undefined) {
          const treeOption = dataTreeMateRef.value.getNode(value)
          if (treeOption) {
            return renderTag({ option: treeOption.rawNode, handleClose })
          }
        }
        return value
      }
    })

    provide(treeSelectInjectionKey, {
      pendingNodeKeyRef,
      dataTreeMate: dataTreeMateRef
    })

    function handleTriggerOrMenuResize (): void {
      if (!mergedShowRef.value) return
      followerInstRef.value?.syncPosition()
    }

    useOnResize(menuElRef, handleTriggerOrMenuResize)

    const mergedCheckStrategyRef = useMergedCheckStrategy(props)
    const exposedCheckedStatusRef = computed(() => {
      if (props.checkable) {
        const mergedValue = mergedValueRef.value
        if (props.multiple && Array.isArray(mergedValue)) {
          return dataTreeMateRef.value.getCheckedKeys(mergedValue, {
            cascade: props.cascade,
            checkStrategy: mergedCheckStrategyRef.value,
            allowNotLoaded: props.allowCheckingNotLoaded
          })
        } else {
          return {
            checkedKeys:
              Array.isArray(mergedValue) || mergedValue === null
                ? []
                : [mergedValue],
            indeterminateKeys: []
          }
        }
      }
      return {
        checkedKeys: [],
        indeterminateKeys: []
      }
    })

    const exposedMethods: TreeSelectInst = {
      getCheckedData: () => {
        const { checkedKeys } = exposedCheckedStatusRef.value
        return { keys: checkedKeys, options: getOptionsByKeys(checkedKeys) }
      },
      getIndeterminateData: () => {
        const { indeterminateKeys } = exposedCheckedStatusRef.value
        return {
          keys: indeterminateKeys,
          options: getOptionsByKeys(indeterminateKeys)
        }
      },
      focus: () => triggerInstRef.value?.focus(),
      blur: () => triggerInstRef.value?.blur()
    }

    const themeRef = useTheme(
      'TreeSelect',
      '-tree-select',
      style,
      treeSelectLight,
      props,
      mergedClsPrefixRef
    )

    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: {
          menuBoxShadow,
          menuBorderRadius,
          menuColor,
          menuHeight,
          actionPadding,
          actionDividerColor,
          actionTextColor
        }
      } = themeRef.value
      return {
        '--n-menu-box-shadow': menuBoxShadow,
        '--n-menu-border-radius': menuBorderRadius,
        '--n-menu-color': menuColor,
        '--n-menu-height': menuHeight,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-action-padding': actionPadding,
        '--n-action-text-color': actionTextColor,
        '--n-action-divider-color': actionDividerColor
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('tree-select', undefined, cssVarsRef, props)
      : undefined

    return {
      ...exposedMethods,
      menuElRef,
      mergedStatus: mergedStatusRef,
      triggerInstRef,
      followerInstRef,
      treeInstRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue: mergedValueRef,
      mergedShow: mergedShowRef,
      namespace: namespaceRef,
      adjustedTo: useAdjustedTo(props),
      isMounted: useIsMounted(),
      focused: focusedRef,
      menuPadding: menuPaddingRef,
      mergedPlaceholder: mergedPlaceholderRef,
      mergedExpandedKeys: mergedExpandedKeysRef,
      treeSelectedKeys: treeSelectedKeysRef,
      treeCheckedKeys: treeCheckedKeysRef,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      selectedOption: selectedOptionRef,
      selectedOptions: selectedOptionsRef,
      pattern: patternRef,
      pendingNodeKey: pendingNodeKeyRef,
      mergedCascade: mergedCascadeRef,
      mergedFilter: mergedFilterRef,
      selectionRenderTag: selectionRenderTagRef,
      handleTriggerOrMenuResize,
      doUpdateExpandedKeys,
      handleMenuLeave,
      handleTriggerClick,
      handleMenuClickoutside,
      handleUpdateCheckedKeys,
      handleUpdateIndeterminateKeys,
      handleTriggerFocus,
      handleTriggerBlur,
      handleMenuFocusin,
      handleMenuFocusout,
      handleClear,
      handleDeleteOption,
      handlePatternInput,
      handleKeydown,
      handleTabOut,
      handleMenuMousedown,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const { mergedTheme, mergedClsPrefix, $slots } = this
    return (
      <div class={`${mergedClsPrefix}-tree-select`}>
        <VBinder>
          {{
            default: () => [
              <VTarget>
                {{
                  default: () => (
                    <NInternalSelection
                      ref="triggerInstRef"
                      onResize={this.handleTriggerOrMenuResize}
                      status={this.mergedStatus}
                      focused={this.focused}
                      clsPrefix={mergedClsPrefix}
                      theme={mergedTheme.peers.InternalSelection}
                      themeOverrides={
                        mergedTheme.peerOverrides.InternalSelection
                      }
                      renderTag={this.selectionRenderTag}
                      selectedOption={this.selectedOption}
                      selectedOptions={this.selectedOptions}
                      size={this.mergedSize}
                      bordered={this.bordered}
                      placeholder={this.mergedPlaceholder}
                      disabled={this.mergedDisabled}
                      active={this.mergedShow}
                      loading={this.loading}
                      multiple={this.multiple}
                      maxTagCount={this.maxTagCount}
                      showArrow={true}
                      filterable={this.filterable}
                      clearable={this.clearable}
                      pattern={this.pattern}
                      onPatternInput={this.handlePatternInput}
                      onClear={this.handleClear}
                      onClick={this.handleTriggerClick}
                      onFocus={this.handleTriggerFocus}
                      onBlur={this.handleTriggerBlur}
                      onDeleteOption={this.handleDeleteOption}
                      onKeydown={this.handleKeydown}
                    >
                      {{
                        arrow: () => [this.$slots.arrow?.()]
                      }}
                    </NInternalSelection>
                  )
                }}
              </VTarget>,
              <VFollower
                ref="followerInstRef"
                show={this.mergedShow}
                placement={this.placement}
                to={this.adjustedTo}
                teleportDisabled={this.adjustedTo === useAdjustedTo.tdkey}
                containerClass={this.namespace}
                width={this.consistentMenuWidth ? 'target' : undefined}
                minWidth="target"
              >
                {{
                  default: () => (
                    <Transition
                      name="fade-in-scale-up-transition"
                      appear={this.isMounted}
                      onLeave={this.handleMenuLeave}
                    >
                      {{
                        default: () => {
                          if (!this.mergedShow) return null
                          const {
                            mergedClsPrefix,
                            checkable,
                            multiple,
                            menuProps,
                            options
                          } = this
                          this.onRender?.()
                          return withDirectives(
                            <div
                              {...menuProps}
                              class={[
                                `${mergedClsPrefix}-tree-select-menu`,
                                menuProps?.class,
                                this.themeClass
                              ]}
                              ref="menuElRef"
                              style={[
                                menuProps?.style || '',
                                this.cssVars as CSSProperties
                              ]}
                              tabindex={0}
                              onMousedown={this.handleMenuMousedown}
                              onKeydown={this.handleKeydown}
                              onFocusin={this.handleMenuFocusin}
                              onFocusout={this.handleMenuFocusout}
                            >
                              <NTree
                                ref="treeInstRef"
                                blockLine
                                allowCheckingNotLoaded={
                                  this.allowCheckingNotLoaded
                                }
                                showIrrelevantNodes={false}
                                animated={false}
                                pattern={this.pattern}
                                filter={this.mergedFilter}
                                data={options}
                                cancelable={multiple}
                                labelField={this.labelField}
                                keyField={this.keyField}
                                disabledField={this.disabledField}
                                childrenField={this.childrenField}
                                theme={mergedTheme.peers.Tree}
                                themeOverrides={mergedTheme.peerOverrides.Tree}
                                defaultExpandAll={this.defaultExpandAll}
                                defaultExpandedKeys={this.defaultExpandedKeys}
                                expandedKeys={this.mergedExpandedKeys}
                                checkedKeys={this.treeCheckedKeys}
                                selectedKeys={this.treeSelectedKeys}
                                checkable={checkable}
                                checkStrategy={this.checkStrategy}
                                cascade={this.mergedCascade}
                                leafOnly={this.leafOnly}
                                multiple={this.multiple}
                                renderLabel={this.renderLabel}
                                renderPrefix={this.renderPrefix}
                                renderSuffix={this.renderSuffix}
                                renderSwitcherIcon={this.renderSwitcherIcon}
                                nodeProps={this.nodeProps}
                                virtualScroll={
                                  this.consistentMenuWidth && this.virtualScroll
                                }
                                internalTreeSelect
                                internalUnifySelectCheck
                                internalScrollable
                                internalScrollablePadding={this.menuPadding}
                                internalFocusable={false}
                                internalCheckboxFocusable={false}
                                internalRenderEmpty={() => (
                                  <div
                                    class={`${mergedClsPrefix}-tree-select-menu__empty`}
                                  >
                                    {resolveSlot($slots.empty, () => [
                                      <NEmpty
                                        theme={mergedTheme.peers.Empty}
                                        themeOverrides={
                                          mergedTheme.peerOverrides.Empty
                                        }
                                      />
                                    ])}
                                  </div>
                                )}
                                onLoad={this.onLoad}
                                onUpdateCheckedKeys={
                                  this.handleUpdateCheckedKeys
                                }
                                onUpdateIndeterminateKeys={
                                  this.handleUpdateIndeterminateKeys
                                }
                                onUpdateExpandedKeys={this.doUpdateExpandedKeys}
                              />
                              {resolveWrappedSlot($slots.action, (children) => {
                                return children ? (
                                  <div
                                    class={`${mergedClsPrefix}-tree-select-menu__action`}
                                    data-action
                                  >
                                    {children}
                                  </div>
                                ) : null
                              })}
                              <NBaseFocusDetector onFocus={this.handleTabOut} />
                            </div>,
                            [
                              [
                                clickoutside,
                                this.handleMenuClickoutside,
                                undefined as unknown as string,
                                { capture: true }
                              ]
                            ]
                          )
                        }
                      }}
                    </Transition>
                  )
                }}
              </VFollower>
            ]
          }}
        </VBinder>
      </div>
    )
  }
})
