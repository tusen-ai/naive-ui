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
  WatchStopHandle,
  provide,
  InputHTMLAttributes,
  TextareaHTMLAttributes
} from 'vue'
import { useMergedState, useMemo } from 'vooks'
import { getPadding } from 'seemly'
import { VResizeObserver } from 'vueuc'
import { NBaseClear, NBaseIcon, NBaseSuffix } from '../../_internal'
import { EyeIcon, EyeOffIcon } from '../../_internal/icons'
import { useTheme, useLocale, useFormItem, useConfig } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { call, createKey, ExtractPublicPropTypes, warnOnce } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import { inputLight } from '../styles'
import type { InputTheme } from '../styles'
import {
  OnUpdateValue,
  OnUpdateValueImpl,
  Size,
  InputWrappedRef,
  inputInjectionKey
} from './interface'
import { isEmptyValue } from './utils'
import WordCount from './WordCount'
import style from './styles/input.cssr'
import { off, on } from 'evtd'

const inputProps = {
  ...(useTheme.props as ThemeProps<InputTheme>),
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  type: {
    type: String as PropType<'text' | 'textarea' | 'password'>,
    default: 'text'
  },
  placeholder: [Array, String] as PropType<string | [string, string]>,
  defaultValue: {
    type: [String, Array] as PropType<null | string | [string, string]>,
    default: null
  },
  value: [String, Array] as PropType<null | string | [string, string]>,
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  size: String as PropType<Size>,
  rows: {
    type: [Number, String] as PropType<number | string>,
    default: 3
  },
  round: Boolean,
  minlength: [String, Number] as PropType<number | string>,
  maxlength: [String, Number] as PropType<number | string>,
  clearable: Boolean,
  autosize: {
    type: [Boolean, Object] as PropType<
    boolean | { minRows?: number, maxRows?: number }
    >,
    default: false
  },
  pair: Boolean,
  separator: String,
  readonly: {
    type: [String, Boolean],
    default: false
  },
  passivelyActivated: Boolean,
  showPasswordOn: String as PropType<'mousedown' | 'click'>,
  stateful: {
    type: Boolean,
    default: true
  },
  autofocus: Boolean,
  inputProps: Object as PropType<TextareaHTMLAttributes | InputHTMLAttributes>,
  resizable: {
    type: Boolean,
    default: true
  },
  showCount: Boolean,
  loading: {
    type: Boolean,
    default: undefined
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
  internalDeactivateOnEnter: Boolean,
  internalForceFocus: Boolean,
  internalLoadingBeforeSuffix: Boolean,
  /** deprecated */
  showPasswordToggle: Boolean
}

export type InputProps = ExtractPublicPropTypes<typeof inputProps>

export default defineComponent({
  name: 'Input',
  props: inputProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.showPasswordToggle) {
          warnOnce(
            'input',
            '`show-password-toggle` is deprecated, please use `showPasswordOn="click"` instead'
          )
        }
      })
    }
    const { mergedClsPrefixRef, mergedBorderedRef } = useConfig(props)
    const themeRef = useTheme(
      'Input',
      'Input',
      style,
      inputLight,
      props,
      mergedClsPrefixRef
    )
    // dom refs
    const wrapperElRef = ref<HTMLElement | null>(null)
    const textareaElRef = ref<HTMLTextAreaElement | null>(null)
    const textareaMirrorElRef = ref<HTMLElement | null>(null)
    const inputMirrorElRef = ref<HTMLElement | null>(null)
    const inputElRef = ref<HTMLInputElement | null>(null)
    const inputEl2Ref = ref<HTMLInputElement | null>(null)
    // local
    const { localeRef } = useLocale('Input')
    // value
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    // form-item
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef } = formItem
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
        return [localeRef.value.placeholder]
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
        (isEmptyValue(mergedValue) ||
          (Array.isArray(mergedValue) && isEmptyValue(mergedValue[0]))) &&
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
        (isEmptyValue(mergedValue) ||
          (Array.isArray(mergedValue) && isEmptyValue(mergedValue[1])))
      )
    })
    // focus
    const mergedFocusRef = useMemo(() => {
      return props.internalForceFocus || focusedRef.value
    })
    // clear
    const showClearButton = useMemo(() => {
      if (
        mergedDisabledRef.value ||
        props.readonly ||
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
    // passwordVisible
    const mergedShowPasswordOnRef = computed(() => {
      const { showPasswordOn } = props
      if (showPasswordOn) {
        return showPasswordOn
      }
      if (props.showPasswordToggle) return 'click'
      return undefined
    })
    const passwordVisibleRef = ref<boolean>(false)
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
    // word count
    const maxlengthRef = computed(() => {
      const { maxlength } = props
      return maxlength === undefined ? undefined : Number(maxlength)
    })
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
      ;(vm.$forceUpdate as any)()
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
        doChange(['', ''])
      } else {
        doUpdateValue('')
        doChange('')
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
            const { left, top, width, height } =
              wrapperEl.getBoundingClientRect()
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
    function handlePasswordToggleClick (): void {
      if (mergedDisabledRef.value) return
      if (mergedShowPasswordOnRef.value !== 'click') return
      passwordVisibleRef.value = !passwordVisibleRef.value
    }
    function handlePasswordToggleMousedown (e: MouseEvent): void {
      if (mergedDisabledRef.value) return
      e.preventDefault()
      const preventDefaultOnce = (e: MouseEvent): void => {
        e.preventDefault()
        off('mouseup', document, preventDefaultOnce)
      }
      on('mouseup', document, preventDefaultOnce)
      if (mergedShowPasswordOnRef.value !== 'mousedown') return
      passwordVisibleRef.value = true
      const hidePassword = (): void => {
        passwordVisibleRef.value = false
        off('mouseup', document, hidePassword)
      }
      on('mouseup', document, hidePassword)
    }
    function handleWrapperKeyDown (e: KeyboardEvent): void {
      props.onKeydown?.(e)
      switch (e.code) {
        case 'Escape':
          handleWrapperKeyDownEsc()
          break
        case 'Enter':
        case 'NumpadEnter':
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
      if (mergedDisabledRef.value) return
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
    function select (): void {
      textareaElRef.value?.select()
      inputElRef.value?.select()
    }
    function activate (): void {
      if (mergedDisabledRef.value) return
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

    provide(inputInjectionKey, {
      mergedValueRef,
      maxlengthRef,
      mergedClsPrefixRef
    })

    const exposedProps: InputWrappedRef = {
      wrapperElRef,
      inputElRef,
      textareaElRef,
      isCompositing: isComposingRef,
      focus,
      blur,
      select,
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
      passwordVisible: passwordVisibleRef,
      mergedPlaceholder: mergedPlaceholderRef,
      showPlaceholder1: showPlaceholder1Ref,
      showPlaceholder2: showPlaceholder2Ref,
      mergedFocus: mergedFocusRef,
      isComposing: isComposingRef,
      activated: activatedRef,
      showClearButton,
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      textDecorationStyle: textDecorationStyleRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      mergedShowPasswordOn: mergedShowPasswordOnRef,
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
      handlePasswordToggleClick,
      handlePasswordToggleMousedown,
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
            countTextColor,
            iconColorHover,
            iconColorPressed,
            loadingColor,
            loadingColorError,
            loadingColorWarning,
            [createKey('padding', size)]: padding,
            [createKey('fontSize', size)]: fontSize,
            [createKey('height', size)]: height
          }
        } = themeRef.value
        const { left: paddingLeft, right: paddingRight } = getPadding(padding)
        return {
          '--n-bezier': cubicBezierEaseInOut,
          '--n-count-text-color': countTextColor,
          '--n-color': color,
          '--n-font-size': fontSize,
          '--n-border-radius': borderRadius,
          '--n-height': height,
          '--n-padding-left': paddingLeft,
          '--n-padding-right': paddingRight,
          '--n-text-color': textColor,
          '--n-caret-color': caretColor,
          '--n-text-decoration-color': textDecorationColor,
          '--n-border': border,
          '--n-border-disabled': borderDisabled,
          '--n-border-hover': borderHover,
          '--n-border-focus': borderFocus,
          '--n-placeholder-color': placeholderColor,
          '--n-placeholder-color-disabled': placeholderColorDisabled,
          '--n-icon-size': iconSize,
          '--n-line-height-textarea': lineHeightTextarea,
          '--n-color-disabled': colorDisabled,
          '--n-color-focus': colorFocus,
          '--n-text-color-disabled': textColorDisabled,
          '--n-box-shadow-focus': boxShadowFocus,
          '--n-loading-color': loadingColor,
          // form warning
          '--n-caret-color-warning': caretColorWarning,
          '--n-color-focus-warning': colorFocusWarning,
          '--n-box-shadow-focus-warning': boxShadowFocusWarning,
          '--n-border-warning': borderWarning,
          '--n-border-focus-warning': borderFocusWarning,
          '--n-border-hover-warning': borderHoverWarning,
          '--n-loading-color-warning': loadingColorWarning,
          // form error
          '--n-caret-color-error': caretColorError,
          '--n-color-focus-error': colorFocusError,
          '--n-box-shadow-focus-error': boxShadowFocusError,
          '--n-border-error': borderError,
          '--n-border-focus-error': borderFocusError,
          '--n-border-hover-error': borderHoverError,
          '--n-loading-color-error': loadingColorError,
          // clear-button
          '--n-clear-color': clearColor,
          '--n-clear-size': clearSize,
          '--n-clear-color-hover': clearColorHover,
          '--n-clear-color-pressed': clearColorPressed,
          '--n-icon-color': iconColor,
          '--n-icon-color-hover': iconColorHover,
          '--n-icon-color-pressed': iconColorPressed,
          '--n-icon-color-disabled': iconColorDisabled,
          '--n-suffix-text-color': suffixTextColor
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        ref="wrapperElRef"
        class={[
          `${mergedClsPrefix}-input`,
          {
            [`${mergedClsPrefix}-input--disabled`]: this.mergedDisabled,
            [`${mergedClsPrefix}-input--textarea`]: this.type === 'textarea',
            [`${mergedClsPrefix}-input--resizable`]:
              this.resizable && !this.autosize,
            [`${mergedClsPrefix}-input--autosize`]: this.autosize,
            [`${mergedClsPrefix}-input--round`]:
              this.round && !(this.type === 'textarea'),
            [`${mergedClsPrefix}-input--pair`]: this.pair,
            [`${mergedClsPrefix}-input--focus`]: this.mergedFocus,
            [`${mergedClsPrefix}-input--stateful`]: this.stateful
          }
        ]}
        style={this.cssVars as CSSProperties}
        tabindex={
          !this.mergedDisabled && this.passivelyActivated && !this.activated
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
        <div class={`${mergedClsPrefix}-input-wrapper`}>
          {this.$slots.affix || this.$slots.prefix ? (
            <div class={`${mergedClsPrefix}-input__prefix`}>
              {renderSlot(this.$slots, 'affix', undefined, () => {
                return [renderSlot(this.$slots, 'prefix')]
              })}
            </div>
          ) : null}
          {this.type === 'textarea' ? (
            <div class={`${mergedClsPrefix}-input__textarea`}>
              <textarea
                {...this.inputProps}
                ref="textareaElRef"
                class={`${mergedClsPrefix}-input__textarea-el`}
                autofocus={this.autofocus}
                rows={Number(this.rows)}
                placeholder={this.placeholder as string | undefined}
                value={this.mergedValue as string | undefined}
                disabled={this.mergedDisabled}
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
                <div
                  class={`${mergedClsPrefix}-input__placeholder`}
                  key="placeholder"
                >
                  {this.mergedPlaceholder[0]}
                </div>
              ) : null}
              {this.autosize ? (
                <VResizeObserver onResize={this.handleTextAreaMirrorResize}>
                  {{
                    default: () => (
                      <div
                        ref="textareaMirrorElRef"
                        class={`${mergedClsPrefix}-input__textarea-mirror`}
                        key="mirror"
                      />
                    )
                  }}
                </VResizeObserver>
              ) : null}
            </div>
          ) : (
            <div class={`${mergedClsPrefix}-input__input`}>
              <input
                type={
                  this.type === 'password' &&
                  this.mergedShowPasswordOn &&
                  this.passwordVisible
                    ? 'text'
                    : this.type
                }
                {...this.inputProps}
                ref="inputElRef"
                class={`${mergedClsPrefix}-input__input-el`}
                style={this.textDecorationStyle[0] as any}
                tabindex={
                  this.passivelyActivated && !this.activated ? -1 : undefined
                }
                placeholder={this.mergedPlaceholder[0]}
                disabled={this.mergedDisabled}
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
                onBlur={this.handleInputBlur}
                onFocus={this.handleInputFocus}
                onInput={(e) => this.handleInput(e, 0)}
                onChange={(e) => this.handleChange(e, 0)}
              />
              {this.showPlaceholder1 ? (
                <div class={`${mergedClsPrefix}-input__placeholder`}>
                  <span>{this.mergedPlaceholder[0]}</span>
                </div>
              ) : null}
              {this.autosize ? (
                <div
                  class={`${mergedClsPrefix}-input__input-mirror`}
                  key="mirror"
                  ref="inputMirrorElRef"
                >
                  &nbsp;
                </div>
              ) : null}
            </div>
          )}
          {!this.pair &&
          (this.$slots.suffix ||
            this.clearable ||
            this.showCount ||
            this.mergedShowPasswordOn ||
            this.loading !== undefined) ? (
            <div class={`${mergedClsPrefix}-input__suffix`}>
              {[
                this.clearable || this.$slots.clear ? (
                  <NBaseClear
                    clsPrefix={mergedClsPrefix}
                    show={this.showClearButton}
                    onClear={this.handleClear}
                  >
                    {{ default: () => renderSlot(this.$slots, 'clear') }}
                  </NBaseClear>
                ) : null,
                !this.internalLoadingBeforeSuffix
                  ? renderSlot(this.$slots, 'suffix')
                  : null,
                this.loading !== undefined ? (
                  <NBaseSuffix
                    clsPrefix={mergedClsPrefix}
                    loading={this.loading}
                    showArrow={false}
                    showClear={false}
                    style={this.cssVars as CSSProperties}
                  />
                ) : null,
                this.internalLoadingBeforeSuffix
                  ? renderSlot(this.$slots, 'suffix')
                  : null,
                this.showCount && this.type !== 'textarea' ? (
                  <WordCount>{{ default: this.$slots.count }}</WordCount>
                ) : null,
                this.mergedShowPasswordOn && this.type === 'password' ? (
                  <NBaseIcon
                    clsPrefix={mergedClsPrefix}
                    class={`${mergedClsPrefix}-input__eye`}
                    onMousedown={this.handlePasswordToggleMousedown}
                    onClick={this.handlePasswordToggleClick}
                  >
                    {{
                      default: () =>
                        this.passwordVisible ? <EyeIcon /> : <EyeOffIcon />
                    }}
                  </NBaseIcon>
                ) : null
              ]}
            </div>
              ) : null}
        </div>
        {/* pair input */}
        {this.pair ? (
          <span class={`${mergedClsPrefix}-input__separator`}>
            {renderSlot(this.$slots, 'separator', undefined, () => [
              this.separator
            ])}
          </span>
        ) : null}
        {this.pair ? (
          <div class={`${mergedClsPrefix}-input-wrapper`}>
            <div class={`${mergedClsPrefix}-input__input`}>
              <input
                ref="inputEl2Ref"
                type={this.type}
                class={`${mergedClsPrefix}-input__input-el`}
                tabindex={
                  this.passivelyActivated && !this.activated ? -1 : undefined
                }
                placeholder={this.mergedPlaceholder[1]}
                disabled={this.mergedDisabled}
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
                <div class={`${mergedClsPrefix}-input__placeholder`}>
                  <span>{this.mergedPlaceholder[1]}</span>
                </div>
              ) : null}
            </div>
            <div class={`${mergedClsPrefix}-input__suffix`}>
              {[
                this.clearable || this.$slots.clear ? (
                  <NBaseClear
                    clsPrefix={mergedClsPrefix}
                    show={this.showClearButton}
                    onClear={this.handleClear}
                  >
                    {{ default: () => renderSlot(this.$slots, 'clear') }}
                  </NBaseClear>
                ) : null,
                renderSlot(this.$slots, 'suffix')
              ]}
            </div>
          </div>
        ) : null}
        {/* border */}
        {this.mergedBordered ? (
          <div class={`${mergedClsPrefix}-input__border`} />
        ) : null}
        {this.mergedBordered ? (
          <div class={`${mergedClsPrefix}-input__state-border`} />
        ) : null}
        {this.showCount && this.type === 'textarea' ? (
          <WordCount>{{ default: this.$slots.count }}</WordCount>
        ) : null}
      </div>
    )
  }
})
