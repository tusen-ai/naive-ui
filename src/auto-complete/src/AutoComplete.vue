<template>
  <v-binder>
    <v-target>
      <div
        ref="triggerRef"
        v-bind="$attrs"
        @keydown.down="handleKeyDownDown"
        @keydown.up="handleKeyDownUp"
        @keydown.enter="handleKeyDownEnter"
        @compositionstart="handleCompositionStart"
        @compositionend="handleCompositionEnd"
      >
        <slot
          :handleInput="handleInput"
          :handleFocus="handleFocus"
          :handleBlur="handleBlur"
          :value="mergedValue"
        >
          <n-input
            :bordered="mergedBordered"
            :theme="'light'"
            :value="mergedValue"
            :placeholder="placeholder"
            :size="mergedSize"
            :disabled="disabled"
            :clearable="clearable"
            @clear="handleClear"
            @focus="canBeActivated = true"
            @input="handleInput"
            @blur="handleBlur"
          />
        </slot>
      </div>
    </v-target>
    <v-follower
      :show="active"
      :to="adjustedTo"
      :container-class="namespace"
      :z-index="zIndex"
      placement="bottom-start"
      width="target"
    >
      <transition name="n-fade-in-scale-up-transition" :appear="isMounted">
        <n-base-select-menu
          v-if="active"
          ref="menuRef"
          v-clickoutside="handleClickOutsideMenu"
          auto-pending
          class="n-auto-complete-menu"
          :style="cssVars"
          :theme="'light'"
          :pattern="value"
          :tree-mate="treeMate"
          :multiple="false"
          size="medium"
          @menu-toggle-option="handleToggleOption"
        />
      </transition>
    </v-follower>
  </v-binder>
</template>

<script>
import { ref, toRef, computed } from 'vue'
import { createTreeMate } from 'treemate'
import { VBinder, VTarget, VFollower } from 'vueuc'
import { clickoutside } from 'vdirs'
import { useIsMounted, useMergedState } from 'vooks'
import { useFormItem, useTheme, useConfig } from '../../_mixins'
import { call, warn, useAdjustedTo } from '../../_utils'
import { NBaseSelectMenu } from '../../_base'
import { NInput } from '../../input'
import { autoCompleteLight } from '../styles'
import { mapAutoCompleteOptionsToSelectOptions } from './utils'
import style from './styles/index.cssr'

export default {
  name: 'AutoComplete',
  components: {
    NInput,
    NBaseSelectMenu,
    VBinder,
    VTarget,
    VFollower
  },
  directives: {
    clickoutside
  },
  inheritAttrs: false,
  props: {
    ...useTheme.props,
    bordered: {
      type: Boolean,
      default: undefined
    },
    clearable: {
      type: Boolean,
      default: undefined
    },
    defaultValue: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: undefined
    },
    value: {
      type: String,
      default: undefined
    },
    blurAfterSelect: {
      type: Boolean,
      default: false
    },
    clearAfterSelect: {
      type: Boolean,
      default: false
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: undefined
    },
    options: {
      type: Array,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: Function,
      default: undefined
    },
    onSelect: {
      type: Function,
      default: undefined
    },
    // deprecated
    onInput: {
      validator () {
        if (__DEV__) {
          warn(
            'auto-complete',
            '`on-input` is deprecated, please use `on-update:value` instead.'
          )
        }
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const uncontrolledValueRef = ref(props.defaultValue)
    const controlledValueRef = toRef(props, 'value')
    const mergedValueRef = useMergedState(
      controlledValueRef,
      uncontrolledValueRef
    )
    const themeRef = useTheme(
      'AutoComplete',
      'AutoComplete',
      style,
      autoCompleteLight,
      props
    )
    return {
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      isMounted: useIsMounted(),
      adjustedTo: useAdjustedTo(props),
      canBeActivated: ref(false),
      isComposing: ref(false),
      menuRef: ref(null),
      triggerRef: ref(null),
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut
        }
      }),
      ...useConfig(props),
      ...useFormItem(props)
    }
  },
  computed: {
    selectOptions () {
      return mapAutoCompleteOptionsToSelectOptions(this.options)
    },
    active () {
      return (
        !!this.mergedValue && this.canBeActivated && !!this.selectOptions.length
      )
    },
    treeMate () {
      return createTreeMate(this.selectOptions, {
        getKey (node) {
          if (node.type === 'group') return node.name
          return node.value
        }
      })
    }
  },
  methods: {
    doUpdateValue (value) {
      const {
        'onUpdate:value': onUpdateValue,
        onInput,
        nTriggerFormInput,
        nTriggerFormChange
      } = this
      if (onUpdateValue) call(onUpdateValue, value)
      if (onInput) call(onInput, value)
      this.uncontrolledValue = value
      nTriggerFormInput()
      nTriggerFormChange()
    },
    doSelect (value) {
      const { onSelect, nTriggerFormInput, nTriggerFormChange } = this
      if (onSelect) call(onSelect, value)
      nTriggerFormInput()
      nTriggerFormChange()
    },
    doBlur (value) {
      const { onBlur, nTriggerFormBlur } = this
      if (onBlur) call(onBlur, value)
      nTriggerFormBlur()
    },
    doFocus (value) {
      const { onFocus, nTriggerFormFocus } = this
      if (onFocus) call(onFocus, value)
      nTriggerFormFocus()
    },
    handleCompositionStart () {
      this.isComposing = true
    },
    handleCompositionEnd () {
      window.setTimeout(() => {
        this.isComposing = false
      }, 0)
    },
    handleKeyDownEnter (e) {
      if (this.menuRef && !this.isComposing) {
        const pendingOptionData = this.menuRef.getPendingOption()
        if (pendingOptionData) {
          this.select(pendingOptionData)
          e.preventDefault()
        }
      }
    },
    handleKeyDownDown () {
      const { menuRef } = this
      if (menuRef) {
        menuRef.next()
      }
    },
    handleKeyDownUp () {
      const { menuRef } = this
      if (menuRef) {
        menuRef.prev()
      }
    },
    select (option) {
      if (option) {
        if (this.clearAfterSelect) {
          this.doUpdateValue(null)
        } else {
          this.doUpdateValue(option.label)
        }
        this.doSelect(option.value)
        this.canBeActivated = false
        if (this.blurAfterSelect) {
          this.blur()
        }
      }
    },
    handleClear () {
      this.doUpdateValue(null)
    },
    handleFocus (e) {
      this.canBeActivated = true
      this.doFocus(e)
    },
    handleBlur (e) {
      this.canBeActivated = false
      this.doBlur(e)
    },
    handleInput (value) {
      this.canBeActivated = true
      this.doUpdateValue(value)
    },
    handleToggleOption (option) {
      this.select(option)
    },
    handleClickOutsideMenu (e) {
      if (this.triggerRef) {
        if (!this.triggerRef.contains(e.target)) {
          this.canBeActivated = false
        }
      }
    },
    blur () {
      if (this.triggerRef.contains(document.activeElement)) {
        document.activeElement.blur()
      }
    }
  }
}
</script>
