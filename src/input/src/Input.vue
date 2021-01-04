<template>
  <div
    ref="wrapperRef"
    class="n-input"
    :class="{
      'n-input--disabled': disabled,
      [`n-input--${mergedSize}-size`]: true,
      'n-input--textarea': type === 'textarea',
      'n-input--round': round && !(type === 'textarea'),
      'n-input--clearable': clearable,
      'n-input--split': pair,
      'n-input--focus': mergedFocus,
      'n-input--suffix': $slots.suffix,
      'n-input--prefix': $slots.prefix || $slots.affix,
      'n-input--stateful': stateful
    }"
    :style="cssVars"
    :tabindex="!disabled && passivelyActivated && !inputFocused ? 0 : false"
    @focus="handleWrapperFocus"
    @blur="handleWrapperBlur"
    @keydown.enter="handleWrapperKeyDownEnter"
    @keydown.esc="handleWrapperKeyDownEsc"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @compositionstart="handleCompositionStart"
    @compositionend="handleCompositionEnd"
  >
    <pre
      v-if="type === 'textarea' && autosize"
      ref="textareaMirrorRef"
      class="n-input__textarea-mirror"
    >{{ mergedValue }}<br></pre>
    <textarea
      v-if="type === 'textarea'"
      ref="textareaRef"
      class="n-input__textarea"
      :class="{
        'n-input__textarea--autosize': autosize
      }"
      :autofocus="autofocus"
      :rows="rows"
      :placeholder="placeholder"
      :value="mergedValue"
      :disabled="disabled"
      :maxlength="maxlength"
      :minlength="minlength"
      :readonly="readonly"
      :tabindex="passivelyActivated && !inputFocused ? -1 : false"
      @blur="handleInputBlur"
      @focus="handleInputFocus"
      @input="handleInput"
      @change="handleChange"
      @keyup="handleKeyUp"
    />
    <div v-else class="n-input-wrapper">
      <n-icon-config-provider
        v-if="$slots.affix || $slots.prefix"
        class="n-input__prefix"
        :depth="disabled ? 5 : 4"
      >
        <slot name="affix">
          <slot name="prefix" />
        </slot>
      </n-icon-config-provider>
      <div class="n-input__input">
        <input
          ref="inputRef"
          :type="type"
          class="n-input__input-el"
          :tabindex="passivelyActivated && !inputFocused ? -1 : false"
          :placeholder="mergedPlaceholder[0]"
          :disabled="disabled"
          :maxlength="maxlength"
          :minlength="minlength"
          :value="pair ? mergedValue && mergedValue[0] : mergedValue"
          :readonly="readonly"
          :autofocus="autofocus"
          :size="attrSize"
          @blur="handleInputBlur"
          @focus="handleInputFocus"
          @input="handleInput($event, 0)"
          @change="handleChange($event, 0)"
          @keyup="handleKeyUp"
        >
        <div v-if="showPlaceholder1" class="n-input__placeholder">
          <span>{{ mergedPlaceholder[0] }}</span>
        </div>
      </div>
      <n-icon-config-provider
        v-if="!pair"
        class="n-input__suffix"
        :depth="disabled ? 5 : 4"
      >
        <slot name="suffix" />
        <n-base-clear-button
          v-if="clearable || $slots.clear"
          :theme="'light'"
          :show="showClearButton"
          @clear="handleClear"
        >
          <slot name="clear" />
        </n-base-clear-button>
      </n-icon-config-provider>
    </div>
    <span v-if="pair" class="n-input__splitor">
      {{ separator }}
    </span>
    <div v-if="pair" class="n-input-wrapper">
      <div class="n-input__input">
        <input
          ref="input2Ref"
          :type="type"
          class="n-input__input-el"
          :tabindex="passivelyActivated && !inputFocused ? -1 : false"
          :placeholder="mergedPlaceholder[1]"
          :disabled="disabled"
          :maxlength="maxlength"
          :minlength="minlength"
          :value="mergedValue && mergedValue[1]"
          :readonly="readonly"
          @blur="handleInputBlur"
          @focus="handleInputFocus"
          @input="handleInput($event, 1)"
          @change="handleChange($event, 1)"
          @keyup="handleKeyUp"
        >
        <div v-if="showPlaceholder2" class="n-input__placeholder">
          <span>{{ mergedPlaceholder[1] }}</span>
        </div>
      </div>
      <n-icon-config-provider class="n-input__suffix" :depth="disabled ? 5 : 4">
        <slot name="suffix" />
        <n-base-clear-button
          v-if="clearable || $slots.clear"
          :theme="'light'"
          :show="showClearButton"
          @clear="handleClear"
        >
          <slot name="clear" />
        </n-base-clear-button>
      </n-icon-config-provider>
    </div>
    <div v-if="showTextareaPlaceholder" class="n-input__placeholder">
      {{ placeholder }}
    </div>
    <div v-if="mergedBordered" class="n-input__border" />
    <div v-if="mergedBordered" class="n-input__state-border" />
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  nextTick,
  ref,
  toRef,
  watch,
  onMounted,
  getCurrentInstance
} from 'vue'
import { useMergedState } from 'vooks'
import { NBaseClearButton } from '../../_base'
import { useTheme, useLocale, useFormItem, useConfig } from '../../_mixins'
import { call, createKey } from '../../_utils'
import NIconConfigProvider from '../../icon/src/IconConfigProvider.vue'
import style from './styles/input.cssr.js'
import { inputLight } from '../styles'

function createMethods (
  props,
  formItem,
  {
    mergedValueRef,
    uncontrolledValueRef,
    isComposingRef,
    focusedRef,
    hoverRef,
    inputFocusedRef,
    wrapperRef,
    inputRef,
    input2Ref,
    textareaRef,
    textareaMirrorRef
  }
) {
  const vm = getCurrentInstance().proxy
  const doInput = (value) => {
    const { 'onUpdate:value': onUpdateValue, onInput } = props
    const { nTriggerFormInput } = formItem
    if (onUpdateValue) call(onUpdateValue, value)
    if (onInput) call(onInput, value)
    uncontrolledValueRef.value = value
    nTriggerFormInput()
  }
  const doChange = (value) => {
    const { onChange } = props
    const { nTriggerFormChange } = formItem
    if (onChange) call(onChange, value)
    uncontrolledValueRef.value = value
    nTriggerFormChange()
  }
  const doBlur = (e) => {
    const { onBlur } = props
    const { nTriggerFormBlur } = formItem
    if (onBlur) call(onBlur, e)
    nTriggerFormBlur()
  }
  const doFocus = (e) => {
    const { onFocus } = props
    const { nTriggerFormFocus } = formItem
    if (onFocus) call(onFocus, e)
    nTriggerFormFocus()
  }
  const doClear = (...args) => {
    const { onClear } = props
    if (onClear) call(onClear, ...args)
  }
  const doInputBlur = (e) => {
    const { onInputBlur } = props
    if (onInputBlur) call(onInputBlur, e)
  }
  const doInputFocus = (e) => {
    const { onInputFocus } = props
    if (onInputFocus) call(onInputFocus, e)
  }
  const doDeactivate = () => {
    const { onDeactivate } = props
    if (onDeactivate) call(onDeactivate)
  }
  const doActivate = () => {
    const { onActivate } = props
    if (onActivate) call(onActivate)
  }
  const doKeyUp = (e) => {
    const { onKeyUp } = props
    if (onKeyUp) call(onKeyUp, e)
  }
  const doClick = (e) => {
    const { onClick } = props
    if (onClick) call(onClick, e)
  }
  const doWrapperFocus = (e) => {
    const { onWrapperFocus } = props
    if (onWrapperFocus) call(onWrapperFocus, e)
  }
  const doWrapperBlur = (e) => {
    const { onWrapperBlur } = props
    if (onWrapperBlur) call(onWrapperBlur, e)
  }
  // methods
  const handleCompositionStart = () => {
    isComposingRef.value = true
  }
  const handleCompositionEnd = (e) => {
    isComposingRef.value = false
    if (e.target === input2Ref.value) {
      handleInput(e, 1)
    } else {
      handleInput(e, 0)
    }
  }
  const handleInput = (e, index, event = 'input') => {
    if (isComposingRef.value) return
    const changedValue = e.target.value
    if (!props.pair) {
      event === 'input' ? doInput(changedValue) : doChange(changedValue)
    } else {
      let { value } = mergedValueRef
      if (!Array.isArray(value)) {
        value = [null, null]
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
  const handleInputBlur = (e) => {
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
      inputFocusedRef.value = false
    }
    dealWithEvent(e, 'blur')
  }
  const handleInputFocus = (e) => {
    doInputFocus(e)
    focusedRef.value = true
    inputFocusedRef.value = true
    doActivate()
    dealWithEvent(e, 'focus')
  }
  const handleWrapperBlur = (e) => {
    if (props.passivelyActivated) {
      doWrapperBlur(e)
      dealWithEvent(e, 'blur')
    }
  }
  const handleWrapperFocus = (e) => {
    if (props.passivelyActivated) {
      focusedRef.value = true
      doWrapperFocus(e)
      dealWithEvent(e, 'focus')
    }
  }
  const dealWithEvent = (e, type) => {
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
  const handleKeyUp = (e) => {
    doKeyUp(e)
  }
  const handleChange = (e, index) => handleInput(e, index, 'change')
  const handleClick = (e) => {
    doClick(e)
  }
  const handleClear = (e) => {
    doClear(e)
    if (props.pair) {
      doInput([])
    } else {
      doInput('')
    }
  }
  const handleMouseEnter = () => {
    hoverRef.value = true
  }
  const handleMouseLeave = () => {
    hoverRef.value = false
  }
  const handleWrapperKeyDownEnter = (e) => {
    if (props.passivelyActivated) {
      const { value: focused } = inputFocusedRef
      if (focused) {
        if (props.deactivateOnEnter) {
          handleWrapperKeyDownEsc()
        }
        return
      }
      e.preventDefault()
      if (props.type === 'textarea') {
        textareaRef.value.focus()
      } else {
        inputRef.value.focus()
      }
    }
  }
  const handleWrapperKeyDownEsc = () => {
    if (props.passivelyActivated) {
      inputFocusedRef.value = false
      nextTick(() => {
        wrapperRef.value.focus()
      })
    }
  }
  return {
    doInput,
    doChange,
    doFocus,
    doBlur,
    doClear,
    doWrapperFocus,
    doWrapperBlur,
    doInputFocus,
    doInputBlur,
    doActivate,
    doDeactivate,
    doClick,
    doKeyUp,
    handleCompositionStart,
    handleCompositionEnd,
    handleInput,
    handleInputBlur,
    handleInputFocus,
    handleWrapperBlur,
    handleWrapperFocus,
    handleMouseEnter,
    handleMouseLeave,
    handleKeyUp,
    handleChange,
    handleClick,
    handleClear,
    handleWrapperKeyDownEnter,
    handleWrapperKeyDownEsc
  }
}

export default defineComponent({
  name: 'Input',
  components: {
    NIconConfigProvider,
    NBaseClearButton
  },
  props: {
    ...useTheme.props,
    bordered: {
      type: Boolean,
      default: undefined
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: [Array, String],
      default: undefined
    },
    defaultValue: {
      type: [String, Array],
      default: null
    },
    value: {
      type: [String, Array],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: undefined
    },
    rows: {
      type: [Number, String],
      default: 3
    },
    round: {
      type: Boolean,
      default: false
    },
    minlength: {
      type: [String, Number],
      default: undefined
    },
    maxlength: {
      type: [String, Number],
      default: undefined
    },
    clearable: {
      type: Boolean,
      default: false
    },
    autosize: {
      type: [Boolean, Object],
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
      type: [Function, Array],
      default: undefined
    },
    onFocus: {
      type: [Function, Array],
      default: undefined
    },
    onBlur: {
      type: [Function, Array],
      default: undefined
    },
    onClick: {
      type: [Function, Array],
      default: undefined
    },
    onChange: {
      type: [Function, Array],
      default: undefined
    },
    onKeyUp: {
      type: [Function, Array],
      default: undefined
    },
    onClear: {
      type: [Function, Array],
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array],
      default: undefined
    },
    /** private */
    attrSize: {
      type: Number,
      default: 20
    },
    onInputBlur: {
      type: [Function, Array],
      default: undefined
    },
    onInputFocus: {
      type: [Function, Array],
      default: undefined
    },
    onDeactivate: {
      type: [Function, Array],
      default: undefined
    },
    onActivate: {
      type: [Function, Array],
      default: undefined
    },
    onWrapperFocus: {
      type: [Function, Array],
      default: undefined
    },
    onWrapperBlur: {
      type: [Function, Array],
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
    const wrapperRef = ref(null)
    const textareaRef = ref(null)
    const textareaMirrorRef = ref(null)
    const inputRef = ref(null)
    const input2Ref = ref(null)
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
    const inputFocusedRef = ref(false)
    // placeholder
    const mergedPlaceholderRef = computed(() => {
      const { placeholder, pair } = props
      if (pair) {
        if (Array.isArray(placeholder)) {
          return placeholder
        } else {
          return [placeholder, placeholder]
        }
      } else if (placeholder === undefined) {
        return [locale.value.placeholder]
      } else {
        return [placeholder]
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
    // textarea autosize
    const updateTextAreaStyle = () => {
      if (props.type === 'textarea') {
        const { autosize } = props
        if (!autosize) return
        const {
          paddingTop: stylePaddingTop,
          paddingBottom: stylePaddingBottom,
          lineHeight: styleLineHeight
        } = window.getComputedStyle(textareaRef.value)
        const paddingTop = Number(stylePaddingTop.slice(0, -2))
        const paddingBottom = Number(stylePaddingBottom.slice(0, -2))
        const lineHeight = Number(styleLineHeight.slice(0, -2))
        if (autosize.minRows) {
          const minRows = Math.max(autosize.minRows, 1)
          const styleMinHeight =
            paddingTop + paddingBottom + lineHeight * minRows + 'px'
          textareaMirrorRef.value.style.minHeight = styleMinHeight
        }
        if (autosize.maxRows) {
          const maxRows = Math.max(autosize.maxRows, autosize.minRows, 1)
          const styleMaxHeight =
            paddingTop + paddingBottom + lineHeight * maxRows + 'px'
          textareaMirrorRef.value.style.maxHeight = styleMaxHeight
        }
      }
    }
    watch([mergedValueRef, mergedSizeRef], () => {
      nextTick(updateTextAreaStyle)
    })
    onMounted(updateTextAreaStyle)
    // other methods
    const methods = createMethods(props, formItem, {
      mergedValueRef,
      uncontrolledValueRef,
      isComposingRef,
      focusedRef,
      hoverRef,
      inputFocusedRef,
      wrapperRef,
      inputRef,
      input2Ref,
      textareaRef,
      textareaMirrorRef
    })
    const focus = () => {
      if (props.disabled) return
      if (props.passivelyActivated) {
        wrapperRef.value.focus()
      } else {
        if (textareaRef.value) textareaRef.value.focus()
        else if (inputRef.value) inputRef.value.focus()
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
      inputFocused: inputFocusedRef,
      showClearButton,
      mergedSize: mergedSizeRef,
      // methods
      focus,
      ...methods,
      ...useConfig(props),
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
          '--box-shadow-focus': boxShadowFocus
        }
      })
    }
  }
})
</script>
