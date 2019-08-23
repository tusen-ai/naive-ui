<template>
  <div
    ref="select"
    class="n-select"
    :class="{
      [`n-select--${size}-size`]: true,
      [`n-select--remote`]: remote,
      'n-select--disabled': disabled
    }"
    tabindex="0"
    @keydown.up.prevent="() => {}"
    @keydown.down.prevent="() => {}"
    @keydown.space.prevent="() => {}"
    @keyup.up="handleKeyUpUp"
    @keyup.down="handleKeyUpDown"
    @keyup.enter="handleKeyUpEnter"
    @keyup.space="handleKeyUpSpace"
  >
    <div
      v-if="multiple"
      ref="activator"
      class="n-select-link"
      :class="{
        'n-select-link--active': active,
        'n-select-link--selected': selected || (active && pattern.length)
      }"
      @click="handleActivatorClick"
    >
      <div
        class="n-select-link__tags"
        :class="{
          'n-select-link__tags--selected': selected
        }"
      >
        <div
          class="n-select-link__tag-wrapper"
        >
          <div
            v-for="option in selectedOptions"
            :key="option.value"
            class="n-select-link__tag"
          >
            <div class="n-select-link-tag__content">
              {{ option.label }}
            </div>
            <n-icon
              class="n-select-link-tag__icon"
              type="md-close"
              @click.stop="toggleOption(option)"
            />
          </div>
          <div
            v-if="filterable && active"
            class="n-select-input-tag"
          >
            <input
              ref="inputTagInput"
              v-model="pattern"
              class="n-select-input-tag__input"
              @keydown.delete="handlePatternInputDelete"
              @input="handlePatternInput"
            >
            <span
              ref="inputTagMirror"
              class="n-select-input-tag__mirror"
            >{{ pattern ? pattern : '&nbsp;' }}</span>
          </div>
        </div>
      </div>
      <div
        class="n-select-link__placeholder"
      >
        {{ placeholder }}
      </div>
      <n-cancel-mark
        class="n-select-link__mark"
        arrow
        :show="!remote"
        :disabled="disabled"
        :active="active"
        :clearable="clearable && selected"
        @clear="handleClear"
      />
    </div>
    <div
      v-else
      ref="activator"
      class="n-select-link"
      :class="{
        'n-select-link--active': active
      }"
      @click="handleActivatorClick"
    >
      <div
        class="n-select-link__label"
      >
        <input
          ref="singleInput"
          :value="singleInputActive ? pattern : (selectedOption && selectedOption.label)"
          class="n-select-link-label__input"
          :placeholder="selectedOption ? selectedOption.label : placeholder"
          :readonly="!disabled && filterable ? false : 'readonly'"
          @input="handleSingleInputInput"
          @focus="handleSingleInputFocus"
        >
      </div>
      <n-cancel-mark
        class="n-select-link__mark"
        arrow
        :show="!remote"
        :disabled="disabled"
        :active="active"
        :clearable="clearable && selected"
        @clear="handleClear"
      />
    </div>
    <div
      ref="contentContainer"
      v-clickoutside="handleClickOutsideMenu"
      class="n-select-menu__content-wrapper"
    >
      <div
        ref="content"
        class="n-select-menu__content"
      >
        <transition name="n-select-menu--transition">
          <n-select-menu
            v-if="active"
            ref="contentInner"
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
            :pending-option="pendingOption"
            :pending-option-element="pendingOptionElement"
            :is-selected="isSelected"
            @menu-toggle-option="toggleOption"
            @menu-scroll="handleMenuScroll"
            @menu-scroll-start="handleMenuScrollStart"
            @menu-scroll-end="handleMenuScrollEnd"
            @menu-change-pending-option="handleMenuChangePendingOption"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import NIcon from '../../Icon/index'
import detachable from '../../../mixins/detachable'
import placeable from '../../../mixins/placeable'
import toggleable from '../../../mixins/toggleable'
import zindexable from '../../../mixins/zindexable'
import clickoutside from '../../../directives/clickoutside'
import NSelectMenu from './SelectMenu'
import Emitter from '../../../mixins/emitter'
import cloneDeep from 'lodash/cloneDeep'
import NCancelMark from '../../CancelMark'

export default {
  name: 'NBaseSelect',
  components: {
    NIcon,
    NSelectMenu,
    NCancelMark
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
      memorizedValueOptionMap: new Map(),
      pendingOption: null,
      pendingOptionElement: null,
      firstOption: null,
      singleInputActive: false
    }
  },
  computed: {
    selected () {
      if (this.multiple) {
        console.log('this.selectedOptions.length', this.selectedOptions.length)
        return !!this.selectedOptions.length
      } else {
        console.log('this.selectedOption', this.selectedOption)

        return !!this.selectedOption
      }
    },
    filteredOptions () {
      if (this.remote) {
        return this.options
      } else if (!this.filterable || !this.pattern.trim().length) return this.options
      return this.options.filter(option => this.patternMatched(option.label))
    },
    processedOptions () {
      const decoratedOptions = cloneDeep(this.filteredOptions).map((option, index) => {
        return {
          ...option,
          id: index
        }
      })
      const length = decoratedOptions.length
      decoratedOptions.forEach((option, i) => {
        option.prev = decoratedOptions[(i + length - 1) % length]
        option.next = decoratedOptions[(i + length + 1) % length]
      })
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.firstOption = decoratedOptions[0] || null
      return decoratedOptions
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
    init () {
      this.pendingOption = null
      this.pendingOptionElement = null
      this.singleInputActive = false
    },
    /**
     * @param {string} value
     */
    patternMatched (value) {
      try {
        return 1 + value.toString().toLowerCase().search(this.pattern.trim().toLowerCase())
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
      if (!this.$refs.activator.contains(e.target) && !this.scrolling) {
        this.deactivate()
        if (this.filterable && !this.multiple) {
          this.pattern = ''
          this.singleInputActive = false
        }
      }
    },
    closeMenu () {
      this.deactivate()
      if (!this.multiple) {
        this.init()
        this.$refs.singleInput.blur()
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
          this.$refs.inputTagInput.focus()
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
            this.$refs.inputTagInput.focus()
          }
        })
        this.$emit('input', newValue)
        this.emitChangeEvent(newValue)
      } else {
        if (this.filterable && !this.multiple) {
          this.pattern = ''
          this.singleInputActive = false
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
    handlePatternInput () {
      this.$nextTick().then(() => {
        const textWidth = this.$refs.inputTagMirror.getBoundingClientRect().width
        this.$refs.inputTagInput.style.width = textWidth + 'px'
        if (this.onSearch) {
          this.onSearch(this.pattern)
        }
      })
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
    handleKeyUpEnter () {
      // console.log('keyup enter')
      if (this.pendingOption) {
        this.toggleOption(this.pendingOption)
      }
    },
    handleKeyUpSpace () {
      this.handleKeyUpEnter()
    },
    handleKeyUpUp () {
      // console.log('keyup up')
      if (this.loading) return
      if (this.active) {
        if (this.pendingOption) {
          let optionIterator = this.pendingOption
          optionIterator = optionIterator.prev
          while (this.pendingOption !== optionIterator && optionIterator.disabled) {
            optionIterator = optionIterator.prev
          }
          this.pendingOption = optionIterator
          this.setPendingOptionElement(optionIterator)
        }
      }
    },
    setPendingOptionElement (option) {
      const menu = this.$refs.contentContainer
      if (menu) {
        const el = menu.querySelector(`[data-id="${option.id}"]`)
        this.pendingOptionElement = el
      }
    },
    handleKeyUpDown () {
      // console.log('keyup down')
      if (this.loading) return
      if (this.active) {
        if (this.pendingOption === null) {
          // console.log('this.pendingOption === null', this.firstOption)
          const firstOption = this.firstOption
          if (firstOption) {
            let optionIterator = firstOption
            if (!optionIterator) {
              return
            } else {
              while (optionIterator.disabled) {
                optionIterator = optionIterator.next
                if (optionIterator === firstOption) {
                  break
                }
              }
            }
            this.pendingOption = optionIterator
            this.setPendingOptionElement(optionIterator)
          }
        } else {
          // console.log('this.pendingOption !== null', this.pendingOption)
          let optionIterator = this.pendingOption
          optionIterator = optionIterator.next
          while (this.pendingOption !== optionIterator && optionIterator.disabled) {
            optionIterator = optionIterator.next
          }
          this.pendingOption = optionIterator
          this.setPendingOptionElement(optionIterator)
        }
      }
    },
    handleMenuChangePendingOption (option) {
      this.pendingOption = option
      this.pendingOptionElement = null
    },
    handleSingleInputFocus () {
      // console.log('handleSingleInputFocus')
      if (this.filterable && !this.multiple) {
        this.singleInputActive = true
      }
    },
    handleSingleInputInput (e) {
      this.pattern = e.target.value
      if (this.onSearch) {
        this.onSearch(e.target.value)
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
