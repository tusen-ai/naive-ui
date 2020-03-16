<template>
  <div
    ref="wrapper"
    class="n-input"
    :class="{
      'n-input--disabled': disabled,
      [`n-input--${syntheticSize}-size`]: true,
      'n-input--textarea': isTextarea,
      'n-input--round': round && !isTextarea,
      'n-input--clearable': clearable,
      'n-input--split': pair,
      'n-input--focus': syntheticFocus,
      'n-input--suffix': $slots.suffix,
      'n-input--prefix': $slots.prefix || $slots.affix,
      'n-input--stateful': stateful,
      [`n-${syntheticTheme}-theme`]: syntheticTheme
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
    <div v-else style="position: relative;" class="n-input-first-input">
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
      {{ seperator }}
    </span>
    <div v-if="pair" style="position: relative;">
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
            :theme="syntheticTheme"
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
import NBaseSuffix from '../../_base/Suffix'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asformitem from '../../_mixins/asformitem'

export default {
  name: 'NInput',
  components: {
    NBaseSuffix
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
        this.$nextTick().then(this.updateTextAreaStyle)
      }
    },
    syntheticSize () {
      if (this.isTextarea && this.autosize) {
        this.$nextTick().then(this.updateTextAreaStyle)
      }
    }
  },
  mounted () {
    if (this.isTextarea && this.autosize) {
      this.$nextTick().then(this.updateTextAreaStyle)
    }
  },
  methods: {
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
        this.$emit('input', changedValue)
      } else {
        let value = this.value
        if (!Array.isArray(value)) {
          value = [null, null]
        } else {
          value = [...value]
        }
        e.target.value = value[index]
        value[index] = changedValue
        this.$emit('input', `value`)
      }
    },
    handleInputBlur (e) {
      this.$emit('input-blur', e)
      const {
        input,
        secondInput,
        textarea,
        wrapper
      } = this.$refs
      if (e.relatedTarget === wrapper) {
        this.$emit('deactivate')
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
      this.$emit('input-focus', e)
      this.focused = true
      this.inputFocused = true
      const {
        wrapper
      } = this.$refs
      if (e.relatedTarget === wrapper) {
        this.$emit('activate')
      }
      this.dealWithEvent(e, 'focus')
    },
    handleWrapperBlur (e) {
      if (this.passivelyActivated) {
        this.$emit('wrapper-blur', e)
        this.dealWithEvent(e, 'blur')
      }
    },
    handleWrapperFocus (e) {
      if (this.passivelyActivated) {
        this.focused = true
        this.$emit('wrapper-focus', e)
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
          this.$emit('focus', e)
          window.test = this
          this.focused = true
        } else if (type === 'blur') {
          this.$emit('blur', e)
          this.focused = false
        }
      }
    },
    handleKeyUp (e) {
      this.$emit('keyup', e)
    },
    handleChange (e) {
      this.$emit('change', e.target.value)
    },
    handleClick (e) {
      this.$emit('click', e)
    },
    handleClear (e) {
      this.$emit('clear', e)
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
    handleWrapperKeyDownEnter (e) {
      if (this.passivelyActivated) {
        if (this.inputFocused) return
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
        this.$nextTick().then(() => {
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
