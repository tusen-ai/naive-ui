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
import { useMemo } from '../../_utils/composition'
import { warn } from '../../_utils/naive/warn'

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
      defaultSize: 'medium',
      syntheticSize () {
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
    }),
    usecssr(styles)
  ],
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
    label: {
      type: [String, Function],
      default: null
    },
    onClick: {
      type: Function,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:checked': {
      type: Function,
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
        warn('checkbox', '`on-change` is deprecated, please use `on-update:checked` instead.')
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
        return props.checked
      }
    })
    return {
      renderSafeChecked: useMemo(() => syntheticCheckedRef.value, [
        syntheticCheckedRef
      ])
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
          'onUpdate:checked': onUpdateChecked,
          __triggerFormInput,
          __triggerFormChange
        } = this
        const nextChecked = !this.renderSafeChecked
        if (onUpdateChecked) onUpdateChecked(nextChecked)
        if (onChange) onChange(nextChecked) // deprecated
        __triggerFormInput()
        __triggerFormChange()
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
