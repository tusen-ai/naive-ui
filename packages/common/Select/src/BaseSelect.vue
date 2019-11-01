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
      :on-search="onSearch"
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
        <transition name="n-select-menu--transition">
          <n-base-select-menu
            v-if="active"
            ref="contentInner"
            class="n-select-menu"
            :theme="synthesizedTheme"
            :pattern="pattern"
            :options="options"
            :multiple="multiple"
            :size="size"
            :linked-options="linkedOptions"
            :loading="loading"
            :no-data-content="noDataContent"
            :not-found-content="notFoundContent"
            :emit-option="emitOption"
            :filterable="filterable"
            :is-selected="isSelected"
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
import toggleable from '../../../mixins/toggleable'
import zindexable from '../../../mixins/zindexable'
import Emitter from '../../../mixins/emitter'
import clickoutside from '../../../directives/clickoutside'
import NBaseSelectMenu from '../../../base/SelectMenu'
import NBasePicker from '../../../base/Picker'
import linkedOptions from '../../../utils/data/linkedOptions'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NBaseSelect',
  components: {
    NBaseSelectMenu,
    NBasePicker
  },
  directives: {
    clickoutside
  },
  mixins: [withapp, themeable, detachable, toggleable, placeable, zindexable, Emitter],
  inject: {
    NFormItem: {
      default: null
    }
  },
  props: {
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
      default: 'default'
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
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    noDataContent: {
      type: [String, Function],
      default: 'no data'
    },
    notFoundContent: {
      type: [String, Function],
      default: 'none result matched'
    }
  },
  data () {
    return {
      scrolling: false,
      pattern: '',
      memorizedValueOptionMap: new Map()
    }
  },
  computed: {
    filteredOptions () {
      if (this.remote) {
        return this.options
      } else if (!this.filterable || !this.pattern.trim().length) return this.options
      return this.options.filter(option => this.patternMatched(option.label))
    },
    linkedOptions () {
      return linkedOptions(this.filteredOptions)
    },
    valueOptionMap () {
      const valueToOption = new Map()
      this.options.forEach(option => valueToOption.set(option.value, option))
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
    options () {
      this.$nextTick().then(this.updateMemorizedOptions)
    },
    filteredOptions () {
      this.$nextTick().then(() => {
        this.updatePosition()
        // if (this.$refs.scrollbar) {
        //   this.$refs.scrollbar.updateParameters()
        // }
      })
    },
    value () {
      if (this.NFormItem) {
        this.dispatch('NFormItem', 'form-item-change', this.value)
      }
      this.$nextTick().then(() => {
        this.updatePosition()
        // if (this.$refs.scrollbar) {
        //   this.$refs.scrollbar.updateParameters()
        // }
      })
    }
  },
  mounted () {
    this.updateMemorizedOptions()
  },
  methods: {
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
    closeMenu () {
      this.pattern = ''
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
    patternMatched (value) {
      try {
        return 1 + value.toString().toLowerCase().indexOf(this.pattern.trim().toLowerCase())
      } catch (err) {
        return false
      }
    },
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
        return 1 + this.value.findIndex(value => value === option.value)
      } else {
        return option.value === this.value
      }
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
            this.$emit('change', options)
          }
        } else {
          const option = this.getOption(newValue)
          this.$emit('change', option)
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
          const optionValues = new Set(this.options.map(option => option.value))
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
        this.emitChangeEvent(newValue)
      } else {
        if (this.filterable && !this.multiple) {
          this.pattern = ''
          this.switchFocusToOuter()
        }
        this.$emit('input', option.value)
        this.emitChangeEvent(option.value)
        this.closeMenu()
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
      this.$emit('input', null)
      this.emitChangeEvent(null)
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
