/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  h,
  defineComponent,
  Fragment,
  PropType,
  ref,
  computed,
  watch,
  toRef,
  nextTick,
  CSSProperties,
  watchEffect,
  onMounted,
  InputHTMLAttributes,
  VNode
} from 'vue'
import { VOverflow, VOverflowInst } from 'vueuc'
import type {
  RenderLabel,
  RenderLabelImpl
} from '../../select-menu/src/interface'
import type { SelectBaseOption } from '../../../select/src/interface'
import type { FormValidationStatus } from '../../../form/src/interface'
import type { TagRef } from '../../../tag/src/Tag'
import { NPopover } from '../../../popover'
import { NTag } from '../../../tag'
import { useThemeClass, useTheme } from '../../../_mixins'
import type { ThemeProps } from '../../../_mixins'
import {
  createKey,
  getTitleAttribute,
  render,
  useOnResize,
  Wrapper
} from '../../../_utils'
import Suffix from '../../suffix'
import { internalSelectionLight } from '../styles'
import type { InternalSelectionTheme } from '../styles'
import type { RenderTag } from './interface'
import style from './styles/index.cssr'

export interface InternalSelectionInst {
  isComposing: boolean
  focus: () => void
  focusInput: () => void
  blur: () => void
  $el: HTMLElement
}

export default defineComponent({
  name: 'InternalSelection',
  props: {
    ...(useTheme.props as ThemeProps<InternalSelectionTheme>),
    clsPrefix: {
      type: String,
      required: true
    },
    bordered: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined
    },
    active: Boolean,
    pattern: {
      type: String,
      default: ''
    },
    placeholder: String,
    selectedOption: {
      type: Object as PropType<SelectBaseOption | null>,
      default: null
    },
    selectedOptions: {
      type: Array as PropType<SelectBaseOption[] | null>,
      default: null
    },
    labelField: { type: String, default: 'label' },
    valueField: {
      type: String,
      default: 'value'
    },
    multiple: Boolean,
    filterable: Boolean,
    clearable: Boolean,
    disabled: Boolean,
    size: {
      type: String as PropType<'tiny' | 'small' | 'medium' | 'large'>,
      default: 'medium'
    },
    loading: Boolean,
    autofocus: Boolean,
    showArrow: {
      type: Boolean,
      default: true
    },
    inputProps: Object as PropType<InputHTMLAttributes>,
    focused: Boolean,
    renderTag: Function as PropType<RenderTag>,
    onKeydown: Function as PropType<(e: KeyboardEvent) => void>,
    onClick: Function as PropType<(e: MouseEvent) => void>,
    onBlur: Function as PropType<(e: FocusEvent) => void>,
    onFocus: Function as PropType<(e: FocusEvent) => void>,
    onDeleteOption: Function as PropType<(option: SelectBaseOption) => void>,
    maxTagCount: [String, Number] as PropType<number | 'responsive'>,
    onClear: Function as PropType<(e: MouseEvent) => void>,
    onPatternInput: Function as PropType<(e: InputEvent) => void>,
    onPatternFocus: Function as PropType<(e: FocusEvent) => void>,
    onPatternBlur: Function as PropType<(e: FocusEvent) => void>,
    renderLabel: Function as PropType<RenderLabel>,
    status: String as PropType<FormValidationStatus>,
    inlineThemeDisabled: Boolean,
    ignoreComposition: { type: Boolean, default: true },
    onResize: Function as PropType<() => void>
  },
  setup (props) {
    const patternInputMirrorRef = ref<HTMLElement | null>(null)
    const patternInputRef = ref<HTMLElement | null>(null)
    const selfRef = ref<HTMLElement | null>(null)
    const multipleElRef = ref<HTMLElement | null>(null)
    const singleElRef = ref<HTMLElement | null>(null)
    const patternInputWrapperRef = ref<HTMLElement | null>(null)
    const counterRef = ref<TagRef | null>(null)
    const counterWrapperRef = ref<HTMLElement | null>(null)
    const overflowRef = ref<VOverflowInst | null>(null)
    const inputTagElRef = ref<HTMLElement | null>(null)

    const showTagsPopoverRef = ref<boolean>(false)
    const patternInputFocusedRef = ref(false)
    const hoverRef = ref(false)
    const themeRef = useTheme(
      'InternalSelection',
      '-internal-selection',
      style,
      internalSelectionLight,
      props,
      toRef(props, 'clsPrefix')
    )
    const mergedClearableRef = computed(() => {
      return (
        props.clearable && !props.disabled && (hoverRef.value || props.active)
      )
    })
    const filterablePlaceholderRef = computed(() => {
      return props.selectedOption
        ? props.renderTag
          ? props.renderTag({
            option: props.selectedOption,
            handleClose: () => {}
          })
          : props.renderLabel
            ? props.renderLabel(props.selectedOption as never, true)
            : render(
              props.selectedOption[props.labelField],
              props.selectedOption,
              true
            )
        : props.placeholder
    })
    const labelRef = computed(() => {
      const option = props.selectedOption
      if (!option) return undefined
      return option[props.labelField]
    })
    const selectedRef = computed(() => {
      if (props.multiple) {
        return !!(
          Array.isArray(props.selectedOptions) && props.selectedOptions.length
        )
      } else {
        return props.selectedOption !== null
      }
    })
    function syncMirrorWidth (): void {
      const { value: patternInputMirrorEl } = patternInputMirrorRef
      if (patternInputMirrorEl) {
        const { value: patternInputEl } = patternInputRef
        if (patternInputEl) {
          patternInputEl.style.width = `${patternInputMirrorEl.offsetWidth}px`
          if (props.maxTagCount !== 'responsive') {
            overflowRef.value?.sync()
          }
        }
      }
    }
    function hideInputTag (): void {
      const { value: inputTagEl } = inputTagElRef
      if (inputTagEl) inputTagEl.style.display = 'none'
    }
    function showInputTag (): void {
      const { value: inputTagEl } = inputTagElRef
      if (inputTagEl) inputTagEl.style.display = 'inline-block'
    }
    watch(toRef(props, 'active'), (value) => {
      if (!value) hideInputTag()
    })
    watch(toRef(props, 'pattern'), () => {
      if (props.multiple) {
        void nextTick(syncMirrorWidth)
      }
    })
    function doFocus (e: FocusEvent): void {
      const { onFocus } = props
      if (onFocus) onFocus(e)
    }
    function doBlur (e: FocusEvent): void {
      const { onBlur } = props
      if (onBlur) onBlur(e)
    }
    function doDeleteOption (value: SelectBaseOption): void {
      const { onDeleteOption } = props
      if (onDeleteOption) onDeleteOption(value)
    }
    function doClear (e: MouseEvent): void {
      const { onClear } = props
      if (onClear) onClear(e)
    }
    function doPatternInput (value: InputEvent): void {
      const { onPatternInput } = props
      if (onPatternInput) onPatternInput(value)
    }
    function handleFocusin (e: FocusEvent): void {
      if (
        !e.relatedTarget ||
        !selfRef.value?.contains(e.relatedTarget as Node)
      ) {
        doFocus(e)
      }
    }
    function handleFocusout (e: FocusEvent): void {
      if (selfRef.value?.contains(e.relatedTarget as Node)) return
      doBlur(e)
    }
    function handleClear (e: MouseEvent): void {
      doClear(e)
    }
    function handleMouseEnter (): void {
      hoverRef.value = true
    }
    function handleMouseLeave (): void {
      hoverRef.value = false
    }
    function handleMouseDown (e: MouseEvent): void {
      if (!props.active || !props.filterable) return
      if (e.target === patternInputRef.value) return
      e.preventDefault()
    }
    function handleDeleteOption (option: SelectBaseOption): void {
      doDeleteOption(option)
    }
    function handlePatternKeyDown (e: KeyboardEvent): void {
      if (e.key === 'Backspace' && !isComposingRef.value) {
        if (!props.pattern.length) {
          const { selectedOptions } = props
          if (selectedOptions?.length) {
            handleDeleteOption(selectedOptions[selectedOptions.length - 1])
          }
        }
      }
    }
    const isComposingRef = ref(false)
    // the composition end is later than its input so we can cached the event
    // and return the input event
    let cachedInputEvent: InputEvent | null = null
    function handlePatternInputInput (e: InputEvent): void {
      // we should sync mirror width here
      const { value: patternInputMirrorEl } = patternInputMirrorRef
      if (patternInputMirrorEl) {
        const inputText: string = (e.target as any).value
        patternInputMirrorEl.textContent = inputText
        syncMirrorWidth()
      }
      if (props.ignoreComposition) {
        if (!isComposingRef.value) {
          doPatternInput(e)
        } else {
          cachedInputEvent = e
        }
      } else {
        doPatternInput(e)
      }
    }
    function handleCompositionStart (): void {
      isComposingRef.value = true
    }
    function handleCompositionEnd (): void {
      isComposingRef.value = false
      if (props.ignoreComposition) {
        doPatternInput(cachedInputEvent!)
      }
      cachedInputEvent = null
    }
    function handlePatternInputFocus (e: FocusEvent): void {
      patternInputFocusedRef.value = true
      props.onPatternFocus?.(e)
    }
    function handlePatternInputBlur (e: FocusEvent): void {
      patternInputFocusedRef.value = false
      props.onPatternBlur?.(e)
    }
    function blur (): void {
      if (props.filterable) {
        patternInputFocusedRef.value = false
        patternInputWrapperRef.value?.blur()
        patternInputRef.value?.blur()
      } else if (props.multiple) {
        const { value: multipleEl } = multipleElRef
        multipleEl?.blur()
      } else {
        const { value: singleEl } = singleElRef
        singleEl?.blur()
      }
    }
    function focus (): void {
      if (props.filterable) {
        patternInputFocusedRef.value = false
        patternInputWrapperRef.value?.focus()
      } else if (props.multiple) {
        multipleElRef.value?.focus()
      } else {
        singleElRef.value?.focus()
      }
    }
    function focusInput (): void {
      const { value: patternInputEl } = patternInputRef
      if (patternInputEl) {
        showInputTag()
        patternInputEl.focus()
      }
    }
    function blurInput (): void {
      const { value: patternInputEl } = patternInputRef
      if (patternInputEl) {
        patternInputEl.blur()
      }
    }
    function updateCounter (count: number): void {
      const { value } = counterRef
      if (value) {
        value.setTextContent(`+${count}`)
      }
    }
    function getCounter (): HTMLElement | null {
      const { value } = counterWrapperRef
      return value
    }
    function getTail (): HTMLElement | null {
      return patternInputRef.value
    }
    let enterTimerId: number | null = null
    function clearEnterTimer (): void {
      if (enterTimerId !== null) window.clearTimeout(enterTimerId)
    }
    function handleMouseEnterCounter (): void {
      if (props.disabled || props.active) return
      clearEnterTimer()
      enterTimerId = window.setTimeout(() => {
        if (selectedRef.value) {
          showTagsPopoverRef.value = true
        }
      }, 100)
    }
    function handleMouseLeaveCounter (): void {
      clearEnterTimer()
    }
    function onPopoverUpdateShow (show: boolean): void {
      if (!show) {
        clearEnterTimer()
        showTagsPopoverRef.value = false
      }
    }
    watch(selectedRef, (value) => {
      if (!value) {
        showTagsPopoverRef.value = false
      }
    })
    onMounted(() => {
      watchEffect(() => {
        const patternInputWrapperEl = patternInputWrapperRef.value
        if (!patternInputWrapperEl) return
        patternInputWrapperEl.tabIndex =
          props.disabled || patternInputFocusedRef.value ? -1 : 0
      })
    })
    useOnResize(selfRef, props.onResize)
    const { inlineThemeDisabled } = props
    const cssVarsRef = computed(() => {
      const { size } = props
      const {
        common: { cubicBezierEaseInOut },
        self: {
          borderRadius,
          color,
          placeholderColor,
          textColor,
          paddingSingle,
          paddingMultiple,
          caretColor,
          colorDisabled,
          textColorDisabled,
          placeholderColorDisabled,
          colorActive,
          boxShadowFocus,
          boxShadowActive,
          boxShadowHover,
          border,
          borderFocus,
          borderHover,
          borderActive,
          arrowColor,
          arrowColorDisabled,
          loadingColor,
          // form warning
          colorActiveWarning,
          boxShadowFocusWarning,
          boxShadowActiveWarning,
          boxShadowHoverWarning,
          borderWarning,
          borderFocusWarning,
          borderHoverWarning,
          borderActiveWarning,
          // form error
          colorActiveError,
          boxShadowFocusError,
          boxShadowActiveError,
          boxShadowHoverError,
          borderError,
          borderFocusError,
          borderHoverError,
          borderActiveError,
          // clear
          clearColor,
          clearColorHover,
          clearColorPressed,
          clearSize,
          // arrow
          arrowSize,
          [createKey('height', size)]: height,
          [createKey('fontSize', size)]: fontSize
        }
      } = themeRef.value

      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-border': border,
        '--n-border-active': borderActive,
        '--n-border-focus': borderFocus,
        '--n-border-hover': borderHover,
        '--n-border-radius': borderRadius,
        '--n-box-shadow-active': boxShadowActive,
        '--n-box-shadow-focus': boxShadowFocus,
        '--n-box-shadow-hover': boxShadowHover,
        '--n-caret-color': caretColor,
        '--n-color': color,
        '--n-color-active': colorActive,
        '--n-color-disabled': colorDisabled,
        '--n-font-size': fontSize,
        '--n-height': height,
        '--n-padding-single': paddingSingle,
        '--n-padding-multiple': paddingMultiple,
        '--n-placeholder-color': placeholderColor,
        '--n-placeholder-color-disabled': placeholderColorDisabled,
        '--n-text-color': textColor,
        '--n-text-color-disabled': textColorDisabled,
        '--n-arrow-color': arrowColor,
        '--n-arrow-color-disabled': arrowColorDisabled,
        '--n-loading-color': loadingColor,
        // form warning
        '--n-color-active-warning': colorActiveWarning,
        '--n-box-shadow-focus-warning': boxShadowFocusWarning,
        '--n-box-shadow-active-warning': boxShadowActiveWarning,
        '--n-box-shadow-hover-warning': boxShadowHoverWarning,
        '--n-border-warning': borderWarning,
        '--n-border-focus-warning': borderFocusWarning,
        '--n-border-hover-warning': borderHoverWarning,
        '--n-border-active-warning': borderActiveWarning,
        // form error
        '--n-color-active-error': colorActiveError,
        '--n-box-shadow-focus-error': boxShadowFocusError,
        '--n-box-shadow-active-error': boxShadowActiveError,
        '--n-box-shadow-hover-error': boxShadowHoverError,
        '--n-border-error': borderError,
        '--n-border-focus-error': borderFocusError,
        '--n-border-hover-error': borderHoverError,
        '--n-border-active-error': borderActiveError,
        // clear
        '--n-clear-size': clearSize,
        '--n-clear-color': clearColor,
        '--n-clear-color-hover': clearColorHover,
        '--n-clear-color-pressed': clearColorPressed,
        // arrow-size
        '--n-arrow-size': arrowSize
      }
    })
    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass(
        'internal-selection',
        computed(() => {
          return props.size[0]
        }),
        cssVarsRef,
        props
      )
      : undefined
    return {
      mergedTheme: themeRef,
      mergedClearable: mergedClearableRef,
      patternInputFocused: patternInputFocusedRef,
      filterablePlaceholder: filterablePlaceholderRef,
      label: labelRef,
      selected: selectedRef,
      showTagsPanel: showTagsPopoverRef,
      isComposing: isComposingRef,
      // dom ref
      counterRef,
      counterWrapperRef,
      patternInputMirrorRef,
      patternInputRef,
      selfRef,
      multipleElRef,
      singleElRef,
      patternInputWrapperRef,
      overflowRef,
      inputTagElRef,
      handleMouseDown,
      handleFocusin,
      handleClear,
      handleMouseEnter,
      handleMouseLeave,
      handleDeleteOption,
      handlePatternKeyDown,
      handlePatternInputInput,
      handlePatternInputBlur,
      handlePatternInputFocus,
      handleMouseEnterCounter,
      handleMouseLeaveCounter,
      handleFocusout,
      handleCompositionEnd,
      handleCompositionStart,
      onPopoverUpdateShow,
      focus,
      focusInput,
      blur,
      blurInput,
      updateCounter,
      getCounter,
      getTail,
      renderLabel: props.renderLabel as RenderLabelImpl,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender
    }
  },
  render () {
    const {
      status,
      multiple,
      size,
      disabled,
      filterable,
      maxTagCount,
      bordered,
      clsPrefix,
      onRender,
      renderTag,
      renderLabel
    } = this
    onRender?.()
    const maxTagCountResponsive = maxTagCount === 'responsive'
    const maxTagCountNumeric = typeof maxTagCount === 'number'
    const useMaxTagCount = maxTagCountResponsive || maxTagCountNumeric
    const suffix = (
      <Wrapper>
        {{
          default: () => (
            <Suffix
              clsPrefix={clsPrefix}
              loading={this.loading}
              showArrow={this.showArrow}
              showClear={this.mergedClearable && this.selected}
              onClear={this.handleClear}
            >
              {{
                default: () => this.$slots.arrow?.()
              }}
            </Suffix>
          )
        }}
      </Wrapper>
    )
    let body: JSX.Element
    if (multiple) {
      const { labelField } = this
      const createTag = (option: SelectBaseOption): JSX.Element => (
        <div
          class={`${clsPrefix}-base-selection-tag-wrapper`}
          key={option.value}
        >
          {renderTag ? (
            renderTag({
              option,
              handleClose: () => this.handleDeleteOption(option)
            })
          ) : (
            <NTag
              size={size}
              closable={!option.disabled}
              disabled={disabled}
              onClose={() => this.handleDeleteOption(option)}
              internalCloseIsButtonTag={false}
              internalCloseFocusable={false}
            >
              {{
                default: () =>
                  renderLabel
                    ? renderLabel(option, true)
                    : render(option[labelField], option, true)
              }}
            </NTag>
          )}
        </div>
      )
      const createOriginalTagNodes = (): VNode[] =>
        (maxTagCountNumeric
          ? this.selectedOptions!.slice(0, maxTagCount)
          : this.selectedOptions!
        ).map(createTag)
      const input = filterable ? (
        <div
          class={`${clsPrefix}-base-selection-input-tag`}
          ref="inputTagElRef"
          key="__input-tag__"
        >
          <input
            {...this.inputProps}
            ref="patternInputRef"
            tabindex={-1}
            disabled={disabled}
            value={this.pattern}
            autofocus={this.autofocus}
            class={`${clsPrefix}-base-selection-input-tag__input`}
            onBlur={this.handlePatternInputBlur}
            onFocus={this.handlePatternInputFocus}
            onKeydown={this.handlePatternKeyDown}
            onInput={this.handlePatternInputInput as any}
            onCompositionstart={this.handleCompositionStart}
            onCompositionend={this.handleCompositionEnd}
          />
          <span
            ref="patternInputMirrorRef"
            class={`${clsPrefix}-base-selection-input-tag__mirror`}
          >
            {this.pattern}
          </span>
        </div>
      ) : null
      // May Overflow
      const renderCounter = maxTagCountResponsive
        ? () => (
            <div
              class={`${clsPrefix}-base-selection-tag-wrapper`}
              ref="counterWrapperRef"
            >
              <NTag
                size={size}
                ref="counterRef"
                onMouseenter={this.handleMouseEnterCounter}
                onMouseleave={this.handleMouseLeaveCounter}
                disabled={disabled}
              />
            </div>
          )
        : undefined
      let counter: JSX.Element | undefined
      if (maxTagCountNumeric) {
        const rest = this.selectedOptions!.length - maxTagCount
        if (rest > 0) {
          counter = (
            <div
              class={`${clsPrefix}-base-selection-tag-wrapper`}
              key="__counter__"
            >
              <NTag
                size={size}
                ref="counterRef"
                onMouseenter={this.handleMouseEnterCounter}
                disabled={disabled}
              >
                {{
                  default: () => `+${rest}`
                }}
              </NTag>
            </div>
          )
        }
      }
      const tags = maxTagCountResponsive ? (
        filterable ? (
          <VOverflow
            ref="overflowRef"
            updateCounter={this.updateCounter}
            getCounter={this.getCounter}
            getTail={this.getTail}
            style={{
              width: '100%',
              display: 'flex',
              overflow: 'hidden'
            }}
          >
            {{
              default: createOriginalTagNodes,
              counter: renderCounter,
              tail: () => input
            }}
          </VOverflow>
        ) : (
          <VOverflow
            ref="overflowRef"
            updateCounter={this.updateCounter}
            getCounter={this.getCounter}
            style={{
              width: '100%',
              display: 'flex',
              overflow: 'hidden'
            }}
          >
            {{
              default: createOriginalTagNodes,
              counter: renderCounter
            }}
          </VOverflow>
        )
      ) : maxTagCountNumeric ? (
        createOriginalTagNodes().concat(counter as JSX.Element)
      ) : (
        createOriginalTagNodes()
      )
      const renderPopover = useMaxTagCount
        ? (): JSX.Element => (
            <div class={`${clsPrefix}-base-selection-popover`}>
              {maxTagCountResponsive
                ? createOriginalTagNodes()
                : this.selectedOptions!.map(createTag)}
            </div>
          )
        : undefined
      const popoverProps = useMaxTagCount
        ? ({
            show: this.showTagsPanel,
            trigger: 'hover',
            overlap: true,
            placement: 'top',
            width: 'trigger',
            onUpdateShow: this.onPopoverUpdateShow,
            theme: this.mergedTheme.peers.Popover,
            themeOverrides: this.mergedTheme.peerOverrides.Popover
          } as const)
        : null
      const showPlaceholder = this.selected
        ? false
        : this.active
          ? !this.pattern && !this.isComposing
          : true
      const placeholder = showPlaceholder ? (
        <div
          class={`${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay`}
        >
          <div class={`${clsPrefix}-base-selection-placeholder__inner`}>
            {this.placeholder}
          </div>
        </div>
      ) : null
      const popoverTrigger = filterable ? (
        <div
          ref="patternInputWrapperRef"
          class={`${clsPrefix}-base-selection-tags`}
        >
          {tags}
          {maxTagCountResponsive ? null : input}
          {suffix}
        </div>
      ) : (
        <div
          ref="multipleElRef"
          class={`${clsPrefix}-base-selection-tags`}
          tabindex={disabled ? undefined : 0}
        >
          {tags}
          {suffix}
        </div>
      )
      body = (
        <>
          {useMaxTagCount ? (
            <NPopover
              {...popoverProps}
              scrollable
              style="max-height: calc(var(--v-target-height) * 6.6);"
            >
              {{
                trigger: () => popoverTrigger,
                default: renderPopover
              }}
            </NPopover>
          ) : (
            popoverTrigger
          )}
          {placeholder}
        </>
      )
    } else {
      if (filterable) {
        const hasInput = this.pattern || this.isComposing
        const showPlaceholder = this.active ? !hasInput : !this.selected
        const showSelectedLabel = this.active ? false : this.selected
        body = (
          <div
            ref="patternInputWrapperRef"
            class={`${clsPrefix}-base-selection-label`}
          >
            <input
              {...this.inputProps}
              ref="patternInputRef"
              class={`${clsPrefix}-base-selection-input`}
              value={this.active ? this.pattern : ''}
              placeholder=""
              readonly={disabled}
              disabled={disabled}
              tabindex={-1}
              autofocus={this.autofocus}
              onFocus={this.handlePatternInputFocus}
              onBlur={this.handlePatternInputBlur}
              onInput={this.handlePatternInputInput as any}
              onCompositionstart={this.handleCompositionStart}
              onCompositionend={this.handleCompositionEnd}
            />
            {showSelectedLabel ? (
              <div
                class={`${clsPrefix}-base-selection-label__render-label ${clsPrefix}-base-selection-overlay`}
                key="input"
              >
                <div class={`${clsPrefix}-base-selection-overlay__wrapper`}>
                  {renderTag
                    ? renderTag({
                      option: this.selectedOption!,
                      handleClose: () => {}
                    })
                    : renderLabel
                      ? renderLabel(this.selectedOption!, true)
                      : render(this.label, this.selectedOption, true)}
                </div>
              </div>
            ) : null}
            {showPlaceholder ? (
              <div
                class={`${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay`}
                key="placeholder"
              >
                <div class={`${clsPrefix}-base-selection-overlay__wrapper`}>
                  {this.filterablePlaceholder}
                </div>
              </div>
            ) : null}
            {suffix}
          </div>
        )
      } else {
        body = (
          <div
            ref="singleElRef"
            class={`${clsPrefix}-base-selection-label`}
            tabindex={this.disabled ? undefined : 0}
          >
            {this.label !== undefined ? (
              <div
                class={`${clsPrefix}-base-selection-input`}
                title={getTitleAttribute(this.label)}
                key="input"
              >
                <div class={`${clsPrefix}-base-selection-input__content`}>
                  {renderTag
                    ? renderTag({
                      option: this.selectedOption as SelectBaseOption,
                      handleClose: () => {}
                    })
                    : renderLabel
                      ? renderLabel(this.selectedOption as SelectBaseOption, true)
                      : render(this.label, this.selectedOption, true)}
                </div>
              </div>
            ) : (
              <div
                class={`${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay`}
                key="placeholder"
              >
                <div class={`${clsPrefix}-base-selection-placeholder__inner`}>
                  {this.placeholder}
                </div>
              </div>
            )}
            {suffix}
          </div>
        )
      }
    }
    return (
      <div
        ref="selfRef"
        class={[
          `${clsPrefix}-base-selection`,
          this.themeClass,
          status && `${clsPrefix}-base-selection--${status}-status`,
          {
            [`${clsPrefix}-base-selection--active`]: this.active,
            [`${clsPrefix}-base-selection--selected`]:
              this.selected || (this.active && this.pattern),
            [`${clsPrefix}-base-selection--disabled`]: this.disabled,
            [`${clsPrefix}-base-selection--multiple`]: this.multiple,
            // focus is not controlled by selection itself since it always need
            // to be managed together with menu. provide :focus style will cause
            // many redundant codes.
            [`${clsPrefix}-base-selection--focus`]: this.focused
          }
        ]}
        style={this.cssVars as CSSProperties}
        onClick={this.onClick}
        onMouseenter={this.handleMouseEnter}
        onMouseleave={this.handleMouseLeave}
        onKeydown={this.onKeydown}
        onFocusin={this.handleFocusin}
        onFocusout={this.handleFocusout}
        onMousedown={this.handleMouseDown}
      >
        {body}
        {bordered ? (
          <div class={`${clsPrefix}-base-selection__border`} />
        ) : null}
        {bordered ? (
          <div class={`${clsPrefix}-base-selection__state-border`} />
        ) : null}
      </div>
    )
  }
})
