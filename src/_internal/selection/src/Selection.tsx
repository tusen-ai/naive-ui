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
  CSSProperties
} from 'vue'
import { NTag } from '../../../tag'
import { useTheme } from '../../../_mixins'
import type { ThemeProps } from '../../../_mixins'
import { createKey } from '../../../_utils'
import { internalSelectionLight } from '../styles'
import type { InternalSelectionTheme } from '../styles'
import Suffix from './Suffix'
import style from './styles/index.cssr'
import type { BaseOption } from '../../../select'

export interface InternalSelectionRef {
  focusPatternInputWrapper: () => void
  focusPatternInput: () => void
  $el: HTMLElement
}

export default defineComponent({
  name: 'InternalSelection',
  props: {
    ...(useTheme.props as ThemeProps<InternalSelectionTheme>),
    bordered: {
      type: Boolean,
      default: undefined
    },
    active: {
      type: Boolean,
      default: false
    },
    pattern: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: undefined
    },
    selectedOption: {
      type: Object as PropType<BaseOption | null>,
      default: null
    },
    selectedOptions: {
      type: Array as PropType<BaseOption[] | null>,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium'
    },
    loading: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    showArrow: {
      type: Boolean,
      default: true
    },
    onBlur: {
      type: Function as PropType<((e: FocusEvent) => void) | undefined>,
      default: undefined
    },
    onFocus: {
      type: Function as PropType<((e: FocusEvent) => void) | undefined>,
      default: undefined
    },
    onDeleteOption: {
      type: Function,
      default: undefined
    },
    onDeleteLastOption: {
      type: Function,
      default: undefined
    },
    onClear: {
      type: Function as PropType<((e: MouseEvent) => void) | undefined>,
      default: undefined
    },
    onPatternInput: {
      type: Function as PropType<((e: InputEvent) => void) | undefined>,
      default: undefined
    }
  },
  setup (props) {
    const patternInputMirrorRef = ref<HTMLElement | null>(null)
    const patternInputRef = ref<HTMLElement | null>(null)
    const singleInputRef = ref<HTMLElement | null>(null)
    const selfRef = ref<HTMLElement | null>(null)
    const focusableEl1Ref = ref<HTMLElement | null>(null)
    const focusableEl2Ref = ref<HTMLElement | null>(null)
    const patternInputWrapperRef = ref<HTMLElement | null>(null)

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
    watch(toRef(props, 'pattern'), () => {
      if (props.multiple) {
        void nextTick(() => {
          const { value: patternInputMirrorEl } = patternInputMirrorRef
          if (patternInputMirrorEl) {
            const { value: patternInputEl } = patternInputRef
            if (patternInputEl) {
              patternInputEl.style.width = `${patternInputMirrorEl.offsetWidth}px`
            }
          }
        })
      }
    })
    watch(toRef(props, 'active'), (active) => {
      if (active) {
        void nextTick(() => {
          singleInputRef.value?.focus()
        })
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
    function doDeleteOption (value: BaseOption): void {
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
    function handleBlur (e: FocusEvent): void {
      // Blur to devtools to may trigger the branch, comment it for now
      // if (
      //   !e.relatedTarget &&
      //   document.activeElement !== document.body
      // ) {
      //   console.warn(
      //     '[naive-ui/base-selection]: blur event has no related target,',
      //     e.relatedTarget,
      //     ', this may be a bug of naive-ui.'
      //   )
      // }
      if (e.relatedTarget && selfRef.value?.contains(e.relatedTarget as Node)) {
        return
      }
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
      if (!props.active) return
      const filterableElRefs = [
        focusableEl1Ref,
        focusableEl2Ref,
        patternInputWrapperRef,
        patternInputRef
      ]
      for (const filterableElRef of filterableElRefs) {
        const el = filterableElRef.value
        if (document.activeElement === el) {
          e.preventDefault()
          break
        }
      }
    }
    function handleDeleteOption (option: BaseOption): void {
      doDeleteOption(option)
    }
    function handlePatternKeyDown (e: KeyboardEvent): void {
      console.log(e.code)
      if (e.code === 'Backspace') {
        if (!props.pattern.length) {
          doDeleteLastOption()
        }
      }
    }
    function handlePatternInputInput (e: InputEvent): void {
      doPatternInput(e)
    }
    function handlePatternInputFocus (): void {
      patternInputFocusedRef.value = true
    }
    function handlePatternInputBlur (e: FocusEvent): void {
      patternInputFocusedRef.value = false
      handleBlur(e)
    }
    function focusPatternInputWrapper (): void {
      patternInputFocusedRef.value = false
      void nextTick(() => {
        const { value: patternInputWrapperEl } = patternInputWrapperRef
        if (patternInputWrapperEl) patternInputWrapperEl.focus()
      })
    }
    function focusPatternInput (): void {
      void nextTick(() => {
        const { value: patternInputEl } = patternInputRef
        if (patternInputEl) {
          patternInputEl.focus()
        }
      })
    }
    function blurPatternInput (): void {
      const { value: patternInputEl } = patternInputRef
      if (patternInputEl) {
        patternInputEl.blur()
      }
    }
    return {
      mergedTheme: themeRef,
      mergedClearable: mergedClearableRef,
      patternInputFocused: patternInputFocusedRef,
      filterablePlaceholder: filterablePlaceholderRef,
      label: labelRef,
      selected: selectedRef,
      // dom ref
      patternInputMirrorRef,
      patternInputRef,
      singleInputRef,
      selfRef,
      focusableEl1Ref,
      focusableEl2Ref,
      patternInputWrapperRef,
      handleBlur,
      handleFocusin,
      handleClear,
      handleMouseEnter,
      handleMouseLeave,
      handleMouseDown,
      handleDeleteOption,
      handlePatternKeyDown,
      handlePatternInputInput,
      handlePatternInputBlur,
      handlePatternInputFocus,
      focusPatternInputWrapper,
      focusPatternInput,
      blurPatternInput,
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
    const { multiple, size, disabled, filterable } = this
    const tags = multiple
      ? this.selectedOptions!.map((option) => (
        <NTag
          key={option.value}
          size={size}
          closable
          disabled={disabled}
          stopClickPropagation
          onClose={() => this.handleDeleteOption(option)}
        >
          {{ default: () => option.label }}
        </NTag>
      ))
      : null
    const suffix = (
      <Suffix
        loading={this.loading}
        showArrow={this.showArrow}
        showClear={this.mergedClearable && this.selected}
        onClear={this.handleClear}
      />
    )
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
            'n-base-selection--focus': this.patternInputFocused
          }
        ]}
        style={this.cssVars as CSSProperties}
        onMouseenter={this.handleMouseEnter}
        onMouseleave={this.handleMouseLeave}
        onMousedown={this.handleMouseDown}
        onFocusin={this.handleFocusin}
      >
        {/* multiple */}
        {this.multiple && !this.filterable ? (
          <>
            <div
              ref="focusableEl1Ref"
              class="n-base-selection-tags"
              tabindex={disabled ? undefined : 0}
              onBlur={this.handleBlur}
            >
              {tags}
              {suffix}
            </div>
            <div class="n-base-selection-placeholder">{this.placeholder}</div>
          </>
        ) : null}
        {/* multiple filterable */}
        {this.multiple && this.filterable ? (
          <>
            <div
              ref="patternInputWrapperRef"
              class="n-base-selection-tags"
              tabindex={disabled || this.patternInputFocused ? undefined : 0}
              onBlur={this.handleBlur}
            >
              {tags}
              <div class="n-base-selection-input-tag">
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
                />
                <span
                  ref="patternInputMirrorRef"
                  class="n-base-selection-input-tag__mirror"
                >
                  {this.pattern ? this.pattern : '&nbsp;'}
                </span>
              </div>
              {suffix}
            </div>
            <div class="n-base-selection-placeholder">{this.placeholder}</div>
          </>
        ) : null}
        {/* single filterable */}
        {!multiple && filterable ? (
          <>
            <div
              ref="patternInputWrapperRef"
              class="n-base-selection-label"
              tabindex={!disabled && !this.patternInputFocused ? 0 : undefined}
              onBlur={this.handleBlur}
            >
              <input
                ref="patternInputRef"
                class="n-base-selection-label__input"
                value={
                  this.patternInputFocused && this.active
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
              />
              {!this.pattern && (this.active || !this.selectedOption) ? (
                <div class="n-base-selection-placeholder">
                  {this.filterablePlaceholder}
                </div>
              ) : null}
              {suffix}
            </div>
          </>
        ) : null}
        {/* single */}
        {!multiple && !filterable ? (
          <>
            <div
              ref="focusableEl2Ref"
              class="n-base-selection-label"
              tabindex={this.disabled ? undefined : 0}
              onBlur={this.handleBlur}
            >
              {this.label?.length ? (
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
        ) : null}
        {this.bordered ? <div class="n-base-selection__border" /> : null}
        {this.bordered ? <div class="n-base-selection__state-border" /> : null}
      </div>
    )
  }
})
