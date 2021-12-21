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
  InputHTMLAttributes
} from 'vue'
import { VOverflow, VOverflowInst } from 'vueuc'
import type { SelectBaseOption } from '../../../select/src/interface'
import type { TagRef } from '../../../tag/src/Tag'
import { NPopover } from '../../../popover'
import { NTag } from '../../../tag'
import { useTheme } from '../../../_mixins'
import type { ThemeProps } from '../../../_mixins'
import { createKey, getTitleAttribute, render } from '../../../_utils'
import Suffix from '../../suffix'
import { internalSelectionLight } from '../styles'
import type { InternalSelectionTheme } from '../styles'
import { RenderTag } from './interface'
import style from './styles/index.cssr'
import type {
  RenderLabel,
  RenderLabelImpl
} from '../../select-menu/src/interface'

export interface InternalSelectionInst {
  focus: () => void
  focusInput: () => void
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
      default: null
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
    multiple: Boolean,
    filterable: Boolean,
    clearable: Boolean,
    disabled: Boolean,
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
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
    onKeyup: Function as PropType<(e: KeyboardEvent) => void>,
    onKeydown: Function as PropType<(e: KeyboardEvent) => void>,
    onClick: Function as PropType<(e: MouseEvent) => void>,
    onBlur: Function as PropType<(e: FocusEvent) => void>,
    onFocus: Function as PropType<(e: FocusEvent) => void>,
    onDeleteOption: Function as PropType<(option: SelectBaseOption) => void>,
    maxTagCount: [String, Number] as PropType<number | 'responsive'>,
    onClear: Function as PropType<(e: MouseEvent) => void>,
    onPatternInput: Function as PropType<(e: InputEvent) => void>,
    renderLabel: Function as PropType<RenderLabel>
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
      'InternalSelection',
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
            : render(props.selectedOption.label, props.selectedOption, true)
        : props.placeholder
    })
    const labelRef = computed(() => {
      const option = props.selectedOption
      if (!option) return undefined
      return option.label
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
      if (e.code === 'Backspace') {
        if (!props.pattern.length) {
          const { selectedOptions } = props
          if (selectedOptions?.length) {
            handleDeleteOption(selectedOptions[selectedOptions.length - 1])
          }
        }
      }
    }
    const isCompositingRef = ref(false)
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
      if (!isCompositingRef.value) {
        doPatternInput(e)
      } else {
        cachedInputEvent = e
      }
    }
    function handleCompositionStart (): void {
      isCompositingRef.value = true
    }
    function handleCompositionEnd (): void {
      isCompositingRef.value = false
      doPatternInput(cachedInputEvent!)
      cachedInputEvent = null
    }
    function handlePatternInputFocus (): void {
      patternInputFocusedRef.value = true
    }
    function handlePatternInputBlur (e: FocusEvent): void {
      patternInputFocusedRef.value = false
    }
    function focus (): void {
      if (props.filterable) {
        patternInputFocusedRef.value = false
        const { value: patternInputWrapperEl } = patternInputWrapperRef
        if (patternInputWrapperEl) patternInputWrapperEl.focus()
      } else if (props.multiple) {
        const { value: multipleEl } = multipleElRef
        multipleEl?.focus()
      } else {
        const { value: singleEl } = singleElRef
        singleEl?.focus()
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
        showTagsPopoverRef.value = true
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
    onMounted(() => {
      watchEffect(() => {
        const patternInputWrapperEl = patternInputWrapperRef.value
        if (!patternInputWrapperEl) return
        patternInputWrapperEl.tabIndex =
          props.disabled || patternInputFocusedRef.value ? -1 : 0
      })
    })
    return {
      mergedTheme: themeRef,
      mergedClearable: mergedClearableRef,
      patternInputFocused: patternInputFocusedRef,
      filterablePlaceholder: filterablePlaceholderRef,
      label: labelRef,
      selected: selectedRef,
      showTagsPanel: showTagsPopoverRef,
      isCompositing: isCompositingRef,
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
      blurInput,
      updateCounter,
      getCounter,
      getTail,
      renderLabel: props.renderLabel as RenderLabelImpl,
      cssVars: computed(() => {
        const { size } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            borderRadius,
            color,
            placeholderColor,
            textColor,
            paddingSingle,
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
    }
  },
  render () {
    const {
      multiple,
      size,
      disabled,
      filterable,
      maxTagCount,
      bordered,
      clsPrefix,
      renderTag,
      renderLabel
    } = this
    const maxTagCountResponsive = maxTagCount === 'responsive'
    const maxTagCountNumeric = typeof maxTagCount === 'number'
    const useMaxTagCount = maxTagCountResponsive || maxTagCountNumeric
    const suffix = (
      <Suffix
        clsPrefix={clsPrefix}
        loading={this.loading}
        showArrow={this.showArrow}
        showClear={this.mergedClearable && this.selected}
        onClear={this.handleClear}
      />
    )

    let body: JSX.Element
    if (multiple) {
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
              internalStopClickPropagation
              onClose={() => this.handleDeleteOption(option)}
            >
              {{
                default: () =>
                  renderLabel
                    ? renderLabel(option, true)
                    : render(option.label, option, true)
              }}
            </NTag>
          )}
        </div>
      )
      const originalTags = (
        maxTagCountNumeric
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
            {this.pattern ? this.pattern : ''}
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
              default: () => originalTags,
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
              default: () => originalTags,
              counter: renderCounter
            }}
          </VOverflow>
        )
      ) : maxTagCountNumeric ? (
        originalTags.concat(counter as JSX.Element)
      ) : (
        originalTags
      )
      const renderPopover = useMaxTagCount
        ? (): JSX.Element => (
            <div class={`${clsPrefix}-base-selection-popover`}>
              {maxTagCountResponsive
                ? originalTags
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
      const placeholder =
        !this.selected && !this.pattern && !this.isCompositing ? (
          <div
            class={`${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay`}
          >
            {this.placeholder}
          </div>
        ) : null
      if (filterable) {
        const popoverTrigger = (
          <div
            ref="patternInputWrapperRef"
            class={`${clsPrefix}-base-selection-tags`}
          >
            {tags}
            {maxTagCountResponsive ? null : input}
            {suffix}
          </div>
        )
        body = (
          <>
            {useMaxTagCount ? (
              <NPopover {...popoverProps}>
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
        const popoverTrigger = (
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
              <NPopover {...popoverProps}>
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
      }
    } else {
      if (filterable) {
        const showPlaceholder =
          !this.pattern &&
          (this.active || !this.selected) &&
          !this.isCompositing
        body = (
          <div
            ref="patternInputWrapperRef"
            class={`${clsPrefix}-base-selection-label`}
          >
            <input
              {...this.inputProps}
              ref="patternInputRef"
              class={`${clsPrefix}-base-selection-input`}
              value={
                this.patternInputFocused && this.active ? this.pattern : ''
              }
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
            {showPlaceholder ? null : this.patternInputFocused &&
              this.active ? null : (
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
              )}
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
                {this.placeholder}
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
        onKeyup={this.onKeyup}
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
