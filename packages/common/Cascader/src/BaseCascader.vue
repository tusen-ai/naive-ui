<template>
  <div
    ref="self"
    class="n-cascader"
    @keyup.space="handleKeyUpSpace"
    @keyup.enter="handleKeyUpEnter"
    @keyup.up="handleKeyUpUp"
    @keyup.down="handleKeyUpDown"
    @keyup.left="handleKeyUpLeft"
    @keyup.right="handleKeyUpRight"
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
      @activator-click="handleActivatorClick"
      @pattern-input-delete="handlePatternInputDelete"
      @pattern-input="handlePatternInput"
      @clear="handleClear"
    />
    <div
      ref="contentContainer"
      class="n-detached-content-container n-cascader-detached-content-container"
    >
      <div
        ref="content"
        class="n-detached-content"
      >
        <transition name="n-cascader-menu--transition">
          <cascader-menu
            v-if="active"
            ref="menu"
            v-clickoutside="handleMenuClickOutside"
            :value="value"
            :multiple="multiple"
            :linked-options="linkedOptions"
            :active-id="activeId"
            :traced-option="tracedOption"
            :enable-all-options="enableAllOptions"
            :pattern="pattern"
            :filterable="filterable"
            @input="handleMenuInput"
            @option-click="handleOptionClick"
            @menu-keyup-space="handleKeyUpSpace"
            @menu-keyup-enter="handleKeyUpEnter"
            @menu-keyup-up="handleKeyUpUp"
            @menu-keyup-down="handleKeyUpDown"
            @menu-keyup-left="handleKeyUpLeft"
            @menu-keyup-right="handleKeyUpRight"
            @menu-type-change="handleMenuTypeChange"
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
import CascaderMenu from './CascaderMenu'
import cloneDeep from 'lodash/cloneDeep'
import { getType, traverseWithCallback } from './utils'

export default {
  name: 'NBaseCascader',
  components: {
    CascaderMenu,
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
      pattern: '',
      selected: true,
      inputTypeIsSearch: false
    }
  },
  computed: {
    type: getType,
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
                label: path.join(' / ')
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
              label: path.join(' / ')
            }
          }
        }, () => {
          path.pop()
        })
        return selectedOption
      } else return null
    },
    linkedOptions () {
      // console.log('processOptions')
      const linkedOptions = cloneDeep(this.options)
      let id = 0
      const type = this.type
      const path = []
      function traverse (options, parent = null, depth = 0) {
        if (!Array.isArray(options)) return
        const length = options.length
        for (let i = 0; i < length; ++i) {
          const option = options[i]
          path.push(option.label)
          option.type = type
          option.parent = parent
          option.prevSibling = options[(i + length - 1) % length]
          option.nextSibling = options[(i + length + 1) % length]
          option.depth = depth
          option.id = id++
          option.path = cloneDeep(path)
          option.hasChildren = Array.isArray(option.children) && option.children.length
          option.isLeaf = !option.hasChildren
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
            }
          } else if (type === 'multiple-all-options') {
            if (Array.isArray(option.children) && option.children.length) {
              traverse(option.children, option, depth + 1)
            }
            option.leafCount = 0
          } else if (type === 'single-all-options') {
            if (Array.isArray(option.children) && option.children.length) {
              traverse(option.children, option, depth + 1)
            }
            option.leafCount = 0
          } else if (type === 'single') {
            if (Array.isArray(option.children) && option.children.length) {
              traverse(option.children, option, depth + 1)
            }
            option.leafCount = 0
          }
          path.pop()
        }
      }
      if (type === 'multiple') {
        traverse(linkedOptions)
      } else if (type === 'multiple-all-options') {
        traverse(linkedOptions)
      } else if (type === 'single-all-options') {
        traverse(linkedOptions)
      } else if (type === 'single') {
        traverse(linkedOptions)
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return linkedOptions
    }
  },
  watch: {
    tracedOption (v) {
      // console.log('tracedOption', v)
    },
    pattern () {
      this.handlePatternChange()
    },
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
    },
    active (newActive) {
      if (!newActive) {
        this.tracedOption = null
        this.pattern = ''
      } else {
        if (!this.filterable) {
          this.$nextTick().then(() => {
            const contentContainer = this.$refs.contentContainer
            if (contentContainer) {
              const firstSubmenu = contentContainer.querySelector('.n-cascader-submenu')
              if (firstSubmenu) firstSubmenu.focus()
            }
          })
        }
      }
    }
  },
  methods: {
    handleMenuClickOutside (e) {
      if (!this.$refs.activator.$el.contains(e.target)) {
        this.deactivate()
      }
    },
    toggleMenu () {
      if (this.disabled) {
        this.deactivate()
        return
      }
      this.toggle()
    },
    openMenu () {
      this.activate()
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
    handleKeyUpSpace () {
      this.handleKeyUpEnter()
    },
    handleKeyUpEnter () {
      if (this.active && this.tracedOption && this.$refs.menu) {
        this.$refs.menu.handleOptionCheck(this.tracedOption)
      } else if (this.active && this.inputTypeIsSearch) {
        const menu = this.$refs.menu
        if (menu) {
          const searchMenu = menu.$refs.searchMenu
          if (searchMenu) {
            const pendingOption = searchMenu.pendingOption
            console.log(pendingOption)
            menu.handleSelectOptionCheck(pendingOption)
          }
        }
      }
    },
    handleKeyUpDown () {
      if (this.active && !this.filterable) {
        const menu = this.$refs.menu
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
          const firstOption = this.$refs.menu && this.$refs.menu.firstOption
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
          // console.log('this.tracedOption', this.tracedOption)
          this.activeId = this.tracedOption.id
          const el = menu && menu.$el && menu.$el.querySelector(`[data-id="${this.activeId}"]`)
          // console.log('el', el)
          if (scrollbar && el) {
            scrollbar.scrollToElement(el)
          }
        }
      } else if (this.active && this.inputTypeIsSearch) {
        const menu = this.$refs.menu
        if (menu) {
          const searchMenu = menu.$refs.searchMenu
          if (searchMenu) {
            searchMenu.next()
            // console.log(searchMenu.pendingOption)
          }
        }
      }
    },
    handleKeyUpUp () {
      if (this.active && this.tracedOption && !this.filterable) {
        const menu = this.$refs.menu
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
      } else if (this.active && this.inputTypeIsSearch) {
        const menu = this.$refs.menu
        if (menu) {
          const searchMenu = menu.$refs.searchMenu
          if (searchMenu) {
            searchMenu.prev()
            // console.log(searchMenu.pendingOption)
          }
        }
      }
    },
    handleKeyUpLeft () {
      if (this.active && this.tracedOption && this.tracedOption.parent && !this.filterable) {
        this.tracedOption = this.tracedOption.parent
        this.activeId = this.tracedOption.id
      }
    },
    handleKeyUpRight () {
      if (this.active && this.tracedOption && !this.filterable) {
        const firstChild = this.tracedOption.children && this.tracedOption.children[0]
        if (firstChild) {
          this.tracedOption = firstChild
          this.activeId = firstChild.id
        }
      }
    },
    handleMenuInput (value) {
      this.$emit('input', value)
      if (this.type === 'single') {
        this.deactivate()
      } else if (this.type === 'single-all-options') {
        const activator = this.$refs.activator
        if (activator) {
          activator.forceActiveInput = true
        }
        if (this.inputTypeIsSearch) {
          this.deactivate()
        }
      } else {
        const activator = this.$refs.activator
        this.pattern = ''
        if (activator) {
          this.$nextTick().then(() => {
            activator.focusInputTag()
          })
        }
      }
    },
    handleClear () {
      this.$emit('input', null)
    },
    handleActivatorClick () {
      if (this.filterable) {
        this.openMenu()
      } else {
        this.toggleMenu()
      }
    },
    handlePatternInputDelete () {
      if (this.multiple) {
        if (Array.isArray(this.value)) {
          const newValue = this.value
          newValue.pop()
          this.$emit('input', newValue)
        }
      }
    },
    handlePatternInput (e) {
      this.pattern = e.target.value
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
      this.tracedOption = null
    },
    handleMenuTypeChange (typeIsSearch) {
      this.$nextTick().then(() => {
        this.inputTypeIsSearch = typeIsSearch
        if (typeIsSearch) {
          const el = this.$refs.menu.$refs.searchMenu.$el
          this.updatePosition(
            el,
            (el, activatorRect) => {
              el.style.minWidth = activatorRect.width + 'px'
            }
          )
        } else {
          this.updatePosition()
        }
        // debugger
      })
    },
    handlePatternChange () {
      this.$nextTick().then(() => {
        this.updatePosition()
        // debugger
      })
    }
  }
}
</script>
