<template>
  <div
    ref="select"
    class="n-select"
    :class="{
      [`n-select--${size}-size`]: size,
      'n-select--multiple': multiple,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    @keydown.up.prevent="() => {}"
    @keydown.down.prevent="() => {}"
    @keydown.space="handleKeyDownSpace"
    @keyup.up="handleKeyUpUp"
    @keyup.down="handleKeyUpDown"
    @keyup.enter="handleKeyUpEnter"
    @keyup.space="handleKeyUpSpace"
    @keyup.esc="handleKeyUpEsc"
  >
    <n-base-picker
      ref="activator"
      class="n-select-picker"
      :active="active"
      :pattern="pattern"
      :placeholder="placeholder"
      :selected-option="selectedOption"
      :selected-options="selectedOptions"
      :multiple="multiple"
      :filterable="filterable"
      :remote="remote"
      :clearable="clearable"
      :disabled="disabled"
      :size="size"
      :theme="synthesizedTheme"
      :loading="loading"
      @click="handleActivatorClick"
      @delete-last-option="handleDeleteLastOption"
      @delete-option="handleToggleOption"
      @pattern-input="handlePatternInput"
      @clear="handleClear"
      @blur="handlePickerBlur"
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
          name="n-select-menu--transition"
          @after-leave="handleMenuAfterLeave"
        >
          <n-base-select-menu
            v-if="active"
            ref="contentInner"
            v-clickoutside="handleClickOutsideMenu"
            class="n-select-menu"
            auto-pending-first-option
            :theme="synthesizedTheme"
            :pattern="pattern"
            :options="filteredOptions"
            :multiple="multiple"
            :size="size"
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
import detachable from '../../../mixins/detachable'
import placeable from '../../../mixins/placeable'
import zindexable from '../../../mixins/zindexable'
import clickoutside from '../../../directives/clickoutside'
import {
  NBaseSelectMenu
} from '../../../base/SelectMenu'
import {
  filterOptions,
  valueToOptionMap
} from '../../../utils/component/select'
import NBasePicker from '../../../base/Picker'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asformitem from '../../../mixins/asformitem'

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
    NBasePicker
  },
  directives: {
    clickoutside
  },
  mixins: [ withapp, themeable, detachable, placeable, zindexable, asformitem() ],
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
      default: 'Please Select'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
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
      memorizedValueToOptionMap: new Map()
    }
  },
  computed: {
    adpatedOptions () {
      /**
       * If use deprecated API, make it work at first
       */
      if (this.items) return this.items
      else if (this.options) return this.options
      return []
    },
    filteredOptions () {
      const options = this.adpatedOptions
      if (this.remote) {
        return options
      } else {
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
      return valueToOptionMap(this.options)
    },
    selectedOptions () {
      if (this.multiple) {
        return this.mapValuesToOptions(this.value)
      }
      return null
    },
    selectedOption () {
      if (!this.multiple) {
        return this.getOption(this.value)
      }
      return null
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
    handlePickerBlur () {
      this.$emit('blur', this.value)
      // this.closeMenu()
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
      const valueToOptionMap = this.valueToOptionMap
      const options = []
      if (remote) {
        const memorizedValueToOptionMap = this.memorizedValueToOptionMap
        values.forEach(value => {
          if (valueToOptionMap.has(value)) {
            options.push(valueToOptionMap.get(value))
          } else if (memorizedValueToOptionMap.has(value)) {
            options.push(memorizedValueToOptionMap.get(value))
          }
        })
      } else {
        values.forEach(value => {
          if (valueToOptionMap.has(value)) {
            options.push(valueToOptionMap.get(value))
          }
        })
      }
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
      const remote = this.remote
      const valueToOptionMap = this.valueToOptionMap
      if (remote) {
        const memorizedValueToOptionMap = this.memorizedValueToOptionMap
        return value.filter(v => valueToOptionMap.has(v) || memorizedValueToOptionMap.has(v))
      } else {
        return value.filter(v => valueToOptionMap.has(v))
      }
    },
    handleToggleOption (option) {
      if (this.disabled) return
      if (this.multiple) {
        const memorizedValueToOptionMap = this.memorizedValueToOptionMap
        if (this.remote) {
          memorizedValueToOptionMap.set(option.value, option)
        }
        const newValue = this.clearMultipleSelectValue(this.value)
        const index = newValue.findIndex(value => value === option.value)
        if (~index) {
          newValue.splice(index, 1)
        } else {
          newValue.push(option.value)
          this.pattern = ''
        }
        this.$emit('change', newValue)
      } else {
        if (this.filterable && !this.multiple) {
          this.switchFocusToOuter()
        }
        this.closeMenu()
        this.$emit('change', option.value)
      }
    },
    handleDeleteLastOption (e) {
      if (!this.pattern.length) {
        const newValue = this.clearMultipleSelectValue(this.value)
        if (Array.isArray(newValue)) {
          newValue.pop()
          this.$emit('change', newValue)
        }
      }
    },
    handlePatternInput (e) {
      const value = e.target.value
      this.pattern = value
      if (this.onSearch) {
        this.onSearch(value)
        this.$emit('search', value)
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
        const pendingOptionData = this.$refs.contentInner && this.$refs.contentInner.getPendingOptionData()
        if (pendingOptionData) {
          this.handleToggleOption(pendingOptionData)
        } else {
          this.closeMenu()
          this.switchFocusToOuter()
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
      this.$nextTick().then(() => {
        this.$refs.activator.blurPatternInput()
        this.$nextTick().then(() => {
          this.$refs.activator.focusPatternInputWrapper()
        })
      })
    },
    switchFocusToOuter () {
      this.$refs.activator.blurPatternInput()
      this.$nextTick().then(() => {
        this.$refs.activator.focusPatternInputWrapper()
      })
    }
  }
}
</script>
