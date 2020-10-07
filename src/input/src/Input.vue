<template>
  <div
    ref="wrapper"
    class="n-input"
    :class="{
      'n-input--disabled': disabled,
      [`n-input--${mergedSize}-size`]: true,
      'n-input--textarea': isTextarea,
      'n-input--round': round && !isTextarea,
      'n-input--clearable': clearable,
      'n-input--split': pair,
      'n-input--focus': syntheticFocus,
      'n-input--suffix': $slots.suffix,
      'n-input--prefix': $slots.prefix || $slots.affix,
      'n-input--stateful': stateful,
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
    :tabindex="!disabled && (passivelyActivated && !inputFocused) ? 0 : false"
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
      v-if="isTextarea && autosize"
      ref="textareaMirrow"
      class="n-input__textarea-mirror"
    >{{ value }}<br></pre>
    <textarea
      v-if="type === 'textarea'"
      ref="textarea"
      class="n-input__textarea"
      :class="{
        'n-input__textarea--autosize': autosize
      }"
      :autofocus="autofocus"
      :rows="rows"
      :placeholder="placeholder"
      :value="value"
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
    <div v-else class="n-input-first-input">
      <input
        ref="input"
        :type="type"
        class="n-input__input n-input__input--first"
        :tabindex="passivelyActivated && !inputFocused ? -1 : false"
        :placeholder="pair ? syntheticPlaceholder[0] : placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        :minlength="minlength"
        :value="pair ? (value && value[0]) : value"
        :readonly="readonly"
        :autofocus="autofocus"
        :size="attrSize"
        @blur="handleInputBlur"
        @focus="handleInputFocus"
        @input="handleInput($event, 0)"
        @change="handleChange"
        @keyup="handleKeyUp"
      >
      <div
        v-if="
          pair &&
            !isComposing &&
            (!value || (Array.isArray(value) && !value[0])) &&
            syntheticPlaceholder[0]
        "
        class="n-input__placeholder"
      >
        {{ syntheticPlaceholder[0] }}
      </div>
    </div>
    <span
      v-if="pair"
      class="n-input__splitor"
    >
      {{ separator }}
    </span>
    <div v-if="pair" class="n-input-second-input">
      <input
        ref="secondInput"
        :type="type"
        class="n-input__input n-input__input--second"
        :tabindex="passivelyActivated && !inputFocused ? -1 : false"
        :placeholder="syntheticPlaceholder[1]"
        :disabled="disabled"
        :maxlength="maxlength"
        :minlength="minlength"
        :value="value && value[1]"
        :readonly="readonly"
        @blur="handleInputBlur"
        @focus="handleInputFocus"
        @input="handleInput($event, 1)"
        @change="handleChange"
        @keyup="handleKeyUp"
      >
      <div
        v-if="
          !isComposing &&
            (!value || (Array.isArray(value) && !value[1])) &&
            syntheticPlaceholder[1]"
        class="n-input__placeholder"
      >
        {{ syntheticPlaceholder[1] }}
      </div>
    </div>
    <div
      v-if="$slots.affix || $slots.prefix"
      class="n-input__prefix"
    >
      <slot name="affix">
        <slot name="prefix" />
      </slot>
    </div>
    <transition name="n-button-suffix-transition">
      <div
        class="n-input__suffix"
      >
        <div class="n-input-clear">
          <n-base-suffix
            :theme="mergedTheme"
            :show="showClearButton"
            :clearable="clearable"
            @clear="handleClear"
          />
        </div>
        <slot name="suffix" />
      </div>
    </transition>
    <div
      v-if="
        !isComposing &&
          placeholder &&
          !pair &&
          !value
      "
      class="n-input__placeholder"
    >
      {{ placeholder }}
    </div>
    <div class="n-input__border-mask" />
  </div>
</template>

<script>
import NBaseSuffix from '../../_base/suffix'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asformitem from '../../_mixins/asformitem'
import usecssr from '../../_mixins/usecssr'
import { call } from '../../_utils/vue'
import styles from './styles'

export default {
  name: 'Input',
  components: {
    NBaseSuffix
  },
  mixins: [
    withapp,
    themeable,
    asformitem(),
    usecssr(styles)
  ],
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: [Array, String],
      default: ''
    },
    value: {
      type: [String, Array],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: null
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
  data () {
    return {
      focused: false,
      hover: false,
      isComposing: false,
      inputFocused: false
    }
  },
  computed: {
    syntheticPlaceholder () {
      if (this.pair) {
        if (Array.isArray(this.placeholder)) {
          return this.placeholder
        } else {
          return [this.placeholder, this.placeholder]
        }
      } else {
        return this.placeholder
      }
    },
    syntheticFocus () {
      return this.forceFocus || this.focused
    },
    showClearButton () {
      if (this.disabled || !this.clearable || (!this.syntheticFocus && !this.hover)) return false
      if (this.pair) {
        return !!(
          Array.isArray(this.value) &&
          (this.value[0] || this.value[1])
        ) &&
        (this.hover || this.syntheticFocus)
      } else {
        return !!this.value && (this.hover || this.syntheticFocus)
      }
    },
    isTextarea () {
      return this.type === 'textarea'
    },
    isInput () {
      return !this.isTextarea
    }
  },
  watch: {
    value () {
      if (this.isTextarea && this.autosize) {
        this.$nextTick(this.updateTextAreaStyle)
      }
    },
    mergedSize () {
      if (this.isTextarea && this.autosize) {
        this.$nextTick(this.updateTextAreaStyle)
      }
    }
  },
  mounted () {
    if (this.isTextarea && this.autosize) {
      this.$nextTick(this.updateTextAreaStyle)
    }
  },
  methods: {
    doInput (value) {
      const {
        'onUpdate:value': onUpdateValue,
        onInput,
        __triggerFormInput
      } = this
      if (onUpdateValue) call(onUpdateValue, value)
      if (onInput) call(onInput, value)
      __triggerFormInput()
    },
    doChange (value) {
      const {
        onChange,
        __triggerFormChange
      } = this
      if (onChange) call(onChange, value)
      __triggerFormChange()
    },
    doBlur (e) {
      const {
        onBlur,
        __triggerFormBlur
      } = this
      if (onBlur) call(onBlur, e)
      __triggerFormBlur()
    },
    doFocus (e) {
      const {
        onFocus,
        __triggerFormFocus
      } = this
      if (onFocus) call(onFocus, e)
      __triggerFormFocus()
    },
    doClear (...args) {
      const {
        onClear
      } = this
      if (onClear) call(onClear, ...args)
    },
    doInputBlur (e) {
      const {
        onInputBlur
      } = this
      if (onInputBlur) call(onInputBlur, e)
    },
    doInputFocus (e) {
      const {
        onInputFocus
      } = this
      if (onInputFocus) call(onInputFocus, e)
    },
    doDeactivate () {
      const {
        onDeactivate
      } = this
      if (onDeactivate) call(onDeactivate)
    },
    doActivate () {
      const {
        onActivate
      } = this
      if (onActivate) call(onActivate)
    },
    doKeyUp (e) {
      const {
        onKeyUp
      } = this
      if (onKeyUp) call(onKeyUp, e)
    },
    doClick (e) {
      const {
        onClick
      } = this
      if (onClick) call(onClick, e)
    },
    doWrapperFocus (e) {
      const {
        onWrapperFocus
      } = this
      if (onWrapperFocus) call(onWrapperFocus, e)
    },
    doWrapperBlur (e) {
      const {
        onWrapperBlur
      } = this
      if (onWrapperBlur) call(onWrapperBlur, e)
    },
    updateTextAreaStyle () {
      const textarea = this.$refs.textarea
      const {
        paddingTop: stylePaddingTop,
        paddingBottom: stylePaddingBottom,
        lineHeight: styleLineHeight
      } = window.getComputedStyle(textarea)
      const paddingTop = Number(stylePaddingTop.slice(0, -2))
      const paddingBottom = Number(stylePaddingBottom.slice(0, -2))
      const lineHeight = Number(styleLineHeight.slice(0, -2))
      if (this.autosize.minRows) {
        const minRows = Math.max(this.autosize.minRows, 1)
        const styleMinHeight = (paddingTop + paddingBottom + lineHeight * minRows) + 'px'
        this.$refs.textareaMirrow.style.minHeight = styleMinHeight
      }
      if (this.autosize.maxRows) {
        const maxRows = Math.max(this.autosize.maxRows, this.autosize.minRows, 1)
        const styleMaxHeight = (paddingTop + paddingBottom + lineHeight * maxRows) + 'px'
        this.$refs.textareaMirrow.style.maxHeight = styleMaxHeight
      }
    },
    handleCompositionStart () {
      this.isComposing = true
    },
    handleCompositionEnd (e) {
      this.isComposing = false
      if (e.target === this.$refs.secondInput) {
        this.handleInput(e, 1)
      } else {
        this.handleInput(e, 0)
      }
    },
    handleInput (e, index) {
      if (this.isComposing) return
      const changedValue = e.target.value
      if (!this.pair) {
        this.doInput(changedValue)
      } else {
        let value = this.value
        if (!Array.isArray(value)) {
          value = [null, null]
        } else {
          value = [...value]
        }
        value[index] = changedValue
        this.doInput(value)
      }
      /** force update to sync input's view with value */
      this.$forceUpdate()
    },
    handleInputBlur (e) {
      this.doInputBlur(e)
      const {
        input,
        secondInput,
        textarea,
        wrapper
      } = this.$refs
      if (e.relatedTarget === wrapper) {
        this.doDeactivate()
      }
      if (!(
        e.relatedTarget === input ||
        e.relatedTarget === secondInput ||
        e.relatedTarget === textarea
      )) {
        this.inputFocused = false
      }
      this.dealWithEvent(e, 'blur')
    },
    handleInputFocus (e) {
      this.doInputFocus(e)
      this.focused = true
      this.inputFocused = true
      const {
        wrapper
      } = this.$refs
      if (e.relatedTarget === wrapper) {
        this.doActivate()
      }
      this.dealWithEvent(e, 'focus')
    },
    handleWrapperBlur (e) {
      if (this.passivelyActivated) {
        this.doWrapperBlur(e)
        this.dealWithEvent(e, 'blur')
      }
    },
    handleWrapperFocus (e) {
      if (this.passivelyActivated) {
        this.focused = true
        this.doWrapperFocus(e)
        this.dealWithEvent(e, 'focus')
      }
    },
    dealWithEvent (e, type) {
      const {
        input,
        secondInput,
        textarea,
        wrapper
      } = this.$refs
      if (
        e.relatedTarget === input ||
        e.relatedTarget === secondInput ||
        e.relatedTarget === textarea ||
        e.relatedTarget === wrapper
      ) {
        /**
         * activeElement transfer inside the input, do nothing
         */
      } else {
        if (type === 'focus') {
          this.doFocus(e)
          this.focused = true
        } else if (type === 'blur') {
          this.doBlur(e)
          this.focused = false
        }
      }
    },
    handleKeyUp (e) {
      this.doKeyUp(e)
    },
    handleChange (e) {
      this.doChange(e.target.value)
    },
    handleClick (e) {
      this.doClick(e)
    },
    handleClear (e) {
      this.doClear(e)
      if (this.pair) {
        this.doInput([])
      } else {
        this.doInput('')
      }
    },
    handleMouseEnter () {
      this.hover = true
    },
    handleMouseLeave () {
      this.hover = false
    },
    handleWrapperKeyDownEnter (e) {
      if (this.passivelyActivated) {
        if (this.inputFocused && this.deactivateOnEnter) {
          this.handleWrapperKeyDownEsc()
          return
        }
        e.preventDefault()
        if (this.type === 'textarea') {
          this.$refs.textarea.focus()
        } else {
          this.$refs.input.focus()
        }
      }
    },
    handleWrapperKeyDownEsc () {
      if (this.passivelyActivated) {
        this.inputFocused = false
        this.$nextTick(() => {
          this.$refs.wrapper.focus()
        })
      }
    },
    focus () {
      const refs = this.$refs
      if (this.passivelyActivated) {
        refs.wrapper.focus()
      } else {
        if (refs.textarea) refs.textarea.focus()
        else if (refs.input) refs.input.focus()
      }
    }
  }
}
</script>
