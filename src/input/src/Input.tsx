import {
  h,
  computed,
  defineComponent,
  nextTick,
  ref,
  toRef,
  onMounted,
  getCurrentInstance,
  renderSlot,
  PropType,
  CSSProperties,
  watch,
  watchEffect,
  WatchStopHandle
} from 'vue'
import { useMergedState } from 'vooks'
import { toRgbString, getAlphaString, getPadding } from 'seemly'
import { VResizeObserver } from 'vueuc'
import { NBaseClear } from '../../_internal'
import { useTheme, useLocale, useFormItem, useConfig } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, createKey, ExtractPublicPropTypes } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import { inputLight } from '../styles'
import type { InputTheme } from '../styles'
import type {
  OnUpdateValue,
  OnUpdateValueImpl,
  Size,
  InputWrappedRef
} from './interface'
import style from './styles/input.cssr'

const inputProps = {
  ...(useTheme.props as ThemeProps<InputTheme>),
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: [Array, String] as PropType<string | [string, string]>,
  defaultValue: {
    type: [String, Array] as PropType<null | string | [string, string]>,
    default: null
  },
  value: [String, Array] as PropType<null | string | [string, string]>,
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<Size | undefined>,
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
  minlength: [String, Number] as PropType<number | string>,
  maxlength: [String, Number] as PropType<number | string>,
  clearable: {
    type: Boolean,
    default: false
  },
  autosize: {
    type: [Boolean, Object] as PropType<
    boolean | { minRows?: number, maxRows?: number }
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
  separator: String,
  readonly: {
    type: [String, Boolean],
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
  resizable: {
    type: Boolean,
    default: true
  },
  onMousedown: Function as PropType<(e: MouseEvent) => void>,
  onKeydown: Function as PropType<(e: KeyboardEvent) => void>,
  onKeyup: Function as PropType<(e: KeyboardEvent) => void>,
  onInput: [Function, Array] as PropType<OnUpdateValue>,
  onFocus: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
  onClick: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>,
  onChange: [Function, Array] as PropType<OnUpdateValue>,
  onClear: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>,
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  /** private */
  textDecoration: [String, Array] as PropType<string | [string, string]>,
  attrSize: {
    type: Number,
    default: 20
  },
  onInputBlur: [Function, Array] as PropType<
  MaybeArray<(e: FocusEvent) => void>
  >,
  onInputFocus: [Function, Array] as PropType<
  MaybeArray<(e: FocusEvent) => void>
  >,
  onDeactivate: [Function, Array] as PropType<MaybeArray<() => void>>,
  onActivate: [Function, Array] as PropType<MaybeArray<() => void>>,
  onWrapperFocus: [Function, Array] as PropType<
  MaybeArray<(e: FocusEvent) => void>
  >,
  onWrapperBlur: [Function, Array] as PropType<
  MaybeArray<(e: FocusEvent) => void>
  >,
  internalDeactivateOnEnter: {
    type: Boolean,
    default: false
  },
  internalForceFocus: {
    type: Boolean,
    default: false
  }
}

export type InputProps = ExtractPublicPropTypes<typeof inputProps>

export default defineComponent({
  name: 'Input',
  props: inputProps,
  setup (props) {
    const { mergedClsPrefix, mergedBordered } = useConfig(props)
    const themeRef = useTheme(
      'Input',
      'Input',
      style,
      inputLight,
      props,
      mergedClsPrefix
    )
    // dom refs
    const wrapperElRef = ref<HTMLElement | null>(null)
    const textareaElRef = ref<HTMLTextAreaElement | null>(null)
    const textareaMirrorElRef = ref<HTMLElement | null>(null)
    const inputMirrorElRef = ref<HTMLElement | null>(null)
    const inputElRef = ref<HTMLInputElement | null>(null)
    const inputEl2Ref = ref<HTMLInputElement | null>(null)
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
    let syncSource: string | null = null
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
      return props.internalForceFocus || focusedRef.value
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
        if (typeof autosize === 'boolean') return
        if (!textareaElRef.value) return
        const {
          paddingTop: stylePaddingTop,
          paddingBottom: stylePaddingBottom,
          lineHeight: styleLineHeight
        } = window.getComputedStyle(textareaElRef.value)
        const paddingTop = Number(stylePaddingTop.slice(0, -2))
        const paddingBottom = Number(stylePaddingBottom.slice(0, -2))
        const lineHeight = Number(styleLineHeight.slice(0, -2))
        const { value: textareaMirrorEl } = textareaMirrorElRef
        if (!textareaMirrorEl) return
        if (autosize.minRows) {
          const minRows = Math.max(autosize.minRows, 1)
          const styleMinHeight = `${
            paddingTop + paddingBottom + lineHeight * minRows
          }px`
          textareaMirrorEl.style.minHeight = styleMinHeight
        }
        if (autosize.maxRows) {
          const styleMaxHeight = `${
            paddingTop + paddingBottom + lineHeight * autosize.maxRows
          }px`
          textareaMirrorEl.style.maxHeight = styleMaxHeight
        }
      }
    }
    onMounted(() => {
      // sync mirror if is not pair
      const { value } = mergedValueRef
      if (!Array.isArray(value)) {
        syncMirror(value)
      }
    })
    // other methods
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const vm = getCurrentInstance()!.proxy!
    function doUpdateValue (value: [string, string]): void
    function doUpdateValue (value: string): void
    function doUpdateValue (value: string | [string, string]): void {
      const { onUpdateValue, 'onUpdate:value': _onUpdateValue, onInput } = props
      const { nTriggerFormInput } = formItem
      if (onUpdateValue) call(onUpdateValue as OnUpdateValueImpl, value)
      if (_onUpdateValue) call(_onUpdateValue as OnUpdateValueImpl, value)
      if (onInput) call(onInput as OnUpdateValueImpl, value)
      uncontrolledValueRef.value = value
      nTriggerFormInput()
    }
    function doChange (value: [string, string]): void
    function doChange (value: string): void
    function doChange (value: string | [string, string]): void {
      const { onChange } = props
      const { nTriggerFormChange } = formItem
      if (onChange) call(onChange as OnUpdateValueImpl, value)
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
    function doUpdateValueBlur (e: FocusEvent): void {
      const { onInputBlur } = props
      if (onInputBlur) call(onInputBlur, e)
    }
    function doUpdateValueFocus (e: FocusEvent): void {
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
      if (e.target === inputEl2Ref.value) {
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
      const targetValue = (e.target as HTMLInputElement).value
      syncMirror(targetValue)
      syncSource = targetValue
      if (isComposingRef.value) return
      const changedValue = targetValue
      if (!props.pair) {
        event === 'input' ? doUpdateValue(changedValue) : doChange(changedValue)
      } else {
        let { value } = mergedValueRef
        if (!Array.isArray(value)) {
          value = ['', '']
        } else {
          value = [...value]
        }
        value[index] = changedValue
        event === 'input' ? doUpdateValue(value) : doChange(value)
      }
      // force update to sync input's view with value
      // if not set, after input, input value won't sync with dom input value
      vm.$forceUpdate()
    }
    function handleInputBlur (e: FocusEvent): void {
      doUpdateValueBlur(e)
      if (e.relatedTarget === wrapperElRef.value) {
        doDeactivate()
      }
      if (
        !(
          e.relatedTarget !== null &&
          (e.relatedTarget === inputElRef.value ||
            e.relatedTarget === inputEl2Ref.value ||
            e.relatedTarget === textareaElRef.value)
        )
      ) {
        activatedRef.value = false
      }
      dealWithEvent(e, 'blur')
    }
    function handleInputFocus (e: FocusEvent): void {
      doUpdateValueFocus(e)
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
        (e.relatedTarget === inputElRef.value ||
          e.relatedTarget === inputEl2Ref.value ||
          e.relatedTarget === textareaElRef.value ||
          e.relatedTarget === wrapperElRef.value)
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
        doUpdateValue(['', ''])
      } else {
        doUpdateValue('')
      }
    }
    function handleMouseDown (e: MouseEvent): void {
      const { onMousedown } = props
      if (onMousedown) onMousedown(e)
      const { tagName } = e.target as HTMLElement
      if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
        if (props.resizable) {
          const { value: wrapperEl } = wrapperElRef
          if (wrapperEl) {
            const {
              left,
              top,
              width,
              height
            } = wrapperEl.getBoundingClientRect()
            const resizeHandleSize = 14
            if (
              left + width - resizeHandleSize < e.clientX &&
              e.clientY < left + width &&
              top + height - resizeHandleSize < e.clientY &&
              e.clientY < top + height
            ) {
              // touching resize handle, just let it go.
              // resize won't take focus, maybe there is a better way to do this.
              // hope someone can figure out a better solution
              return
            }
          }
        }
        e.preventDefault()
        if (!focusedRef.value) {
          focus()
        }
      }
    }
    function handleMouseEnter (): void {
      hoverRef.value = true
    }
    function handleMouseLeave (): void {
      hoverRef.value = false
    }
    function handleWrapperKeyDown (e: KeyboardEvent): void {
      props.onKeydown?.(e)
      switch (e.code) {
        case 'Escape':
          handleWrapperKeyDownEsc()
          break
        case 'Enter':
          handleWrapperKeyDownEnter(e)
          break
      }
    }
    function handleWrapperKeyDownEnter (e: KeyboardEvent): void {
      if (props.passivelyActivated) {
        const { value: focused } = activatedRef
        if (focused) {
          if (props.internalDeactivateOnEnter) {
            handleWrapperKeyDownEsc()
          }
          return
        }
        e.preventDefault()
        if (props.type === 'textarea') {
          textareaElRef.value?.focus()
        } else {
          inputElRef.value?.focus()
        }
      }
    }
    function handleWrapperKeyDownEsc (): void {
      if (props.passivelyActivated) {
        activatedRef.value = false
        void nextTick(() => {
          wrapperElRef.value?.focus()
        })
      }
    }
    function focus (): void {
      if (props.disabled) return
      if (props.passivelyActivated) {
        wrapperElRef.value?.focus()
      } else {
        textareaElRef.value?.focus()
        inputElRef.value?.focus()
      }
    }
    function blur (): void {
      if (wrapperElRef.value?.contains(document.activeElement)) {
        ;(document.activeElement as HTMLElement).blur()
      }
    }
    function activate (): void {
      if (props.disabled) return
      if (textareaElRef.value) textareaElRef.value.focus()
      else if (inputElRef.value) inputElRef.value.focus()
    }
    function deactivate (): void {
      const { value: wrapperEl } = wrapperElRef
      if (
        wrapperEl?.contains(document.activeElement) &&
        wrapperEl !== document.activeElement
      ) {
        handleWrapperKeyDownEsc()
      }
    }
    function syncMirror (value: string | null): void {
      const { type, pair, autosize } = props
      if (!pair && autosize) {
        if (type === 'textarea') {
          const { value: textareaMirrorEl } = textareaMirrorElRef
          if (textareaMirrorEl) {
            textareaMirrorEl.textContent = (value ?? '') + '\r\n'
          }
        } else {
          const { value: inputMirrorEl } = inputMirrorElRef
          if (inputMirrorEl) {
            if (value) {
              inputMirrorEl.textContent = value
            } else {
              inputMirrorEl.innerHTML = '&nbsp;'
            }
          }
        }
      }
    }
    function handleTextAreaMirrorResize (): void {
      updateTextAreaStyle()
    }

    let stopWatchMergedValue: WatchStopHandle | null = null
    watchEffect(() => {
      const { autosize, type } = props
      if (autosize && type === 'textarea') {
        stopWatchMergedValue = watch(mergedValueRef, (value) => {
          if (!Array.isArray(value) && value !== syncSource) {
            syncMirror(value)
          }
        })
      } else {
        stopWatchMergedValue?.()
      }
    })

    const exposedProps: InputWrappedRef = {
      wrapperElRef,
      inputElRef,
      textareaElRef,
      isCompositing: isComposingRef,
      focus,
      blur,
      deactivate,
      activate
    }

    return {
      ...exposedProps,
      // DOM ref
      wrapperElRef,
      inputElRef,
      inputMirrorElRef,
      inputEl2Ref,
      textareaElRef,
      textareaMirrorElRef,
      // value
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      mergedPlaceholder: mergedPlaceholderRef,
      showPlaceholder1: showPlaceholder1Ref,
      showPlaceholder2: showPlaceholder2Ref,
      mergedFocus: mergedFocusRef,
      isComposing: isComposingRef,
      activated: activatedRef,
      showClearButton,
      mergedSize: mergedSizeRef,
      textDecorationStyle: textDecorationStyleRef,
      cPrefix: mergedClsPrefix,
      mergedBordered,
      // methods
      handleCompositionStart,
      handleCompositionEnd,
      handleInput,
      handleInputBlur,
      handleInputFocus,
      handleWrapperBlur,
      handleWrapperFocus,
      handleMouseEnter,
      handleMouseLeave,
      handleMouseDown,
      handleChange,
      handleClick,
      handleClear,
      handleWrapperKeyDown,
      handleTextAreaMirrorResize,
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const { value: size } = mergedSizeRef
        const {
          common: { cubicBezierEaseInOut },
          self: {
            color,
            borderRadius,
            textColor,
            caretColor,
            caretColorError,
            caretColorWarning,
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
            iconColor,
            iconColorDisabled,
            suffixTextColor,
            [createKey('padding', size)]: padding,
            [createKey('fontSize', size)]: fontSize,
            [createKey('height', size)]: height
          }
        } = themeRef.value
        const { left: paddingLeft, right: paddingRight } = getPadding(padding)
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
          '--caret-color-warning': caretColorWarning,
          '--color-focus-warning': colorFocusWarning,
          '--box-shadow-focus-warning': boxShadowFocusWarning,
          '--border-warning': borderWarning,
          '--border-focus-warning': borderFocusWarning,
          '--border-hover-warning': borderHoverWarning,
          // form error
          '--caret-color-error': caretColorError,
          '--color-focus-error': colorFocusError,
          '--box-shadow-focus-error': boxShadowFocusError,
          '--border-error': borderError,
          '--border-focus-error': borderFocusError,
          '--border-hover-error': borderHoverError,
          // clear-button
          '--clear-color': clearColor,
          '--clear-size': clearSize,
          '--clear-color-hover': clearColorHover,
          '--clear-color-pressed': clearColorPressed,
          '--icon-color': toRgbString(iconColor),
          '--icon-color-disabled': toRgbString(iconColorDisabled),
          '--icon-alpha': getAlphaString(iconColor),
          '--icon-alpha-disabled': getAlphaString(iconColorDisabled),
          '--suffix-text-color': suffixTextColor
        }
      })
    }
  },
  render () {
    const { cPrefix } = this
    return (
      <div
        ref="wrapperElRef"
        class={[
          `${cPrefix}-input`,
          {
            [`${cPrefix}-input--disabled`]: this.disabled,
            [`${cPrefix}-input--textarea`]: this.type === 'textarea',
            [`${cPrefix}-input--resizable`]: this.resizable && !this.autosize,
            [`${cPrefix}-input--autosize`]: this.autosize,
            [`${cPrefix}-input--round`]:
              this.round && !(this.type === 'textarea'),
            [`${cPrefix}-input--pair`]: this.pair,
            [`${cPrefix}-input--focus`]: this.mergedFocus,
            [`${cPrefix}-input--stateful`]: this.stateful
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
        onMousedown={this.handleMouseDown}
        onMouseenter={this.handleMouseEnter}
        onMouseleave={this.handleMouseLeave}
        onCompositionstart={this.handleCompositionStart}
        onCompositionend={this.handleCompositionEnd}
        onKeyup={this.onKeyup}
        onKeydown={this.handleWrapperKeyDown}
      >
        {/* textarea & basic input */}
        <div class={`${cPrefix}-input-wrapper`}>
          {this.$slots.affix || this.$slots.prefix ? (
            <div class={`${cPrefix}-input__prefix`}>
              {renderSlot(this.$slots, 'affix', undefined, () => {
                return [renderSlot(this.$slots, 'prefix')]
              })}
            </div>
          ) : null}
          {this.type === 'textarea' ? (
            <div class={`${cPrefix}-input__textarea`}>
              <textarea
                ref="textareaElRef"
                class={`${cPrefix}-input__textarea-el`}
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
              {this.showPlaceholder1 ? (
                <div class={`${cPrefix}-input__placeholder`} key="placeholder">
                  {this.mergedPlaceholder[0]}
                </div>
              ) : null}
              {this.autosize ? (
                <VResizeObserver onResize={this.handleTextAreaMirrorResize}>
                  {{
                    default: () => (
                      <div
                        ref="textareaMirrorElRef"
                        class={`${cPrefix}-input__textarea-mirror`}
                        key="mirror"
                      />
                    )
                  }}
                </VResizeObserver>
              ) : null}
            </div>
          ) : (
            <div class={`${cPrefix}-input__input`}>
              <input
                ref="inputElRef"
                type={this.type}
                class={`${cPrefix}-input__input-el`}
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
                <div class={`${cPrefix}-input__placeholder`}>
                  <span>{this.mergedPlaceholder[0]}</span>
                </div>
              ) : null}
              {this.autosize ? (
                <div
                  class={`${cPrefix}-input__input-mirror`}
                  key="mirror"
                  ref="inputMirrorElRef"
                >
                  &nbsp;
                </div>
              ) : null}
            </div>
          )}
          {!this.pair && (this.$slots.suffix || this.clearable) ? (
            <div class={`${cPrefix}-input__suffix`}>
              {[
                renderSlot(this.$slots, 'suffix'),
                this.clearable || this.$slots.clear ? (
                  <NBaseClear
                    clsPrefix={cPrefix}
                    show={this.showClearButton}
                    onClear={this.handleClear}
                  >
                    {{ default: () => renderSlot(this.$slots, 'clear') }}
                  </NBaseClear>
                ) : null
              ]}
            </div>
          ) : null}
        </div>
        {/* pair input */}
        {this.pair ? (
          <span class={`${cPrefix}-input__separator`}>
            {renderSlot(this.$slots, 'separator', undefined, () => [
              this.separator
            ])}
          </span>
        ) : null}
        {this.pair ? (
          <div class={`${cPrefix}-input-wrapper`}>
            <div class={`${cPrefix}-input__input`}>
              <input
                ref="inputEl2Ref"
                type={this.type}
                class={`${cPrefix}-input__input-el`}
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
                <div class={`${cPrefix}-input__placeholder`}>
                  <span>{this.mergedPlaceholder[1]}</span>
                </div>
              ) : null}
            </div>
            <div class={`${cPrefix}-input__suffix`}>
              {[
                renderSlot(this.$slots, 'suffix'),
                this.clearable || this.$slots.clear ? (
                  <NBaseClear
                    clsPrefix={cPrefix}
                    show={this.showClearButton}
                    onClear={this.handleClear}
                  >
                    {{ default: () => renderSlot(this.$slots, 'clear') }}
                  </NBaseClear>
                ) : null
              ]}
            </div>
          </div>
        ) : null}
        {/* border */}
        {this.mergedBordered ? (
          <div class={`${cPrefix}-input__border`} />
        ) : null}
        {this.mergedBordered ? (
          <div class={`${cPrefix}-input__state-border`} />
        ) : null}
      </div>
    )
  }
})
