<template>
  <div
    ref="select"
    class="n-select"
    tabindex="0"
    @keydown.up.prevent="() => {}"
    @keydown.down.prevent="() => {}"
    @keydown.space.prevent="() => {}"
    @keyup.up="handleKeyUpUp"
    @keyup.down="handleKeyUpDown"
    @keyup.enter="handleKeyUpEnter"
    @keyup.space="handleKeyUpSpace"
  >
    <n-base-picker
      ref="activator"
      class="n-select-picker"
      :active="active"
      :pattern="pattern"
      :placeholder="placeholder"
      :selected-option="selectedOption"
      :selected-options="selectedOptions"
      :toggle-option="toggleOption"
      :multiple="multiple"
      :filterable="filterable"
      :remote="remote"
      :clearable="clearable"
      :disabled="disabled"
      :on-search="onSearch"
      :size="size"
      @activator-click="handleActivatorClick"
      @pattern-input-delete="handlePatternInputDelete"
      @pattern-input="handlePatternInput"
      @clear="handleClear"
    />
    <div
      ref="contentContainer"
      v-clickoutside="handleClickOutsideMenu"
      class="n-detached-content-container n-select-detached-content-container"
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
            :pattern="pattern"
            :options="options"
            :multiple="multiple"
            :size="size"
            :processed-options="processedOptions"
            :loading="loading"
            :no-data-content="noDataContent"
            :not-found-content="notFoundContent"
            :emit-option="emitOption"
            :filterable="filterable"
            :is-selected="isSelected"
            @menu-toggle-option="toggleOption"
            @menu-scroll="handleMenuScroll"
            @menu-scroll-start="handleMenuScrollStart"
            @menu-scroll-end="handleMenuScrollEnd"
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
import processedOptions from '../../../utils/component/processOptions'

export default {
  name: 'NBaseSelect',
  components: {
    NBaseSelectMenu,
    NBasePicker
  },
  directives: {
    clickoutside
  },
  mixins: [detachable, toggleable, placeable, zindexable, Emitter],
  inject: {
    formItem: {
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
    verboseTransition: {
      type: Boolean,
      default: false
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
    firstOption () {
      if (this.processedOptions && this.processedOptions.length) {
        return this.processedOptions[0]
      } else {
        return null
      }
    },
    filteredOptions () {
      if (this.remote) {
        return this.options
      } else if (!this.filterable || !this.pattern.trim().length) return this.options
      return this.options.filter(option => this.patternMatched(option.label))
    },
    processedOptions () {
      return processedOptions(this.filteredOptions)
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
    },
    clearedPattern () {
      return this.pattern.toLowerCase().trim()
    }
  },
  watch: {
    selectedOptions (n) {
      if (this.formItem) {
        let vals = n.map(i => i.value)
        this.dispatch('NFormItem', 'on-form-change', vals)
      }
    },
    filteredOptions () {
      this.$nextTick().then(() => {
        this.updatePosition()
        if (this.$refs.scrollbar) {
          this.$refs.scrollbar.updateParameters()
        }
      })
    },
    value () {
      this.$nextTick().then(() => {
        this.updatePosition()
        if (this.$refs.scrollbar) {
          this.$refs.scrollbar.updateParameters()
        }
      })
    }
  },
  mounted () {
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
  methods: {
    /**
     * @param {string} value
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
    isSelected (option) {
      if (this.multiple) {
        if (!Array.isArray(this.value)) return false
        return 1 + this.value.findIndex(value => value === option.value)
      } else {
        return option.value === this.value
      }
    },
    handleClickOutsideMenu (e) {
      if (!this.$refs.activator.$el.contains(e.target) && !this.scrolling) {
        this.deactivate()
        if (this.filterable && !this.multiple) {
          this.pattern = ''
        }
      }
    },
    closeMenu () {
      this.deactivate()
      if (!this.multiple) {
        this.$refs.activator.blurSingleInput()
      }
    },
    handleActivatorClick () {
      if (this.disabled) return
      if (!this.active) {
        this.pattern = ''
        this.activate()
      } else {
        if (!this.filterable) {
          this.deactivate()
        }
      }
      if (this.multiple && this.filterable) {
        this.$nextTick().then(() => {
          this.$refs.activator.focusInputTag()
        })
      }
    },
    toggleOption (option) {
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
        // this.emitChangeEvent(item, false)
        } else {
          newValue.push(option.value)
          // this.emitChangeEvent(item, true)
          this.pattern = ''
        }
        this.$nextTick().then(() => {
          if (this.filterable) {
            // console.log('toggleOption inputTagInput')
            this.$refs.activator.focusInputTag()
          }
        })
        this.$emit('input', newValue)
        this.emitChangeEvent(newValue)
      } else {
        if (this.filterable && !this.multiple) {
          this.pattern = ''
        }
        this.$emit('input', option.value)
        this.emitChangeEvent(option.value)
        this.closeMenu()
      }
    },
    handleMenuScrollStart () {
      this.scrolling = true
    },
    handleMenuScrollEnd () {
      window.setTimeout(() => {
        this.scrolling = false
      }, 0)
    },
    handleMenuScroll (e, scrollContainer, scrollContent) {
      this.$emit('scroll', e, scrollContainer, scrollContent)
    },
    handlePatternInputDelete (e) {
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
    handleKeyUpEnter () {
      // console.log('keyup enter')
      const pendingOption = this.$refs.contentInner && this.$refs.contentInner.pendingOption
      if (pendingOption) {
        this.toggleOption(pendingOption)
      }
    },
    handleKeyUpSpace () {
      this.handleKeyUpEnter()
    },
    handleKeyUpUp () {
      console.log('keyup up')
      if (this.loading) return
      if (this.active) {
        this.$refs.contentInner.prev()
      }
    },
    handleKeyUpDown () {
      console.log('keyup down')
      if (this.loading) return
      if (this.active) {
        this.$refs.contentInner.next()
      }
    },
    handleClear (e) {
      e.stopPropagation()
      this.closeMenu()
      this.$emit('input', null)
      this.emitChangeEvent(null)
    }
  }
}
</script>
