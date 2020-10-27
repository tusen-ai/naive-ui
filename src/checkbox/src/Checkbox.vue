<template>
  <div
    class="n-checkbox"
    :class="{
      'n-checkbox--checked': renderSafeChecked,
      'n-checkbox--disabled': syntheticDisabled,
      'n-checkbox--indeterminate': indeterminate,
      'n-checkbox--table-header': tableHeader,
      [`n-checkbox--${mergedSize}-size`]: true,
      [`n-${mergedTheme}-theme`]: mergedTheme,
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
      v-if="label !== null || $slots.default"
      class="n-checkbox__label"
    >
      <slot>
        <render :render="label" />
      </slot>
    </span>
  </div>
</template>

<script>
import { computed, inject } from 'vue'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asformitem from '../../_mixins/asformitem'
import { render } from '../../_utils/vue'
import CheckMark from './CheckMark.vue'
import LineMark from './LineMark.vue'
import NIconSwitchTransition from '../../_transition/IconSwitchTransition'
import usecssr from '../../_mixins/usecssr'
import styles from './styles'
import { useMemo } from 'vooks'
import { warn, call } from '../../_utils'

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
    asformitem({
      mergedSize () {
        const { size } = this
        if (size !== undefined) return size
        const { NCheckboxGroup } = this
        if (NCheckboxGroup && NCheckboxGroup.mergedSize !== undefined) {
          return NCheckboxGroup.mergedSize
        }
        const { NFormItem } = this
        if (
          NFormItem &&
          NFormItem.mergedSize
        ) {
          return NFormItem.mergedSize
        }
        return 'medium'
      }
    }),
    usecssr(styles)
  ],
  props: {
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: undefined
    },
    value: {
      type: [Number, Boolean, String],
      default: null
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
    onClick: {
      type: Function,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
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
        warn('checkbox', '`on-change` is deprecated, please use `on-update:value` instead.')
        return true
      },
      default: undefined
    },
    checked: {
      validator () {
        warn('checkbox', '`checked` is deprecated, please use `value` instead')
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const NCheckboxGroup = inject('NCheckboxGroup', null)
    const syntheticCheckedRef = computed(() => {
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
    return {
      renderSafeChecked: useMemo(() => syntheticCheckedRef.value)
    }
  },
  computed: {
    syntheticDisabled () {
      if (this.disabled || (this.NCheckboxGroup && this.NCheckboxGroup.disabled)) return true
      return false
    }
  },
  methods: {
    toggle () {
      if (this.NCheckboxGroup) {
        this.NCheckboxGroup.toggleCheckbox(!this.renderSafeChecked, this.value)
      } else {
        const {
          onChange,
          'onUpdate:value': onUpdateValue,
          nTriggerFormInput,
          nTriggerFormChange
        } = this
        const nextChecked = !this.renderSafeChecked
        if (onUpdateValue) call(onUpdateValue, nextChecked)
        if (onChange) call(onChange, nextChecked) // deprecated
        nTriggerFormInput()
        nTriggerFormChange()
      }
    },
    handleClick (e) {
      const {
        onClick
      } = this
      if (onClick) onClick(e)
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
