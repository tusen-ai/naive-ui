<template>
  <div
    class="n-checkbox"
    :class="{
      'n-checkbox--checked': renderedChecked,
      'n-checkbox--disabled': mergedDisabled,
      'n-checkbox--indeterminate': indeterminate,
      'n-checkbox--table-header': tableHeader,
      [`n-checkbox--${mergedSize}-size`]: true
    }"
    :tabindex="mergedDisabled ? false : 0"
    :style="cssVars"
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
      <div class="n-checkbox-box__border" />
    </div>
    <span v-if="label !== null || $slots.default" class="n-checkbox__label">
      <slot>
        <render :render="label" />
      </slot>
    </span>
  </div>
</template>

<script>
import { defineComponent, computed, inject, ref, toRef } from 'vue'
import { useMergedState, useMemo } from 'vooks'
import { useFormItem, useTheme } from '../../_mixins'
import { NIconSwitchTransition } from '../../_base'
import { warn, call, render, createKey } from '../../_utils'
import { checkboxLight } from '../styles'
import CheckMark from './CheckMark.vue'
import LineMark from './LineMark.vue'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'Checkbox',
  components: {
    NIconSwitchTransition,
    CheckMark,
    LineMark,
    render
  },
  props: {
    ...useTheme.props,
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
    const uncontrolledCheckedRef = ref(props.defaultChecked)
    const controlledCheckedRef = toRef(props, 'checked')
    const mergedCheckedRef = useMergedState(
      controlledCheckedRef,
      uncontrolledCheckedRef
    )
    const renderedCheckedRef = useMemo(() => {
      if (NCheckboxGroup) {
        const groupValueSet = NCheckboxGroup.valueSet
        if (groupValueSet) {
          return groupValueSet.has(props.value)
        }
        return false
      } else {
        return mergedCheckedRef.value
      }
    })
    const mergedDisabledRef = computed(() => {
      return props.disabled || (NCheckboxGroup && NCheckboxGroup.disabled)
    })
    const formItem = useFormItem(props, {
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
    const themeRef = useTheme(
      'Checkbox',
      'Checkbox',
      style,
      checkboxLight,
      props
    )
    return Object.assign(formItem, {
      NCheckboxGroup,
      mergedDisabled: mergedDisabledRef,
      renderedChecked: renderedCheckedRef,
      cssVars: computed(() => {
        const {
          mergedSize: { value: mergedSize }
        } = formItem
        const {
          common: { cubicBezierEaseInOut },
          self: {
            borderRadius,
            color,
            colorActive,
            colorDisabled,
            colorTableHeader,
            colorTableHeaderModal,
            checkMarkColor,
            checkMarkColorDisabled,
            border,
            borderFocus,
            borderDisabled,
            borderActive,
            boxShadowFocus,
            textColor,
            textColorDisabled,
            [createKey('fontSize', mergedSize)]: fontSize,
            [createKey('size', mergedSize)]: size
          }
        } = themeRef.value
        return {
          '--size': size,
          '--bezier': cubicBezierEaseInOut,
          '--border-radius': borderRadius,
          '--border': border,
          '--border-active': borderActive,
          '--border-focus': borderFocus,
          '--border-disabled': borderDisabled,
          '--box-shadow-focus': boxShadowFocus,
          '--color': color,
          '--color-active': colorActive,
          '--color-table-header': colorTableHeader,
          '--color-table-header-modal': colorTableHeaderModal,
          '--color-disabled': colorDisabled,
          '--text-color': textColor,
          '--text-color-disabled': textColorDisabled,
          '--check-mark-color': checkMarkColor,
          '--check-mark-color-disabled': checkMarkColorDisabled,
          '--font-size': fontSize
        }
      })
    })
  },
  methods: {
    toggle () {
      const { NCheckboxGroup } = this
      if (NCheckboxGroup) {
        NCheckboxGroup.toggleCheckbox(!this.renderedChecked, this.value)
      } else {
        const {
          onChange,
          'onUpdate:checked': onUpdateCheck,
          nTriggerFormInput,
          nTriggerFormChange
        } = this
        const nextChecked = !this.renderedChecked
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
})
</script>
