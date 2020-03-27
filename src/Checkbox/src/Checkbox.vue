<template>
  <div
    class="n-checkbox"
    :class="{
      'n-checkbox--checked': syntheticChecked,
      'n-checkbox--disabled': syntheticDisabled,
      'n-checkbox--indeterminate': indeterminate,
      'n-checkbox--table-header': tableHeader,
      [`n-checkbox--${syntheticSize}-size`]: true,
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
    }"
    :tabindex="syntheticDisabled ? false : 0"
    @keyup.enter="handleKeyUpEnter"
    @keyup.space="handleKeyUpSpace"
    @keydown.space="handleKeyDownSpace"
    @click="handleClick"
  >
    <div
      class="n-checkbox-box"
    >
      <check-mark class="n-checkbox-box__check-mark" />
      <line-mark class="n-checkbox-box__line-mark" />
    </div>
    <span
      v-if="$slots.default"
      class="n-checkbox__label"
    >
      <slot />
    </span>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asformitem from '../../_mixins/asformitem'
import CheckMark from './CheckMark'
import LineMark from './LineMark'
import collectable from '../../_mixins/collectable'

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
    asformitem(
      {
        change: 'change',
        blur: 'blur',
        focus: 'focus'
      },
      'medium',
      function () {
        const size = this.size
        if (size) return size
        const NCheckboxGroup = this.NCheckboxGroup
        if (NCheckboxGroup && NCheckboxGroup.syntheticSize) {
          return NCheckboxGroup.syntheticSize
        }
        const NFormItem = this.NFormItem
        if (NFormItem && NFormItem.syntheticSize) {
          return NFormItem.syntheticSize
        }
        return 'medium'
      }
    ),
    collectable('NCheckboxGroup', 'collectedCheckboxValues')
  ],
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: null
    },
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
    },
    tableHeader: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    syntheticDisabled () {
      if (this.disabled || (this.NCheckboxGroup && this.NCheckboxGroup.disabled)) return true
      return false
    },
    syntheticChecked () {
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
        this.NCheckboxGroup.toggleCheckbox(!this.syntheticChecked, this.value)
      } else {
        this.$emit('change', !this.syntheticChecked, this.syntheticChecked)
      }
    },
    handleClick (e) {
      this.$emit('click', e)
      if (!this.syntheticDisabled) {
        this.toggle()
      }
    },
    handleKeyUpEnter (e) {
      if (!this.syntheticDisabled) {
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
