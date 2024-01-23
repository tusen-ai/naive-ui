import {
  h,
  ref,
  toRef,
  computed,
  defineComponent,
  Transition,
  type PropType,
  withDirectives,
  type CSSProperties,
  type InputHTMLAttributes,
  watchEffect,
  type HTMLAttributes
} from 'vue'
import { createTreeMate, type TreeNode } from 'treemate'
import { VBinder, VTarget, VFollower, type FollowerPlacement } from 'vueuc'
import { clickoutside } from 'vdirs'
import { useIsMounted, useMergedState } from 'vooks'
import { getPreciseEventTarget } from 'seemly'
import type {
  RenderOption,
  RenderLabel
} from '../../_internal/select-menu/src/interface'
import { createTmOptions } from '../../select/src/utils'
import type { FormValidationStatus } from '../../form/src/interface'
import type {
  SelectBaseOption,
  SelectGroupOption,
  SelectIgnoredOption
} from '../../select/src/interface'
import { useFormItem, useTheme, useConfig, useThemeClass } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import {
  call,
  useAdjustedTo,
  type MaybeArray,
  getFirstSlotVNode,
  warnOnce,
  type ExtractPublicPropTypes
} from '../../_utils'
import {
  NInternalSelectMenu,
  type InternalSelectMenuRef
} from '../../_internal'
import type { InputInst } from '../../input'
import { NInput } from '../../input'
import { autoCompleteLight } from '../styles'
import type { AutoCompleteTheme } from '../styles'
import { mapAutoCompleteOptionsToSelectOptions } from './utils'
import type {
  AutoCompleteOptions,
  OnUpdateValue,
  OnSelect,
  OnSelectImpl,
  OnUpdateImpl,
  AutoCompleteOption,
  AutoCompleteInst
} from './interface'
import style from './styles/index.cssr'

export const autoCompleteProps = {
  ...(useTheme.props as ThemeProps<AutoCompleteTheme>),
  to: useAdjustedTo.propTo,
  menuProps: Object as PropType<HTMLAttributes>,
  append: Boolean,
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
  loading: {
    type: Boolean,
    default: undefined
  },
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  placeholder: String,
  placement: {
    type: String as PropType<FollowerPlacement>,
    default: 'bottom-start'
  },
  value: String,
  blurAfterSelect: Boolean,
  clearAfterSelect: Boolean,
  getShow: Function as PropType<(inputValue: string) => boolean>,
  showEmpty: Boolean,
  inputProps: Object as PropType<InputHTMLAttributes>,
  renderOption: Function as PropType<RenderOption>,
  renderLabel: Function as PropType<RenderLabel>,
  size: String as PropType<'small' | 'medium' | 'large'>,
  options: {
    type: Array as PropType<AutoCompleteOptions>,
    default: () => []
  },
  zIndex: Number,
  status: String as PropType<FormValidationStatus>,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onSelect: [Function, Array] as PropType<MaybeArray<OnSelect>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
  onFocus: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
  // deprecated
  onInput: [Function, Array] as PropType<MaybeArray<OnUpdateValue> | undefined>
} as const

export type AutoCompleteProps = ExtractPublicPropTypes<typeof autoCompleteProps>

export default defineComponent({
  name: 'AutoComplete',
  props: autoCompleteProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.onInput !== undefined) {
          warnOnce(
            'auto-complete',
            '`on-input` is deprecated, please use `on-update:value` instead.'
          )
        }
      })
    }
    const {
      mergedBorderedRef,
      namespaceRef,
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props)
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef, mergedStatusRef } = formItem
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
      '-auto-complete',
      style,
      autoCompleteLight,
      props,
      mergedClsPrefixRef
    )
    const selectOptionsRef = computed(() => {
      return mapAutoCompleteOptionsToSelectOptions(props.options)
    })
    const mergedShowOptionsRef = computed(() => {
      const { getShow } = props
      if (getShow) {
        return getShow(mergedValueRef.value || '')
      }
      return !!mergedValueRef.value
    })
    const activeRef = computed(() => {
      return (
        mergedShowOptionsRef.value &&
        canBeActivatedRef.value &&
        (props.showEmpty ? true : !!selectOptionsRef.value.length)
      )
    })
    const treeMateRef = computed(() =>
      createTreeMate<SelectBaseOption, SelectGroupOption, SelectIgnoredOption>(
        selectOptionsRef.value,
        createTmOptions('value', 'children')
      )
    )
    function doUpdateValue (value: string | null): void {
      const { 'onUpdate:value': _onUpdateValue, onUpdateValue, onInput } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (onUpdateValue) call(onUpdateValue as OnUpdateImpl, value)
      if (_onUpdateValue) call(_onUpdateValue as OnUpdateImpl, value)
      if (onInput) call(onInput as OnUpdateImpl, value)
      uncontrolledValueRef.value = value
      nTriggerFormInput()
      nTriggerFormChange()
    }
    function doSelect (value: string | number): void {
      const { onSelect } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (onSelect) call(onSelect as OnSelectImpl, value)
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
      switch (e.key) {
        case 'Enter':
          if (!isComposingRef.value) {
            const pendingOptionTmNode = menuInstRef.value?.getPendingTmNode()
            if (pendingOptionTmNode) {
              select(pendingOptionTmNode.rawNode as AutoCompleteOption)
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
    function select (option: AutoCompleteOption): void {
      if (option?.value !== undefined) {
        doSelect(option.value)
        if (props.clearAfterSelect) {
          doUpdateValue(null)
        } else if (option.label !== undefined) {
          doUpdateValue(
            props.append
              ? `${mergedValueRef.value}${option.label}`
              : option.label
          )
        }
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
    function handleToggle (option: TreeNode<SelectBaseOption>): void {
      select(option.rawNode as AutoCompleteOption)
    }
    function handleClickOutsideMenu (e: MouseEvent): void {
      if (
        !triggerElRef.value?.contains(getPreciseEventTarget(e) as Node | null)
      ) {
        canBeActivatedRef.value = false
      }
    }
    function blur (): void {
      if (triggerElRef.value?.contains(document.activeElement)) {
        ;(document.activeElement as HTMLElement)?.blur()
      }
    }
    const cssVarsRef = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: { menuBoxShadow }
      } = themeRef.value
      return {
        '--n-menu-box-shadow': menuBoxShadow,
        '--n-bezier': cubicBezierEaseInOut
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('auto-complete', undefined, cssVarsRef, props)
      : undefined
    const inputInstRef = ref<InputInst | null>(null)
    const exposedMethods: AutoCompleteInst = {
      focus: () => {
        inputInstRef.value?.focus()
      },
      blur: () => {
        inputInstRef.value?.blur()
      }
    }
    return {
      focus: exposedMethods.focus,
      blur: exposedMethods.blur,
      inputInstRef,
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      isMounted: useIsMounted(),
      adjustedTo: useAdjustedTo(props),
      menuInstRef,
      triggerElRef,
      treeMate: treeMateRef,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      active: activeRef,
      mergedStatus: mergedStatusRef,
      handleClear,
      handleFocus,
      handleBlur,
      handleInput,
      handleToggle,
      handleClickOutsideMenu,
      handleCompositionStart,
      handleCompositionEnd,
      handleKeyDown,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      mergedBordered: mergedBorderedRef,
      namespace: namespaceRef,
      mergedClsPrefix: mergedClsPrefixRef
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        class={`${mergedClsPrefix}-auto-complete`}
        ref="triggerElRef"
        onKeydown={this.handleKeyDown}
        onCompositionstart={this.handleCompositionStart}
        onCompositionend={this.handleCompositionEnd}
      >
        <VBinder>
          {{
            default: () => [
              <VTarget>
                {{
                  default: () => {
                    const defaultSlot = this.$slots.default
                    if (defaultSlot) {
                      return getFirstSlotVNode(this.$slots, 'default', {
                        handleInput: this.handleInput,
                        handleFocus: this.handleFocus,
                        handleBlur: this.handleBlur,
                        value: this.mergedValue
                      })
                    }
                    const { mergedTheme } = this
                    return (
                      <NInput
                        ref="inputInstRef"
                        status={this.mergedStatus}
                        theme={mergedTheme.peers.Input}
                        themeOverrides={mergedTheme.peerOverrides.Input}
                        bordered={this.mergedBordered}
                        value={this.mergedValue}
                        placeholder={this.placeholder}
                        size={this.mergedSize}
                        disabled={this.mergedDisabled}
                        clearable={this.clearable}
                        loading={this.loading}
                        inputProps={this.inputProps}
                        onClear={this.handleClear}
                        onFocus={this.handleFocus}
                        onUpdateValue={this.handleInput}
                        onBlur={this.handleBlur}
                      >
                        {{
                          suffix: () => this.$slots.suffix?.(),
                          prefix: () => this.$slots.prefix?.()
                        }}
                      </NInput>
                    )
                  }
                }}
              </VTarget>,
              <VFollower
                show={this.active}
                to={this.adjustedTo}
                containerClass={this.namespace}
                zIndex={this.zIndex}
                teleportDisabled={this.adjustedTo === useAdjustedTo.tdkey}
                placement={this.placement}
                width="target"
              >
                {{
                  default: () => (
                    <Transition
                      name="fade-in-scale-up-transition"
                      appear={this.isMounted}
                    >
                      {{
                        default: () => {
                          this.onRender?.()
                          if (!this.active) return null
                          const { menuProps } = this
                          return withDirectives(
                            <NInternalSelectMenu
                              {...(menuProps as any)}
                              clsPrefix={mergedClsPrefix}
                              ref="menuInstRef"
                              theme={this.mergedTheme.peers.InternalSelectMenu}
                              themeOverrides={
                                this.mergedTheme.peerOverrides
                                  .InternalSelectMenu
                              }
                              auto-pending
                              class={[
                                `${mergedClsPrefix}-auto-complete-menu`,
                                this.themeClass,
                                menuProps?.class
                              ]}
                              style={[
                                menuProps?.style,
                                this.cssVars as CSSProperties
                              ]}
                              treeMate={this.treeMate}
                              multiple={false}
                              renderLabel={this.renderLabel}
                              renderOption={this.renderOption}
                              size="medium"
                              onToggle={this.handleToggle}
                            >
                              {{ empty: () => this.$slots.empty?.() }}
                            </NInternalSelectMenu>,
                            [
                              [
                                clickoutside,
                                this.handleClickOutsideMenu,
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
