<template>
  <div
    class="n-input"
    :class="{
      'n-input--disabled': disabled,
      [`n-input--${size}-size`]: true,
      'n-input--textarea': type==='textarea',
      'n-input--round': round && type!=='textarea',
      'n-input--icon': icon,
      'n-input--clearable': clearable,
      'n-input--split': split,
      'n-input--focus': focus,
      [`n-input--${iconPosition}-icon`]: iconPosition,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <pre
      v-if="isTextarea && autosize"
      ref="textAreaMirrow"
      class="n-input__textarea-mirror"
    >{{ value }}<br></pre>
    <textarea
      v-if="type==='textarea'"
      ref="textArea"
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
      @blur="handleBlur"
      @focus="handleFocus"
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
      :placeholder="split ? computedPlaceholder[0] : placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :minlength="minlength"
      :value="split ? (value && value[0]) : value"
      :readonly="readonly"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput($event, 0)"
      @change="handleChange"
      @keyup="handleKeyUp"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
    >
    <span
      v-if="split"
      class="n-input__splitor"
    >
      {{ splitor }}
    </span>
    <input
      v-if="split"
      ref="input"
      :type="type"
      class="n-input__input"
      :placeholder="split ? computedPlaceholder[1] : placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :minlength="minlength"
      :value="value && value[1]"
      :readonly="readonly"
      @blur="handleBlur"
      @focus="handleFocus"
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
import NIcon from '../../Icon'
import Emitter from '../../../mixins/emitter'
import NCancelMark from '../../../base/CancelMark'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NInput',
  components: {
    NIcon,
    NCancelMark
  },
  mixins: [ withapp, themeable, Emitter ],
  inject: {
    formItem: {
      default: null
    }
  },
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
    icon: {
      type: String,
      default: null
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
    split: {
      type: Boolean,
      default: false
    },
    iconPosition: {
      type: String,
      default: 'left'
    },
    splitor: {
      type: String,
      default: null
    },
    readonly: {
      type: [String, Boolean],
      default: false
    }
  },
  data () {
    return {
      isComposing: false,
      focus: false,
      hover: false
    }
  },
  computed: {
    computedPlaceholder () {
      if (this.split) {
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
      if (this.iconPosition === 'right' && this.showCancelMark) return false
      return true
    },
    showCancelMark () {
      if (this.disabled || !this.clearable || (!this.focus && !this.hover)) return false
      if (this.split) {
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
        const textArea = this.$refs.textArea
        const {
          paddingTop: stylePaddingTop,
          paddingBottom: stylePaddingBottom,
          lineHeight: styleLineHeight
        } = window.getComputedStyle(textArea)
        const paddingTop = Number(stylePaddingTop.slice(0, -2))
        const paddingBottom = Number(stylePaddingBottom.slice(0, -2))
        const lineHeight = Number(styleLineHeight.slice(0, -2))
        if (this.autosize.minRows) {
          const minRows = Math.max(this.autosize.minRows, 1)
          const styleMinHeight = (paddingTop + paddingBottom + lineHeight * minRows) + 'px'
          this.$refs.textAreaMirrow.style.minHeight = styleMinHeight
        }
        if (this.autosize.maxRows) {
          const maxRows = Math.max(this.autosize.maxRows, this.autosize.minRows, 1)
          const styleMaxHeight = (paddingTop + paddingBottom + lineHeight * maxRows) + 'px'
          this.$refs.textAreaMirrow.style.maxHeight = styleMaxHeight
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
      if (!this.split) {
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
    handleBlur (e) {
      this.focus = false
      this.$emit('blur', e)
      // 这里设计的冒泡还是针对特定元素, 否则会在其他不需要的元素上遍历
      if (this.formItem) {
        this.dispatch('NFormItem', 'on-form-blur', e.target.value)
      }
    },
    handleFocus (e) {
      this.focus = true
      this.$emit('focus', e)
    },
    handleKeyUp (e) {
      if (this.isComposing) return
      this.$emit('keyup', e)
    },
    handleChange (e) {
      if (this.formItem) {
        this.dispatch('NFormItem', 'on-form-change', e.target.value)
      }
      this.$emit('change', e.target.value)
    },
    handleClick (e) {
      this.$emit('click', e)
    },
    handleClear (e) {
      if (this.split) {
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
    }
  }
}
</script>
