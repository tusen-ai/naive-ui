<template>
  <div
    ref="self"
    class="n-cascader"
    @keydown.up.prevent="() => {}"
    @keydown.down.prevent="() => {}"
    @keydown.left.prevent="() => {}"
    @keydown.right.prevent="() => {}"
    @keydown.space="handleKeyDownSpace"
    @keyup.esc="handleKeyUpEsc"
    @keyup.space="handleKeyUpSpace"
    @keyup.enter="handleKeyUpEnter"
    @keyup.up="handleKeyUpUp"
    @keyup.down="handleKeyUpDown"
    @keyup.left="handleKeyUpLeft"
    @keyup.right="handleKeyUpRight"
  >
    <n-base-selection
      ref="activator"
      class="n-cascader-selection"
      :size="size"
      :theme="syntheticTheme"
      :active="active"
      :pattern="pattern"
      :placeholder="localizedPlaceholder"
      :selected-option="selectedOption"
      :selected-options="selectedOptions"
      :multiple="multiple"
      :filterable="filterable"
      :clearable="clearable"
      :disabled="disabled"
      @blur="handleActivatorBlur"
      @click="handleActivatorClick"
      @clear="handleClear"
      @delete-option="handleDeleteOption"
      @delete-last-option="handleDeleteLastOption"
      @pattern-input="handlePatternInput"
    />
    <n-base-portal ref="portal1">
      <cascader-menu
        ref="menu1"
        v-clickoutside="handleCascaderMenuClickOutside"
        :active="active && !selectMenuActive"
        :class="{
          [`n-${syntheticTheme}-theme`]: syntheticTheme,
          [namespace]: namespace
        }"
        :type="type"
        :value="value"
        :multiple="multiple"
        :options="menuOptions"
        :pattern="pattern"
        :filterable="filterable"
        :expand-trigger="expandTrigger"
        :active-id.sync="activeId"
        :lazy="remote"
        :on-load="onLoad"
        :patches.sync="patches"
        :loading.sync="loading"
        :loading-id.sync="loadingId"
        :theme="syntheticTheme"
        @input="handleMenuInput"
      />
    </n-base-portal>
    <n-base-portal ref="portal2">
      <cascader-select-menu
        ref="menu2"
        v-clickoutside="handleSelectMenuClickOutside"
        :class="{
          [namespace]: namespace
        }"
        :type="type"
        :value="value"
        :active="active && selectMenuActive"
        :theme="syntheticTheme"
        :pattern="pattern"
        :size="size"
        :multiple="multiple"
        :options="menuOptions"
        @input="handleMenuInput"
      />
    </n-base-portal>
  </div>
</template>

<script>
import NBaseSelection from '../../_base/Selection'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import clickoutside from '../../_directives/clickoutside'
import CascaderMenu from './CascaderMenu'
import { getType, traverseWithCallback } from './utils'
import asformitem from '../../_mixins/asformitem'
import NBasePortal from '../../_base/Portal'
import CascaderSelectMenu from './CascaderSelectMenu'
import locale from '../../_mixins/locale'

import {
  rootedOptions,
  patchedOptions,
  linkedCascaderOptions,
  menuOptions
} from '../../_utils/data/menuModel'

export default {
  name: 'NCascader',
  components: {
    CascaderMenu,
    CascaderSelectMenu,
    NBaseSelection,
    NBasePortal
  },
  provide () {
    return {
      NCascader: this
    }
  },
  directives: {
    clickoutside
  },
  mixins: [withapp, themeable, asformitem(), locale('Cascader')],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    options: {
      type: Array,
      default: null
    },
    value: {
      type: [String, Number],
      default: null
    },
    placeholder: {
      type: String,
      default: undefined
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
    expandTrigger: {
      validator (expandTrigger) {
        return ['click', 'hover'].includes(expandTrigger)
      },
      default: 'click'
    },
    leafOnly: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    },
    onLoad: {
      type: Function,
      default: () => {}
    },
    seperator: {
      type: String,
      default: ' / '
    },
    filter: {
      type: [String, Function],
      default: null
    },
    placement: {
      type: String,
      default: 'bottom-start'
    }
  },
  data () {
    return {
      pattern: '',
      active: false,
      /**
       * set here to keep state
       */
      activeId: null,
      patches: new Map(),
      loadingId: null,
      loading: false
    }
  },
  computed: {
    type: getType,
    localizedPlaceholder () {
      if (this.placeholder !== undefined) return this.placeholder
      return this.localeNamespace.placeholder
    },
    enableAllOptions () {
      return !this.leafOnly
    },
    selectMenuActive () {
      return !!(this.filterable && this.pattern && this.pattern.trim().length)
    },
    rootedOptions () {
      return rootedOptions(this.options)
    },
    patchedOptions () {
      /**
       * Options must be patched here because Picker need to know all available
       * options.
       */
      return patchedOptions(this.rootedOptions, this.patches)
    },
    linkedCascaderOptions () {
      return linkedCascaderOptions(this.patchedOptions, this.type)
    },
    menuOptions () {
      return menuOptions(this.linkedCascaderOptions, this.value, this.type)
    },
    selectedOptions () {
      if (this.multiple) {
        let options = []
        if (Array.isArray(this.value)) {
          const values = new Set(this.value)
          const path = []
          traverseWithCallback(this.patchedOptions, option => {
            path.push(option.label)
            if (values.has(option.value)) {
              options.push({
                value: option.value,
                label: path.slice(1, path.length).join(this.seperator)
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
        traverseWithCallback(this.patchedOptions, option => {
          path.push(option.label)
          if (option.value === this.value) {
            selectedOption = {
              value: option.value,
              label: path.slice(1, path.length).join(this.seperator)
            }
          }
        }, () => {
          path.pop()
        })
        return selectedOption
      } else return null
    }
  },
  watch: {
    active () {
      if (this.$refs.portal1) {
        this.$refs.portal1.transferElement()
      }
      if (this.$refs.portal2) {
        this.$refs.portal2.transferElement()
      }
    },
    options () {
      this.activeId = null
    }
  },
  methods: {
    deactivate () {
      this.active = false
      this.$emit('setactive', false)
    },
    activate () {
      this.active = true
    },
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
      this.deactivate()
      this.pattern = ''
    },
    handleCascaderMenuClickOutside (e) {
      if (this.selectMenuActive) return
      if (this.active) {
        if (!this.$refs.activator.$el.contains(e.target)) {
          this.closeMenu()
        }
      }
    },
    handleSelectMenuClickOutside (e) {
      if (!this.selectMenuActive) return
      this.handleCascaderMenuClickOutside(e)
    },
    handleKeyUpSpace () {
      if (!this.filterable) {
        this.handleKeyUpEnter()
      }
    },
    handleKeyUpEnter () {
      if (!this.active) {
        this.openMenu()
      } else {
        if (this.$refs.menu1) {
          this.$refs.menu1.enter()
        }
        if (this.$refs.menu2) {
          this.$refs.menu2.enter()
        }
      }
    },
    handleKeyUpUp () {
      if (this.active && this.$refs.menu1) {
        this.$refs.menu1.prev()
      }
      if (this.active && this.$refs.menu2) {
        this.$refs.menu2.prev()
      }
    },
    handleKeyUpDown () {
      if (this.active && this.$refs.menu1) {
        this.$refs.menu1.next()
      }
      if (this.active && this.$refs.menu2) {
        this.$refs.menu2.next()
      }
    },
    handleKeyUpLeft () {
      if (this.active && this.$refs.menu1) {
        this.$refs.menu1.shallow()
      }
    },
    handleKeyUpRight () {
      if (this.active && this.$refs.menu1) {
        this.$refs.menu1.deep()
      }
    },
    handleMenuInput (value) {
      this.$emit('change', value)
      if (this.type === 'single') {
        this.closeMenu()
      } else if (this.type === 'single-all-options') {
        this.closeMenu()
      } else {
        const activator = this.$refs.activator
        this.pattern = ''
        if (activator) {
          this.$nextTick().then(() => {
            activator.focusPatternInput()
          })
        }
      }
    },
    handleClear () {
      this.$emit('change', null)
    },
    handleActivatorBlur () {
      this.closeMenu()
    },
    handleActivatorClick () {
      if (this.filterable) {
        this.openMenu()
      } else {
        if (this.active) {
          this.closeMenu()
        } else {
          this.openMenu()
        }
      }
    },
    handleDeleteLastOption () {
      if (this.multiple) {
        if (Array.isArray(this.value)) {
          const newValue = this.value
          newValue.pop()
          this.$emit('change', newValue)
        }
      }
    },
    handlePatternInput (e) {
      this.pattern = e.target.value
    },
    handleDeleteOption (option) {
      if (this.multiple && Array.isArray(this.value)) {
        const index = this.value.findIndex(value => value === option.value)
        if (~index) {
          const newValue = this.value
          newValue.splice(index, 1)
          this.$emit('change', newValue)
        }
      } else {
        this.$emit('change', null)
      }
      this.$el.focus()
    },
    /**
     * Important for blur input state!
     */
    handleKeyUpEsc () {
      this.closeMenu()
      this.$nextTick().then(() => {
        this.$refs.activator.focusPatternInputWrapper()
      })
    },
    handleKeyDownSpace (e) {
      if (!this.filterable) {
        e.preventDefault()
      }
    },
    /**
     * lazy load related
     */
    resolveLoad (option, children, callback) {
      const newPatches = new Map(this.patches)
      newPatches.set(option.id, children)
      this.patches = newPatches
      this.loading = false
      this.loadingId = null
      if (callback) callback()
    },
    rejectLoad () {
      this.updateLoadingStatus(false)
      this.updateLoadingId(null)
    }
  }
}
</script>
