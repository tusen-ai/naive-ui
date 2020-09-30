<template>
  <div
    class="n-base-selection"
    :class="{
      'n-base-selection--active': active,
      'n-base-selection--selected': selected || (active && pattern),
      'n-base-selection--disabled': disabled,
      [`n-base-selection--${size}-size`]: true,
      'n-base-selection--multiple': multiple,
      'n-base-selection--focus': patternInputFocused,
      [`n-${theme}-theme`]: theme
    }"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown.capture="handleMouseDown"
    @focusin="handleFocusin"
  >
    <template v-if="multiple && !filterable">
      <!-- multiple -->
      <div
        ref="focusableEl1"
        class="n-base-selection-tags"
        :tabindex="disabled ? false : '0'"
        @blur="handleBlur"
      >
        <n-tag
          v-for="option in selectedOptions"
          :key="option.value"
          :theme="theme"
          :size="size"
          closable
          :disabled="disabled"
          stop-click-propagation
          @close="handleDeleteOption(option)"
        >
          {{ option.label }}
        </n-tag>
        <n-base-suffix
          class="n-base-selection__mark"
          :loading="loading"
          :theme="theme"
          :arrow="showArrow"
          :disabled="disabled"
          :active="active"
          :clearable="syntheticClearable && selected"
          @clear="handleClear"
        />
      </div>
      <div
        class="n-base-selection__placeholder"
      >
        {{ placeholder }}
      </div>
    </template>
    <template v-if="multiple && filterable">
      <!-- multiple filterable -->
      <div
        ref="patternInputWrapper"
        class="n-base-selection-tags"
        :tabindex="(disabled || patternInputFocused) ? false : '0'"
        @blur="handleBlur"
      >
        <n-tag
          v-for="option in selectedOptions"
          :key="option.value"
          :theme="theme"
          :size="size"
          :disabled="disabled"
          closable
          stop-click-propagation
          @close="handleDeleteOption(option)"
        >
          {{ option.label }}
        </n-tag>
        <div
          class="n-base-selection-input-tag"
        >
          <input
            ref="patternInput"
            tabindex="-1"
            :disabled="disabled"
            :value="pattern"
            :autofocus="autofocus"
            class="n-base-selection-input-tag__input"
            @blur="handlePatternInputBlur"
            @focus="handlePatternInputFocus"
            @keydown.delete="handlePatternKeyDownDelete"
            @input="handlePatternInputInput"
          >
          <span
            ref="patternInputMirror"
            class="n-base-selection-input-tag__mirror"
          >{{ pattern ? pattern : '&nbsp;' }}</span>
        </div>
        <n-base-suffix
          ref="suffix"
          class="n-base-selection__mark"
          :arrow="showArrow"
          :theme="theme"
          :disabled="disabled"
          :active="active"
          :clearable="syntheticClearable && selected"
          :loading="loading"
          @clear="handleClear"
        />
      </div>
      <div
        class="n-base-selection__placeholder"
      >
        {{ placeholder }}
      </div>
    </template>
    <template v-else-if="!multiple && filterable">
      <!-- single filterable -->
      <div
        ref="patternInputWrapper"
        class="n-base-selection-label"
        :tabindex="(!disabled && !patternInputFocused) ? '0' : false"
        @blur="handleBlur"
      >
        <input
          ref="patternInput"
          class="n-base-selection-label__input"
          :value="(patternInputFocused && active) ? pattern : label"
          :placeholder="selectedOption ? label : placeholder"
          :readonly="!disabled && filterable && (active || autofocus) ? false : 'readonly'"
          :disabled="disabled"
          tabindex="-1"
          :autofocus="autofocus"
          @focus="handlePatternInputFocus"
          @blur="handlePatternInputBlur"
          @input="handlePatternInputInput"
        >
        <n-base-suffix
          ref="suffix"
          class="n-base-selection__mark"
          :loading="loading"
          :theme="theme"
          :arrow="showArrow"
          :disabled="disabled"
          :active="active"
          :clearable="syntheticClearable && selected"
          @clear="handleClear"
        />
      </div>
    </template>
    <template v-else-if="!multiple && !filterable">
      <!-- single -->
      <div
        ref="focusableEl2"
        class="n-base-selection-label"
        :tabindex="disabled ? false : '0'"
        @blur="handleBlur"
      >
        <div
          v-if="label && label.length"
          class="n-base-selection-label__input"
        >
          {{ label }}
        </div>
        <div
          v-else
          key="placeholder"
          class="n-base-selection-label__input n-base-selection-label__input--placeholder"
        >
          {{ labelPlaceholder }}
        </div>
        <n-base-suffix
          class="n-base-selection__mark"
          :theme="theme"
          :arrow="showArrow"
          :disabled="disabled"
          :active="active"
          :clearable="syntheticClearable && selected"
          :loading="loading"
          @clear="handleClear"
        />
      </div>
    </template>
    <div class="n-base-selection-border-mask" />
  </div>
</template>

<script>
import NBaseSuffix from '../../suffix/index.js'
import NTag from '../../../tag/index.js'
import usecssr from '../../../_mixins/usecssr.js'
import styles from './styles/index.js'

export default {
  name: 'BaseSelection',
  components: {
    NBaseSuffix,
    NTag
  },
  mixins: [
    usecssr(styles)
  ],
  inject: {
    NFormItem: {
      default: null
    }
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
    },
    loading: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    onBlur: {
      type: Function,
      default: undefined
    },
    onFocus: {
      type: Function,
      default: undefined
    },
    onDeleteOption: {
      type: Function,
      default: undefined
    },
    onDeleteLastOption: {
      type: Function,
      default: undefined
    },
    onClear: {
      type: Function,
      default: undefined
    },
    onClick: {
      type: Function,
      default: undefined
    },
    onPatternInput: {
      type: Function,
      default: undefined
    }
  },
  data () {
    return {
      patternInputFocused: false,
      hover: false
    }
  },
  computed: {
    syntheticClearable () {
      return this.clearable && !this.disabled
    },
    showArrow () {
      if (!this.syntheticClearable) return true
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
        this.$nextTick(() => {
          const refs = this.$refs
          if (refs.singleInput) {
            refs.singleInput.focus()
          }
        })
      }
    }
  },
  methods: {
    doFocus (value) {
      const { onFocus } = this
      if (onFocus) onFocus(value)
    },
    doBlur (value) {
      const { onBlur } = this
      if (onBlur) onBlur(value)
    },
    doDeleteOption (value) {
      const { onDeleteOption } = this
      if (onDeleteOption) onDeleteOption(value)
    },
    doDeleteLastOption (value) {
      const { onDeleteLastOption } = this
      if (onDeleteLastOption) onDeleteLastOption(value)
    },
    doClear (value) {
      const { onClear } = this
      if (onClear) onClear(value)
    },
    doClick (value) {
      const { onClick } = this
      if (onClick) onClick(value)
    },
    doPatternInput (value) {
      const { onPatternInput } = this
      if (onPatternInput) onPatternInput(value)
    },
    handleFocusin (e) {
      if (!e.relatedTarget || !this.$el.contains(e.relatedTarget)) {
        this.doFocus()
      }
    },
    handleBlur (e) {
      // Blur to devtools to may trigger the branch, comment it for now
      // if (
      //   !e.relatedTarget &&
      //   document.activeElement !== document.body
      // ) {
      //   console.warn(
      //     '[naive-ui/base-selection]: blur event has no related target,',
      //     e.relatedTarget,
      //     ', this may be a bug of naive-ui.'
      //   )
      // }
      if (e.relatedTarget && this.$el.contains(e.relatedTarget)) return
      this.doBlur()
    },
    handleClear (e) {
      this.doClear(e)
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
      const refs = this.$refs
      for (const key of filterableElKeys) {
        const el = refs[key]
        if (el && document.hasFocus(el)) {
          e.preventDefault()
          break
        }
      }
    },
    handleClick () {
      this.doClick()
    },
    handleDeleteOption (option) {
      this.doDeleteOption(option)
    },
    handlePatternKeyDownDelete (option) {
      if (!this.pattern.length) {
        this.doDeleteLastOption()
      }
    },
    handlePatternInputInput (e) {
      if (this.multiple) {
        this.$nextTick(() => {
          const refs = this.$refs
          const textWidth = refs.patternInputMirror.offsetWidth
          refs.patternInput.style.width = textWidth + 'px'
          this.doPatternInput(e)
        })
      } else {
        this.doPatternInput(e)
      }
    },
    handlePatternInputFocus (e) {
      this.patternInputFocused = true
    },
    handlePatternInputBlur (e) {
      this.patternInputFocused = false
      this.handleBlur(e)
    },
    focusPatternInputWrapper () {
      this.patternInputFocused = false
      this.$nextTick(() => {
        const patternInputWrapper = this.$refs.patternInputWrapper
        if (patternInputWrapper) patternInputWrapper.focus()
      })
    },
    focusPatternInput () {
      this.$nextTick(() => {
        const patternInput = this.$refs.patternInput
        if (patternInput) {
          patternInput.focus()
        }
      })
    },
    blurPatternInput () {
      const patternInput = this.$refs.patternInput
      if (patternInput) {
        patternInput.blur()
      }
    }
  }
}
</script>
