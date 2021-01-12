<template>
  <div
    class="n-base-selection"
    :class="{
      'n-base-selection--active': active,
      'n-base-selection--selected': selected || (active && pattern),
      'n-base-selection--disabled': disabled,
      'n-base-selection--multiple': multiple,
      'n-base-selection--focus': patternInputFocused
    }"
    :style="cssVars"
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
          :size="size"
          closable
          :disabled="disabled"
          stop-click-propagation
          @close="handleDeleteOption(option)"
        >
          {{ option.label }}
        </n-tag>
        <suffix
          :loading="loading"
          :show-arrow="showArrow"
          :show-clear="mergedClearable && selected"
          @clear="handleClear"
        />
      </div>
      <div class="n-base-selection-placeholder">
        {{ placeholder }}
      </div>
    </template>
    <template v-if="multiple && filterable">
      <!-- multiple filterable -->
      <div
        ref="patternInputWrapper"
        class="n-base-selection-tags"
        :tabindex="disabled || patternInputFocused ? false : '0'"
        @blur="handleBlur"
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
        <div class="n-base-selection-input-tag">
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
        <suffix
          :loading="loading"
          :show-arrow="showArrow"
          :show-clear="mergedClearable && selected"
          @clear="handleClear"
        />
      </div>
      <div class="n-base-selection-placeholder">
        {{ placeholder }}
      </div>
    </template>
    <template v-else-if="!multiple && filterable">
      <!-- single filterable -->
      <div
        ref="patternInputWrapper"
        class="n-base-selection-label"
        :tabindex="!disabled && !patternInputFocused ? '0' : false"
        @blur="handleBlur"
      >
        <input
          ref="patternInput"
          class="n-base-selection-label__input"
          :value="patternInputFocused && active ? pattern : label"
          :placeholder="null"
          :readonly="
            !disabled && filterable && (active || autofocus)
              ? false
              : 'readonly'
          "
          :disabled="disabled"
          tabindex="-1"
          :autofocus="autofocus"
          @focus="handlePatternInputFocus"
          @blur="handlePatternInputBlur"
          @input="handlePatternInputInput"
        >
        <div
          v-if="!pattern && (active || !selectedOption)"
          class="n-base-selection-placeholder"
        >
          {{ filterablePlaceholder }}
        </div>
        <suffix
          :loading="loading"
          :show-arrow="showArrow"
          :show-clear="mergedClearable && selected"
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
        <div v-if="label && label.length" class="n-base-selection-label__input">
          {{ label }}
        </div>
        <div
          v-if="!(label && label.length)"
          class="n-base-selection-placeholder"
        >
          {{ placeholder }}
        </div>
        <suffix
          :loading="loading"
          :show-arrow="showArrow"
          :show-clear="mergedClearable && selected"
          @clear="handleClear"
        />
      </div>
    </template>
    <div v-if="bordered" class="n-base-selection__border" />
    <div v-if="bordered" class="n-base-selection__state-border" />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { NTag } from '../../../tag'
import { useTheme } from '../../../_mixins'
import { createKey } from '../../../_utils'
import { baseSelectionLight } from '../styles'
import Suffix from './Suffix.vue'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'BaseSelection',
  components: {
    Suffix,
    NTag
  },
  provide () {
    return {
      BaseSelection: this
    }
  },
  props: {
    ...useTheme.props,
    bordered: {
      type: Boolean,
      default: undefined
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
      default: undefined
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
    showArrow: {
      type: Boolean,
      default: true
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
  setup (props) {
    const themeRef = useTheme(
      'BaseSelection',
      'BaseSelection',
      style,
      baseSelectionLight,
      props
    )
    return {
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const { size } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            borderRadius,
            color,
            placeholderColor,
            textColor,
            paddingSingle,
            caretColor,
            colorDisabled,
            textColorDisabled,
            placeholderColorDisabled,
            colorActive,
            boxShadowFocus,
            boxShadowActive,
            boxShadowHover,
            border,
            borderFocus,
            borderHover,
            borderActive,
            arrowColor,
            arrowColorDisabled,
            // form warning
            colorActiveWarning,
            boxShadowFocusWarning,
            boxShadowActiveWarning,
            boxShadowHoverWarning,
            borderWarning,
            borderFocusWarning,
            borderHoverWarning,
            borderActiveWarning,
            // form error
            colorActiveError,
            boxShadowFocusError,
            boxShadowActiveError,
            boxShadowHoverError,
            borderError,
            borderFocusError,
            borderHoverError,
            borderActiveError,
            [createKey('height', size)]: height,
            [createKey('fontSize', size)]: fontSize
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--border': border,
          '--border-active': borderActive,
          '--border-focus': borderFocus,
          '--border-hover': borderHover,
          '--border-radius': borderRadius,
          '--box-shadow-active': boxShadowActive,
          '--box-shadow-focus': boxShadowFocus,
          '--box-shadow-hover': boxShadowHover,
          '--caret-color': caretColor,
          '--color': color,
          '--color-active': colorActive,
          '--color-disabled': colorDisabled,
          '--font-size': fontSize,
          '--height': height,
          '--padding-single': paddingSingle,
          '--placeholder-color': placeholderColor,
          '--placeholder-color-disabled': placeholderColorDisabled,
          '--text-color': textColor,
          '--text-color-disabled': textColorDisabled,
          '--arrow-color': arrowColor,
          '--arrow-color-disabled': arrowColorDisabled,
          // form warning
          '--color-active-warning': colorActiveWarning,
          '--box-shadow-focus-warning': boxShadowFocusWarning,
          '--box-shadow-active-warning': boxShadowActiveWarning,
          '--box-shadow-hover-warning': boxShadowHoverWarning,
          '--border-warning': borderWarning,
          '--border-focus-warning': borderFocusWarning,
          '--border-hover-warning': borderHoverWarning,
          '--border-active-warning': borderActiveWarning,
          // form error
          '--color-active-error': colorActiveError,
          '--box-shadow-focus-error': boxShadowFocusError,
          '--box-shadow-active-error': boxShadowActiveError,
          '--box-shadow-hover-error': boxShadowHoverError,
          '--border-error': borderError,
          '--border-focus-error': borderFocusError,
          '--border-hover-error': borderHoverError,
          '--border-active-error': borderActiveError
        }
      })
    }
  },
  data () {
    return {
      patternInputFocused: false,
      hover: false
    }
  },
  computed: {
    mergedClearable () {
      return this.clearable && !this.disabled && (this.hover || this.active)
    },
    filterablePlaceholder () {
      return this.selectedOption ? this.selectedOption.label : this.placeholder
    },
    label () {
      const label = (this.selectedOption && this.selectedOption.label) || ''
      return label
    },
    selected () {
      if (this.multiple) {
        return !!(
          Array.isArray(this.selectedOptions) && this.selectedOptions.length
        )
      } else {
        return this.selectedOption !== null
      }
    }
  },
  watch: {
    pattern () {
      if (this.multiple) {
        this.$nextTick(() => {
          const refs = this.$refs
          const textWidth = refs.patternInputMirror.offsetWidth
          refs.patternInput.style.width = textWidth + 'px'
        })
      }
    },
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
      const filterableElKeys = [
        'focusableEl1',
        'patternInputWrapper',
        'patternInput',
        'focusableEl2'
      ]
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
      this.doPatternInput(e)
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
})
</script>
