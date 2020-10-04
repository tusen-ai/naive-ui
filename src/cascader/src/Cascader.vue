<template>
  <div
    ref="self"
    class="n-cascader"
    @keydown.space="handleKeyDownSpace"
    @keyup.esc="handleKeyUpEsc"
    @keyup.space="handleKeyUpSpace"
    @keyup.enter="handleKeyUpEnter"
    @keyup.up="handleKeyUpUp"
    @keyup.down="handleKeyUpDown"
    @keyup.left="handleKeyUpLeft"
    @keyup.right="handleKeyUpRight"
  >
    <n-base-selection
      ref="triggerRef"
      class="n-cascader-selection"
      :size="syntheticSize"
      :theme="syntheticTheme"
      :active="active"
      :pattern="pattern"
      :placeholder="localizedPlaceholder"
      :selected-option="selectedOption"
      :selected-options="selectedOptions"
      :multiple="multiple"
      :filterable="filterable"
      :clearable="clearable"
      :disabled="disabled"
      @focus="handleActivatorFocus"
      @blur="handleActivatorBlur"
      @click="handleActivatorClick"
      @clear="handleClear"
      @delete-option="handleDeleteOption"
      @delete-last-option="handleDeleteLastOption"
      @pattern-input="handlePatternInput"
    />
    <n-lazy-teleport
      :show="active && !selectMenuActive"
    >
      <cascader-menu
        ref="cascaderMenuRef"
        v-model:active-id="activeId"
        v-model:patches="patches"
        v-model:loading="loading"
        :active="active && !selectMenuActive"
        :class="{
          [namespace]: namespace
        }"
        :type="type"
        :value="value"
        :multiple="multiple"
        :options="menuOptions"
        :pattern="pattern"
        :filterable="filterable"
        :expand-trigger="expandTrigger"
        :lazy="remote"
        :on-load="onLoad"
        :theme="syntheticTheme"
        :size="syntheticSize"
        @update:loading-id="loadingId = $event"
        @update:value="handleMenuInput"
      />
    </n-lazy-teleport>
    <n-lazy-teleport
      :show="selectMenuActive"
    >
      <cascader-select-menu
        ref="selectMenuRef"
        :class="{
          [namespace]: namespace
        }"
        :type="type"
        :value="value"
        :active="active && selectMenuActive"
        :theme="syntheticTheme"
        :pattern="pattern"
        :size="syntheticSize"
        :multiple="multiple"
        :options="menuOptions"
        @update:value="handleMenuInput"
      />
    </n-lazy-teleport>
  </div>
</template>

<script>
import { ref } from 'vue'
import NBaseSelection from '../../_base/selection'
import NLazyTeleport from '../../_base/lazy-teleport'
import {
  configurable,
  themeable,
  locale,
  usecssr,
  asformitem
} from '../../_mixins'
import { useIsMounted } from '../../_utils/composition'
import { warn } from '../../_utils/naive'
import { call } from '../../_utils/vue'
import { getType, traverseWithCallback } from './utils'
import CascaderMenu from './CascaderMenu.vue'
import CascaderSelectMenu from './CascaderSelectMenu.vue'
import styles from './styles'
import {
  rootedOptions,
  patchedOptions,
  linkedCascaderOptions,
  menuOptions
} from '../../_utils/component/cascader'

export default {
  name: 'Cascader',
  components: {
    CascaderMenu,
    CascaderSelectMenu,
    NBaseSelection,
    NLazyTeleport
  },
  provide () {
    return {
      NCascader: this
    }
  },
  mixins: [
    configurable,
    themeable,
    asformitem(),
    locale('Cascader'),
    usecssr(styles, {
      themeKey: 'syntheticTheme',
      injectCssrProps: true
    })
  ],
  props: {
    options: {
      type: Array,
      default: null
    },
    value: {
      type: [String, Number, Array],
      default: null
    },
    placeholder: {
      type: String,
      default: undefined
    },
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: 'medium'
    },
    filterable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    expandTrigger: {
      validator (expandTrigger) {
        return ['click', 'hover'].includes(expandTrigger)
      },
      default: 'click'
    },
    leafOnly: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    },
    onLoad: {
      type: Function,
      default: () => {}
    },
    separator: {
      type: String,
      default: ' / '
    },
    filter: {
      type: [String, Function],
      default: null
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array],
      default: undefined
    },
    // deprecated
    onChange: {
      validator () {
        warn('cascader', '`on-change` is deprecated, please use `on-update:value` instead.')
        return true
      },
      default: undefined
    }
  },
  setup () {
    return {
      cascaderMenuRef: ref(null),
      selectMenuRef: ref(null),
      triggerRef: ref(null),
      isMounted: useIsMounted()
    }
  },
  data () {
    return {
      pattern: '',
      active: false,
      /**
       * set here to keep state
       */
      activeId: null,
      patches: new Map(),
      loadingId: null,
      loading: false
    }
  },
  computed: {
    type: getType,
    localizedPlaceholder () {
      if (this.placeholder !== undefined) return this.placeholder
      return this.localeNamespace.placeholder
    },
    enableAllOptions () {
      return !this.leafOnly
    },
    selectMenuActive () {
      return !!(this.filterable && this.pattern && this.pattern.trim().length)
    },
    rootedOptions () {
      return rootedOptions(this.options)
    },
    patchedOptions () {
      /**
       * Options must be patched here because Picker need to know all available
       * options.
       */
      return patchedOptions(this.rootedOptions, this.patches)
    },
    linkedCascaderOptions () {
      return linkedCascaderOptions(this.patchedOptions, this.type)
    },
    menuOptions () {
      return menuOptions(this.linkedCascaderOptions, this.value, this.type)
    },
    selectedOptions () {
      if (this.multiple) {
        let options = []
        if (Array.isArray(this.value)) {
          const values = new Set(this.value)
          const path = []
          traverseWithCallback(this.patchedOptions, option => {
            path.push(option.label)
            if (values.has(option.value)) {
              options.push({
                value: option.value,
                label: path.slice(1, path.length).join(this.separator)
              })
            }
          }, () => {
            path.pop()
          })
          const valueOptionMap = new Map()
          options.forEach(option => {
            valueOptionMap.set(option.value, option)
          })
          const reorderedOptions = this.value.filter(v => valueOptionMap.has(v)).map(v => valueOptionMap.get(v))
          options = reorderedOptions
        }
        return options
      } else return []
    },
    selectedOption () {
      if (!this.multiple) {
        const path = []
        let selectedOption = null
        traverseWithCallback(this.patchedOptions, option => {
          path.push(option.label)
          if (option.value === this.value) {
            selectedOption = {
              value: option.value,
              label: path.slice(1, path.length).join(this.separator)
            }
          }
        }, () => {
          path.pop()
        })
        return selectedOption
      } else return null
    }
  },
  watch: {
    options () {
      this.activeId = null
    }
  },
  methods: {
    doUpdateValue (...args) {
      const {
        'onUpdate:value': onUpdateValue,
        onChange,
        __triggerFormInput,
        __triggerFormChange
      } = this
      if (onUpdateValue) call(onUpdateValue, ...args)
      if (onChange) call(onChange, ...args)
      __triggerFormInput()
      __triggerFormChange()
    },
    doBlur (...args) {
      const {
        onBlur,
        __triggerFormBlur
      } = this
      if (onBlur) call(onBlur, ...args)
      __triggerFormBlur()
    },
    doFocus (...args) {
      const {
        onFocus,
        __triggerFormFocus
      } = this
      if (onFocus) call(onFocus, ...args)
      __triggerFormFocus()
    },
    deactivate () {
      this.active = false
    },
    activate () {
      this.active = true
    },
    openMenu () {
      if (!this.disabled) {
        this.pattern = ''
        this.activate()
        if (this.filterable) {
          this.triggerRef.focusPatternInput()
        }
      }
    },
    closeMenu () {
      this.deactivate()
      this.pattern = ''
    },
    handleCascaderMenuClickOutside (e) {
      if (this.selectMenuActive) return
      if (this.active) {
        if (!this.triggerRef.$el.contains(e.target)) {
          this.closeMenu()
        }
      }
    },
    handleSelectMenuClickOutside (e) {
      if (!this.selectMenuActive) return
      this.handleCascaderMenuClickOutside(e)
    },
    handleKeyUpSpace () {
      if (!this.filterable) {
        this.handleKeyUpEnter()
      }
    },
    handleKeyUpEnter () {
      if (!this.active) {
        this.openMenu()
      } else {
        const {
          cascaderMenuRef,
          selectMenuRef
        } = this
        if (cascaderMenuRef) {
          cascaderMenuRef.enter()
        }
        if (selectMenuRef) {
          selectMenuRef.enter()
        }
      }
    },
    handleKeyUpUp (e) {
      e.preventDefault()
      const {
        active,
        cascaderMenuRef,
        selectMenuRef
      } = this
      if (active && cascaderMenuRef) {
        cascaderMenuRef.prev()
      }
      if (active && selectMenuRef) {
        selectMenuRef.prev()
      }
    },
    handleKeyUpDown (e) {
      e.preventDefault()
      const {
        active,
        cascaderMenuRef,
        selectMenuRef
      } = this
      if (active && cascaderMenuRef) {
        cascaderMenuRef.next()
      }
      if (active && selectMenuRef) {
        selectMenuRef.next()
      }
    },
    handleKeyUpLeft (e) {
      e.preventDefault()
      const {
        active,
        cascaderMenuRef
      } = this
      if (active && cascaderMenuRef) {
        cascaderMenuRef.shallow()
      }
    },
    handleKeyUpRight (e) {
      e.preventDefault()
      const {
        active,
        cascaderMenuRef
      } = this
      if (active && cascaderMenuRef) {
        cascaderMenuRef.deep()
      }
    },
    handleMenuInput (value) {
      this.doUpdateValue(value)
      if (this.type === 'single') {
        this.closeMenu()
      } else if (this.type === 'single-all-options') {
        this.closeMenu()
      } else {
        const trigger = this.triggerRef
        if (trigger && this.filterable) {
          this.pattern = ''
          this.$nextTick().then(() => {
            trigger.focusPatternInput()
          })
        }
      }
    },
    handleClear () {
      this.doUpdateValue(null)
    },
    handleActivatorFocus () {
      this.doFocus()
    },
    handleActivatorBlur () {
      this.doBlur()
      // this.closeMenu()
    },
    handleActivatorClick () {
      if (this.filterable) {
        this.openMenu()
      } else {
        if (this.active) {
          this.closeMenu()
        } else {
          this.openMenu()
        }
      }
    },
    handleDeleteLastOption () {
      if (this.multiple) {
        if (Array.isArray(this.value)) {
          const newValue = this.value
          newValue.pop()
          this.doUpdateValue(newValue)
        }
      }
    },
    handlePatternInput (e) {
      this.pattern = e.target.value
    },
    handleDeleteOption (option) {
      if (this.multiple && Array.isArray(this.value)) {
        const index = this.value.findIndex(value => value === option.value)
        if (~index) {
          const newValue = this.value
          newValue.splice(index, 1)
          this.doUpdateValue(newValue)
        }
      } else {
        this.doUpdateValue(null)
      }
      this.$el.focus()
    },
    /**
     * Important for blur input state!
     */
    handleKeyUpEsc () {
      this.closeMenu()
      this.triggerRef.focusPatternInputWrapper()
    },
    handleKeyDownSpace (e) {
      if (!this.filterable) {
        e.preventDefault()
      }
    },
    /**
     * lazy load related
     */
    resolveLoad (option, children, callback) {
      const newPatches = new Map(this.patches)
      newPatches.set(option.id, children)
      this.patches = newPatches
      this.loading = false
      this.loadingId = null
      if (callback) callback()
    },
    rejectLoad () {
      this.updateLoadingStatus(false)
      this.updateLoadingId(null)
    }
  }
}
</script>
