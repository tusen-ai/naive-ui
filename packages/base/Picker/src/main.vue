<template>
  <div
    class="n-base-picker"
    :class="{
      'n-base-picker--active': active,
      'n-base-picker--selected': selected || (active && pattern),
      'n-base-picker--disabled': disabled,
      [`n-base-picker--${size}-size`]: true,
      'n-base-picker--multiple': multiple,
      'n-base-picker--focus': patternInputFocused,
      [`n-${theme}-theme`]: theme
    }"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown.capture="handleMouseDown"
  >
    <template v-if="multiple && !filterable">
      <!-- multiple -->
      <div
        ref="focusableEl1"
        class="n-base-picker-tags"
        :tabindex="disabled ? false : '0'"
        @blur="handleBlur"
      >
        <n-tag
          v-for="option in selectedOptions"
          :key="option.value"
          :size="size"
          closable
          :disabled="disabled"
          stop-click-propagation
          @close="handleDeleteOption(option)"
        >
          {{ option.label }}
        </n-tag>
        <n-base-cancel-mark
          class="n-base-picker__mark"
          :theme="theme"
          :arrow="showArrow"
          :disabled="disabled"
          :active="active"
          :clearable="clearable && selected"
          @clear="handleClear"
        />
      </div>
      <div
        class="n-base-picker__placeholder"
      >
        {{ placeholder }}
      </div>
    </template>
    <template v-if="multiple && filterable">
      <!-- multiple filterable -->
      <div
        ref="patternInputWrapper"
        class="n-base-picker-tags"
        :tabindex="(disabled || patternInputFocused) ? false : '0'"
      >
        <n-tag
          v-for="option in selectedOptions"
          :key="option.value"
          :size="size"
          :disabled="disabled"
          closable
          stop-click-propagation
          @close="handleDeleteOption(option)"
        >
          {{ option.label }}
        </n-tag>
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
        <n-base-cancel-mark
          ref="cancelMark"
          class="n-base-picker__mark"
          :arrow="showArrow"
          :theme="theme"
          :disabled="disabled"
          :active="active"
          :clearable="clearable && selected"
          @clear="handleClear"
        />
      </div>
      <div
        class="n-base-picker__placeholder"
      >
        {{ placeholder }}
      </div>
    </template>
    <template v-else-if="!multiple && filterable">
      <!-- single filterable -->
      <div
        ref="patternInputWrapper"
        class="n-base-picker-label"
        :tabindex="(!disabled && !patternInputFocused) ? '0' : false"
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
        <n-base-cancel-mark
          ref="cancelMark"
          class="n-base-picker__mark"
          :theme="theme"
          :arrow="showArrow"
          :disabled="disabled"
          :active="active"
          :clearable="clearable && selected"
          @clear="handleClear"
        />
      </div>
    </template>
    <template v-else-if="!multiple && !filterable">
      <!-- single -->
      <div
        ref="focusableEl2"
        class="n-base-picker-label"
        :tabindex="disabled ? false : '0'"
        @blur="handleBlur"
      >
        <div
          v-if="label && label.length"
          class="n-base-picker-label__input"
        >
          {{ label }}
        </div>
        <div
          v-else
          key="placeholder"
          class="n-base-picker-label__input n-base-picker-label__input--placeholder"
        >
          {{ labelPlaceholder }}
        </div>
        <n-base-cancel-mark
          class="n-base-picker__mark"
          :theme="theme"
          :arrow="showArrow"
          :disabled="disabled"
          :active="active"
          :clearable="clearable && selected"
          @clear="handleClear"
        />
      </div>
    </template>
  </div>
</template>

<script>
import NBaseCancelMark from '../../CancelMark'
import NTag from '../../../common/Tag'

export default {
  name: 'NBasePicker',
  components: {
    NBaseCancelMark,
    NTag
  },
  props: {
    theme: {
      type: String,
      default: null
    },
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
      patternInputFocused: false,
      hover: false
    }
  },
  computed: {
    showArrow () {
      if (!this.clearable) return true
      else return !(this.hover && this.selected)
    },
    labelPlaceholder () {
      return this.selectedOption ? this.selectedOption.label : this.placeholder
    },
    label () {
      const label = (this.selectedOption && this.selectedOption.label) || ''
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
    handleMouseEnter () {
      this.hover = true
    },
    handleMouseLeave () {
      this.hover = false
    },
    handleMouseDown (e) {
      if (!this.active) return
      const filterableElKeys = ['focusableEl1', 'patternInputWrapper', 'patternInput', 'focusableEl2']
      for (const key of filterableElKeys) {
        const el = this.$refs[key]
        if (el && document.hasFocus(el)) {
          e.preventDefault()
          break
        }
      }
    },
    handleClick () {
      this.$emit('click')
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
      this.patternInputFocused = true
    },
    handlePatternInputBlur (e) {
      this.patternInputFocused = false
      this.handleBlur()
    },
    focusPatternInputWrapper () {
      if (this.$refs.patternInputWrapper) {
        this.$refs.patternInputWrapper.focus()
      }
    },
    focusPatternInput () {
      // if set to sync it won't work when mode is multiple filterable
      this.$nextTick().then(() => {
        if (this.$refs.patternInput) {
          this.$refs.patternInput.focus()
        }
      })
    },
    blurPatternInput () {
      if (this.$refs.patternInput) {
        this.$refs.patternInput.blur()
      }
    }
  }
}
</script>
