<template>
  <div
    ref="select"
    class="n-select"
    :class="{
      [`n-select--${syntheticSize}-size`]: true,
      'n-select--multiple': multiple,
      [`n-${syntheticTheme}-theme`]: syntheticTheme
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
      ref="activator"
      class="n-select-selection"
      :active="active"
      :pattern="pattern"
      :placeholder="localizedPlaceholder"
      :selected-option="selectedOption"
      :selected-options="selectedOptions"
      :multiple="multiple"
      :filterable="filterable"
      :remote="remote"
      :clearable="clearable"
      :disabled="disabled"
      :size="syntheticSize"
      :theme="syntheticTheme"
      :loading="loading"
      @click="handleActivatorClick"
      @delete-last-option="handleDeleteLastOption"
      @delete-option="handleToggleOption"
      @pattern-input="handlePatternInput"
      @clear="handleClear"
      @blur="handleActivatorBlur"
      @focus="handleActivatorFocus"
    />
    <div
      ref="contentContainer"
      class="n-positioning-container"
      :class="{
        [namespace]: namespace
      }"
    >
      <div
        ref="content"
        class="n-positioning-content"
      >
        <transition
          name="n-select-menu-transition"
          @after-leave="handleMenuAfterLeave"
        >
          <n-base-select-menu
            v-if="active"
            ref="contentInner"
            v-clickoutside="handleClickOutsideMenu"
            class="n-select-menu"
            auto-pending-first-option
            :theme="syntheticTheme"
            :pattern="pattern"
            :options="filteredOptions"
            :multiple="multiple"
            :size="syntheticSize"
            :filterable="filterable"
            :is-option-selected="isOptionSelected"
            @menu-toggle-option="handleToggleOption"
            @menu-scroll="handleMenuScroll"
            @menu-visible="handleMenuVisible"
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
  </div>
</template>

<script>
import detachable from '../../_mixins/detachable'
import placeable from '../../_mixins/placeable'
import zindexable from '../../_mixins/zindexable'
import clickoutside from '../../_directives/clickoutside'
import NBaseSelectMenu from '../../_base/SelectMenu'
import {
  filterOptions,
  valueToOptionMap
} from '../../_utils/component/select'
import NBaseSelection from '../../_base/Selection'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asformitem from '../../_mixins/asformitem'
import locale from '../../_mixins/locale'

function patternMatched (pattern, value) {
  try {
    return 1 + value.toString().toLowerCase().indexOf(pattern.trim().toLowerCase())
  } catch (err) {
    return false
  }
}

export default {
  name: 'NSelect',
  components: {
    NBaseSelectMenu,
    NBaseSelection
  },
  directives: {
    clickoutside
  },
  mixins: [
    withapp,
    themeable,
    detachable,
    placeable,
    zindexable,
    locale('Select'),
    asformitem()
  ],
  model: {
    prop: 'value',
    event: 'change'
  },
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
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: null
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
    onSearch: {
      type: Function,
      default: () => {}
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
      default: 'activator'
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
      default: value => ({
        label: value,
        value
      })
    },
    /** deprecated */
    items: {
      type: Array,
      default: undefined
    }
  },
  data () {
    return {
      active: false,
      scrolling: false,
      pattern: '',
      memorizedValueToOptionMap: new Map(),
      createdOptions: [],
      beingCreatedOptions: []
    }
  },
  computed: {
    localizedPlaceholder () {
      if (this.placeholder !== null) {
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
      this.$nextTick().then(() => {
        this.updatePosition()
      })
    },
    value () {
      this.$nextTick().then(() => {
        this.updatePosition()
      })
    }
  },
  created () {
    this.updateMemorizedOptions()
  },
  methods: {
    activate () {
      this.active = true
    },
    deactivate () {
      this.active = false
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
          this.$refs.activator.focusPatternInput()
        }
      }
    },
    handleMenuAfterLeave () {
      this.pattern = ''
    },
    closeMenu () {
      this.deactivate()
    },
    handleActivatorClick () {
      if (this.disabled) return
      if (!this.active) {
        this.openMenu()
      } else {
        if (!this.filterable) {
          this.closeMenu()
        }
      }
    },
    handleActivatorBlur () {
      this.$emit('blur')
      this.closeMenu()
    },
    handleActivatorFocus () {
      this.$emit('focus')
    },
    handleClickOutsideMenu (e) {
      if (this.active) {
        if (!this.$refs.activator.$el.contains(e.target) && !this.scrolling) {
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
    isOptionSelected (option) {
      if (this.multiple) {
        if (!Array.isArray(this.value)) return false
        return !!~this.value.findIndex(value => value === option.value)
      } else {
        return option.value === this.value
      }
    },
    clearMultipleSelectValue (value) {
      if (!Array.isArray(value)) return []
      if (this.wrappedFallbackOption) {
        /** if option has a fallback, I can't help user to clear some unknown value */
        return value
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
        const changedValue = this.clearMultipleSelectValue(this.value)
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
        this.$emit('change', changedValue)
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
        this.$emit('change', option.value)
      }
    },
    handleDeleteLastOption (e) {
      if (!this.pattern.length) {
        const changedValue = this.clearMultipleSelectValue(this.value)
        if (Array.isArray(changedValue)) {
          const popedValue = changedValue.pop()
          const createdOptionIndex = this.getCreatedOptionIndex(popedValue)
          ~createdOptionIndex && this.createdOptions.splice(createdOptionIndex, 1)
          this.$emit('change', changedValue)
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
        this.$emit('search', value)
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
        this.$emit('change', [])
      } else {
        this.$emit('change', null)
      }
    },
    handleMenuVisible () {
      this.updatePosition()
    },
    /**
     * scroll events on menu
     */
    handleMenuScroll (e, scrollContainer, scrollContent) {
      this.$emit('scroll', e, scrollContainer, scrollContent)
    },
    /**
     * keyboard events
     */
    handleKeyUpEnter (e) {
      if (this.active) {
        const contentInner = this.$refs.contentInner
        const pendingOptionData = contentInner && contentInner.getPendingOptionData()
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
      if (this.active) {
        this.$refs.contentInner.prev()
      }
    },
    handleKeyUpDown () {
      if (this.loading) return
      if (this.active) {
        this.$refs.contentInner.next()
      }
    },
    handleKeyDownSpace (e) {
      if (!this.filterable) {
        e.preventDefault()
      }
    },
    handleKeyUpEsc (e) {
      this.closeMenu()
      this.$refs.activator.focusPatternInputWrapper()
    },
    returnFocusToWrapper () {
      this.$refs.activator.focusPatternInputWrapper()
    }
  }
}
</script>
