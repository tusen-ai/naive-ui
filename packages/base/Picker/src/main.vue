<template>
  <div
    class="n-base-picker"
    :class="{
      'n-base-picker--active': active,
      'n-base-picker--selected': selected || (active && pattern),
      'n-base-picker--disabled': disabled,
      [`n-base-picker--${size}-size`]: true,
      'n-base-picker--multiple': multiple,
      'n-base-picker--focus': false
    }"
    @click="handleActivatorClick"
  >
    <template v-if="multiple && !filterable">
      <div
        class="n-base-picker-tags"
        :class="{
          'n-base-picker-tags--selected': selected
        }"
        :tabindex="disabled ? false : '0'"
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
            @click.stop="handleOptionToggle(option)"
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
            @keydown.delete="handlePatternInputDelete"
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
    <template v-else-if="!multiple && filterable">
      <input
        ref="singleInput"
        :value="(active && filterable) ? pattern : (selectedOption && selectedOption.label)"
        class="n-base-picker-label"
        :placeholder="selectedOption ? selectedOption.label : placeholder"
        :readonly="!disabled && filterable ? false : 'readonly'"
        @input="handlePatternInput"
      >
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
      <div
        ref="singleInput"
        :tabindex="disabled ? false : '0'"
        class="n-base-picker-label"
        :class="{
          'n-base-picker-label--placeholder': !(label && label.length)
        }"
      >
        <template v-if="label && label.length">
          {{ label }}
        </template>
        <template v-else>
          {{ labelPlaceholder }}
        </template>
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
    labelPlaceholder () {
      return this.selectedOption ? this.selectedOption.label : this.placeholder
    },
    label () {
      const label = (this.active && this.filterable) ? this.pattern : (this.selectedOption && this.selectedOption.label)
      console.log(label)
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
      if (!active) {
        this.$nextTick().then(() => {
          this.blurSingleInput()
        })
      }
    }
  },
  methods: {
    handleOptionToggle (option) {
      this.toggleOption(option)
    },
    handleClear (e) {
      this.$emit('clear', e)
    },
    handleActivatorClick () {
      this.$emit('activator-click')
      if (this.multiple && this.filterable) {
        this.$nextTick().then(() => {
          this.focusInputTag()
        })
      }
    },
    handlePatternInputDelete (e) {
      if (!this.pattern.length) {
        // console.log(e)
        this.$emit('pattern-input-delete')
      }
    },
    handlePatternInput (e) {
      // console.log('NBasePicker, handlePatternInput', e)
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
    blurSingleInput () {
      if (this.$refs.singleInput) {
        this.$refs.singleInput.blur()
      }
    },
    focusInputTag () {
      if (this.$refs.inputTagInput) {
        this.$refs.inputTagInput.focus()
      }
    }
  }
}
</script>
