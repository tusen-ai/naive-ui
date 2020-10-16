<template>
  <div
    ref="self"
    class="n-cascader"
    @keydown.space="handleKeyDownSpace"
    @keyup.esc="handleKeyUpEsc"
    @keyup.space="handleKeyUpSpace"
    @keyup.enter="handleKeyUpEnter"
    @keyup.up="handleKeyUpUp"
    @keyup.down="handleKeyUpDown"
    @keyup.left="handleKeyUpLeft"
    @keyup.right="handleKeyUpRight"
    @keydown.up.prevent
    @keydown.down.prevent
  >
    <n-base-selection
      ref="triggerRef"
      class="n-cascader-selection"
      :size="mergedSize"
      :theme="mergedTheme"
      :active="showMenu"
      :pattern="pattern"
      :placeholder="localizedPlaceholder"
      :selected-option="selectedOption"
      :selected-options="selectedOptions"
      :multiple="multiple"
      :filterable="filterable"
      :clearable="clearable"
      :disabled="disabled"
      @focus="handleActivatorFocus"
      @blur="handleActivatorBlur"
      @click="handleActivatorClick"
      @clear="handleClear"
      @delete-option="handleDeleteOption"
      @delete-last-option="handleDeleteLastOption"
      @pattern-input="handlePatternInput"
    />
    <n-lazy-teleport
      :show="showMenu && !showSelectMenu"
      adjust-to
    >
      <cascader-menu
        ref="cascaderMenuRef"
        :class="{
          [namespace]: namespace
        }"
        :show="showMenu && !showSelectMenu"
        :lazy="remote"
        :on-load="onLoad"
        :theme="mergedTheme"
        :size="mergedSize"
        :menu-model="menuModel"
        @update:loading-id="loadingId = $event"
        @update:value="handleMenuInput"
      />
    </n-lazy-teleport>
    <n-lazy-teleport
      :show="showMenu && showSelectMenu"
      adjust-to
    >
      <cascader-select-menu
        ref="selectMenuRef"
        :class="{
          [namespace]: namespace
        }"
        :value="value"
        :show="showMenu && showSelectMenu"
        :theme="mergedTheme"
        :pattern="pattern"
        :size="mergedSize"
        :multiple="multiple"
        :tm-nodes="treeMate.treeNodes"
        @update:value="handleMenuInput"
      />
    </n-lazy-teleport>
  </div>
</template>

<script>
import { ref } from 'vue'
import NBaseSelection from '../../_base/selection'
import NLazyTeleport from '../../_base/lazy-teleport'
import {
  configurable,
  themeable,
  locale,
  usecssr,
  asformitem
} from '../../_mixins'
import { useCascader } from './composables'
import { useIsMounted } from 'vooks'
import { warn, call } from '../../_utils'
import CascaderMenu from './CascaderMenu.vue'
import CascaderSelectMenu from './CascaderSelectMenu.vue'
import styles from './styles'

export default {
  name: 'Cascader',
  components: {
    CascaderMenu,
    CascaderSelectMenu,
    NBaseSelection,
    NLazyTeleport
  },
  provide () {
    return {
      NCascader: this
    }
  },
  mixins: [
    configurable,
    themeable,
    asformitem(),
    locale('Cascader'),
    usecssr(styles, {
      themeKey: 'mergedTheme',
      injectCssrProps: true
    })
  ],
  props: {
    options: {
      type: Array,
      default: null
    },
    value: {
      type: [String, Number, Array],
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
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
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
    separator: {
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
    },
    cascade: {
      type: Boolean,
      default: true
    },
    leafOnly: {
      type: Boolean,
      default: false
    },
    showPath: {
      type: Boolean,
      default: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array],
      default: undefined
    },
    // deprecated
    onChange: {
      validator () {
        warn('cascader', '`on-change` is deprecated, please use `on-update:value` instead.')
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    return {
      ...(useCascader(props)),
      cascaderMenuRef: ref(null),
      selectMenuRef: ref(null),
      triggerRef: ref(null),
      isMounted: useIsMounted()
    }
  },
  data () {
    return {
      pattern: '',
      showMenu: false,
      /**
       * set here to keep state
       */
      patches: new Map(),
      loadingId: null,
      loading: false
    }
  },
  computed: {
    localizedPlaceholder () {
      if (this.placeholder !== undefined) return this.placeholder
      return this.localeNamespace.placeholder
    },
    // select option related
    showSelectMenu () {
      return !!(this.filterable && this.pattern && this.pattern.trim().length)
    }
  },
  methods: {
    doUpdateValue (...args) {
      const {
        'onUpdate:value': onUpdateValue,
        onChange,
        __triggerFormInput,
        __triggerFormChange
      } = this
      if (onUpdateValue) call(onUpdateValue, ...args)
      if (onChange) call(onChange, ...args)
      __triggerFormInput()
      __triggerFormChange()
    },
    doBlur (...args) {
      const {
        onBlur,
        __triggerFormBlur
      } = this
      if (onBlur) call(onBlur, ...args)
      __triggerFormBlur()
    },
    doFocus (...args) {
      const {
        onFocus,
        __triggerFormFocus
      } = this
      if (onFocus) call(onFocus, ...args)
      __triggerFormFocus()
    },
    openMenu () {
      if (!this.disabled) {
        this.pattern = ''
        this.showMenu = true
        if (this.filterable) {
          this.triggerRef.focusPatternInput()
        }
      }
    },
    closeMenu () {
      this.showMenu = false
      this.pattern = ''
    },
    updateKeyboardKey (key) {
      if (key === this.keyboardKey) return
      this.keyboardKey = key
    },
    updateHoverKey (key) {
      if (key === this.hoverKey) return
      this.hoverKey = key
    },
    handleCascaderMenuClickOutside (e) {
      if (this.showSelectMenu) return
      if (this.showMenu) {
        if (!this.triggerRef.$el.contains(e.target)) {
          this.closeMenu()
        }
      }
    },
    handleSelectMenuClickOutside (e) {
      if (!this.showSelectMenu) return
      this.handleCascaderMenuClickOutside(e)
    },
    handleKeyUpSpace () {
      if (!this.filterable) {
        this.handleKeyUpEnter()
      }
    },
    // --- keyboard
    move (direction) {
      const {
        keyboardKey,
        updateKeyboardKey,
        updateHoverKey,
        treeMate
      } = this
      switch (direction) {
        case 'prev':
          if (keyboardKey !== null) {
            const node = treeMate.getPrev(keyboardKey)
            if (node !== null) {
              updateKeyboardKey(node.key)
            }
          }
          break
        case 'next':
          if (keyboardKey === null) {
            const node = treeMate.getFirstAvailableNode()
            if (node !== null) {
              updateKeyboardKey(node.key)
            }
          } else {
            const node = treeMate.getNext(keyboardKey)
            if (node !== null) {
              updateKeyboardKey(node.key)
            }
          }
          break
        case 'child':
          if (keyboardKey !== null) {
            const node = treeMate.getChild(keyboardKey)
            if (node !== null) {
              updateHoverKey(keyboardKey)
              updateKeyboardKey(node.key)
            }
          }
          break
        case 'parent':
          if (keyboardKey !== null) {
            const node = treeMate.getParent(keyboardKey)
            if (node !== null) {
              updateKeyboardKey(node.key)
              const parentNode = node.getParent()
              if (parentNode === null) {
                updateHoverKey(null)
              } else {
                updateHoverKey(parentNode.key)
              }
            }
          }
          break
      }
    },
    handleKeyUpEnter () {
      if (!this.showMenu) {
        this.openMenu()
      } else {
        const {
          showSelectMenu,
          selectMenuRef,
          keyboardKey
        } = this
        if (!showSelectMenu) {
          if (keyboardKey !== null) {
            if (
              this.checkedKeys.includes(keyboardKey) ||
              this.indeterminateKeys.includes(keyboardKey)
            ) {
              this.doUncheck(keyboardKey)
            } else {
              this.doCheck(keyboardKey)
            }
          }
        } else {
          if (selectMenuRef) {
            const hasCorrespondingOption = selectMenuRef.enter()
            if (hasCorrespondingOption) this.pattern = ''
          }
        }
      }
    },
    handleKeyUpUp (e) {
      e.preventDefault()
      const {
        showMenu,
        selectMenuRef
      } = this
      if (showMenu) {
        if (this.showSelectMenu) {
          selectMenuRef.prev()
        } else {
          this.move('prev')
        }
      }
    },
    handleKeyUpDown (e) {
      e.preventDefault()
      const {
        showMenu,
        selectMenuRef
      } = this
      if (showMenu) {
        if (this.showSelectMenu) {
          selectMenuRef.next()
        } else {
          this.move('next')
        }
      }
    },
    handleKeyUpLeft (e) {
      e.preventDefault()
      const {
        showMenu,
        showSelectMenu
      } = this
      if (showMenu && !showSelectMenu) {
        this.move('parent')
      }
    },
    handleKeyUpRight (e) {
      e.preventDefault()
      const {
        showMenu,
        showSelectMenu
      } = this
      if (showMenu && !showSelectMenu) {
        this.move('child')
      }
    },
    // --- search
    handleMenuInput (value) {
      this.doUpdateValue(value)
      if (this.type === 'single') {
        this.closeMenu()
      } else if (this.type === 'single-all-options') {
        this.closeMenu()
      } else {
        const trigger = this.triggerRef
        if (trigger && this.filterable) {
          this.pattern = ''
          this.$nextTick().then(() => {
            trigger.focusPatternInput()
          })
        }
      }
    },
    handleClear () {
      this.doUpdateValue(null)
    },
    handleActivatorFocus () {
      this.doFocus()
    },
    handleActivatorBlur () {
      this.doBlur()
      this.closeMenu()
    },
    handleActivatorClick () {
      if (this.filterable) {
        this.openMenu()
      } else {
        if (this.showMenu) {
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
          this.doUpdateValue(newValue)
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
          this.doUpdateValue(newValue)
        }
      } else {
        this.doUpdateValue(null)
      }
      this.$el.focus()
    },
    // Important for blur input state!
    handleKeyUpEsc () {
      this.closeMenu()
      this.triggerRef.focusPatternInputWrapper()
    },
    handleKeyDownSpace (e) {
      if (!this.filterable) {
        e.preventDefault()
      }
    },
    // --- async
    resolveLoad (option, children, callback) {
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
