import {
  h,
  ref,
  toRef,
  computed,
  defineComponent,
  Transition,
  PropType,
  mergeProps,
  renderSlot,
  VNode,
  withDirectives,
  CSSProperties
} from 'vue'
import { createTreeMate } from 'treemate'
import { VBinder, VTarget, VFollower } from 'vueuc'
import { clickoutside } from 'vdirs'
import { useIsMounted, useMergedState } from 'vooks'
import { useFormItem, useTheme, useConfig, ThemeProps } from '../../_mixins'
import { call, warn, useAdjustedTo, MaybeArray } from '../../_utils'
import { NInternalSelectMenu, InternalSelectMenuRef } from '../../_internal'

import { NInput } from '../../input'
import type {
  SelectOption,
  SelectGroupOption,
  SelectIgnoredOption
} from '../../select'
import { autoCompleteLight } from '../styles'
import type { AutoCompleteTheme } from '../styles'
import { mapAutoCompleteOptionsToSelectOptions } from './utils'
import style from './styles/index.cssr'
import {
  AutoCompleteOptions,
  OnUpdateValue,
  OnSelect,
  OnUpdateImpl
} from './interface'
import { tmOptions } from '../../select/src/utils'

export default defineComponent({
  name: 'AutoComplete',
  inheritAttrs: false,
  props: {
    ...(useTheme.props as ThemeProps<AutoCompleteTheme>),
    bordered: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined
    },
    clearable: {
      type: Boolean,
      default: undefined
    },
    defaultValue: {
      type: String as PropType<string | null>,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    value: String,
    blurAfterSelect: {
      type: Boolean,
      default: false
    },
    clearAfterSelect: {
      type: Boolean,
      default: false
    },
    size: String as PropType<'small' | 'medium' | 'large'>,
    options: {
      type: Array as PropType<AutoCompleteOptions>,
      default: () => []
    },
    zIndex: Number,
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
    onSelect: [Function, Array] as PropType<MaybeArray<OnSelect>>,
    onBlur: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
    onFocus: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
    // deprecated
    onInput: {
      type: [Function, Array] as PropType<
      MaybeArray<OnUpdateValue> | undefined
      >,
      validator: () => {
        if (__DEV__) {
          warn(
            'auto-complete',
            '`on-input` is deprecated, please use `on-update:value` instead.'
          )
        }
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const formItem = useFormItem(props)

    const triggerElRef = ref<HTMLElement | null>(null)
    const menuInstRef = ref<InternalSelectMenuRef | null>(null)

    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const canBeActivatedRef = ref(false)
    const isComposingRef = ref(false)

    const themeRef = useTheme(
      'AutoComplete',
      'AutoComplete',
      style,
      autoCompleteLight,
      props
    )
    const selectOptionsRef = computed(() => {
      return mapAutoCompleteOptionsToSelectOptions(props.options)
    })
    const activeRef = computed(() => {
      return (
        !!mergedValueRef.value &&
        canBeActivatedRef.value &&
        !!selectOptionsRef.value.length
      )
    })
    const treeMateRef = computed(() =>
      createTreeMate<SelectOption, SelectGroupOption, SelectIgnoredOption>(
        selectOptionsRef.value,
        tmOptions
      )
    )
    function doUpdateValue (value: string | null): void {
      const { 'onUpdate:value': onUpdateValue, onInput } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (onUpdateValue) call(onUpdateValue as OnUpdateImpl, value)
      if (onInput) call(onInput as OnUpdateImpl, value)
      uncontrolledValueRef.value = value
      nTriggerFormInput()
      nTriggerFormChange()
    }
    function doSelect (value: string | number): void {
      const { onSelect } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (onSelect) call(onSelect, value)
      nTriggerFormInput()
      nTriggerFormChange()
    }
    function doBlur (e: FocusEvent): void {
      const { onBlur } = props
      const { nTriggerFormBlur } = formItem
      if (onBlur) call(onBlur, e)
      nTriggerFormBlur()
    }
    function doFocus (e: FocusEvent): void {
      const { onFocus } = props
      const { nTriggerFormFocus } = formItem
      if (onFocus) call(onFocus, e)
      nTriggerFormFocus()
    }
    function handleCompositionStart (): void {
      isComposingRef.value = true
    }
    function handleCompositionEnd (): void {
      window.setTimeout(() => {
        isComposingRef.value = false
      }, 0)
    }
    function handleKeyDown (e: KeyboardEvent): void {
      switch (e.code) {
        case 'Enter':
          if (!isComposingRef.value) {
            const pendingOptionData = menuInstRef.value?.getPendingOption()
            if (pendingOptionData) {
              select(pendingOptionData)
              e.preventDefault()
            }
          }
          break
        case 'ArrowDown':
          menuInstRef.value?.next()
          break
        case 'ArrowUp':
          menuInstRef.value?.prev()
          break
      }
    }
    function select (option: SelectOption): void {
      if (option) {
        if (props.clearAfterSelect) {
          doUpdateValue(null)
        } else {
          doUpdateValue(option.label)
        }
        doSelect(option.value)
        canBeActivatedRef.value = false
        if (props.blurAfterSelect) {
          blur()
        }
      }
    }
    function handleClear (): void {
      doUpdateValue(null)
    }
    function handleFocus (e: FocusEvent): void {
      canBeActivatedRef.value = true
      doFocus(e)
    }
    function handleBlur (e: FocusEvent): void {
      canBeActivatedRef.value = false
      doBlur(e)
    }
    function handleInput (value: string): void {
      canBeActivatedRef.value = true
      doUpdateValue(value)
    }
    function handleToggleOption (option: SelectOption): void {
      select(option)
    }
    function handleClickOutsideMenu (e: MouseEvent): void {
      if (!triggerElRef.value?.contains(e.target as Node)) {
        canBeActivatedRef.value = false
      }
    }
    function blur (): void {
      if (triggerElRef.value?.contains(document.activeElement)) {
        ;(document.activeElement as HTMLElement)?.blur()
      }
    }
    return {
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      isMounted: useIsMounted(),
      adjustedTo: useAdjustedTo(props),
      menuInstRef,
      triggerElRef,
      treeMate: treeMateRef,
      mergedSize: formItem.mergedSize,
      active: activeRef,
      handleClear,
      handleFocus,
      handleBlur,
      handleInput,
      handleToggleOption,
      handleClickOutsideMenu,
      handleCompositionStart,
      handleCompositionEnd,
      handleKeyDown,
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut
        }
      }),
      ...useConfig(props)
    }
  },
  render () {
    return (
      <VBinder>
        {{
          default: () => [
            <VTarget>
              {{
                default: () =>
                  h(
                    'div',
                    mergeProps(this.$attrs, {
                      class: 'n-auto-complete',
                      ref: 'triggerElRef',
                      onKeydown: this.handleKeyDown,
                      onCompositionstart: this.handleCompositionStart,
                      onCompositionend: this.handleCompositionEnd
                    }),
                    renderSlot(
                      this.$slots,
                      'default',
                      {
                        handleInput: this.handleInput,
                        handleFocus: this.handleFocus,
                        handleBlur: this.handleBlur,
                        value: this.mergedValue
                      },
                      () => [
                        (
                          <NInput
                            theme={this.mergedTheme.peers.Input}
                            themeOverrides={
                              this.mergedTheme.peerOverrides.Input
                            }
                            bordered={this.mergedBordered}
                            value={this.mergedValue}
                            placeholder={this.placeholder}
                            size={this.mergedSize}
                            disabled={this.disabled}
                            clearable={this.clearable}
                            onClear={this.handleClear}
                            onFocus={this.handleFocus}
                            onUpdateValue={this.handleInput}
                            onBlur={this.handleBlur}
                          />
                        ) as VNode
                      ]
                    )
                  )
              }}
            </VTarget>,
            <VFollower
              show={this.active}
              to={this.adjustedTo}
              containerClass={this.namespace}
              zIndex={this.zIndex}
              placement="bottom-start"
              width="target"
            >
              {{
                default: () => (
                  <Transition
                    name="n-fade-in-scale-up-transition"
                    appear={this.isMounted}
                  >
                    {{
                      default: () =>
                        this.active
                          ? withDirectives(
                            (
                              <NInternalSelectMenu
                                ref="menuInstRef"
                                theme={
                                  this.mergedTheme.peers.InternalSelectMenu
                                }
                                themeOverrides={
                                  this.mergedTheme.peerOverrides
                                    .InternalSelectMenu
                                }
                                auto-pending
                                class="n-auto-complete-menu"
                                style={this.cssVars as CSSProperties}
                                treeMate={this.treeMate}
                                multiple={false}
                                size="medium"
                                onMenuToggleOption={this.handleToggleOption}
                              />
                            ) as VNode,
                            [[clickoutside, this.handleClickOutsideMenu]]
                          )
                          : null
                    }}
                  </Transition>
                )
              }}
            </VFollower>
          ]
        }}
      </VBinder>
    )
  }
})
