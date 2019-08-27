<template>
  <div
    class="n-cascader-menu"
    @mousedown.prevent="() => {}"
  >
    <transition name="n-cascader-cascader-menu--transition">
      <div
        v-if="!selectMenuActive"
        class="n-cascader-cascader-menu"
      >
        <n-cascader-submenu
          v-for="(submenuOptions, index) in menuModel"
          :key="index"
          :size="size"
          :options="submenuOptions"
          :depth="index"
          @option-click="handleOptionClick"
          @option-mouseenter="handleOptionMouseEnter"
          @option-mouseleave="handleOptionMouseLeave"
          @option-check="handleOptionCheck"
        />
      </div>
    </transition>
    <transition name="n-cascader-select-menu--transition">
      <n-base-select-menu
        v-if="selectMenuActive"
        ref="selectMenu"
        class="n-cascader-select-menu"
        filterable
        :pattern="pattern"
        :options="options"
        :multiple="multiple"
        :size="size"
        :linked-options="linkedSelectOptions"
        :is-selected="isSelected"
        @menu-toggle-option="handleSelectMenuToggleOption"
        @menu-scroll-start="handleMenuScrollStart"
        @menu-scroll-end="handleMenuScrollEnd"
        @menu-change-pending-option="handleMenuChangePendingOption"
      />
    </transition>
  </div>
</template>
<script>
import NCascaderSubmenu from './CascaderSubmenu'
import NBaseSelectMenu from '../../../base/SelectMenu'
import { getType, traverseWithCallback, isLeaf, minus, merge } from './utils'
import linkedOptions from '../../../utils/component/linkedOptions'
import cloneDeep from 'lodash/cloneDeep'

function processedOption (option, activeIds, tracedOption) {
  return {
    ...option,
    active: activeIds.has(option.id),
    hasChildren: hasChildren(option),
    checkboxChecked: checkboxChecked(option),
    checkboxIndeterminate: checkboxIndeterminate(option),
    isLeaf: isLeaf(option),
    traced: traced(option, tracedOption)
  }
}

function hasChildren (option) {
  return !!(option.children && option.children.length)
}
function checkboxChecked (option) {
  if (option.type === 'multiple') {
    if (Array.isArray(option.children) && option.children.length) {
      return option.leafCount === option.checkedLeafCount
    } else {
      return option.checked
    }
  } else {
    return option.checked
  }
}
function checkboxIndeterminate (option) {
  if (option.type === 'multiple') {
    return !option.checked && option.checkedLeafCount !== 0 && option.checkedLeafCount !== option.leafCount
  } return false
}
function traced (option, tracedOption) {
  if (option && tracedOption) {
    return option.id === tracedOption.id
  }
  return false
}

export default {
  name: 'NCascaderMenu',
  components: {
    NCascaderSubmenu,
    NBaseSelectMenu
  },
  props: {
    size: {
      type: String,
      default: 'default'
    },
    pattern: {
      type: String,
      default: null
    },
    filterable: {
      type: Boolean,
      default: false
    },
    value: {
      validator: () => true,
      default: null
    },
    activeValue: {
      validator: () => true,
      default: null
    },
    linkedOptions: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    enableAllOptions: {
      type: Boolean,
      default: false
    },
    expandTrigger: {
      type: String,
      default: 'click'
    },
    activeId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      tracedOption: null
    }
  },
  computed: {
    valueSet () {
      return new Set(this.value)
    },
    options () {
      const options = cloneDeep(this.linkedOptions)
      const checkedOptions = []
      const valueSet = this.valueSet
      const value = this.value
      function markPath (option) {
        const parent = option.parent
        if (parent) {
          parent.checkedLeafCount += 1
          markPath(parent)
        }
      }
      const type = this.type
      function traverse (options, parent = null, depth = 0) {
        if (!Array.isArray(options)) return
        const length = options.length
        for (let i = 0; i < length; ++i) {
          const option = options[i]
          option.checkedLeafCount = 0
          if (type === 'multiple') {
            if (Array.isArray(option.children) && option.children.length) {
              traverse(option.children, option, depth + 1)
            } else {
              option.checked = valueSet.has(option.value)
              if (option.checked) {
                checkedOptions.push(option)
              }
            }
          } else if (type === 'multiple-all-options') {
            if (Array.isArray(option.children) && option.children.length) {
              traverse(option.children, option, depth + 1)
            }
            option.checked = valueSet.has(option.value)
          } else if (type === 'single-all-options') {
            if (Array.isArray(option.children) && option.children.length) {
              traverse(option.children, option, depth + 1)
            }
            option.checked = option.value === value
          } else if (type === 'single') {
            if (Array.isArray(option.children) && option.children.length) {
              traverse(option.children, option, depth + 1)
            }
            option.checked = option.value === value
          }
        }
      }
      traverse(options)
      if (type === 'multiple') {
        checkedOptions.forEach(option => {
          // console.log('checkedOption', option)
          markPath(option)
        })
      }
      return options
    },
    selectMenuActive () {
      return this.filterable && this.pattern && this.pattern.trim().length
    },
    filteredSelectOptions () {
      const filteredSelectOptions = []
      const type = this.type
      traverseWithCallback(this.options, option => {
        if (Array.isArray(option.path) && option.path.some(
          label => ~label.indexOf(this.pattern)
        )) {
          if (type === 'multiple' || type === 'single') {
            // console.log()
            if (option.isLeaf) {
              filteredSelectOptions.push({
                value: option.value,
                label: option.path.join(' / ')
              })
            }
          } else {
            filteredSelectOptions.push({
              value: option.value,
              label: option.path.join(' / ')
            })
          }
        }
      })
      return filteredSelectOptions
    },
    linkedSelectOptions () {
      return linkedOptions(this.filteredSelectOptions, this)
    },
    activeOptionPath () {
      return this.optionPath(this.activeId)
    },
    type: getType,
    firstOption () {
      if (this.menuModel && this.menuModel[0] && this.menuModel[0][0]) {
        return this.menuModel[0][0]
      } else {
        return null
      }
    },
    activeIds () {
      return new Set(this.activeOptionPath.map(option => option.id))
    },
    menuModel () {
      const activeOptionPath = this.activeOptionPath
      const model = [this.options.map(option => {
        return processedOption(option, this.activeIds, this.tracedOption)
      })]
      for (const option of activeOptionPath) {
        if (Array.isArray(option.children) && option.children.length) {
          model.push(option.children.map(option => {
            return processedOption(option, this.activeIds, this.tracedOption)
          }))
        }
      }
      return model
    },
    idOptionMap () {
      const idOptionMap = new Map()
      for (const submenu of this.menuModel) {
        for (const option of submenu) {
          idOptionMap.set(option.id, option)
        }
      }
      return idOptionMap
    },
    expandTriggeredByHover () {
      return this.expandTrigger === 'hover'
    },
    expandTriggeredByClick () {
      return this.expandTrigger === 'click'
    }
  },
  watch: {
    selectMenuActive (selectMenuActive) {
      this.$nextTick().then(() => {
        this.handleMenuTypeChange(selectMenuActive)
      })
    },
    tracedOption (option) {
      /**
       * scroll to option element
       */
      this.$nextTick().then(() => {
        const submenuInstance = this.$children.find(child => child.depth === option.depth)
        if (submenuInstance) {
          const scrollbar = submenuInstance.$refs.scrollbar
          if (scrollbar) {
            const optionElement = this.$el.querySelector(`[data-n-cascader-option-id="${option.id}"]`)
            scrollbar.scrollToElement(optionElement)
          }
        }
      })
    }
  },
  methods: {
    isSelected (option) {
      if (this.multiple) {
        return this.valueSet.has(option.value)
      } else {
        return this.value === option.value
      }
    },
    handleMenuChangePendingOption (option) {
      if (option) {
        // console.log(option.label)
      }
    },
    handleSelectMenuToggleOption (option) {
      // console.log('handleSelectMenuToggleOption', option)
      this.handleSelectOptionCheck(option)
    },
    handleMenuScrollStart () {

    },
    handleMenuScrollEnd () {

    },
    optionPath (optionId) {
      const path = []
      if (optionId === null) return path
      let done = false
      function traverseOptions (options) {
        if (!Array.isArray(options) || !options.length) return
        for (const option of options) {
          if (done) return
          path.push(option)
          if (option.id === optionId) {
            done = true
            return
          }
          if (option.children) {
            traverseOptions(option.children)
          }
          if (done) return
          path.pop(option)
        }
      }
      traverseOptions(this.options)
      return path
    },
    handleOptionMouseEnter (e, option) {
      if (this.expandTriggeredByHover && !option.disabled) {
        this.updateActiveId(option.id)
      }
    },
    handleOptionMouseLeave (e, option) {
    },
    handleOptionClick (e, option, menu) {
      if (this.expandTriggeredByClick && !option.disabled) {
        this.updateActiveId(option.id)
        this.updateTracedOption(option)
      }
    },
    handleMenuTypeChange (typeisSelect) {
      this.$nextTick().then(() => {
        this.typeIsSelect = typeisSelect
        if (typeisSelect) {
          const el = this.$refs.selectMenu.$el
          this.$parent.updatePosition(
            el,
            (el, activatorRect) => {
              el.style.minWidth = activatorRect.width + 'px'
            }
          )
        } else {
          this.$parent.updatePosition()
        }
      })
    },
    handleSelectOptionCheck (option) {
      if (option.disabled) return
      if (this.type === 'multiple' || this.type === 'multiple-all-options') {
        if (Array.isArray(this.value)) {
          const index = this.value.findIndex(v => v === option.value)
          if (~index) {
            const newValue = this.value
            newValue.splice(index, 1)
            this.$emit('input', newValue)
          } else {
            const newValue = this.value
            newValue.push(option.value)
            this.$emit('input', newValue)
          }
        } else {
          this.$emit('input', [option.value])
        }
      } else {
        this.$emit('input', option.value)
      }
    },
    handleOptionCheck (option) {
      if (option.disabled) return
      option = this.idOptionMap.get(option.id)
      option = processedOption(option, this.activeIds, this.tracedOption)
      if (this.type === 'multiple') {
        const newValues = []
        const traverseMultiple = option => {
          if (!option || option.disabled) return
          if (Array.isArray(option.children)) {
            for (const child of option.children) {
              traverseMultiple(child)
            }
          }
          if (!option.children) {
            newValues.push(option.value)
          }
        }
        traverseMultiple(option)
        if (Array.isArray(this.value)) {
          if (!option.checkboxChecked && !option.checkboxIndeterminate) {
            this.$emit('input', merge(this.value, newValues))
          } else {
            this.$emit('input', minus(this.value, newValues))
          }
        } else {
          this.$emit('input', newValues)
        }
      } else if (this.type === 'multiple-all-options') {
        if (Array.isArray(this.value)) {
          if (!option.checkboxChecked) {
            this.$emit('input', merge(this.value, [option.value]))
          } else {
            this.$emit('input', minus(this.value, [option.value]))
          }
        } else {
          this.$emit('input', [option.value])
        }
      } else if (this.type === 'single-all-options') {
        this.$emit('input', option.value)
      } else if (this.type === 'single') {
        if (!option.hasChildren) {
          this.$emit('input', option.value)
        }
      }
    },
    deep () {
      // console.log('deep: cascader menu')
      if (this.tracedOption) {
        const firstChild = this.tracedOption.children && this.tracedOption.children[0]
        if (firstChild) {
          this.updateTracedOption(firstChild)
          this.updateActiveId(firstChild.id)
        }
      }
    },
    shallow () {
      // console.log('shallow: cascader menu')
      if (this.tracedOption && this.tracedOption.parent) {
        this.updateTracedOption(this.tracedOption.parent)
        this.updateActiveId(this.tracedOption.id)
      }
    },
    updateTracedOption (option) {
      console.log(option)
      this.tracedOption = option
    },
    updateActiveId (id) {
      this.$emit('update:activeId', id)
    },
    prev () {
      if (this.tracedOption && (!this.filterable || (this.filterable && !this.pattern.length))) {
        // console.log('prev: cascader menu')
        let optionIterator = this.tracedOption.prevSibling
        while (optionIterator !== this.tracedOption && optionIterator.disabled) {
          optionIterator = optionIterator.prevSibling
        }
        this.updateTracedOption(optionIterator)
        this.updateActiveId(optionIterator.id)
      } else if (this.typeIsSelect) {
        // console.log('prev: search menu')
        const selectMenu = this.$refs.selectMenu
        if (selectMenu) {
          selectMenu.prev()
        }
      }
    },
    next () {
      if (!this.filterable || (this.filterable && !this.pattern.length)) {
        // console.log('next: cascader menu')
        if (this.tracedOption) {
          let optionIterator = this.tracedOption.nextSibling
          while (optionIterator !== this.tracedOption && optionIterator.disabled) {
            optionIterator = optionIterator.nextSibling
          }
          this.updateTracedOption(optionIterator)
          this.updateActiveId(optionIterator.id)
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
          this.updateTracedOption(optionIterator)
          this.updateActiveId(optionIterator.id)
        }
      } else if (this.typeIsSelect) {
        // console.log('next: search menu')
        const selectMenu = this.$refs.selectMenu
        if (selectMenu) {
          selectMenu.next()
        }
      }
    },
    enter () {
      if (this.typeIsSelect) {
        const selectMenu = this.$refs.selectMenu
        if (selectMenu) {
          const pendingOption = selectMenu.pendingOption
          // console.log(pendingOption)
          this.handleSelectOptionCheck(pendingOption)
          return true
        }
      } else if (this.tracedOption) {
        this.handleOptionCheck(this.tracedOption)
        return true
      }
      return false
    }
  }
}
</script>
