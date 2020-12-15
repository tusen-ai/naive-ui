<template>
  <div class="n-cascader">
    <v-binder>
      <v-target>
        <n-base-selection
          ref="triggerRef"
          :bordered="mergedBordered"
          :size="mergedSize"
          :theme="mergedTheme"
          :active="mergedShow"
          :pattern="pattern"
          :placeholder="localizedPlaceholder"
          :selected-option="selectedOption"
          :selected-options="selectedOptions"
          :multiple="multiple"
          :filterable="filterable"
          :clearable="clearable"
          :disabled="disabled"
          @focus="handleTriggerFocus"
          @blur="handleTriggerBlur"
          @click="handleTriggerClick"
          @clear="handleClear"
          @delete-option="handleDeleteOption"
          @delete-last-option="handleDeleteLastOption"
          @pattern-input="handlePatternInput"
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
        />
      </v-target>
      <v-follower
        key="cascaderMenu"
        ref="cascaderMenuFollowerRef"
        :show="mergedShow && !showSelectMenu"
        :container-class="namespace"
        placement="bottom-start"
        :to="adjustedTo"
      >
        <cascader-menu
          ref="cascaderMenuRef"
          :class="{
            [namespace]: namespace
          }"
          :value="mergedValue"
          :show="mergedShow && !showSelectMenu"
          :theme="mergedTheme"
          :size="mergedSize"
          :menu-model="menuModel"
        />
      </v-follower>
      <v-follower
        key="selectMenu"
        ref="selectMenuFollowerRef"
        :show="mergedShow && showSelectMenu"
        :container-class="namespace"
        width="target"
        placement="bottom-start"
        :to="adjustedTo"
      >
        <cascader-select-menu
          ref="selectMenuRef"
          :class="{
            [namespace]: namespace
          }"
          :value="mergedValue"
          :show="mergedShow && showSelectMenu"
          :theme="mergedTheme"
          :pattern="pattern"
          :size="mergedSize"
          :multiple="multiple"
          :tm-nodes="treeMate.treeNodes"
          @update:value="handleMenuInput"
        />
      </v-follower>
    </v-binder>
  </div>
</template>

<script>
import { VBinder, VTarget, VFollower } from 'vueuc'
import { NBaseSelection } from '../../_base'
import { configurable, themeable, locale, withCssr } from '../../_mixins'
import { useCascader } from './composables'
import { warn, call } from '../../_utils'
import CascaderMenu from './CascaderMenu.vue'
import CascaderSelectMenu from './CascaderSelectMenu.vue'
import styles from './styles'
import { depx } from 'seemly'

// TODO refactor cascader menu keyboard scroll (use virtual list)
export default {
  name: 'Cascader',
  components: {
    CascaderMenu,
    CascaderSelectMenu,
    NBaseSelection,
    VBinder,
    VTarget,
    VFollower
  },
  mixins: [
    configurable,
    themeable,
    locale('Cascader'),
    withCssr(styles, {
      injectCssrProps: true,
      themeKey: 'mergedTheme'
    })
  ],
  provide () {
    return {
      NCascader: this
    }
  },
  props: {
    bordered: {
      type: Boolean,
      default: undefined
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Number, Array],
      default: undefined
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
      default: undefined
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
      default: undefined
    },
    separator: {
      type: String,
      default: ' / '
    },
    filter: {
      type: [String, Function],
      default: undefined
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
    show: {
      type: Boolean,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: [Function, Array],
      default: undefined
    },
    // deprecated
    onChange: {
      validator () {
        warn(
          'cascader',
          '`on-change` is deprecated, please use `on-update:value` instead.'
        )
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    return useCascader(props)
  },
  computed: {
    localizedPlaceholder () {
      if (this.placeholder !== undefined) return this.placeholder
      return this.localeNs.placeholder
    },
    // select option related
    showSelectMenu () {
      return !!(this.filterable && this.pattern && this.pattern.trim().length)
    }
  },
  methods: {
    doBlur (...args) {
      const { onBlur, nTriggerFormBlur } = this
      if (onBlur) call(onBlur, ...args)
      nTriggerFormBlur()
    },
    doFocus (...args) {
      const { onFocus, nTriggerFormFocus } = this
      if (onFocus) call(onFocus, ...args)
      nTriggerFormFocus()
    },
    openMenu () {
      if (!this.disabled) {
        this.pattern = ''
        this.uncontrolledShow = true
        if (this.filterable) {
          this.triggerRef.focusPatternInput()
        }
      }
    },
    closeMenu () {
      this.uncontrolledShow = false
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
      if (this.mergedShow) {
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
      const { keyboardKey, updateKeyboardKey, updateHoverKey, treeMate } = this
      switch (direction) {
        case 'prev':
          if (keyboardKey !== null) {
            const node = treeMate.getPrev(keyboardKey, { loop: true })
            if (node !== null) {
              updateKeyboardKey(node.key)
              this.cascaderMenuRef.submenuRefs[
                node.level
              ].scrollbarRef.scrollTo({
                index: node.index,
                elSize: depx(this.cssrProps.$local.optionHeight)
              })
            }
          }
          break
        case 'next':
          if (keyboardKey === null) {
            const node = treeMate.getFirstAvailableNode()
            if (node !== null) {
              updateKeyboardKey(node.key)
              this.cascaderMenuRef.submenuRefs[
                node.level
              ].scrollbarRef.scrollTo({
                index: node.index,
                elSize: depx(this.cssrProps.$local.optionHeight)
              })
            }
          } else {
            const node = treeMate.getNext(keyboardKey, { loop: true })
            if (node !== null) {
              updateKeyboardKey(node.key)
              this.cascaderMenuRef.submenuRefs[
                node.level
              ].scrollbarRef.scrollTo({
                index: node.index,
                elSize: depx(this.cssrProps.$local.optionHeight)
              })
            }
          }
          break
        case 'child':
          if (keyboardKey !== null) {
            const currentNode = treeMate.getNode(keyboardKey)
            if (currentNode !== null) {
              if (currentNode.isShallowLoaded) {
                const node = treeMate.getChild(keyboardKey)
                if (node !== null) {
                  updateHoverKey(keyboardKey)
                  updateKeyboardKey(node.key)
                }
              } else {
                const { addLoadingKey, deleteLoadingKey, loadingKeySet } = this
                if (!loadingKeySet.has(keyboardKey)) {
                  addLoadingKey(keyboardKey)
                  updateHoverKey(keyboardKey)
                  this.onLoad(currentNode.rawNode)
                    .then(() => {
                      deleteLoadingKey(keyboardKey)
                    })
                    .catch(() => {
                      deleteLoadingKey(keyboardKey)
                    })
                }
              }
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
      if (!this.mergedShow) {
        this.openMenu()
      } else {
        const { showSelectMenu, selectMenuRef, keyboardKey } = this
        if (!showSelectMenu) {
          if (keyboardKey !== null) {
            if (
              this.checkedKeys.includes(keyboardKey) ||
              this.indeterminateKeys.includes(keyboardKey)
            ) {
              this.doUncheck(keyboardKey)
            } else {
              const checkIsValid = this.doCheck(keyboardKey)
              if (!this.multiple && checkIsValid) {
                this.closeMenu()
              }
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
      const { mergedShow, selectMenuRef } = this
      if (mergedShow) {
        if (this.showSelectMenu) {
          selectMenuRef.prev()
        } else {
          this.move('prev')
        }
      }
    },
    handleKeyUpDown (e) {
      e.preventDefault()
      const { mergedShow, selectMenuRef } = this
      if (mergedShow) {
        if (this.showSelectMenu) {
          selectMenuRef.next()
        } else {
          this.move('next')
        }
      }
    },
    handleKeyUpLeft (e) {
      e.preventDefault()
      const { mergedShow, showSelectMenu } = this
      if (mergedShow && !showSelectMenu) {
        this.move('parent')
      }
    },
    handleKeyUpRight (e) {
      e.preventDefault()
      const { mergedShow, showSelectMenu } = this
      if (mergedShow && !showSelectMenu) {
        this.move('child')
      }
    },
    // --- search
    handleMenuInput (value) {
      this.doUpdateValue(value)
      if (!this.multiple) {
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
    handleTriggerFocus () {
      this.doFocus()
    },
    handleTriggerBlur () {
      this.doBlur()
      this.closeMenu()
    },
    handleTriggerClick () {
      if (this.filterable) {
        this.openMenu()
      } else {
        if (this.mergedShow) {
          this.closeMenu()
        } else {
          this.openMenu()
        }
      }
    },
    handleDeleteLastOption () {
      if (this.multiple) {
        const { mergedValue } = this
        if (Array.isArray(mergedValue)) {
          const newValue = Array.from(mergedValue)
          newValue.pop()
          this.doUpdateValue(newValue)
        }
      }
    },
    handlePatternInput (e) {
      this.pattern = e.target.value
    },
    handleDeleteOption (option) {
      const { multiple, mergedValue } = this
      if (multiple && Array.isArray(mergedValue)) {
        const index = mergedValue.findIndex((value) => value === option.value)
        if (~index) {
          const newValue = Array.from(mergedValue)
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
    },
    // sync position
    syncSelectMenuPosition () {
      this.selectMenuFollowerRef.syncPosition()
    },
    syncCascaderMenuPosition () {
      this.cascaderMenuFollowerRef.syncPosition()
    }
  }
}
</script>
