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
  onMounted
} from 'vue'
import { VOverflow, VOverflowRef } from 'vueuc'
import { NPopover } from '../../../popover'
import { NTag } from '../../../tag'
import { useTheme } from '../../../_mixins'
import type { ThemeProps } from '../../../_mixins'
import { createKey } from '../../../_utils'
import { internalSelectionLight } from '../styles'
import type { InternalSelectionTheme } from '../styles'
import Suffix from './Suffix'
import style from './styles/index.cssr'
import type { SelectBaseOption } from '../../../select'
import type { TagRef } from '../../../tag/src/Tag'

export interface InternalSelectionRef {
  focus: () => void
  focusInput: () => void
  $el: HTMLElement
}

export default defineComponent({
  name: 'InternalSelection',
  props: {
    ...(useTheme.props as ThemeProps<InternalSelectionTheme>),
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
    remote: Boolean,
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
    focused: Boolean,
    onKeyup: Function as PropType<(e: KeyboardEvent) => void>,
    onKeydown: Function as PropType<(e: KeyboardEvent) => void>,
    onClick: Function as PropType<(e: MouseEvent) => void>,
    onBlur: Function as PropType<(e: FocusEvent) => void>,
    onFocus: Function as PropType<(e: FocusEvent) => void>,
    onDeleteOption: Function,
    onDeleteLastOption: Function,
    maxTagCount: [String, Number] as PropType<number | 'responsive'>,
    onClear: Function as PropType<(e: MouseEvent) => void>,
    onPatternInput: Function as PropType<(e: InputEvent) => void>
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
    const overflowRef = ref<VOverflowRef | null>(null)

    const showTagsPopoverRef = ref<boolean>(false)
    const patternInputFocusedRef = ref(false)
    const hoverRef = ref(false)
    const themeRef = useTheme(
      'InternalSelection',
      'InternalSelection',
      style,
      internalSelectionLight,
      props
    )
    const mergedClearableRef = computed(() => {
      return (
        props.clearable && !props.disabled && (hoverRef.value || props.active)
      )
    })
    const filterablePlaceholderRef = computed(() => {
      return props.selectedOption
        ? props.selectedOption.label
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
    function doDeleteLastOption (): void {
      const { onDeleteLastOption } = props
      if (onDeleteLastOption) onDeleteLastOption()
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
          doDeleteLastOption()
        }
      }
    }
    const isCompositingRef = ref(false)
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
      }
    }
    function handleCompositionStart (): void {
      isCompositingRef.value = true
    }
    function handleCompositionEnd (e: CompositionEvent): void {
      isCompositingRef.value = false
      doPatternInput(e as InputEvent)
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
            [createKey('height', size)]: height,
            [createKey('fontSize', size)]: fontSize
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--border': border,
          '--border-active': borderActive,
          '--border-focus': borderFocus,
          '--border-hover': borderHover,
          '--border-radius': borderRadius,
          '--box-shadow-active': boxShadowActive,
          '--box-shadow-focus': boxShadowFocus,
          '--box-shadow-hover': boxShadowHover,
          '--caret-color': caretColor,
          '--color': color,
          '--color-active': colorActive,
          '--color-disabled': colorDisabled,
          '--font-size': fontSize,
          '--height': height,
          '--padding-single': paddingSingle,
          '--placeholder-color': placeholderColor,
          '--placeholder-color-disabled': placeholderColorDisabled,
          '--text-color': textColor,
          '--text-color-disabled': textColorDisabled,
          '--arrow-color': arrowColor,
          '--arrow-color-disabled': arrowColorDisabled,
          '--loading-color': loadingColor,
          // form warning
          '--color-active-warning': colorActiveWarning,
          '--box-shadow-focus-warning': boxShadowFocusWarning,
          '--box-shadow-active-warning': boxShadowActiveWarning,
          '--box-shadow-hover-warning': boxShadowHoverWarning,
          '--border-warning': borderWarning,
          '--border-focus-warning': borderFocusWarning,
          '--border-hover-warning': borderHoverWarning,
          '--border-active-warning': borderActiveWarning,
          // form error
          '--color-active-error': colorActiveError,
          '--box-shadow-focus-error': boxShadowFocusError,
          '--box-shadow-active-error': boxShadowActiveError,
          '--box-shadow-hover-error': boxShadowHoverError,
          '--border-error': borderError,
          '--border-focus-error': borderFocusError,
          '--border-hover-error': borderHoverError,
          '--border-active-error': borderActiveError,
          // clear
          '--clear-size': clearSize,
          '--clear-color': clearColor,
          '--clear-color-hover': clearColorHover,
          '--clear-color-pressed': clearColorPressed
        }
      })
    }
  },
  render () {
    const { multiple, size, disabled, filterable, maxTagCount, bordered } = this
    const maxTagCountResponsive = maxTagCount === 'responsive'
    const maxTagCountNumeric = typeof maxTagCount === 'number'
    const useMaxTagCount = maxTagCountResponsive || maxTagCountNumeric
    const suffix = (
      <Suffix
        loading={this.loading}
        showArrow={this.showArrow}
        showClear={this.mergedClearable && this.selected}
        onClear={this.handleClear}
      />
    )

    let body: JSX.Element
    if (multiple) {
      const createTag = (option: SelectBaseOption): JSX.Element => (
        <div class="n-base-selection-tag-wrapper" key={option.value}>
          <NTag
            size={size}
            closable
            disabled={disabled}
            internalStopClickPropagation
            onClose={() => this.handleDeleteOption(option)}
          >
            {{ default: () => option.label }}
          </NTag>
        </div>
      )
      const originalTags = (maxTagCountNumeric
        ? this.selectedOptions!.slice(0, maxTagCount as number)
        : this.selectedOptions!
      ).map(createTag)
      const input = filterable ? (
        <div class="n-base-selection-input-tag" key="__input-tag__">
          <input
            ref="patternInputRef"
            tabindex={-1}
            disabled={disabled}
            value={this.pattern}
            autofocus={this.autofocus}
            class="n-base-selection-input-tag__input"
            onBlur={this.handlePatternInputBlur}
            onFocus={this.handlePatternInputFocus}
            onKeydown={this.handlePatternKeyDown}
            onInput={this.handlePatternInputInput as any}
            onCompositionstart={this.handleCompositionStart}
            onCompositionend={this.handleCompositionEnd}
          />
          <span
            ref="patternInputMirrorRef"
            class="n-base-selection-input-tag__mirror"
          >
            {this.pattern ? this.pattern : ''}
          </span>
        </div>
      ) : null
      // May Overflow
      const renderCounter = maxTagCountResponsive
        ? () => (
          <div class="n-base-selection-tag-wrapper" ref="counterWrapperRef">
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
        const rest = this.selectedOptions!.length - (maxTagCount as number)
        if (rest > 0) {
          counter = (
            <div class="n-base-selection-tag-wrapper" key="__counter__">
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
          <div class="n-base-selection-popover">
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
          theme: this.mergedTheme.peers.popover,
          themeOverrides: this.mergedTheme.peerOverrides.popover
        } as const)
        : null
      const placeholder =
        !this.selected && !this.pattern && !this.isCompositing ? (
          <div class="n-base-selection-placeholder">{this.placeholder}</div>
        ) : null
      if (filterable) {
        const popoverTrigger = (
          <div ref="patternInputWrapperRef" class="n-base-selection-tags">
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
            class="n-base-selection-tags"
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
          <>
            <div ref="patternInputWrapperRef" class="n-base-selection-label">
              <input
                ref="patternInputRef"
                class="n-base-selection-label__input"
                value={
                  showPlaceholder
                    ? ''
                    : this.patternInputFocused && this.active
                      ? this.pattern
                      : this.label
                }
                placeholder=""
                readonly={
                  !(!disabled && filterable && (this.active || this.autofocus))
                }
                disabled={disabled}
                tabindex={-1}
                autofocus={this.autofocus}
                onFocus={this.handlePatternInputFocus}
                onBlur={this.handlePatternInputBlur}
                onInput={this.handlePatternInputInput as any}
                onCompositionstart={this.handleCompositionStart}
                onCompositionend={this.handleCompositionEnd}
              />
              {showPlaceholder ? (
                <div class="n-base-selection-placeholder">
                  {this.filterablePlaceholder}
                </div>
              ) : null}
              {suffix}
            </div>
          </>
        )
      } else {
        body = (
          <>
            <div
              ref="singleElRef"
              class="n-base-selection-label"
              tabindex={this.disabled ? undefined : 0}
            >
              {this.label !== undefined ? (
                <div class="n-base-selection-label__input" key="input">
                  {this.label}
                </div>
              ) : (
                <div class="n-base-selection-placeholder" key="placeholder">
                  {this.placeholder}
                </div>
              )}
              {suffix}
            </div>
          </>
        )
      }
    }
    return (
      <div
        ref="selfRef"
        class={[
          'n-base-selection',
          {
            'n-base-selection--active': this.active,
            'n-base-selection--selected':
              this.selected || (this.active && this.pattern),
            'n-base-selection--disabled': this.disabled,
            'n-base-selection--multiple': this.multiple,
            // focus is not controlled by selection itself since it always need
            // to be managed together with menu. provide :focus style will cause
            // many redundant codes.
            'n-base-selection--focus': this.focused
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
        {bordered ? <div class="n-base-selection__border" /> : null}
        {bordered ? <div class="n-base-selection__state-border" /> : null}
      </div>
    )
  }
})
