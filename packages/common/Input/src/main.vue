<template>
  <div
    ref="wrapper"
    class="n-input"
    :class="{
      'n-input--disabled': disabled,
      [`n-input--${size}-size`]: true,
      'n-input--textarea': type==='textarea',
      'n-input--round': round && type!=='textarea',
      'n-input--clearable': clearable,
      'n-input--split': pair,
      'n-input--focus': forceFocus || focus,
      'n-input--suffix': $slots.suffix,
      'n-input--affix': $slots.affix,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    :tabindex="!disabled && (pressEnterToActivateInput && !inputFocused) ? 0 : false"
    @focus="handleWrapperFocus"
    @blur="handleWrapperBlur"
    @keyup.enter="handleWrapperKeyUpEnter"
    @keyup.esc="handleWrapperKeyUpEsc"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <pre
      v-if="isTextarea && autosize"
      ref="textareaMirrow"
      class="n-input__textarea-mirror"
    >{{ value }}<br></pre>
    <textarea
      v-if="type==='textarea'"
      ref="textarea"
      class="n-input__textarea"
      :class="{
        'n-input__textarea--autosize': autosize
      }"
      :rows="rows"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      :maxlength="maxlength"
      :minlength="minlength"
      :readonly="readonly"
      :tabindex="pressEnterToActivateInput && !inputFocused ? -1 : false"
      @blur="handleInputBlur"
      @focus="handleInputFocus"
      @input="handleInput"
      @change="handleChange"
      @keyup="handleKeyUp"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
    />
    <input
      v-else
      ref="input"
      :type="type"
      class="n-input__input"
      :tabindex="pressEnterToActivateInput && !inputFocused ? -1 : false"
      :placeholder="pair ? computedPlaceholder[0] : placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :minlength="minlength"
      :value="pair ? (value && value[0]) : value"
      :readonly="readonly"
      @blur="handleInputBlur"
      @focus="handleInputFocus"
      @input="handleInput($event, 0)"
      @change="handleChange"
      @keyup="handleKeyUp"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
    >
    <span
      v-if="pair"
      class="n-input__splitor"
    >
      {{ seperator }}
    </span>
    <input
      v-if="pair"
      ref="secondInput"
      :type="type"
      class="n-input__input"
      :tabindex="pressEnterToActivateInput && !inputFocused ? -1 : false"
      :placeholder="pair ? computedPlaceholder[1] : placeholder"
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
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
    >
    <div
      v-if="$slots.affix"
      class="n-input__affix"
    >
      <slot name="affix" />
    </div>
    <div
      v-if="$slots.suffix"
      class="n-input__suffix"
      :class="{
        'n-input__suffix--hide': !showIcon
      }"
    >
      <slot name="suffix" />
    </div>
    <div class="n-input__cancel-mark">
      <n-cancel-mark
        :theme="synthesizedTheme"
        :show="showCancelMark"
        :clearable="clearable"
        @clear="handleClear"
      />
    </div>
  </div>
</template>

<script>
import NCancelMark from '../../../base/CancelMark'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asformitem from '../../../mixins/asformitem'

export default {
  name: 'NInput',
  components: {
    NCancelMark
  },
  mixins: [ withapp, themeable, asformitem({
    change: 'change',
    blur: 'blur',
    focus: 'focus',
    input: 'input'
  })],
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
      type: String,
      default: 'medium'
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
      default: null
    },
    maxlength: {
      type: [String, Number],
      default: null
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
    seperator: {
      type: String,
      default: null
    },
    readonly: {
      type: [String, Boolean],
      default: false
    },
    lazyFocus: {
      type: Boolean,
      default: false
    },
    lazyActive: {
      type: Boolean,
      default: false
    },
    forceFocus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isComposing: false,
      focus: false,
      hover: false,
      inputFocused: false,
      shouldReturnFocusToWrapper: false,
      waitingBlurCallback: false
    }
  },
  computed: {
    pressEnterToActivateInput () {
      return this.lazyFocus || this.lazyActive
    },
    computedPlaceholder () {
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
    showIcon () {
      if (this.$slots.suffix && this.showCancelMark) return false
      return true
    },
    showCancelMark () {
      if (this.disabled || !this.clearable || (!this.focus && !this.hover)) return false
      if (this.pair) {
        return !!(Array.isArray(this.value) && (this.value[0] || this.value[1])) && (this.hover || this.focus)
      } else {
        return !!this.value && (this.hover || this.focus)
      }
    },
    isTextarea () {
      return this.type === 'textarea'
    },
    isInput () {
      return !this.isTextarea
    }
  },
  mounted () {
    this.updateTextAreaStyle()
  },
  updated () {
    this.updateTextAreaStyle()
  },
  methods: {
    updateTextAreaStyle () {
      if (this.isTextarea && this.autosize) {
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
      }
    },
    handleCompositionStart () {
      this.isComposing = true
    },
    handleCompositionEnd (event) {
      this.isComposing = false
      this.handleInput(event)
    },
    handleInput (e, index) {
      if (this.isComposing) return
      if (!this.pair) {
        this.$emit('input', e.target.value)
      } else {
        let value = this.value
        if (!Array.isArray(value)) {
          value = [null, null]
        }
        value[index] = e.target.value
        this.$emit('input', Array.from(value))
      }
    },
    handleInputBlur (e) {
      this.$emit('input-blur')
      if (this.pressEnterToActivateInput || this.pair) {
        this.inputFocused = false
        if (this.shouldReturnFocusToWrapper) {
          this.$nextTick().then(() => {
            this.$emit('blur', e, this.value)
            this.$refs.wrapper.focus()
            this.shouldReturnFocusToWrapper = false
          })
        } else {
          this.focus = false
          this.triggerBlurAsync(e)
        }
      } else {
        this.focus = false
        this.triggerBlur(e)
      }
    },
    handleInputFocus (e) {
      this.$emit('input-focus')
      if (this.pressEnterToActivateInput || this.pair) {
        this.focus = true
        if (!this.waitingBlurCallback) {
          /**
           * in case of pair
           */
          this.$emit('focus', e, this.value)
        }
        this.inputFocused = true
      } else {
        this.focus = true
        this.$emit('focus', e, this.value)
      }
    },
    handleKeyUp (e) {
      if (this.isComposing) return
      this.$emit('keyup', e)
    },
    handleChange (e) {
      this.$emit('change', e.target.value)
    },
    handleClick (e) {
      this.$emit('click', e)
    },
    handleClear () {
      if (this.pair) {
        this.$emit('change', [])
        this.$emit('input', [])
      } else {
        this.$emit('change', '')
        this.$emit('input', '')
      }
    },
    handleMouseEnter () {
      this.hover = true
    },
    handleMouseLeave () {
      this.hover = false
    },
    handleWrapperFocus (e) {
      if (this.pressEnterToActivateInput) {
        this.focus = true
        if (!this.shouldReturnFocusToWrapper) {
          this.$emit('wrapper-focus', e, this.value)
        }
      }
    },
    triggerBlur (e, fromWrapper = false) {
      if (fromWrapper) return
      if (!(
        // document.activeElement === this.$refs.wrapper ||
        document.activeElement === this.$refs.textarea ||
        document.activeElement === this.$refs.input ||
        document.activeElement === this.$refs.secondInput
      ) || e.target === document.activeElement) this.$emit('blur', e, this.value)
    },
    triggerBlurAsync (e, fromWrapper = false) {
      if (!fromWrapper) this.waitingBlurCallback = true
      window.setTimeout(() => {
        this.triggerBlur(e, fromWrapper)
        if (!fromWrapper) this.waitingBlurCallback = false
      }, 0)
    },
    handleWrapperBlur (e) {
      if (this.pressEnterToActivateInput) {
        this.focus = false
        this.$emit('wrapper-blur')
        this.triggerBlurAsync(e, true)
      }
    },
    handleWrapperKeyUpEnter () {
      if (this.pressEnterToActivateInput) {
        if (this.inputFocused) return
        if (this.type === 'textarea') {
          this.$refs.textarea.focus()
        } else {
          this.$refs.input.focus()
        }
      }
    },
    handleWrapperKeyUpEsc () {
      if (this.pressEnterToActivateInput) {
        this.shouldReturnFocusToWrapper = true
        if (this.$refs.textarea) {
          this.$refs.textarea.blur()
        }
        if (this.$refs.input) {
          this.$refs.input.blur()
        }
        if (this.$refs.secondInput) {
          this.$refs.secondInput.blur()
        }
      }
    }
  }
}
</script>
