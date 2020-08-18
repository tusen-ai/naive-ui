<template>
  <div
    class="n-checkbox"
    :class="{
      'n-checkbox--checked': renderSafeChecked,
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
      <n-icon-switch-transition>
        <div
          v-if="indeterminate"
          key="indeterminate"
          class="n-checkbox-icon"
        >
          <line-mark
            class="n-checkbox-icon__line"
          />
        </div>
        <div
          v-else
          key="check"
          class="n-checkbox-icon"
        >
          <check-mark
            class="n-checkbox-icon__check"
          />
        </div>
      </n-icon-switch-transition>
    </div>
    <span
      v-if="label !== null || $scopedSlots.default"
      class="n-checkbox__label"
    >
      <slot>
        <render :render="label" />
      </slot>
    </span>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asformitem from '../../_mixins/asformitem'
import collectable from '../../_mixins/collectable'
import simulatedComputed from '../../_mixins/simulatedComputed'
import render from '../../_utils/vue/render'
import CheckMark from './CheckMark'
import LineMark from './LineMark'
import NIconSwitchTransition from '../../_transition/IconSwitchTransition'
import usecssr from '../../_mixins/usecssr'
import styles from './styles'

export default {
  name: 'Checkbox',
  inject: {
    NCheckboxGroup: {
      default: null
    }
  },
  components: {
    NIconSwitchTransition,
    CheckMark,
    LineMark,
    render
  },
  mixins: [
    withapp,
    themeable,
    usecssr(styles),
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
        if (
          NFormItem &&
          NFormItem !== '__FORM_ITEM_INNER__' &&
          NFormItem.syntheticSize
        ) {
          return NFormItem.syntheticSize
        }
        return 'medium'
      }
    ),
    collectable('NCheckboxGroup', 'collectedCheckboxValues'),
    simulatedComputed({
      renderSafeChecked: {
        default: false,
        get () {
          return this.syntheticChecked
        },
        deps: [
          'syntheticChecked'
        ]
      }
    })
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
      default: 'medium'
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
    },
    label: {
      type: [String, Function],
      default: null
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
