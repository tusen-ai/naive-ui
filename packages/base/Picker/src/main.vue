<template>
  <div
    class="n-base-picker"
    :class="{
      'n-base-picker--active': active,
      'n-base-picker--selected': selected || (active && pattern),
      'n-base-picker--disabled': disabled,
      [`n-base-picker--${size}-size`]: true,
      'n-base-picker--multiple': multiple
    }"
    @click="handleActivatorClick"
  >
    <template v-if="multiple">
      <div
        class="n-base-picker-tags"
        :class="{
          'n-base-picker-tags--selected': selected
        }"
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
            @click.stop="toggleOption(option)"
          />
        </div>
        <div
          v-if="filterable && active"
          class="n-base-picker-input-tag"
        >
          <input
            ref="inputTagInput"
            :value="pattern"
            class="n-base-picker-input-tag__input"
            @keyup.delete="handlePatternInputDelete"
            @input="handlePatternInput"
          >
          <span
            ref="inputTagMirror"
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
    <template v-else>
      <div class="n-base-picker-label">
        <input
          ref="singleInput"
          :value="singleInputActive ? pattern : (selectedOption && selectedOption.label)"
          class="n-base-picker-label__input"
          :placeholder="selectedOption ? selectedOption.label : placeholder"
          :readonly="!disabled && filterable ? false : 'readonly'"
          @input="handlePatternInput"
          @focus="handleSingleInputFocus"
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
    toggleOption: {
      type: Function,
      default: () => {}
    },
    multiple: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    singleInputActive: {
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
  computed: {
    selected () {
      if (this.multiple) return !!(Array.isArray(this.selectedOptions) && this.selectedOptions.length)
      else {
        return this.selectedOption !== null
      }
    }
  },
  methods: {
    handleClear () {
      this.$emit('clear')
    },
    handleActivatorClick () {
      this.$emit('activator-click')
    },
    handlePatternInputDelete () {
      this.$emit('pattern-input-delete')
    },
    handlePatternInput (e) {
      if (this.multiple) {
        this.$nextTick().then(() => {
          const textWidth = this.$refs.inputTagMirror.getBoundingClientRect().width
          this.$refs.inputTagInput.style.width = textWidth + 'px'
          this.$emit('pattern-input', e)
        })
      } else {
        this.$emit('pattern-input', e)
      }
    },
    handleSingleInputFocus () {
      this.$emit('single-input-focus')
    },
    blurSingleInput () {
      this.$refs.singleInput.blur()
    },
    focusInputTag () {
      this.$refs.inputTagInput.focus()
    }
  }
}
</script>
