<template>
  <div
    class="n-input"
    :class="{
      'n-input--disabled': disabled,
      [`n-input--${size}-size`]: true,
      'n-input--textarea': type==='textarea',
      'n-input--round': round && type!=='textarea',
      'n-input--icon': icon,
      'n-input--clearable': clearable
    }"
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
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @click="handleClick"
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
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :minlength="minlength"
      :value="value"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @click="handleClick"
      @change="handleChange"
      @keyup="handleKeyUp"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
    >
    <div
      v-if="icon"
      class="n-input__icon"
    >
      <n-icon :type="icon" />
    </div>
    <div class="n-input__cancel-mark">
      <n-cancel-mark
        :show="!disabled && !!value"
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

export default {
  name: 'NInput',
  components: {
    NIcon,
    NCancelMark
  },
  mixins: [ Emitter ],
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
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
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
    }
  },
  data () {
    return {
      isComposing: false
    }
  },
  computed: {
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
    handleInput (e) {
      if (this.isComposing) return
      this.$emit('input', e.target.value)
    },
    handleBlur (e) {
      this.$emit('blur', e)
      // 这里设计的冒泡还是针对特定元素, 否则会在其他不需要的元素上遍历
      if (this.formItem) {
        this.dispatch('NFormItem', 'on-form-blur', e.target.value)
      }
    },
    handleFocus (e) {
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
      this.$emit('change', '')
      this.$emit('input', '')
    }
  }
}
</script>
