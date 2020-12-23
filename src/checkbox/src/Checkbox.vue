<template>
  <div
    class="n-checkbox"
    :class="{
      'n-checkbox--checked': renderSafeChecked,
      'n-checkbox--disabled': mergedDisabled,
      'n-checkbox--indeterminate': indeterminate,
      'n-checkbox--table-header': tableHeader,
      [`n-checkbox--${mergedSize}-size`]: true,
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
    :tabindex="mergedDisabled ? false : 0"
    @keyup.enter="handleKeyUpEnter"
    @keyup.space="handleKeyUpSpace"
    @keydown.space="handleKeyDownSpace"
    @click="handleClick"
  >
    <div class="n-checkbox-box">
      <n-icon-switch-transition>
        <div v-if="indeterminate" key="indeterminate" class="n-checkbox-icon">
          <line-mark class="n-checkbox-icon__line" />
        </div>
        <div v-else key="check" class="n-checkbox-icon">
          <check-mark class="n-checkbox-icon__check" />
        </div>
      </n-icon-switch-transition>
    </div>
    <span v-if="label !== null || $slots.default" class="n-checkbox__label">
      <slot>
        <render :render="label" />
      </slot>
    </span>
  </div>
</template>

<script>
import { computed, inject, ref, toRef } from 'vue'
import { useMergedState, useMemo } from 'vooks'
import { configurable, themeable, useFormItem, withCssr } from '../../_mixins'
import CheckMark from './CheckMark.vue'
import LineMark from './LineMark.vue'
import { NIconSwitchTransition } from '../../_base'
import styles from './styles'
import { warn, call, render } from '../../_utils'

export default {
  name: 'Checkbox',
  components: {
    NIconSwitchTransition,
    CheckMark,
    LineMark,
    render
  },
  mixins: [configurable, themeable, withCssr(styles)],
  props: {
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: undefined
    },
    checked: {
      type: Boolean,
      default: undefined
    },
    defaultChecked: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Function],
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:checked': {
      type: [Function, Array],
      default: undefined
    },
    // private
    tableHeader: {
      type: Boolean,
      default: false
    },
    // deprecated
    onChange: {
      validator () {
        warn(
          'checkbox',
          '`on-change` is deprecated, please use `on-update:checked` instead.'
        )
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const NCheckboxGroup = inject('NCheckboxGroup', null)
    const mergedCheckedRef = computed(() => {
      if (NCheckboxGroup) {
        const groupValueSet = NCheckboxGroup.valueSet
        if (groupValueSet) {
          return groupValueSet.has(props.value)
        }
        return false
      } else {
        return props.checked ?? props.value
      }
    })
    const uncontrolledCheckedRef = ref(props.defaultChecked)
    const controlledCheckedRef = toRef(props, 'checked')
    const mergedDisabledRef = computed(() => {
      return props.disabled || (NCheckboxGroup && NCheckboxGroup.disabled)
    })
    return {
      NCheckboxGroup,
      mergedCheck: useMergedState(controlledCheckedRef, uncontrolledCheckedRef),
      mergedDisabled: mergedDisabledRef,
      renderSafeChecked: useMemo(() => mergedCheckedRef.value),
      ...useFormItem(props, {
        mergedSize (NFormItem) {
          const { size } = props
          if (size !== undefined) return size
          if (NCheckboxGroup) {
            const { mergedSize } = NCheckboxGroup
            if (mergedSize !== undefined) {
              return mergedSize
            }
          }
          if (NFormItem) {
            const { mergedSize } = NFormItem
            if (mergedSize !== undefined) return mergedSize
          }
          return 'medium'
        }
      })
    }
  },
  methods: {
    toggle () {
      const { NCheckboxGroup } = this
      if (NCheckboxGroup) {
        NCheckboxGroup.toggleCheckbox(!this.renderSafeChecked, this.value)
      } else {
        const {
          onChange,
          'onUpdate:checked': onUpdateCheck,
          nTriggerFormInput,
          nTriggerFormChange
        } = this
        const nextChecked = !this.renderSafeChecked
        if (onUpdateCheck) call(onUpdateCheck, nextChecked)
        if (onChange) call(onChange, nextChecked) // deprecated
        nTriggerFormInput()
        nTriggerFormChange()
        this.uncontrolledChecked = nextChecked
      }
    },
    handleClick () {
      if (!this.mergedDisabled) {
        this.toggle()
      }
    },
    handleKeyUpEnter (e) {
      if (!this.mergedDisabled) {
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
