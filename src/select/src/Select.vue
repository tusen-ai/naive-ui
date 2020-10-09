<template>
  <div
    class="n-select"
    :class="{
      [`n-select--${mergedSize}-size`]: true,
      'n-select--multiple': multiple,
      [`n-${mergedTheme}-theme`]: mergedTheme
    }"
    @keydown.up.prevent
    @keydown.down.prevent
    @keydown.space="handleKeyDownSpace"
    @keyup.up="handleKeyUpUp"
    @keyup.down="handleKeyUpDown"
    @keyup.enter="handleKeyUpEnter"
    @keyup.space="handleKeyUpSpace"
    @keyup.esc="handleKeyUpEsc"
  >
    <n-base-selection
      ref="triggerRef"
      class="n-select-selection"
      :active="show"
      :pattern="pattern"
      :placeholder="localizedPlaceholder"
      :selected-option="selectedOption"
      :selected-options="selectedOptions"
      :multiple="multiple"
      :filterable="filterable"
      :remote="remote"
      :clearable="clearable"
      :disabled="disabled"
      :size="mergedSize"
      :theme="mergedTheme"
      :loading="loading"
      :autofocus="autofocus"
      @click="handleTriggerClick"
      @delete-last-option="handleDeleteLastOption"
      @delete-option="handleToggleOption"
      @pattern-input="handlePatternInput"
      @clear="handleClear"
      @blur="handleTriggerBlur"
      @focus="handleTriggerFocus"
    />
    <n-lazy-teleport
      :show="show"
      adjust-to
    >
      <div
        ref="offsetContainerRef"
        v-zindexable="{
          enabled: show
        }"
        class="n-positioning-container"
        :class="{
          [namespace]: namespace
        }"
      >
        <div
          ref="trackingRef"
          class="n-positioning-content"
        >
          <transition
            name="n-fade-in-scale-up-transition"
            :appear="isMounted"
            @after-leave="handleMenuAfterLeave"
          >
            <n-base-select-menu
              v-if="show"
              ref="menuRef"
              v-clickoutside="handleMenuClickOutside"
              class="n-select-menu"
              auto-pending-first-option
              :theme="mergedTheme"
              :pattern="pattern"
              :options="filteredOptions"
              :multiple="multiple"
              :size="mergedSize"
              :filterable="filterable"
              :value="value"
              @menu-toggle-option="handleToggleOption"
              @menu-scroll="handleMenuScroll"
            >
              <template v-if="$slots.empty" v-slot:empty>
                <slot name="empty" />
              </template>
              <template v-if="$slots.unmatch" v-slot:unmatch>
                <slot name="unmatch" />
              </template>
              <template v-if="$slots.action" v-slot:action>
                <slot name="action" />
              </template>
            </n-base-select-menu>
          </transition>
        </div>
      </div>
    </n-lazy-teleport>
  </div>
</template>

<script>
import { ref } from 'vue'
import {
  configurable,
  placeable,
  themeable,
  asformitem,
  locale,
  usecssr
} from '../../_mixins'
import {
  clickoutside,
  zindexable
} from '../../_directives'
import {
  filterOptions,
  valueToOptionMap
} from '../../_utils/component/select'
import {
  useIsMounted
} from '../../_utils/composition'
import {
  warn
} from '../../_utils/naive'
import {
  call
} from '../../_utils/vue'
import NBaseSelectMenu from '../../_base/select-menu'
import NBaseSelection from '../../_base/selection'
import NLazyTeleport from '../../_base/lazy-teleport'
import styles from './styles/index.js'

function patternMatched (pattern, value) {
  try {
    return 1 + value.toString().toLowerCase().indexOf(pattern.trim().toLowerCase())
  } catch (err) {
    return false
  }
}

export default {
  name: 'Select',
  components: {
    NBaseSelectMenu,
    NBaseSelection,
    NLazyTeleport
  },
  directives: {
    clickoutside,
    zindexable
  },
  mixins: [
    configurable,
    themeable,
    placeable,
    locale('Select'),
    asformitem(),
    usecssr(styles)
  ],
  provide () {
    return {
      NSelect: this
    }
  },
  props: {
    clearable: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
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
      default: undefined
    },
    filterable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Function,
      default: (pattern, option) => {
        if (!option) return false
        if (option.label !== undefined) {
          return patternMatched(pattern, option.label)
        } else if (option.value !== undefined) {
          return patternMatched(pattern, option.value)
        }
        return false
      }
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    widthMode: {
      type: String,
      default: 'trigger'
    },
    tag: {
      type: Boolean,
      default: false
    },
    onCreate: {
      type: Function,
      default: label => ({
        label: label,
        value: label
      })
    },
    fallbackOption: {
      type: [ Function, Boolean ],
      default: () => value => ({
        label: '' + value,
        value
      })
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array],
      default: undefined
    },
    onBlur: {
      type: [Function, Array],
      default: undefined
    },
    onFocus: {
      type: [Function, Array],
      default: undefined
    },
    onScroll: {
      type: [Function, Array],
      default: undefined
    },
    onSearch: {
      type: [Function, Array],
      default: undefined
    },
    // private
    debug: {
      type: Boolean,
      default: false
    },
    /** deprecated */
    onChange: {
      validator () {
        if (__DEV__) warn('select', '`on-change` is deprecated, please use `on-update:value` instead.')
        return true
      },
      default: undefined
    },
    items: {
      validator () {
        if (__DEV__) warn('select', '`items` is deprecated, please use `options` instead.')
        return true
      },
      default: undefined
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    return {
      isMounted: useIsMounted(),
      offsetContainerRef: ref(null),
      triggerRef: ref(null),
      trackingRef: ref(null),
      menuRef: ref(null)
    }
  },
  data () {
    return {
      show: false,
      scrolling: false,
      pattern: '',
      memorizedValueToOptionMap: new Map(),
      createdOptions: [],
      beingCreatedOptions: []
    }
  },
  computed: {
    __placeableEnabled () {
      return this.show
    },
    localizedPlaceholder () {
      if (this.placeholder !== undefined) {
        return this.placeholder
      }
      return this.localeNamespace.placeholder
    },
    adpatedOptions () {
      /**
       * If using deprecated API, make it work at first
       */
      const options = this.items || this.options
      if (options) return options
      return []
    },
    localOptions () {
      return this.adpatedOptions
        .concat(this.createdOptions)
        .concat(this.beingCreatedOptions)
    },
    filteredOptions () {
      if (this.remote) {
        return this.adpatedOptions
      } else {
        const options = this.localOptions
        const trimmedPattern = this.pattern.trim()
        if (!trimmedPattern.length || !this.filterable) {
          return options
        } else {
          const filter = option => this.filter(trimmedPattern, option)
          const filteredOptions = filterOptions(options, filter)
          return filteredOptions
        }
      }
    },
    valueToOptionMap () {
      return valueToOptionMap(this.localOptions)
    },
    selectedOptions () {
      if (this.multiple) {
        return this.mapValuesToOptions(this.value)
      }
      return null
    },
    selectedOption () {
      if (!this.multiple) {
        const value = this.value
        const selectedOption = this.getOption(value)
        const fallbackOption = this.wrappedFallbackOption
        return (
          selectedOption ||
          (fallbackOption && fallbackOption(value)) ||
          null
        )
      }
      return null
    },
    wrappedFallbackOption () {
      const fallbackOption = this.fallbackOption
      if (!fallbackOption) return false
      return value => {
        const type = typeof value
        if (type === 'string' || type === 'number') {
          return Object.assign(fallbackOption(value), { value })
        } return null
      }
    }
  },
  watch: {
    options () {
      this.updateMemorizedOptions()
    },
    filteredOptions () {
      this.$nextTick(this.__placeableSyncPosition)
    },
    value () {
      this.$nextTick(this.__placeableSyncPosition)
    }
  },
  created () {
    this.updateMemorizedOptions()
  },
  methods: {
    __placeableOffsetContainer () {
      return this.offsetContainerRef
    },
    __placeableTracked () {
      return this.triggerRef
    },
    __placeableTracking () {
      return this.trackingRef
    },
    __placeableBody () {
      return this.menuRef
    },
    doUpdateValue (value) {
      const {
        onChange,
        'onUpdate:value': onUpdateValue,
        __triggerFormChange,
        __triggerFormInput
      } = this
      if (onChange) call(onChange, value)
      if (onUpdateValue) call(onUpdateValue, value)
      __triggerFormChange()
      __triggerFormInput()
    },
    doBlur (value) {
      const {
        onBlur,
        __triggerFormBlur
      } = this
      if (onBlur) call(onBlur, value)
      __triggerFormBlur()
    },
    doFocus (value) {
      const {
        onFocus,
        __triggerFormFocus
      } = this
      if (onFocus) call(onFocus, value)
      __triggerFormFocus()
    },
    doSearch (value) {
      const {
        onSearch
      } = this
      if (onSearch) call(onSearch, value)
    },
    doScroll (...args) {
      const {
        onScroll
      } = this
      if (onScroll) call(onScroll, ...args)
    },
    activate () {
      this.show = true
    },
    deactivate () {
      this.show = false
    },
    /**
     * remote related methods
     */
    updateMemorizedOptions () {
      const remote = this.remote
      const multiple = this.multiple
      if (remote) {
        const memorizedValueToOptionMap = this.memorizedValueToOptionMap
        if (multiple) {
          this.selectedOptions.forEach(option => {
            memorizedValueToOptionMap.set(option.value, option)
          })
        } else {
          const option = this.selectedOption
          if (option) {
            memorizedValueToOptionMap.set(option.value, option)
          }
        }
      }
    },
    /**
     * menu related methods
     */
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
    },
    handleMenuAfterLeave () {
      this.pattern = ''
    },
    handleTriggerClick () {
      if (this.disabled) return
      if (!this.show) {
        this.openMenu()
      } else {
        if (!this.filterable) {
          this.closeMenu()
        }
      }
    },
    handleTriggerBlur () {
      this.doBlur()
      if (__DEV__) {
        if (this.debug) return
      }
      this.closeMenu()
    },
    handleTriggerFocus () {
      this.doFocus()
    },
    handleMenuClickOutside (e) {
      if (this.show) {
        if (!this.triggerRef.$el.contains(e.target) && !this.scrolling) {
          this.closeMenu()
        }
      }
    },
    /**
     * data utils methods
     */
    mapValuesToOptions (values) {
      if (!Array.isArray(values)) return []
      const remote = this.remote
      const valueOptionMap = this.valueToOptionMap
      const memorizedValueToOptionMap = this.memorizedValueToOptionMap
      const options = []
      const fallbackOption = this.wrappedFallbackOption
      values.forEach(value => {
        if (valueOptionMap.has(value)) {
          options.push(valueOptionMap.get(value))
        } else if (remote && memorizedValueToOptionMap.has(value)) {
          options.push(memorizedValueToOptionMap.get(value))
        } else if (fallbackOption) {
          const option = fallbackOption(value)
          if (option) {
            options.push(option)
          }
        }
      })
      return options
    },
    getOption (value) {
      if (this.valueToOptionMap.has(value)) {
        return this.valueToOptionMap.get(value)
      } else if (this.remote && this.memorizedValueToOptionMap.has(value)) {
        return this.memorizedValueToOptionMap.get(value)
      }
    },
    createClearedMultipleSelectValue (value) {
      if (!Array.isArray(value)) return []
      if (this.wrappedFallbackOption) {
        /** if option has a fallback, I can't help user to clear some unknown value */
        return Array.from(value)
      } else {
        /** if there's no option fallback, unappeared options are treated as invalid */
        const remote = this.remote
        const valueOptionMap = this.valueToOptionMap
        if (remote) {
          const memorizedValueToOptionMap = this.memorizedValueToOptionMap
          return value.filter(v => valueOptionMap.has(v) || memorizedValueToOptionMap.has(v))
        } else {
          return value.filter(v => valueOptionMap.has(v))
        }
      }
    },
    handleToggleOption (option) {
      if (this.disabled) return
      const tag = this.tag
      const remote = this.remote
      if (tag && !remote) {
        const beingCreatedOptions = this.beingCreatedOptions
        const beingCreatedOption = beingCreatedOptions[0] || null
        if (beingCreatedOption) {
          this.createdOptions.push(beingCreatedOption)
          this.beingCreatedOptions = []
        }
      }
      if (this.multiple) {
        if (remote) {
          this.memorizedValueToOptionMap.set(option.value, option)
        }
        const changedValue = this.createClearedMultipleSelectValue(this.value)
        const index = changedValue.findIndex(value => value === option.value)
        if (~index) {
          changedValue.splice(index, 1)
          if (tag && !remote) {
            const createdOptionIndex = this.getCreatedOptionIndex(option.value)
            if (~createdOptionIndex) {
              this.createdOptions.splice(createdOptionIndex, 1)
              this.pattern = ''
            }
          }
        } else {
          changedValue.push(option.value)
          this.pattern = ''
        }
        this.doUpdateValue(changedValue)
      } else {
        if (tag && !remote) {
          const createdOptionIndex = this.getCreatedOptionIndex(option.value)
          if (~createdOptionIndex) {
            this.createdOptions = [this.createdOptions[createdOptionIndex]]
          } else {
            this.createdOptions = []
          }
        }
        if (this.filterable && !this.multiple) {
          this.returnFocusToWrapper()
        }
        this.closeMenu()
        this.doUpdateValue(option.value)
      }
    },
    handleDeleteLastOption (e) {
      if (!this.pattern.length) {
        const changedValue = this.createClearedMultipleSelectValue(this.value)
        if (Array.isArray(changedValue)) {
          const popedValue = changedValue.pop()
          const createdOptionIndex = this.getCreatedOptionIndex(popedValue)
          ~createdOptionIndex && this.createdOptions.splice(createdOptionIndex, 1)
          this.doUpdateValue(changedValue)
        }
      }
    },
    getCreatedOptionIndex (optionValue) {
      const createdOptions = this.createdOptions
      return createdOptions.findIndex(
        createdOption => createdOption.value === optionValue
      )
    },
    handlePatternInput (e) {
      const value = e.target.value
      this.pattern = value
      const onSearch = this.onSearch
      if (onSearch) {
        onSearch(value)
        this.doSearch(value)
      }
      if (this.tag && !this.remote) {
        if (!value) {
          this.beingCreatedOptions = []
          return
        }
        const optionBeingCreated = this.onCreate(value)
        if (
          this.adpatedOptions.some(
            option => option.value === optionBeingCreated.value
          ) ||
          this.createdOptions.some(
            option => option.value === optionBeingCreated.value
          )
        ) {
          this.beingCreatedOptions = []
        } else {
          this.beingCreatedOptions = [optionBeingCreated]
        }
      }
    },
    handleClear (e) {
      e.stopPropagation()
      if (!this.multiple && this.filterable) {
        this.closeMenu()
      }
      if (this.multiple) {
        this.doUpdateValue([])
      } else {
        this.doUpdateValue(null)
      }
    },
    /**
     * scroll events on menu
     */
    handleMenuScroll (e, scrollContainer, scrollContent) {
      this.doScroll(e, scrollContainer, scrollContent)
    },
    /**
     * keyboard events
     */
    handleKeyUpEnter (e) {
      if (this.show) {
        const menu = this.menuRef
        const pendingOptionData = menu && menu.getPendingOptionData()
        if (pendingOptionData) {
          this.handleToggleOption(pendingOptionData)
        } else {
          this.closeMenu()
          this.returnFocusToWrapper()
        }
      } else {
        this.openMenu()
      }
      e.preventDefault()
    },
    handleKeyUpSpace (e) {
      if (!this.filterable) {
        this.handleKeyUpEnter(e)
      }
    },
    handleKeyUpUp () {
      if (this.loading) return
      if (this.show) {
        this.menuRef.prev()
      }
    },
    handleKeyUpDown () {
      if (this.loading) return
      if (this.show) {
        this.menuRef.next()
      }
    },
    handleKeyDownSpace (e) {
      if (!this.filterable) {
        e.preventDefault()
      }
    },
    handleKeyUpEsc (e) {
      this.closeMenu()
      this.triggerRef.focusPatternInputWrapper()
    },
    returnFocusToWrapper () {
      this.triggerRef.focusPatternInputWrapper()
    }
  }
}
</script>
