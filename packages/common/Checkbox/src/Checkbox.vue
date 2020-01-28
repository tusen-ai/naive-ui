<template>
  <div
    class="n-checkbox"
    :class="{
      'n-checkbox--checked': synthesizedChecked,
      'n-checkbox--disabled': synthesizedDisabled,
      'n-checkbox--indeterminate': indeterminate,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    :tabindex="synthesizedDisabled ? false : 0"
    @keyup.enter="handleKeyUpEnter"
    @keyup.space="handleKeyUpSpace"
    @keydown.space="handleKeyDownSpace"
  >
    <div
      class="n-checkbox-box"
      @click="handleClick"
    >
      <check-mark class="n-checkbox-box__check-mark" />
      <line-mark class="n-checkbox-box__line-mark" />
    </div>
    <span
      v-if="$slots.default"
      class="n-checkbox__label"
      @click="handleClick"
    >
      <slot />
    </span>
  </div>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asthemecontext from '../../../mixins/asthemecontext'
import asformitem from '../../../mixins/asformitem'
import CheckMark from './CheckMark'
import LineMark from './LineMark'
import collectable from '../../../mixins/collectable'

export default {
  name: 'NCheckbox',
  inject: {
    NCheckboxGroup: {
      default: null
    }
  },
  components: {
    CheckMark,
    LineMark
  },
  mixins: [
    withapp,
    themeable,
    asthemecontext,
    asformitem(),
    collectable('NCheckboxGroup', 'collectedCheckboxValues')
  ],
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    value: {
      type: [Number, Boolean, String],
      default: null
    },
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    synthesizedDisabled () {
      if (this.disabled || (this.NCheckboxGroup && this.NCheckboxGroup.disabled)) return true
      return false
    },
    synthesizedChecked () {
      if (this.NCheckboxGroup) {
        const checkboxGroupValueSet = this.NCheckboxGroup.valueAsSet
        if (checkboxGroupValueSet) {
          return checkboxGroupValueSet.has(this.value)
        }
        return false
      } else {
        return this.checked
      }
    }
  },
  methods: {
    registerValue (value = undefined, oldValue = undefined) {
      if (this.NCheckboxGroup) {
        const values = new Set(this.NCheckboxGroup.collectedCheckboxValues)
        if (oldValue !== undefined) values.delete(oldValue)
        if (value !== undefined) values.add(value)
        this.NCheckboxGroup.collectedCheckboxValues = Array.from(values)
      }
    },
    toggle () {
      if (this.NCheckboxGroup) {
        this.NCheckboxGroup.toggleCheckbox(!this.synthesizedChecked, this.value)
      } else {
        this.$emit('change', !this.synthesizedChecked, this.synthesizedChecked)
      }
    },
    handleClick (e) {
      this.$emit('click', e)
      if (!this.synthesizedDisabled) {
        this.toggle()
      }
    },
    handleKeyUpEnter (e) {
      if (!this.synthesizedDisabled) {
        this.toggle()
      }
    },
    handleKeyDownSpace (e) {
      e.preventDefault()
    },
    handleKeyUpSpace (e) {
      this.handleKeyUpEnter()
    }
  }
}
</script>
