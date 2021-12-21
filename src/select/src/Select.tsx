import {
  h,
  ref,
  computed,
  toRef,
  defineComponent,
  PropType,
  nextTick,
  watch,
  Transition,
  withDirectives,
  vShow,
  InputHTMLAttributes,
  HTMLAttributes
} from 'vue'
import { happensIn } from 'seemly'
import { createTreeMate, TreeNode } from 'treemate'
import {
  VBinder,
  VFollower,
  VTarget,
  FollowerInst,
  FollowerPlacement
} from 'vueuc'
import { useIsMounted, useMergedState, useCompitable } from 'vooks'
import { clickoutside } from 'vdirs'
import {
  RenderLabel,
  RenderOption
} from '../../_internal/select-menu/src/interface'
import { RenderTag } from '../../_internal/selection/src/interface'
import { useTheme, useConfig, useLocale, useFormItem } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { warn, call, useAdjustedTo, ExtractPublicPropTypes } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import {
  NInternalSelectMenu,
  NInternalSelection,
  InternalSelectMenuRef
} from '../../_internal'
import type { InternalSelectionInst } from '../../_internal'
import { selectLight, SelectTheme } from '../styles'
import {
  tmOptions,
  createValOptMap,
  filterOptions,
  defaultFilter
} from './utils'
import style from './styles/index.cssr'
import type {
  SelectMixedOption,
  SelectBaseOption,
  SelectGroupOption,
  SelectIgnoredOption,
  OnUpdateValue,
  OnUpdateValueImpl,
  Value,
  Size,
  ValueAtom
} from './interface'

const selectProps = {
  ...(useTheme.props as ThemeProps<SelectTheme>),
  to: useAdjustedTo.propTo,
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  clearable: Boolean,
  options: {
    type: Array as PropType<SelectMixedOption[]>,
    default: () => []
  },
  defaultValue: {
    type: [String, Number, Array] as PropType<Value | null>,
    default: null
  },
  value: [String, Number, Array] as PropType<Value | null>,
  placeholder: String,
  menuProps: Object as PropType<HTMLAttributes>,
  multiple: Boolean,
  size: String as PropType<Size>,
  filterable: Boolean,
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  remote: Boolean,
  loading: Boolean,
  filter: {
    type: Function as PropType<
    (pattern: string, option: SelectBaseOption) => boolean
    >,
    default: defaultFilter
  },
  placement: {
    type: String as PropType<FollowerPlacement>,
    default: 'bottom-start'
  },
  widthMode: {
    type: String,
    default: 'trigger'
  },
  tag: Boolean,
  onCreate: {
    type: Function as PropType<(label: string) => SelectBaseOption>,
    default: (label: string) => ({
      label: label,
      value: label
    })
  },
  fallbackOption: {
    type: [Function, Boolean] as PropType<
    ((value: string | number) => SelectBaseOption) | false
    >,
    default: () => (value: string | number) => ({
      label: String(value),
      value
    })
  },
  show: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  maxTagCount: [Number, String] as PropType<number | 'responsive'>,
  consistentMenuWidth: {
    type: Boolean,
    default: true
  },
  virtualScroll: {
    type: Boolean,
    default: true
  },
  renderLabel: Function as PropType<RenderLabel>,
  renderOption: Function as PropType<RenderOption>,
  renderTag: Function as PropType<RenderTag>,
  'onUpdate:value': [Function, Array] as PropType<
  MaybeArray<OnUpdateValue> | undefined
  >,
  inputProps: Object as PropType<InputHTMLAttributes>,
  // for jsx
  onUpdateValue: [Function, Array] as PropType<
  MaybeArray<OnUpdateValue> | undefined
  >,
  onBlur: [Function, Array] as PropType<
  MaybeArray<(e: FocusEvent) => void> | undefined
  >,
  onClear: [Function, Array] as PropType<MaybeArray<() => void> | undefined>,
  onFocus: [Function, Array] as PropType<
  MaybeArray<(e: FocusEvent) => void> | undefined
  >,
  onScroll: [Function, Array] as PropType<
  MaybeArray<(e: Event) => void> | undefined
  >,
  onSearch: [Function, Array] as PropType<
  MaybeArray<(value: string) => void> | undefined
  >,
  onUpdateShow: [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  'onUpdate:show': [Function, Array] as PropType<
  MaybeArray<(value: boolean) => void>
  >,
  /** deprecated */
  onChange: {
    type: [Function, Array] as PropType<MaybeArray<OnUpdateValue> | undefined>,
    validator: () => {
      if (__DEV__) {
        warn(
          'select',
          '`on-change` is deprecated, please use `on-update:value` instead.'
        )
      }
      return true
    },
    default: undefined
  },
  items: {
    type: Array as PropType<SelectMixedOption[] | undefined>,
    validator: () => {
      if (__DEV__) {
        warn('select', '`items` is deprecated, please use `options` instead.')
      }
      return true
    },
    default: undefined
  },
  displayDirective: {
    type: String as PropType<'if' | 'show'>,
    default: 'show'
  }
} as const

export type SelectProps = ExtractPublicPropTypes<typeof selectProps>

export default defineComponent({
  name: 'Select',
  props: selectProps,
  setup (props) {
    const { mergedClsPrefixRef, mergedBorderedRef, namespaceRef } =
      useConfig(props)
    const themeRef = useTheme(
      'Select',
      'Select',
      style,
      selectLight,
      props,
      mergedClsPrefixRef
    )
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const focusedRef = ref(false)
    const patternRef = ref('')
    const treeMateRef = computed(() =>
      createTreeMate<SelectBaseOption, SelectGroupOption, SelectIgnoredOption>(
        filteredOptionsRef.value,
        tmOptions
      )
    )
    const valOptMapRef = computed(() => createValOptMap(localOptionsRef.value))
    const uncontrolledShowRef = ref(false)
    const mergedShowRef = useMergedState(
      toRef(props, 'show'),
      uncontrolledShowRef
    )
    const triggerRef = ref<InternalSelectionInst | null>(null)
    const followerRef = ref<FollowerInst | null>(null)
    const menuRef = ref<InternalSelectMenuRef | null>(null)
    const { localeRef } = useLocale('Select')
    const localizedPlaceholderRef = computed<string>(() => {
      return props.placeholder ?? localeRef.value.placeholder
    })
    const compitableOptionsRef = useCompitable(props, ['items', 'options'])

    const createdOptionsRef = ref<SelectBaseOption[]>([])
    const beingCreatedOptionsRef = ref<SelectBaseOption[]>([])
    const memoValOptMapRef = ref(new Map<string | number, SelectBaseOption>())

    const wrappedFallbackOptionRef = computed(() => {
      const { fallbackOption } = props
      if (!fallbackOption) return false
      return (value: string | number) => {
        return Object.assign(fallbackOption(value), {
          value
        }) as SelectBaseOption
      }
    })
    const localOptionsRef = computed<SelectMixedOption[]>(() => {
      return (
        beingCreatedOptionsRef.value.concat(
          createdOptionsRef.value
        ) as SelectMixedOption[]
      ).concat(compitableOptionsRef.value)
    })
    const filteredOptionsRef = computed(() => {
      if (props.remote) {
        return compitableOptionsRef.value
      } else {
        const { value: localOptions } = localOptionsRef
        const { value: pattern } = patternRef
        if (!pattern.length || !props.filterable) {
          return localOptions
        } else {
          const { filter } = props
          return filterOptions(localOptions, filter, pattern)
        }
      }
    })
    function getMergedOptions (values: ValueAtom[]): SelectBaseOption[] {
      const remote = props.remote
      const { value: memoValOptMap } = memoValOptMapRef
      const { value: valOptMap } = valOptMapRef
      const { value: wrappedFallbackOption } = wrappedFallbackOptionRef
      const options: SelectBaseOption[] = []
      values.forEach((value) => {
        if (valOptMap.has(value)) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          options.push(valOptMap.get(value)!)
        } else if (remote && memoValOptMap.has(value)) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          options.push(memoValOptMap.get(value)!)
        } else if (wrappedFallbackOption) {
          const option = wrappedFallbackOption(value)
          if (option) {
            options.push(option)
          }
        }
      })
      return options
    }
    const selectedOptionsRef = computed(() => {
      if (props.multiple) {
        const { value: values } = mergedValueRef
        if (!Array.isArray(values)) return []
        return getMergedOptions(values)
      }
      return null
    })
    const selectedOptionRef = computed<SelectBaseOption | null>(() => {
      const { value: mergedValue } = mergedValueRef
      if (!props.multiple && !Array.isArray(mergedValue)) {
        if (mergedValue === null) return null
        return getMergedOptions([mergedValue])[0] || null
      }
      return null
    })

    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef } = formItem
    function doUpdateValue (
      value: string | number | Array<string | number> | null,
      option: SelectBaseOption | null | SelectBaseOption[]
    ): void {
      const {
        onChange,
        'onUpdate:value': _onUpdateValue,
        onUpdateValue
      } = props
      const { nTriggerFormChange, nTriggerFormInput } = formItem
      if (onChange) call(onChange as OnUpdateValueImpl, value, option)
      if (onUpdateValue) call(onUpdateValue as OnUpdateValueImpl, value, option)
      if (_onUpdateValue) {
        call(_onUpdateValue as OnUpdateValueImpl, value, option)
      }
      uncontrolledValueRef.value = value
      nTriggerFormChange()
      nTriggerFormInput()
    }
    function doBlur (e: FocusEvent): void {
      const { onBlur } = props
      const { nTriggerFormBlur } = formItem
      if (onBlur) call(onBlur, e)
      nTriggerFormBlur()
    }
    function doClear (): void {
      const { onClear } = props
      if (onClear) call(onClear)
    }
    function doFocus (e: FocusEvent): void {
      const { onFocus } = props
      const { nTriggerFormFocus } = formItem
      if (onFocus) call(onFocus, e)
      nTriggerFormFocus()
    }
    function doSearch (value: string): void {
      const { onSearch } = props
      if (onSearch) call(onSearch, value)
    }
    function doScroll (e: Event): void {
      const { onScroll } = props
      if (onScroll) call(onScroll, e)
    }
    // remote related methods
    function updateMemorizedOptions (): void {
      const { remote, multiple } = props
      if (remote) {
        const { value: memoValOptMap } = memoValOptMapRef
        if (multiple) {
          selectedOptionsRef.value?.forEach((option) => {
            memoValOptMap.set(option.value, option)
          })
        } else {
          const option = selectedOptionRef.value
          if (option) {
            memoValOptMap.set(option.value, option)
          }
        }
      }
    }
    // menu related methods
    function doUpdateShow (value: boolean): void {
      const { onUpdateShow, 'onUpdate:show': _onUpdateShow } = props
      if (onUpdateShow) call(onUpdateShow, value)
      if (_onUpdateShow) call(_onUpdateShow, value)
      uncontrolledShowRef.value = value
    }
    function openMenu (): void {
      if (!mergedDisabledRef.value) {
        patternRef.value = ''
        doUpdateShow(true)
        uncontrolledShowRef.value = true
        if (props.filterable) {
          focusSelectionInput()
        }
      }
    }
    function closeMenu (): void {
      doUpdateShow(false)
    }
    function handleMenuAfterLeave (): void {
      patternRef.value = ''
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
    function handleTriggerBlur (e: FocusEvent): void {
      if (menuRef.value?.selfRef?.contains(e.relatedTarget as any)) {
        return
      }
      focusedRef.value = false
      doBlur(e)
      // outside select, don't need to return focus
      closeMenu()
    }
    function handleTriggerFocus (e: FocusEvent): void {
      doFocus(e)
      focusedRef.value = true
    }
    function handleMenuFocus (e: FocusEvent): void {
      focusedRef.value = true
    }
    function handleMenuBlur (e: FocusEvent): void {
      if (triggerRef.value?.$el.contains(e.relatedTarget as any)) return
      focusedRef.value = false
      doBlur(e)
      // outside select, don't need to return focus
      closeMenu()
    }
    function handleMenuTabOut (): void {
      triggerRef.value?.focus()
      closeMenu()
    }
    function handleMenuClickOutside (e: MouseEvent): void {
      if (mergedShowRef.value) {
        if (!triggerRef.value?.$el.contains(e.target as Node)) {
          // outside select, don't need to return focus
          closeMenu()
        }
      }
    }
    function createClearedMultipleSelectValue (
      value: string | number | Array<string | number> | null
    ): Array<string | number> {
      if (!Array.isArray(value)) return []
      if (wrappedFallbackOptionRef.value) {
        // if option has a fallback, I can't help user to clear some unknown value
        return Array.from(value)
      } else {
        // if there's no option fallback, unappeared options are treated as invalid
        const { remote } = props
        const { value: valOptMap } = valOptMapRef
        if (remote) {
          const { value: memoValOptMap } = memoValOptMapRef
          return value.filter((v) => valOptMap.has(v) || memoValOptMap.has(v))
        } else {
          return value.filter((v) => valOptMap.has(v))
        }
      }
    }
    function handleToggleByTmNode (tmNode: TreeNode<SelectBaseOption>): void {
      handleToggleByOption(tmNode.rawNode)
    }
    function handleToggleByOption (option: SelectBaseOption): void {
      if (mergedDisabledRef.value) return
      const { tag, remote } = props
      if (tag && !remote) {
        const { value: beingCreatedOptions } = beingCreatedOptionsRef
        const beingCreatedOption = beingCreatedOptions[0] || null
        if (beingCreatedOption) {
          createdOptionsRef.value.push(beingCreatedOption)
          beingCreatedOptionsRef.value = []
        }
      }
      if (remote) {
        memoValOptMapRef.value.set(option.value, option)
      }
      if (props.multiple) {
        const changedValue = createClearedMultipleSelectValue(
          mergedValueRef.value
        )
        const index = changedValue.findIndex((value) => value === option.value)
        if (~index) {
          changedValue.splice(index, 1)
          if (tag && !remote) {
            const createdOptionIndex = getCreatedOptionIndex(option.value)
            if (~createdOptionIndex) {
              createdOptionsRef.value.splice(createdOptionIndex, 1)
              patternRef.value = ''
            }
          }
        } else {
          changedValue.push(option.value)
          patternRef.value = ''
        }
        doUpdateValue(changedValue, getMergedOptions(changedValue))
      } else {
        if (tag && !remote) {
          const createdOptionIndex = getCreatedOptionIndex(option.value)
          if (~createdOptionIndex) {
            createdOptionsRef.value = [
              createdOptionsRef.value[createdOptionIndex]
            ]
          } else {
            createdOptionsRef.value = []
          }
        }
        focusSelection()
        closeMenu()
        doUpdateValue(option.value, option)
      }
    }
    function getCreatedOptionIndex (optionValue: string | number): number {
      const createdOptions = createdOptionsRef.value
      return createdOptions.findIndex(
        (createdOption) => createdOption.value === optionValue
      )
    }
    function handlePatternInput (e: InputEvent): void {
      if (!mergedShowRef.value) {
        openMenu()
      }
      const { value } = e.target as unknown as HTMLInputElement
      patternRef.value = value
      const { tag, remote } = props
      doSearch(value)
      if (tag && !remote) {
        if (!value) {
          beingCreatedOptionsRef.value = []
          return
        }
        const optionBeingCreated = props.onCreate(value)
        if (
          compitableOptionsRef.value.some(
            (option) => option.value === optionBeingCreated.value
          ) ||
          createdOptionsRef.value.some(
            (option) => option.value === optionBeingCreated.value
          )
        ) {
          beingCreatedOptionsRef.value = []
        } else {
          beingCreatedOptionsRef.value = [optionBeingCreated]
        }
      }
    }
    function handleClear (e: MouseEvent): void {
      e.stopPropagation()
      const { multiple } = props
      if (!multiple && props.filterable) {
        closeMenu()
      }
      doClear()
      if (multiple) {
        doUpdateValue([], [])
      } else {
        doUpdateValue(null, null)
      }
    }
    function handleMenuMousedown (e: MouseEvent): void {
      if (!happensIn(e, 'action')) e.preventDefault()
    }
    // scroll events on menu
    function handleMenuScroll (e: Event): void {
      doScroll(e)
    }
    // keyboard events
    // also for menu keyup
    function handleKeyUp (e: KeyboardEvent): void {
      switch (e.code) {
        case 'Space':
          if (props.filterable) break
        // eslint-disable-next-line no-fallthrough
        case 'Enter':
        case 'NumpadEnter':
          if (mergedShowRef.value) {
            const pendingTmNode = menuRef.value?.getPendingTmNode()
            if (pendingTmNode) {
              handleToggleByTmNode(pendingTmNode)
            } else if (!props.filterable) {
              closeMenu()
              focusSelection()
            }
          } else {
            openMenu()
          }
          e.preventDefault()
          break
        case 'ArrowUp':
          if (props.loading) return
          if (mergedShowRef.value) {
            menuRef.value?.prev()
          }
          break
        case 'ArrowDown':
          if (props.loading) return
          if (mergedShowRef.value) {
            menuRef.value?.next()
          } else {
            openMenu()
          }
          break
        case 'Escape':
          closeMenu()
          triggerRef.value?.focus()
          break
      }
    }
    // also for menu
    function handleKeyDown (e: KeyboardEvent): void {
      switch (e.code) {
        case 'Space':
          if (!props.filterable) {
            e.preventDefault()
          }
          break
        case 'ArrowUp':
        case 'ArrowDown':
          e.preventDefault()
          break
      }
    }
    function focusSelection (): void {
      triggerRef.value?.focus()
    }
    function focusSelectionInput (): void {
      triggerRef.value?.focusInput()
    }
    function syncPosition (): void {
      followerRef.value?.syncPosition()
    }
    updateMemorizedOptions()
    watch(toRef(props, 'options'), updateMemorizedOptions)
    watch(filteredOptionsRef, () => {
      if (!mergedShowRef.value) return
      void nextTick(syncPosition)
    })
    watch(mergedValueRef, () => {
      if (!mergedShowRef.value) return
      void nextTick(syncPosition)
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      namespace: namespaceRef,
      treeMate: treeMateRef,
      isMounted: useIsMounted(),
      triggerRef,
      menuRef,
      pattern: patternRef,
      uncontrolledShow: uncontrolledShowRef,
      mergedShow: mergedShowRef,
      adjustedTo: useAdjustedTo(props),
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      followerRef,
      localizedPlaceholder: localizedPlaceholderRef,
      selectedOption: selectedOptionRef,
      selectedOptions: selectedOptionsRef,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      focused: focusedRef,
      handleMenuFocus,
      handleMenuBlur,
      handleMenuTabOut,
      handleTriggerClick,
      handleToggle: handleToggleByTmNode,
      handleDeleteOption: handleToggleByOption,
      handlePatternInput,
      handleClear,
      handleTriggerBlur,
      handleTriggerFocus,
      handleKeyDown,
      handleKeyUp,
      syncPosition,
      handleMenuAfterLeave,
      handleMenuClickOutside,
      handleMenuScroll,
      handleMenuKeyup: handleKeyUp,
      handleMenuKeydown: handleKeyDown,
      handleMenuMousedown,
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const {
          self: { menuBoxShadow }
        } = themeRef.value
        return {
          '--n-menu-box-shadow': menuBoxShadow
        }
      })
    }
  },
  render () {
    const { $slots, mergedClsPrefix } = this
    return (
      <div class={`${mergedClsPrefix}-select`}>
        <VBinder>
          {{
            default: () => [
              <VTarget>
                {{
                  default: () => (
                    <NInternalSelection
                      ref="triggerRef"
                      inputProps={this.inputProps}
                      clsPrefix={mergedClsPrefix}
                      showArrow={this.showArrow}
                      maxTagCount={this.maxTagCount}
                      bordered={this.mergedBordered}
                      active={this.mergedShow}
                      pattern={this.pattern}
                      placeholder={this.localizedPlaceholder}
                      selectedOption={this.selectedOption}
                      selectedOptions={this.selectedOptions}
                      multiple={this.multiple}
                      renderTag={this.renderTag}
                      renderLabel={this.renderLabel}
                      filterable={this.filterable}
                      clearable={this.clearable}
                      disabled={this.mergedDisabled}
                      size={this.mergedSize}
                      theme={this.mergedTheme.peers.InternalSelection}
                      themeOverrides={
                        this.mergedTheme.peerOverrides.InternalSelection
                      }
                      loading={this.loading}
                      focused={this.focused}
                      onClick={this.handleTriggerClick}
                      onDeleteOption={this.handleDeleteOption}
                      onPatternInput={this.handlePatternInput}
                      onClear={this.handleClear}
                      onBlur={this.handleTriggerBlur}
                      onFocus={this.handleTriggerFocus}
                      onKeydown={this.handleKeyDown}
                      onKeyup={this.handleKeyUp}
                    />
                  )
                }}
              </VTarget>,
              <VFollower
                ref="followerRef"
                show={this.mergedShow}
                to={this.adjustedTo}
                teleportDisabled={this.adjustedTo === useAdjustedTo.tdkey}
                containerClass={this.namespace}
                width={this.consistentMenuWidth ? 'target' : undefined}
                minWidth="target"
                placement={this.placement}
              >
                {{
                  default: () => (
                    <Transition
                      name="fade-in-scale-up-transition"
                      appear={this.isMounted}
                      onAfterLeave={this.handleMenuAfterLeave}
                    >
                      {{
                        default: () =>
                          (this.mergedShow ||
                            this.displayDirective === 'show') &&
                          withDirectives(
                            <NInternalSelectMenu
                              {...this.menuProps}
                              ref="menuRef"
                              virtualScroll={
                                this.consistentMenuWidth && this.virtualScroll
                              }
                              class={[
                                `${mergedClsPrefix}-select-menu`,
                                this.menuProps?.class
                              ]}
                              clsPrefix={mergedClsPrefix}
                              focusable
                              autoPending={true}
                              theme={this.mergedTheme.peers.InternalSelectMenu}
                              themeOverrides={
                                this.mergedTheme.peerOverrides
                                  .InternalSelectMenu
                              }
                              treeMate={this.treeMate}
                              multiple={this.multiple}
                              size={'medium'}
                              renderOption={this.renderOption}
                              renderLabel={this.renderLabel}
                              value={this.mergedValue}
                              style={[this.menuProps?.style, this.cssVars]}
                              onToggle={this.handleToggle}
                              onScroll={this.handleMenuScroll}
                              onFocus={this.handleMenuFocus}
                              onBlur={this.handleMenuBlur}
                              onKeyup={this.handleMenuKeyup}
                              onKeydown={this.handleMenuKeydown}
                              onTabOut={this.handleMenuTabOut}
                              onMousedown={this.handleMenuMousedown}
                              show={this.mergedShow}
                            >
                              {$slots}
                            </NInternalSelectMenu>,
                            this.displayDirective === 'show'
                              ? [
                                  [vShow, this.mergedShow],
                                  [clickoutside, this.handleMenuClickOutside]
                                ]
                              : [[clickoutside, this.handleMenuClickOutside]]
                          )
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
