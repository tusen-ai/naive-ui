<template>
  <div
    v-if="type==='textarea'"
    class="n-input"
    :class="{
      'is-disabled': disabled
    }"
  >
    <textarea
      ref="textarea"
      class="n-input__textarea"
      :class="{
        [`n-input__textarea--${size}-size`]: true
      }"
      :rows="rows"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled === true"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @change="handleChange"
      @keyup="handleKeyUp"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
    />
  </div>
  <div
    v-else
    class="n-input"
    :class="{
      'is-disabled': disabled
    }"
  >
    <input
      ref="input"
      :type="type"
      class="n-input__input"
      :class="{
        [`n-input__input--${size}-size`]: true,
        [`n-input__input--round`]: round,
        [`n-input__input--icon`]: icon
      }"
      :placeholder="placeholder"
      :disabled="disabled === true"
      :maxlength="maxlength"
      :value="value"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
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
  </div>
</template>

<script>
import nIcon from '../../Icon'
import Emitter from '../../../mixins/emitter'

export default {
  name: 'NInput',
  components: {
    nIcon
  },
  mixins: [ Emitter ],
  inject: {
    form: {
      default: null
    },
    formItem: {
      default: null
    }
  },
  model: {
    prop: 'value',
    event: 'input'
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
      default: 'default'
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
    maxlength: {
      type: [String, Number],
      default: 'false'
    }
  },
  data () {
    return {
      isComposing: false
    }
  },
  computed: {
    validateState () {
      return this.formItem ? this.formItem.validateState : ''
    }
  },
  methods: {
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
    }
  }
}
</script>
