<template>
  <div
    class="n-base-picker"
    :class="{
      'n-base-picker--active': active,
      'n-base-picker--selected': selected || (active && pattern),
      'n-base-picker--disabled': disabled,
      [`n-base-picker--${size}-size`]: true,
      'n-base-picker--multiple': multiple,
      'n-base-picker--focus': patternInputFocused
    }"
    @click="handleClick"
    @mousedown="handleMouseDown"
  >
    <template v-if="multiple && !filterable">
      <!-- multiple -->
      <div
        class="n-base-picker-tags"
        :tabindex="disabled ? false : '0'"
        @blur="handleBlur"
      >
        <div
          v-for="option in selectedOptions"
          :key="option.value"
          class="n-base-picker-tag"
        >
          <div class="n-base-picker-tag__content">
            {{ option.label }}
          </div>
          <n-icon
            class="n-base-picker-tag__icon"
            type="md-close"
            @click.stop="handleDeleteOption(option)"
          />
        </div>
      </div>
      <div
        class="n-base-picker__placeholder"
      >
        {{ placeholder }}
      </div>
      <n-base-cancel-mark
        class="n-base-picker__mark"
        arrow
        :show="!remote"
        :disabled="disabled"
        :active="active"
        :clearable="clearable && selected"
        @clear="handleClear"
      />
    </template>
    <template v-if="multiple && filterable">
      <!-- multiple filterable -->
      <div
        ref="patternInputWrapper"
        class="n-base-picker-tags"
        :tabindex="(disabled || active) ? false : '0'"
      >
        <div
          v-for="option in selectedOptions"
          :key="option.value"
          class="n-base-picker-tag"
        >
          <div class="n-base-picker-tag__content">
            {{ option.label }}
          </div>
          <n-icon
            class="n-base-picker-tag__icon"
            type="md-close"
            @click.stop="handleDeleteOption(option)"
          />
        </div>
        <div
          class="n-base-picker-input-tag"
        >
          <input
            ref="patternInput"
            tabindex="-1"
            :disabled="disabled"
            :value="pattern"
            class="n-base-picker-input-tag__input"
            @blur="handlePatternInputBlur"
            @focus="handlePatternInputFocus"
            @keydown.delete="handlePatternKeyDownDelete"
            @input="handlePatternInputInput"
          >
          <span
            ref="patternInputMirror"
            class="n-base-picker-input-tag__mirror"
          >{{ pattern ? pattern : '&nbsp;' }}</span>
        </div>
      </div>
      <div
        class="n-base-picker__placeholder"
      >
        {{ placeholder }}
      </div>
      <n-base-cancel-mark
        class="n-base-picker__mark"
        arrow
        :show="!remote"
        :disabled="disabled"
        :active="active"
        :clearable="clearable && selected"
        @clear="handleClear"
      />
    </template>
    <template v-else-if="!multiple && filterable">
      <!-- single filterable -->
      <div
        ref="patternInputWrapper"
        class="n-base-picker-label"
        :tabindex="(!disabled && !active) ? '0' : false"
      >
        <input
          ref="patternInput"
          class="n-base-picker-label__input"
          :value="(patternInputFocused && active) ? pattern : label"
          :placeholder="selectedOption ? label : placeholder"
          :readonly="!disabled && filterable && active ? false : 'readonly'"
          :disabled="disabled"
          tabindex="-1"
          @focus="handlePatternInputFocus"
          @blur="handlePatternInputBlur"
          @input="handlePatternInputInput"
        >
      </div>
      <n-base-cancel-mark
        class="n-base-picker__mark"
        arrow
        :show="!remote"
        :disabled="disabled"
        :active="active"
        :clearable="clearable && selected"
        @clear="handleClear"
      />
    </template>
    <template v-else-if="!multiple && !filterable">
      <!-- single -->
      <div
        class="n-base-picker-label"
        :tabindex="disabled ? false : '0'"
        @blur="handleBlur"
      >
        <div
          class="n-base-picker-label__input"
          :class="{
            'n-base-picker-label__input--placeholder': !(label && label.length)
          }"
        >
          <template v-if="label && label.length">
            {{ label }}
          </template>
          <template v-else>
            {{ labelPlaceholder }}
          </template>
        </div>
      </div>
      <n-base-cancel-mark
        class="n-base-picker__mark"
        arrow
        :show="!remote"
        :disabled="disabled"
        :active="active"
        :clearable="clearable && selected"
        @clear="handleClear"
      />
    </template>
  </div>
</template>

<script>
import NBaseCancelMark from '../../CancelMark'
import NIcon from '../../../common/Icon'

export default {
  name: 'NBasePicker',
  components: {
    NBaseCancelMark,
    NIcon
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    pattern: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    selectedOption: {
      validator () {
        return true
      },
      default: null
    },
    selectedOptions: {
      validator () {
        return true
      },
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  data () {
    return {
      patternInputFocused: false
    }
  },
  computed: {
    labelPlaceholder () {
      return this.selectedOption ? this.selectedOption.label : this.placeholder
    },
    label () {
      const label = (this.selectedOption && this.selectedOption.label) || ''
      // console.log(label)
      return label
    },
    selected () {
      if (this.multiple) return !!(Array.isArray(this.selectedOptions) && this.selectedOptions.length)
      else {
        return this.selectedOption !== null
      }
    }
  },
  watch: {
    active (active) {
      if (active) {
        this.$nextTick().then(() => {
          if (this.$refs.singleInput) {
            this.$refs.singleInput.focus()
          }
        })
      }
    }
  },
  methods: {
    handleBlur () {
      this.$emit('blur')
    },
    handleClear (e) {
      this.$emit('clear', e)
    },
    handleMouseDown (e) {
      if (this.filterable && this.multiple) {
        e.preventDefault()
      }
    },
    handleClick () {
      this.$emit('click')
      if (this.filterable) {
        this.focusPatternInput()
      }
    },
    handleDeleteOption (option) {
      this.$emit('delete-option', option)
    },
    handlePatternKeyDownDelete (option) {
      if (!this.pattern.length) {
        this.$emit('delete-last-option')
      }
    },
    handlePatternInputInput (e) {
      // console.log('NBasePicker, handlePatternInput', e)
      if (this.multiple) {
        this.$nextTick().then(() => {
          const textWidth = this.$refs.patternInputMirror.getBoundingClientRect().width
          this.$refs.patternInput.style.width = textWidth + 'px'
          this.$emit('pattern-input', e)
        })
      } else {
        this.$emit('pattern-input', e)
      }
    },
    handlePatternInputFocus (e) {
      // console.log('handlePatternInputFocus')
      this.patternInputFocused = true
    },
    handlePatternInputBlur (e) {
      // console.log('handlePatternInputBlur')
      this.patternInputFocused = false
      this.handleBlur()
    },
    focusPatternInputWrapper () {
      if (this.$refs.patternInputWrapper) {
        this.$refs.patternInputWrapper.focus()
      }
    },
    focusPatternInput () {
      if (this.$refs.patternInput) {
        // console.log('focusPatternInput')
        this.$refs.patternInput.focus()
      }
    },
    blurPatternInput () {
      if (this.$refs.patternInput) {
        // console.log('blurPatternInput')
        this.$refs.patternInput.blur()
      }
    }
  }
}
</script>
