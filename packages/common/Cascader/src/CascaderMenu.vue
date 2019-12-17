<template>
  <div
    class="n-cascader-menu"
    :class="{
      'n-cascader-menu--masked': masked
    }"
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
          :depth="index + 1"
          :menu-is-loading="loading"
          @option-click="handleOptionClick"
          @option-mouseenter="handleOptionMouseEnter"
          @option-mouseleave="handleOptionMouseLeave"
          @option-check="handleCascaderOptionCheck"
        />
      </div>
    </transition>
    <transition name="n-cascader-select-menu--transition">
      <n-base-select-menu
        v-if="selectMenuActive"
        ref="selectMenu"
        :theme="NCascader.synthesizedTheme"
        class="n-cascader-select-menu"
        filterable
        :pattern="pattern"
        :options="filteredSelectOptions"
        :multiple="multiple"
        :size="size"
        :is-selected="isSelected"
        @menu-toggle-option="handleSelectMenuToggleOption"
      />
    </transition>
    <n-base-menu-mask
      ref="mask"
      v-model="masked"
      :duration="3000"
    />
  </div>
</template>
<script>
import NBaseMenuMask from '../../../base/MenuMask'
import NBaseSelectMenu from '../../../base/SelectMenu'
import NCascaderSubmenu from './CascaderSubmenu'
import { getType, traverseWithCallback, minus, merge } from './utils'

import {
  firstOptionId,
  linkedCascaderOptions,
  menuOptions,
  menuModel
} from '../../../utils/data/menuModel'

export default {
  name: 'NCascaderMenu',
  inject: {
    NCascader: {
      default: null
    }
  },
  components: {
    NCascaderSubmenu,
    NBaseSelectMenu,
    NBaseMenuMask
  },
  props: {
    size: {
      type: String,
      default: 'medium'
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
    options: {
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
      type: String,
      default: null
    },
    lazy: {
      type: Boolean,
      default: false
    },
    patches: {
      validator (patches) {
        return patches instanceof Map
      },
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingId: {
      type: String,
      default: null
    },
    onLoad: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      trackId: null,
      masked: false
    }
  },
  computed: {
    /**
     * cascader related attributes
     */
    type: getType,
    expandTriggeredByHover () {
      return this.expandTrigger === 'hover'
    },
    expandTriggeredByClick () {
      return this.expandTrigger === 'click'
    },
    linkedCascaderOptions () {
      // console.log('linkedCascaderOptions called')
      return linkedCascaderOptions(this.options, this.type)
    },
    menuOptions () {
      // console.log('menuOptions called')
      return menuOptions(this.linkedCascaderOptions, this.value, this.type)
    },
    menuModel () {
      return menuModel(this.menuOptions, this.activeId, this.trackId, this.loadingId)
    },
    firstCascaderOption () {
      if (this.menuModel && this.menuModel[0] && this.menuModel[0][0]) {
        return this.menuModel[0][0]
      } else {
        return null
      }
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
    firstOptionId () {
      return firstOptionId(this.menuOptions)
    },
    /**
     * filterable related attributes
     */
    selectMenuActive () {
      return this.filterable && this.pattern && this.pattern.trim().length
    },
    filteredSelectOptions () {
      const filteredSelectOptions = []
      const type = this.type
      traverseWithCallback(this.menuOptions, option => {
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
    valueSet () {
      return new Set(this.value)
    }
  },
  watch: {
    menuModel () {
      this.$nextTick().then(() => {
        // console.log('menu model')
        this.$parent.updatePosition()
      })
    },
    selectMenuActive (selectMenuActive) {
      this.$nextTick().then(() => {
        this.handleMenuTypeChange(selectMenuActive)
      })
    },
    activeId (id) {
      if (!id) return
      /**
       * lazy load
       */
      const option = this.idOptionMap.get(id)
      if (option && !option.loaded) {
        this.loadOptionChildren(option)
      }
    },
    trackId (id) {
      if (!id) return
      /**
       * scroll to option element
       */
      this.$nextTick().then(() => {
        const option = this.idOptionMap.get(id)
        if (!option) return
        const submenuInstance = this.$children.find(child => child.depth === option.depth)
        if (submenuInstance) {
          const scrollbar = submenuInstance.$refs.scrollbar
          if (scrollbar) {
            const optionElement = this.$el.querySelector(`[data-n-cascader-option-id="${id}"]`)
            scrollbar.scrollToElement(optionElement)
          }
        }
      })
    }
  },
  mounted () {
    if (this.lazy && !this.options[0].children) {
      const option = this.menuOptions[0]
      if (!this.loading) {
        this.updateLoadingStatus(true)
        this.$refs.mask.show(`Loading`)
        this.onLoad(option, (children) => this.$parent.resolveLoad(option, children, () => {
          this.hideMask()
        }), () => this.rejectLoad(() => {
          this.hideMask()
        }))
      }
    }
  },
  methods: {
    hideMask () {
      if (this.$refs.mask) {
        this.$refs.mask.hide()
      }
    },
    isSelected (option) {
      if (this.multiple) {
        return this.valueSet.has(option.value)
      } else {
        return this.value === option.value
      }
    },
    handleSelectMenuToggleOption (option) {
      // console.log('handleSelectMenuToggleOption', option)
      this.handleSelectOptionCheck(option)
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
    updateLoadingId (id) {
      // console.log('updateLoadingId', id)
      this.$emit('update:loadingId', id)
    },
    updateLoadingStatus (loading) {
      this.$emit('update:loading', loading)
    },
    loadOptionChildren (option) {
      if (this.lazy) {
        if (!option.loaded) {
          if (!this.loading) {
            this.updateLoadingStatus(true)
            this.updateLoadingId(option.id)
            this.onLoad(option, (children) => this.$parent.resolveLoad(option, children), () => this.rejectLoad())
          }
        }
      }
    },
    handleOptionClick (e, option) {
      if (!option.disabled) {
        this.updateActiveId(option.id)
        this.updateTrackId(option.id)
        if (option.isLeaf) {
          this.handleCascaderOptionCheck(option.id)
        }
      }
    },
    handleMenuTypeChange (typeisSelect) {
      this.$nextTick().then(() => {
        this.typeIsSelect = typeisSelect
        if (typeisSelect) {
          const $el = this.$refs.selectMenu.$el
          this.$parent.updatePosition(
            $el,
            (el, activatorRect) => {
              el.style.minWidth = activatorRect.width + 'px'
            },
            {
              horizontal: true
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
    handleCascaderOptionCheck (optionId) {
      const option = this.idOptionMap.get(optionId)
      if (!option || option.disabled) return
      if (this.type === 'multiple') {
        const newValues = []
        if (!option.determined) {
          this.$refs.mask.showOnce(`Not all child nodes of "${option.label}" have been loaded`)
          return
        }
        const traverseMultiple = item => {
          if (!item || item.disabled) return
          if (Array.isArray(item.children)) {
            for (const child of item.children) {
              traverseMultiple(child)
            }
          }
          if (!item.children) {
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
      if (this.trackId) {
        const option = this.idOptionMap.get(this.trackId)
        // console.log('currentOption', option)
        if (option && option.firstAvailableChildId) {
          this.updateTrackId(option.firstAvailableChildId)
          this.updateActiveId(option.firstAvailableChildId)
        }
      }
    },
    shallow () {
      // console.log('shallow: cascader menu')
      if (this.trackId) {
        const option = this.idOptionMap.get(this.trackId)
        if (option && option.availableParentId) {
          this.updateTrackId(option.availableParentId)
          this.updateActiveId(option.availableParentId)
        }
      }
    },
    updateTrackId (id) {
      this.trackId = id
    },
    updateActiveId (id) {
      this.$emit('update:activeId', id)
    },
    prev () {
      if (!this.filterable || (this.filterable && !this.pattern.length)) {
        // console.log('prev: cascader menu')
        if (this.trackId) {
          const option = this.idOptionMap.get(this.trackId)
          if (option && option.prevAvailableSiblingId) {
            this.updateTrackId(option.prevAvailableSiblingId)
            this.updateActiveId(option.prevAvailableSiblingId)
          }
        } else {
          const option = this.idOptionMap.get(this.firstOptionId)
          if (option) {
            this.updateTrackId(this.firstOptionId)
            this.updateActiveId(this.firstOptionId)
          }
        }
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
        if (this.trackId) {
          const option = this.idOptionMap.get(this.trackId)
          if (option && option.nextAvailableSiblingId) {
            this.updateTrackId(option.nextAvailableSiblingId)
            this.updateActiveId(option.nextAvailableSiblingId)
          }
        } else {
          const option = this.idOptionMap.get(this.firstOptionId)
          if (option) {
            this.updateTrackId(this.firstOptionId)
            this.updateActiveId(this.firstOptionId)
          }
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
      } else if (this.trackId) {
        this.handleCascaderOptionCheck(this.trackId)
        return true
      }
      return false
    }
  }
}
</script>
