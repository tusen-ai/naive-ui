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
    <n-base-picker
      ref="activator"
      class="n-cascader-picker"
      :active="active"
      :pattern="pattern"
      :placeholder="placeholder"
      :selected="selected"
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
            :options="patchedOptions"
            :enable-all-options="enableAllOptions"
            :pattern="pattern"
            :filterable="filterable"
            :expand-trigger="expandTrigger"
            :active-id.sync="activeId"
            :lazy="lazy"
            :on-load="onLoad"
            :patches.sync="patches"
            @input="handleMenuInput"
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
import { getType, traverseWithCallback } from './utils'

import {
  rootedOptions,
  patchedOptions
} from '../../../utils/data/menuModel'

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
      default: null
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
    lazy: {
      type: Boolean,
      default: false
    },
    onLoad: {
      type: Function,
      default: () => {}
    },
    splitor: {
      type: String,
      default: ' / '
    }
  },
  data () {
    return {
      labelPlaceholder: 'Please Select',
      pattern: '',
      selected: true,
      inputTypeIsSearch: false,
      /**
       * set here to keep state
       */
      activeId: null,
      patches: new Map()
    }
  },
  computed: {
    type: getType,
    rootedOptions () {
      console.log('rootedOptions called')
      return rootedOptions(this.options)
    },
    patchedOptions () {
      console.log('patchedOptions called')
      return patchedOptions(this.rootedOptions, this.patches)
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
                label: path.slice(1, path.length).join(this.splitor)
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
          // console.log(option.value, this.value)
          if (option.value === this.value) {
            // console.log('here')
            selectedOption = {
              value: option.value,
              label: path.slice(1, path.length).join(this.splitor)
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
    patches () {
      console.log('patched updated!')
    },
    options () {
      this.activeId = null
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
    }
  },
  methods: {
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
    handleMenuClickOutside (e) {
      if (this.active) {
        if (!this.$refs.activator.$el.contains(e.target)) {
          this.closeMenu()
        }
      }
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
        if (this.$refs.menu) {
          this.$refs.menu.enter()
        }
      }
    },
    handleKeyUpUp () {
      if (this.active && this.$refs.menu) {
        this.$refs.menu.prev()
      }
    },
    handleKeyUpDown () {
      if (this.active && this.$refs.menu) {
        this.$refs.menu.next()
      }
    },
    handleKeyUpLeft () {
      if (this.active && this.$refs.menu) {
        this.$refs.menu.shallow()
      }
    },
    handleKeyUpRight () {
      if (this.active && this.$refs.menu) {
        this.$refs.menu.deep()
      }
    },
    handleMenuInput (value) {
      this.$emit('input', value)
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
      this.$emit('input', null)
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
          this.$emit('input', newValue)
        }
      }
    },
    handlePatternInput (e) {
      // console.log('NBaseCascader, handlePatternInput,', e)
      this.pattern = e.target.value
    },
    handleDeleteOption (option) {
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
      this.$el.focus()
    },
    handlePatternChange () {
      this.$nextTick().then(() => {
        this.updatePosition()
      })
    },
    handleKeyUpEsc () {
      this.closeMenu()
    },
    handleKeyDownSpace (e) {
      if (!this.filterable) {
        e.preventDefault()
      }
    }
  }
}
</script>
