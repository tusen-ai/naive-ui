import {
  h,
  computed,
  defineComponent,
  nextTick,
  ref,
  toRef,
  watch,
  onMounted,
  getCurrentInstance,
  renderSlot,
  PropType,
  CSSProperties
} from 'vue'
import { useMergedState } from 'vooks'
import NIconConfigProvider from '../../icon/src/IconConfigProvider'
import { NBaseClear } from '../../_base'
import { useTheme, useLocale, useFormItem, useConfig } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, createKey } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import { inputLight } from '../styles'
import type { InputTheme } from '../styles'
import style from './styles/input.cssr'

export default defineComponent({
  name: 'Input',
  props: {
    ...(useTheme.props as ThemeProps<InputTheme>),
    bordered: {
      type: Boolean,
      default: undefined
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: [Array, String] as PropType<undefined | string | [string, string]>,
      default: undefined
    },
    defaultValue: {
      type: [String, Array] as PropType<null | string | [string, string]>,
      default: null
    },
    value: {
      type: [String, Array] as PropType<
      null | undefined | string | [string, string]
      >,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'large' | undefined>,
      default: undefined
    },
    rows: {
      type: [Number, String] as PropType<number | string>,
      default: 3
    },
    round: {
      type: Boolean,
      default: false
    },
    minlength: {
      type: [String, Number] as PropType<number | string | undefined>,
      default: undefined
    },
    maxlength: {
      type: [String, Number] as PropType<number | string | undefined>,
      default: undefined
    },
    clearable: {
      type: Boolean,
      default: false
    },
    autosize: {
      type: [Boolean, Object] as PropType<
      false | { minRows?: number, maxRows?: number }
      >,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    pair: {
      type: Boolean,
      default: false
    },
    separator: {
      type: String,
      default: undefined
    },
    readonly: {
      type: [String, Boolean],
      default: false
    },
    forceFocus: {
      type: Boolean,
      default: false
    },
    passivelyActivated: {
      type: Boolean,
      default: false
    },
    stateful: {
      type: Boolean,
      default: true
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    onInput: {
      type: [Function, Array] as PropType<
      | undefined
      | MaybeArray<(value: string) => void>
      | MaybeArray<(value: [string, string]) => void>
      >,
      default: undefined
    },
    onFocus: {
      type: [Function, Array] as PropType<
      undefined | MaybeArray<(e: FocusEvent) => void>
      >,
      default: undefined
    },
    onBlur: {
      type: [Function, Array] as PropType<
      undefined | MaybeArray<(e: FocusEvent) => void>
      >,
      default: undefined
    },
    onClick: {
      type: [Function, Array] as PropType<
      undefined | MaybeArray<(e: MouseEvent) => void>
      >,
      default: undefined
    },
    onChange: {
      type: [Function, Array] as PropType<
      | undefined
      | MaybeArray<(value: string) => void>
      | MaybeArray<(value: [string, string]) => void>
      >,
      default: undefined
    },
    onClear: {
      type: [Function, Array] as PropType<
      undefined | MaybeArray<(e: MouseEvent) => void>
      >,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array] as PropType<
      undefined | MaybeArray<(value: string) => void>
      >,
      default: undefined
    },
    /** private */
    textDecoration: {
      type: [String, Array],
      default: undefined
    },
    attrSize: {
      type: Number,
      default: 20
    },
    onInputBlur: {
      type: [Function, Array] as PropType<
      undefined | MaybeArray<(e: FocusEvent) => void>
      >,
      default: undefined
    },
    onInputFocus: {
      type: [Function, Array] as PropType<
      undefined | MaybeArray<(e: FocusEvent) => void>
      >,
      default: undefined
    },
    onDeactivate: {
      type: [Function, Array] as PropType<undefined | MaybeArray<() => void>>,
      default: undefined
    },
    onActivate: {
      type: [Function, Array] as PropType<undefined | MaybeArray<() => void>>,
      default: undefined
    },
    onWrapperFocus: {
      type: [Function, Array] as PropType<
      undefined | MaybeArray<(e: FocusEvent) => void>
      >,
      default: undefined
    },
    onWrapperBlur: {
      type: [Function, Array] as PropType<
      undefined | MaybeArray<(e: FocusEvent) => void>
      >,
      default: undefined
    },
    deactivateOnEnter: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const themeRef = useTheme('Input', 'Input', style, inputLight, props)
    // dom refs
    const wrapperRef = ref<HTMLElement | null>(null)
    const textareaRef = ref<HTMLElement | null>(null)
    const textareaMirrorRef = ref<HTMLElement | null>(null)
    const inputRef = ref<HTMLElement | null>(null)
    const input2Ref = ref<HTMLElement | null>(null)
    // local
    const { locale } = useLocale('Input')
    // value
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    // form-item
    const formItem = useFormItem(props)
    const { mergedSize: mergedSizeRef } = formItem
    // states
    const focusedRef = ref(false)
    const hoverRef = ref(false)
    const isComposingRef = ref(false)
    const activatedRef = ref(false)
    // placeholder
    const mergedPlaceholderRef = computed<[string, string] | [string]>(() => {
      const { placeholder, pair } = props
      if (pair) {
        if (Array.isArray(placeholder)) {
          return placeholder
        } else if (placeholder === undefined) {
          return ['', '']
        }
        return [placeholder, placeholder]
      } else if (placeholder === undefined) {
        return [locale.value.placeholder]
      } else {
        return [placeholder] as [string]
      }
    })
    const showPlaceholder1Ref = computed(() => {
      const { value: isComposing } = isComposingRef
      const { value: mergedValue } = mergedValueRef
      const { value: mergedPlaceholder } = mergedPlaceholderRef
      return (
        !isComposing &&
        (!mergedValue || (Array.isArray(mergedValue) && !mergedValue[0])) &&
        mergedPlaceholder[0]
      )
    })
    const showPlaceholder2Ref = computed(() => {
      const { value: isComposing } = isComposingRef
      const { value: mergedValue } = mergedValueRef
      const { value: mergedPlaceholder } = mergedPlaceholderRef
      return (
        !isComposing &&
        mergedPlaceholder[1] &&
        (!mergedValue || (Array.isArray(mergedValue) && !mergedValue[1]))
      )
    })
    const showTextareaPlaceholderRef = computed(() => {
      return (
        props.type === 'textarea' &&
        !isComposingRef.value &&
        !mergedValueRef.value &&
        mergedPlaceholderRef.value
      )
    })
    // clear
    const showClearButton = computed(() => {
      if (
        props.disabled ||
        !props.clearable ||
        (!mergedFocusRef.value && !hoverRef.value)
      ) {
        return false
      }
      const { value: mergedValue } = mergedValueRef
      const { value: mergedFocus } = mergedFocusRef
      if (props.pair) {
        return (
          !!(
            Array.isArray(mergedValue) &&
            (mergedValue[0] || mergedValue[1])
          ) &&
          (hoverRef.value || mergedFocus)
        )
      } else {
        return !!mergedValue && (hoverRef.value || mergedFocus)
      }
    })
    // focus
    const mergedFocusRef = computed(() => {
      return props.forceFocus || focusedRef.value
    })
    // text-decoration
    const textDecorationStyleRef = computed(() => {
      const { textDecoration } = props
      if (!textDecoration) return ['', '']
      if (Array.isArray(textDecoration)) {
        return textDecoration.map((v) => ({
          textDecoration: v
        }))
      }
      return [
        {
          textDecoration
        }
      ]
    })
    // textarea autosize
    const updateTextAreaStyle = (): void => {
      if (props.type === 'textarea') {
        const { autosize } = props
        if (!autosize) return
        if (!textareaRef.value) return
        const {
          paddingTop: stylePaddingTop,
          paddingBottom: stylePaddingBottom,
          lineHeight: styleLineHeight
        } = window.getComputedStyle(textareaRef.value)
        const paddingTop = Number(stylePaddingTop.slice(0, -2))
        const paddingBottom = Number(stylePaddingBottom.slice(0, -2))
        const lineHeight = Number(styleLineHeight.slice(0, -2))
        if (!textareaMirrorRef.value) return
        if (autosize.minRows) {
          const minRows = Math.max(autosize.minRows, 1)
          const styleMinHeight = `${
            paddingTop + paddingBottom + lineHeight * minRows
          }px`
          textareaMirrorRef.value.style.minHeight = styleMinHeight
        }
        if (autosize.maxRows) {
          const styleMaxHeight = `${
            paddingTop + paddingBottom + lineHeight * autosize.maxRows
          }px`
          textareaMirrorRef.value.style.maxHeight = styleMaxHeight
        }
      }
    }
    watch([mergedValueRef, mergedSizeRef], () => {
      void nextTick(updateTextAreaStyle)
    })
    onMounted(updateTextAreaStyle)
    // other methods
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const vm = getCurrentInstance()!.proxy!
    function doInput (value: [string, string]): void
    function doInput (value: string): void
    function doInput (value: string | [string, string]): void {
      const { 'onUpdate:value': onUpdateValue, onInput } = props
      const { nTriggerFormInput } = formItem
      if (onUpdateValue) call(onUpdateValue, value)
      if (onInput) call(onInput, value)
      uncontrolledValueRef.value = value
      nTriggerFormInput()
    }
    function doChange (value: [string, string]): void
    function doChange (value: string): void
    function doChange (value: string | [string, string]): void {
      const { onChange } = props
      const { nTriggerFormChange } = formItem
      if (onChange) call(onChange, value)
      uncontrolledValueRef.value = value
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
    function doClear (e: MouseEvent): void {
      const { onClear } = props
      if (onClear) call(onClear, e)
    }
    function doInputBlur (e: FocusEvent): void {
      const { onInputBlur } = props
      if (onInputBlur) call(onInputBlur, e)
    }
    function doInputFocus (e: FocusEvent): void {
      const { onInputFocus } = props
      if (onInputFocus) call(onInputFocus, e)
    }
    function doDeactivate (): void {
      const { onDeactivate } = props
      if (onDeactivate) call(onDeactivate)
    }
    function doActivate (): void {
      const { onActivate } = props
      if (onActivate) call(onActivate)
    }
    function doClick (e: MouseEvent): void {
      const { onClick } = props
      if (onClick) call(onClick, e)
    }
    function doWrapperFocus (e: FocusEvent): void {
      const { onWrapperFocus } = props
      if (onWrapperFocus) call(onWrapperFocus, e)
    }
    function doWrapperBlur (e: FocusEvent): void {
      const { onWrapperBlur } = props
      if (onWrapperBlur) call(onWrapperBlur, e)
    }
    // methods
    function handleCompositionStart (): void {
      isComposingRef.value = true
    }
    function handleCompositionEnd (e: CompositionEvent): void {
      isComposingRef.value = false
      if (e.target === input2Ref.value) {
        handleInput(e, 1)
      } else {
        handleInput(e, 0)
      }
    }
    function handleInput (
      e: InputEvent | CompositionEvent | Event,
      index: 0 | 1 = 0,
      event = 'input'
    ): void {
      if (isComposingRef.value) return
      const changedValue = (e.target as HTMLInputElement).value
      if (!props.pair) {
        event === 'input' ? doInput(changedValue) : doChange(changedValue)
      } else {
        let { value } = mergedValueRef
        if (!Array.isArray(value)) {
          value = ['', '']
        } else {
          value = [...value]
        }
        value[index] = changedValue
        event === 'input' ? doInput(value) : doChange(value)
      }
      // force update to sync input's view with value
      // if not set, after input, input value won't sync with dom input value
      vm.$forceUpdate()
    }
    function handleInputBlur (e: FocusEvent): void {
      doInputBlur(e)
      if (e.relatedTarget === wrapperRef.value) {
        doDeactivate()
      }
      if (
        !(
          e.relatedTarget !== null &&
          (e.relatedTarget === inputRef.value ||
            e.relatedTarget === input2Ref.value ||
            e.relatedTarget === textareaRef.value)
        )
      ) {
        activatedRef.value = false
      }
      dealWithEvent(e, 'blur')
    }
    function handleInputFocus (e: FocusEvent): void {
      doInputFocus(e)
      focusedRef.value = true
      activatedRef.value = true
      doActivate()
      dealWithEvent(e, 'focus')
    }
    function handleWrapperBlur (e: FocusEvent): void {
      if (props.passivelyActivated) {
        doWrapperBlur(e)
        dealWithEvent(e, 'blur')
      }
    }
    function handleWrapperFocus (e: FocusEvent): void {
      if (props.passivelyActivated) {
        focusedRef.value = true
        doWrapperFocus(e)
        dealWithEvent(e, 'focus')
      }
    }
    function dealWithEvent (e: FocusEvent, type: 'focus' | 'blur'): void {
      if (
        e.relatedTarget !== null &&
        (e.relatedTarget === inputRef.value ||
          e.relatedTarget === input2Ref.value ||
          e.relatedTarget === textareaRef.value ||
          e.relatedTarget === wrapperRef.value)
      ) {
        /**
         * activeElement transfer inside the input, do nothing
         */
      } else {
        if (type === 'focus') {
          doFocus(e)
          focusedRef.value = true
        } else if (type === 'blur') {
          doBlur(e)
          focusedRef.value = false
        }
      }
    }
    function handleChange (e: Event, index?: 0 | 1): void {
      handleInput(e, index, 'change')
    }
    function handleClick (e: MouseEvent): void {
      doClick(e)
    }
    function handleClear (e: MouseEvent): void {
      doClear(e)
      if (props.pair) {
        doInput(['', ''])
      } else {
        doInput('')
      }
    }
    function handleMouseEnter (): void {
      hoverRef.value = true
    }
    function handleMouseLeave (): void {
      hoverRef.value = false
    }
    function handleWrapperKeyDown (e: KeyboardEvent): void {
      switch (e.code) {
        case 'ESC':
          handleWrapperKeyDownEsc()
          break
        case 'ENTER':
          handleWrapperKeyDownEnter(e)
          break
      }
    }
    function handleWrapperKeyDownEnter (e: KeyboardEvent): void {
      if (props.passivelyActivated) {
        const { value: focused } = activatedRef
        if (focused) {
          if (props.deactivateOnEnter) {
            handleWrapperKeyDownEsc()
          }
          return
        }
        e.preventDefault()
        if (props.type === 'textarea') {
          textareaRef.value?.focus()
        } else {
          inputRef.value?.focus()
        }
      }
    }
    function handleWrapperKeyDownEsc (): void {
      if (props.passivelyActivated) {
        activatedRef.value = false
        void nextTick(() => {
          wrapperRef.value?.focus()
        })
      }
    }
    function focus (): void {
      if (props.disabled) return
      if (props.passivelyActivated) {
        wrapperRef.value?.focus()
      } else {
        textareaRef.value?.focus()
        inputRef.value?.focus()
      }
    }
    function blur (): void {
      if (wrapperRef.value?.contains(document.activeElement)) {
        ;(document.activeElement as HTMLElement).blur()
      }
    }
    function activate (): void {
      if (props.disabled) return
      if (textareaRef.value) textareaRef.value.focus()
      else if (inputRef.value) inputRef.value.focus()
    }
    function deactivate (): void {
      const { value: wrapperEl } = wrapperRef
      if (
        wrapperEl?.contains(document.activeElement) &&
        wrapperEl !== document.activeElement
      ) {
        handleWrapperKeyDownEsc()
      }
    }
    return {
      // DOM ref
      wrapperRef,
      inputRef,
      input2Ref,
      textareaRef,
      textareaMirrorRef,
      // value
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      mergedPlaceholder: mergedPlaceholderRef,
      showPlaceholder1: showPlaceholder1Ref,
      showPlaceholder2: showPlaceholder2Ref,
      showTextareaPlaceholder: showTextareaPlaceholderRef,
      mergedFocus: mergedFocusRef,
      isComposing: isComposingRef,
      activated: activatedRef,
      showClearButton,
      mergedSize: mergedSizeRef,
      textDecorationStyle: textDecorationStyleRef,
      // methods
      focus,
      blur,
      deactivate,
      activate,
      handleCompositionStart,
      handleCompositionEnd,
      handleInput,
      handleInputBlur,
      handleInputFocus,
      handleWrapperBlur,
      handleWrapperFocus,
      handleMouseEnter,
      handleMouseLeave,
      handleChange,
      handleClick,
      handleClear,
      handleWrapperKeyDown,
      ...useConfig(props),
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const { value: size } = mergedSizeRef
        const {
          common: { cubicBezierEaseInOut },
          self: {
            color,
            borderRadius,
            paddingLeft,
            paddingRight,
            textColor,
            caretColor,
            textDecorationColor,
            border,
            borderDisabled,
            borderHover,
            borderFocus,
            placeholderColor,
            placeholderColorDisabled,
            lineHeightTextarea,
            colorDisabled,
            colorFocus,
            textColorDisabled,
            boxShadowFocus,
            iconSize,
            colorFocusWarning,
            boxShadowFocusWarning,
            borderWarning,
            borderFocusWarning,
            borderHoverWarning,
            colorFocusError,
            boxShadowFocusError,
            borderError,
            borderFocusError,
            borderHoverError,
            clearSize,
            clearColor,
            clearColorHover,
            clearColorPressed,
            [createKey('fontSize', size)]: fontSize,
            [createKey('height', size)]: height
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--color': color,
          '--font-size': fontSize,
          '--border-radius': borderRadius,
          '--height': height,
          '--padding-left': paddingLeft,
          '--padding-right': paddingRight,
          '--text-color': textColor,
          '--caret-color': caretColor,
          '--text-decoration-color': textDecorationColor,
          '--border': border,
          '--border-disabled': borderDisabled,
          '--border-hover': borderHover,
          '--border-focus': borderFocus,
          '--placeholder-color': placeholderColor,
          '--placeholder-color-disabled': placeholderColorDisabled,
          '--icon-size': iconSize,
          '--line-height-textarea': lineHeightTextarea,
          '--color-disabled': colorDisabled,
          '--color-focus': colorFocus,
          '--text-color-disabled': textColorDisabled,
          '--box-shadow-focus': boxShadowFocus,
          // form warning
          '--color-focus-warning': colorFocusWarning,
          '--box-shadow-focus-warning': boxShadowFocusWarning,
          '--border-warning': borderWarning,
          '--border-focus-warning': borderFocusWarning,
          '--border-hover-warning': borderHoverWarning,
          // form error
          '--color-focus-error': colorFocusError,
          '--box-shadow-focus-error': boxShadowFocusError,
          '--border-error': borderError,
          '--border-focus-error': borderFocusError,
          '--border-hover-error': borderHoverError,
          // clear-button
          '--clear-color': clearColor,
          '--clear-size': clearSize,
          '--clear-color-hover': clearColorHover,
          '--clear-color-pressed': clearColorPressed
        }
      })
    }
  },
  render () {
    return (
      <div
        ref="wrapperRef"
        class={[
          'n-input',
          {
            'n-input--disabled': this.disabled,
            'n-input--textarea': this.type === 'textarea',
            'n-input--round': this.round && !(this.type === 'textarea'),
            'n-input--pair': this.pair,
            'n-input--focus': this.mergedFocus,
            'n-input--stateful': this.stateful
          }
        ]}
        style={this.cssVars as CSSProperties}
        tabindex={
          !this.disabled && this.passivelyActivated && !this.activated
            ? 0
            : undefined
        }
        onFocus={this.handleWrapperFocus}
        onBlur={this.handleWrapperBlur}
        onClick={this.handleClick}
        onMouseenter={this.handleMouseEnter}
        onMouseleave={this.handleMouseLeave}
        onCompositionstart={this.handleCompositionStart}
        onCompositionend={this.handleCompositionEnd}
        onKeydown={this.handleWrapperKeyDown}
      >
        {/* textarea mirror */}
        {this.type === 'textarea' && this.autosize ? (
          <pre ref="textareaMirrorRef" class="n-input__textarea-mirror">
            {this.mergedValue}
            <br />
          </pre>
        ) : null}
        {/* textarea & basic input */}
        {this.type === 'textarea' ? (
          <textarea
            ref="textareaRef"
            class={[
              'n-input__textarea',
              {
                'n-input__textarea--autosize': this.autosize
              }
            ]}
            autofocus={this.autofocus}
            rows={Number(this.rows)}
            placeholder={this.placeholder as string | undefined}
            value={this.mergedValue as string | undefined}
            disabled={this.disabled}
            maxlength={this.maxlength as any}
            minlength={this.minlength as any}
            readonly={this.readonly as any}
            tabindex={
              this.passivelyActivated && !this.activated ? -1 : undefined
            }
            style={this.textDecorationStyle[0] as any}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}
            onInput={this.handleInput}
            onChange={this.handleChange}
          />
        ) : (
          <div class="n-input-wrapper">
            {this.$slots.affix || this.$slots.prefix ? (
              <NIconConfigProvider
                class="n-input__prefix"
                depth={this.disabled ? 5 : 4}
              >
                {{
                  default: () =>
                    renderSlot(this.$slots, 'affix', undefined, () => {
                      return [renderSlot(this.$slots, 'prefix')]
                    })
                }}
              </NIconConfigProvider>
            ) : null}
            <div class="n-input__input">
              <input
                ref="inputRef"
                type={this.type}
                class="n-input__input-el"
                tabindex={
                  this.passivelyActivated && !this.activated ? -1 : undefined
                }
                placeholder={this.mergedPlaceholder[0]}
                disabled={this.disabled}
                maxlength={this.maxlength as any}
                minlength={this.minlength as any}
                value={
                  Array.isArray(this.mergedValue)
                    ? this.mergedValue[0]
                    : (this.mergedValue as any)
                }
                readonly={this.readonly as any}
                autofocus={this.autofocus}
                size={this.attrSize}
                style={this.textDecorationStyle[0] as any}
                onBlur={this.handleInputBlur}
                onFocus={this.handleInputFocus}
                onInput={(e) => this.handleInput(e, 0)}
                onChange={(e) => this.handleChange(e, 0)}
              />
              {this.showPlaceholder1 ? (
                <div class="n-input__placeholder">
                  <span>{this.mergedPlaceholder[0]}</span>
                </div>
              ) : null}
            </div>
            {!this.pair ? (
              <NIconConfigProvider
                class="n-input__suffix"
                depth={this.disabled ? 5 : 4}
              >
                {{
                  default: () => [
                    renderSlot(this.$slots, 'suffix'),
                    this.clearable || this.$slots.clear ? (
                      <NBaseClear
                        show={this.showClearButton}
                        onClear={this.handleClear}
                      >
                        {{ default: () => renderSlot(this.$slots, 'clear') }}
                      </NBaseClear>
                    ) : null
                  ]
                }}
              </NIconConfigProvider>
            ) : null}
          </div>
        )}
        {/* pair input */}
        {this.pair ? (
          <span class="n-input__separator">
            {renderSlot(this.$slots, 'separator', undefined, () => [
              this.separator
            ])}
          </span>
        ) : null}
        {this.pair ? (
          <div v-if="pair" class="n-input-wrapper">
            <div class="n-input__input">
              <input
                ref="input2Ref"
                type={this.type}
                class="n-input__input-el"
                tabindex={
                  this.passivelyActivated && !this.activated ? -1 : undefined
                }
                placeholder={this.mergedPlaceholder[1]}
                disabled={this.disabled}
                maxlength={this.maxlength as any}
                minlength={this.minlength as any}
                value={
                  Array.isArray(this.mergedValue)
                    ? this.mergedValue[1]
                    : undefined
                }
                readonly={this.readonly as any}
                style={this.textDecorationStyle[1] as any}
                onBlur={this.handleInputBlur}
                onFocus={this.handleInputFocus}
                onInput={(e) => this.handleInput(e, 1)}
                onChange={(e) => this.handleChange(e, 1)}
              />
              {this.showPlaceholder2 ? (
                <div class="n-input__placeholder">
                  <span>{this.mergedPlaceholder[1]}</span>
                </div>
              ) : null}
            </div>
            <NIconConfigProvider
              class="n-input__suffix"
              depth={this.disabled ? 5 : 4}
            >
              {{
                default: () => {
                  return [
                    renderSlot(this.$slots, 'suffix'),
                    this.clearable || this.$slots.clear ? (
                      <NBaseClear
                        show={this.showClearButton}
                        onClear={this.handleClear}
                      >
                        {{ default: () => renderSlot(this.$slots, 'cleaar') }}
                      </NBaseClear>
                    ) : null
                  ]
                }
              }}
            </NIconConfigProvider>
          </div>
        ) : null}
        {/* textarea placeholder */}
        {this.showTextareaPlaceholder ? (
          <div class="n-input__placeholder">{this.placeholder}</div>
        ) : null}
        {/* border */}
        {this.mergedBordered ? <div class="n-input__border" /> : null}
        {this.mergedBordered ? <div class="n-input__state-border" /> : null}
      </div>
    )
  }
})
