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
    <n-base-select-option-collector v-if="useSlot">
      <slot />
    </n-base-select-option-collector>
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
      @click="handleActivatorClick"
      @delete-last-option="handleDeleteLastOption"
      @delete-option="handleToggleOption"
      @pattern-input="handlePatternInput"
      @clear="handleClear"
      @blur="handlePickerBlur"
    />
    <div
      ref="contentContainer"
      v-clickoutside="handleClickOutsideMenu"
      class="n-detached-content-container n-select-detached-content-container"
      :class="{
        [namespace]: namespace
      }"
    >
      <div
        ref="content"
        class="n-detached-content-content"
      >
        <transition
          name="n-select-menu--transition"
          @after-leave="handleMenuAfterLeave"
        >
          <n-base-select-menu
            v-show="active"
            ref="contentInner"
            class="n-select-menu"
            :theme="synthesizedTheme"
            :pattern="pattern"
            :options="filteredOptions"
            :multiple="multiple"
            :size="size"
            :loading="loading"
            :no-data-content="noDataContent"
            :not-found-content="notFoundContent"
            :emit-option="emitOption"
            :filterable="filterable"
            :is-selected="isSelected"
            :use-slot="useSlot"
            :mirror="false"
            @menu-toggle-option="handleToggleOption"
            @menu-scroll="handleMenuScroll"
          />
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
  NBaseSelectMenu,
  NBaseSelectOptionCollector
} from '../../../base/SelectMenu'
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
  name: 'NBaseSelect',
  components: {
    NBaseSelectMenu,
    NBasePicker,
    NBaseSelectOptionCollector
  },
  directives: {
    clickoutside
  },
  mixins: [ withapp, themeable, detachable, placeable, zindexable, asformitem() ],
  inject: {
    NFormItem: {
      default: null
    }
  },
  provide () {
    return {
      NSelect: this
    }
  },
  props: {
    useSlot: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: null
    },
    value: {
      validator () {
        return true
      },
      required: false,
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
    emitOption: {
      type: Boolean,
      default: false
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
    noDataContent: {
      type: [String, Function],
      default: 'No Data'
    },
    notFoundContent: {
      type: [String, Function],
      default: 'No Result'
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
    }
  },
  data () {
    return {
      active: false,
      scrolling: false,
      pattern: '',
      memorizedValueOptionMap: new Map(),
      collectedOptions: []
    }
  },
  computed: {
    synthesizedOptions () {
      if (this.useSlot) {
        return this.collectedOptions
      } else {
        return this.options
      }
    },
    filteredOptions () {
      if (this.remote) {
        return this.synthesizedOptions
      } else if (!this.filterable || !this.pattern.trim().length) return this.synthesizedOptions
      return this.synthesizedOptions.filter(option => this.filter(this.pattern, option))
    },
    valueOptionMap () {
      const valueToOption = new Map()
      this.synthesizedOptions.forEach(option => valueToOption.set(option.value, option))
      return valueToOption
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
    synthesizedOptions () {
      this.$nextTick().then(this.updateMemorizedOptions)
    },
    filteredOptions () {
      this.$nextTick().then(() => {
        this.updatePosition()
      })
    },
    value (value) {
      this.$nextTick().then(() => {
        this.updatePosition()
      })
      this.emitChangeEvent(value)
    }
  },
  mounted () {
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
      if (this.remote && this.multiple) {
        for (const option of this.selectedOptions) {
          this.memorizedValueOptionMap.set(option.value, option)
        }
      } else if (this.remote && !this.multiple) {
        const option = this.selectedOption
        if (option) {
          this.memorizedValueOptionMap.set(option.value, option)
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
      this.closeMenu()
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
      if (this.remote) {
        return values
          .filter(value => this.valueOptionMap.has(value) || this.memorizedValueOptionMap.has(value))
          .map(value => this.valueOptionMap.has(value) ? this.valueOptionMap.get(value) : this.memorizedValueOptionMap.get(value))
      } else {
        return values.filter(value => this.valueOptionMap.has(value)).map(value => this.valueOptionMap.get(value))
      }
    },
    getOption (value) {
      if (this.remote) {
        return this.valueOptionMap.get(value) || this.memorizedValueOptionMap.get(value) || null
      } else {
        return this.valueOptionMap.get(value) || null
      }
    },
    isSelected (option) {
      if (this.multiple) {
        if (!Array.isArray(this.value)) return false
        return !!~this.value.findIndex(value => value === option.value)
      } else {
        return option.value === this.value
      }
    },
    normalizeOption (option) {
      const normalizedOption = {
        label: option.label,
        value: option.value,
        disabled: option.disabled
      }
      return normalizedOption
    },
    /**
     * event utils methods
     */
    emitChangeEvent (newValue) {
      if (this.emitOption) {
        if (this.multiple) {
          if (newValue === null) {
            this.$emit('change', null)
          } else {
            let options = this.mapValuesToOptions(newValue)
            this.$emit('change', options.map(this.normalizeOption))
          }
        } else {
          const option = this.getOption(newValue)
          this.$emit('change', this.normalizeOption(option))
        }
      } else {
        this.$emit('change', newValue)
      }
    },
    handleToggleOption (option) {
      if (this.disabled) return
      if (this.multiple) {
        if (this.remote) {
          this.memorizedValueOptionMap.set(option.value, option)
        }
        let newValue = []
        if (Array.isArray(this.value)) {
          const optionValues = new Set(this.synthesizedOptions.map(item => item.value))
          newValue = this.value.filter(value => optionValues.has(value) || this.memorizedValueOptionMap.has(value))
        }
        const index = newValue.findIndex(value => value === option.value)
        if (~index) {
          newValue.splice(index, 1)
        } else {
          newValue.push(option.value)
          this.pattern = ''
        }
        this.$emit('input', newValue)
      } else {
        if (this.filterable && !this.multiple) {
          this.switchFocusToOuter()
        }
        this.closeMenu()
        this.$emit('input', option.value)
      }
    },
    handleDeleteLastOption (e) {
      if (!this.pattern.length) {
        const newValue = this.value
        if (Array.isArray(newValue)) {
          newValue.pop()
          this.$emit('input', newValue)
        }
      }
    },
    handlePatternInput (e) {
      this.pattern = e.target.value
      if (this.onSearch) {
        this.onSearch(e.target.value)
      }
    },
    handleClear (e) {
      e.stopPropagation()
      if (!this.multiple && this.filterable) {
        this.closeMenu()
      }
      if (this.multiple) {
        this.$emit('input', [])
      } else {
        this.$emit('input', null)
      }
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
        const pendingOption = this.$refs.contentInner && this.$refs.contentInner.pendingOption
        if (pendingOption) {
          this.handleToggleOption(pendingOption)
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
