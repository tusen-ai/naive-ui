<template>
  <div
    ref="self"
    class="n-cascader"
  >
    <n-base-picker
      ref="activator"
      class="n-cascader-picker"
      :active="active"
      :pattern="pattern"
      :placeholder="placeholder"
      :selected="selected"
      :selected-option="selectedOption"
      :selected-options="selectedOptions"
      :toggle-option="removeOption"
      :multiple="multiple"
      :filterable="filterable"
      :remote="remote"
      :clearable="clearable"
      :disabled="disabled"
      :single-input-active="singleInputActive"
      @activator-click="handleActivatorClick"
      @single-input-focus="handleSingleInputFocus"
      @pattern-input-delete="handlePatternInputDelete"
      @pattern-input="handlePatternInput"
      @clear="handleClear"
    />
    <div
      ref="contentContainer"
      class="n-cascader-menu__content-wrapper"
    >
      <div
        ref="content"
        class="n-cascader-menu__content"
      >
        <transition name="n-cascader-menu--transition">
          <CasPanel
            v-if="active"
            ref="menu"
            v-clickoutside.lazy="handleMenuClickOutside"
            :value="value"
            :multiple="multiple"
            :options="optionsWithId"
            :active-id="activeId"
            :traced-option="tracedOption"
            :enable-all-options="enableAllOptions"
            @input="handleMenuInput"
            @option-click="handleOptionClick"
            @menu-keyup-space="handleKeyUpSpace"
            @menu-keyup-enter="handleKeyUpEnter"
            @menu-keyup-up="handleKeyUpUp"
            @menu-keyup-down="handleKeyUpDown"
            @menu-keyup-left="handleKeyUpLeft"
            @menu-keyup-right="handleKeyUpRight"
            @menu-options-change="handleMenuOptionsChange"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import NBasePicker from '../../../base/Picker'
import detachable from '../../../mixins/detachable'
import placeable from '../../../mixins/placeable'
import toggleable from '../../../mixins/toggleable'
import clickoutside from '../../../directives/clickoutside'
import CasPanel from './CasPanel'
import cloneDeep from 'lodash/cloneDeep'
import { type } from './utils'

function traverseWithCallback (options, beforeCallback = () => {}, afterCallback = () => {}) {
  if (Array.isArray(options)) {
    for (const option of options) {
      beforeCallback(option)
      if (option.children) traverseWithCallback(option.children, beforeCallback, afterCallback)
      afterCallback(option)
    }
  }
}

export default {
  name: 'MultipleCascader',
  components: {
    CasPanel,
    NBasePicker
  },
  directives: {
    clickoutside
  },
  mixins: [detachable, toggleable, placeable],
  props: {
    options: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/require-prop-types
    value: {
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
    enableAllOptions: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      labelPlaceholder: 'Please Select',
      activeId: null,
      tracedOption: null,
      firstOption: null,
      singleInputActive: false,
      pattern: '',
      selected: true
    }
  },
  computed: {
    type: type,
    expandTriggeredByHover () {
      return this.expandTrigger === 'hover'
    },
    expandTriggeredByClick () {
      return this.expandTrigger === 'click'
    },
    selectedOptions () {
      if (this.multiple) {
        let options = []
        if (Array.isArray(this.value)) {
          const values = new Set(this.value)
          const path = []
          traverseWithCallback(this.options, option => {
            path.push(option.label)
            if (values.has(option.value)) {
              options.push({
                value: option.value,
                label: path.join('/')
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
        traverseWithCallback(this.options, option => {
          path.push(option.label)
          // console.log(option.value, this.value)
          if (option.value === this.value) {
            // console.log('here')
            selectedOption = {
              value: option.value,
              label: path.join('/')
            }
          }
        }, () => {
          path.pop()
        })
        return selectedOption
      } else return null
    },
    optionsWithId () {
      // console.log('processOptions')
      const optionsWithId = cloneDeep(this.options)
      let id = 0
      const valueSet = new Set(this.value)
      const value = this.value
      const checkedOptions = []
      function markPath (option) {
        const parent = option.parent
        if (parent) {
          parent.checkedLeafCount += 1
          markPath(parent)
        }
      }
      const type = this.type
      function traverse (options, parent = null, depth = 0) {
        const length = options.length
        for (let i = 0; i < length; ++i) {
          const option = options[i]
          option.parent = parent
          option.prevSibling = options[(i + length - 1) % length]
          option.nextSibling = options[(i + length + 1) % length]
          option.depth = depth
          option.id = id++
          option.checkedLeafCount = 0
          if (type === 'multiple') {
            if (Array.isArray(option.children) && option.children.length) {
              traverse(option.children, option, depth + 1)
              option.leafCount = 0
              option.children.forEach(child => {
                if (!child.disabled) {
                  option.leafCount += child.leafCount
                }
              })
            } else {
              if (option.disabled) {
                option.leafCount = 0
              } else {
                option.leafCount = 1
              }
              option.checked = valueSet.has(option.value)
              if (option.checked) {
                checkedOptions.push(option)
              }
            }
          } else if (type === 'multiple-all-options') {
            if (Array.isArray(option.children) && option.children.length) {
              traverse(option.children, option, depth + 1)
            }
            option.leafCount = 0
            option.checkedLeafCount = 0
            option.checked = valueSet.has(option.value)
          } else if (type === 'single-all-options') {
            if (Array.isArray(option.children) && option.children.length) {
              traverse(option.children, option, depth + 1)
            }
            option.leafCount = 0
            option.checkedLeafCount = 0
            option.checked = option.value === value
          } else if (type === 'single') {
            if (Array.isArray(option.children) && option.children.length) {
              traverse(option.children, option, depth + 1)
            }
            option.leafCount = 0
            option.checkedLeafCount = 0
            option.checked = option.value === value
          }
        }
      }
      if (type === 'multiple') {
        traverse(optionsWithId)
        for (const checkedOption of checkedOptions) {
          markPath(checkedOption)
        }
      } else if (this.type === 'multiple-all-options') {
        traverse(optionsWithId)
      } else if (type === 'single-all-options') {
        traverse(optionsWithId)
      } else if (type === 'single') {
        traverse(optionsWithId)
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.firstOption = optionsWithId[0]
      return optionsWithId
    }
  },
  watch: {
    selectedOptions () {
      this.$nextTick().then(() => {
        this.updatePosition()
      })
    },
    selectedOption () {
      this.$nextTick().then(() => {
        this.updatePosition()
      })
    },
    options () {
      this.tracedOption = null
      this.activeId = null
      this.firstOption = null
    },
    active (newActive) {
      if (!newActive) {
        this.tracedOption = null
      } else {
        this.$nextTick().then(() => {
          const contentContainer = this.$refs.contentContainer
          if (contentContainer) {
            const firstSubmenu = contentContainer.querySelector('.n-cascader-submenu')
            if (firstSubmenu) firstSubmenu.focus()
          }
        })
      }
    },
    tracedOption (newOption) {
      if (newOption) {
        this.$nextTick().then(() => {
          const submenu = this.$refs.contentContainer.querySelector(`[data-depth="${newOption.depth}"]`)
          if (submenu) submenu.focus()
        })
      }
    }
  },
  methods: {
    handleMenuClickOutside () {
      this.deactivate()
    },
    toggleMenu () {
      if (this.disabled) {
        this.deactivate()
        return
      }
      this.toggle()
    },
    handleOptionMouseEnter (e, option) {
      if (this.expandTriggeredByHover && !option.disabled) {
        this.activeId = option.id
      }
    },
    handleOptionClick (e, option, menu) {
      if (this.expandTriggeredByClick && !option.disabled) {
        this.activeId = option.id
        this.tracedOption = option
      }
    },
    handleKeyUpSpace (menu) {
      this.handleKeyUpEnter(menu)
    },
    handleKeyUpEnter (menu) {
      const options = menu && menu.$refs.options
      if (options) {
        const option = options.find(option => option.id === this.tracedOption.id)
        if (option) {
          option.handleOptionCheck()
        }
      }
    },
    handleKeyUpDown (menu) {
      if (this.active) {
        let scrollbar = null
        if (menu && menu.$refs.scrollbar) {
          scrollbar = menu.$refs.scrollbar
        }
        if (this.tracedOption) {
          let optionIterator = this.tracedOption.nextSibling
          while (optionIterator !== this.tracedOption && optionIterator.disabled) {
            optionIterator = optionIterator.nextSibling
          }
          this.tracedOption = optionIterator
          this.activeId = this.tracedOption.id
          const el = menu && menu.$el && menu.$el.querySelector(`[data-id="${this.activeId}"]`)
          if (scrollbar && el) {
            scrollbar.scrollToElement(el)
          }
        } else {
          const firstOption = this.firstOption
          if (!firstOption) {
            return
          }
          let optionIterator = firstOption
          while (optionIterator.disabled) {
            optionIterator = optionIterator.nextSibling
            if (optionIterator === firstOption) {
              break
            }
          }
          this.tracedOption = optionIterator
          this.activeId = this.tracedOption.id
          const el = menu && menu.$el && menu.$el.querySelector(`[data-id="${this.activeId}"]`)
          if (scrollbar && el) {
            scrollbar.scrollToElement(el)
          }
        }
      }
    },
    handleKeyUpUp (menu) {
      if (this.active && this.tracedOption) {
        let scrollbar = null
        if (menu && menu.$refs.scrollbar) {
          scrollbar = menu.$refs.scrollbar
        }
        let optionIterator = this.tracedOption.prevSibling
        while (optionIterator !== this.tracedOption && optionIterator.disabled) {
          optionIterator = optionIterator.prevSibling
        }
        this.tracedOption = optionIterator
        this.activeId = this.tracedOption.id
        const el = menu && menu.$el && menu.$el.querySelector(`[data-id="${this.activeId}"]`)
        if (scrollbar && el) {
          scrollbar.scrollToElement(el)
        }
      }
    },
    handleKeyUpLeft () {
      if (this.active && this.tracedOption && this.tracedOption.parent) {
        this.tracedOption = this.tracedOption.parent
        this.activeId = this.tracedOption.id
      }
    },
    handleKeyUpRight () {
      if (this.active && this.tracedOption) {
        const firstChild = this.tracedOption.children && this.tracedOption.children[0]
        if (firstChild) {
          this.tracedOption = firstChild
          this.activeId = firstChild.id
        }
      }
    },
    handleMenuInput (value) {
      this.$emit('input', value)
    },
    handleClear () {
      this.$emit('input', null)
    },
    handleActivatorClick () {
      this.toggleMenu()
    },
    handleSingleInputFocus () {

    },
    handlePatternInputDelete () {

    },
    handlePatternInput () {

    },
    handleMenuOptionsChange () {
      this.tracedOption = null
    },
    removeOption (option) {
      if (this.multiple && Array.isArray(this.value)) {
        const index = this.value.findIndex(value => value === option.value)
        if (~index) {
          const newValue = this.value
          newValue.splice(index, 1)
          this.$emit('input', newValue)
        }
      } else {
        this.$emit('input', null)
      }
    }
  }
}
</script>
