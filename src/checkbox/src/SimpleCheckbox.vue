<template>
  <div
    class="n-checkbox"
    :class="{
      'n-checkbox--checked': checked,
      'n-checkbox--disabled': disabled,
      'n-checkbox--indeterminate': indeterminate,
      [`n-checkbox--${size}-size`]: size,
      [`n-${theme}-theme`]: theme
    }"
    :tabindex="disabled ? false : 0"
    @keyup.enter="handleKeyUpEnter"
    @keyup.space="handleKeyUpSpace"
    @keydown.space="handleKeyDownSpace"
  >
    <div
      class="n-checkbox-box"
      @click="handleClick"
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
  </div>
</template>

<script>
import CheckMark from './CheckMark.vue'
import LineMark from './LineMark.vue'
import NIconSwitchTransition from '../../_transition/IconSwitchTransition'
import createValidator from '../../_utils/vue/validateProp'
import usecssr from '../../_mixins/usecssr'
import styles from './styles/simple-checkbox'

export default {
  name: 'NSimpleCheckbox',
  cssrName: 'Checkbox',
  components: {
    CheckMark,
    LineMark,
    NIconSwitchTransition
  },
  mixins: [
    usecssr(styles)
  ],
  props: {
    value: {
      validator: createValidator(['number', 'boolean', 'string']),
      default: null
    },
    size: {
      validator: createValidator(['string']),
      required: true
    },
    checked: {
      validator: createValidator(['boolean']),
      default: false
    },
    disabled: {
      validator: createValidator(['boolean']),
      default: false
    },
    indeterminate: {
      validator: createValidator(['boolean']),
      default: false
    },
    theme: {
      validator: createValidator(['string']),
      default: undefined
    },
    onClick: {
      validator: createValidator(['function']),
      default: undefined
    },
    onChange: {
      validator: createValidator(['function']),
      default: undefined
    }
  },
  methods: {
    handleClick (e) {
      const {
        onClick
      } = this
      if (onClick) onClick(e)
      if (!this.disabled) {
        this.toggle()
      }
    },
    handleKeyUpEnter (e) {
      if (!this.disabled) {
        this.toggle()
      }
    },
    toggle () {
      const {
        onChange
      } = this
      if (onChange) onChange(!this.checked)
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
