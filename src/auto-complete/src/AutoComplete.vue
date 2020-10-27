<template>
  <div
    ref="tracked"
    class="n-auto-complete"
    @keydown.down="handleKeyDownDown"
    @keydown.up="handleKeyDownUp"
    @keydown.enter="handleKeyDownEnter"
    @compositionstart="handleCompositionStart"
    @compositionend="handleCompositionEnd"
  >
    <slot
      :handleInput="handleInput"
      :handleFocus="handleFocus"
      :handleBlur="handleBlur"
      :value="value"
      :theme="mergedTheme"
    >
      <n-input
        :theme="mergedTheme"
        :value="value"
        :placeholder="placeholder"
        :size="mergedSize"
        @focus="canBeActivated = true"
        @input="handleInput"
        @blur="handleBlur"
      />
    </slot>
    <n-lazy-teleport
      :show="active"
      to="body"
      adjust-to
    >
      <div
        ref="offsetContainer"
        v-zindexable="{
          enabled: active,
          zIndex
        }"
        class="n-positioning-container"
        :class="{
          [namespace]: namespace
        }"
      >
        <div
          ref="tracking"
          class="n-positioning-content"
        >
          <transition
            name="n-fade-in-scale-up-transition"
            :appear="isMounted"
          >
            <n-base-select-menu
              v-if="active"
              ref="menu"
              v-clickoutside="handleClickOutsideMenu"
              auto-pending-first-option
              class="n-auto-complete-menu"
              :theme="mergedTheme"
              :pattern="value"
              :tree-mate="treeMate"
              :multiple="false"
              :size="mergedSize"
              @menu-toggle-option="handleToggleOption"
            />
          </transition>
        </div>
      </div>
    </n-lazy-teleport>
  </div>
</template>

<script>
import { createTreeMate } from 'treemate'
import {
  configurable,
  themeable,
  asformitem,
  placeable,
  usecssr
} from '../../_mixins'
import {
  clickoutside,
  zindexable
} from '../../_directives'
import { call } from '../../_utils/vue'
import { useIsMounted } from '../../_utils/composition'
import { warn } from '../../_utils/naive'
import NLazyTeleport from '../../_base/lazy-teleport'
import NInput from '../../input'
import NBaseSelectMenu from '../../_base/select-menu'
import styles from './styles'
import { mapAutoCompleteOptionsToSelectOptions } from './utils'

export default {
  name: 'AutoComplete',
  components: {
    NInput,
    NLazyTeleport,
    NBaseSelectMenu
  },
  directives: {
    clickoutside,
    zindexable
  },
  mixins: [
    configurable,
    themeable,
    placeable,
    asformitem(),
    usecssr(styles)
  ],
  props: {
    placeholder: {
      type: String,
      default: undefined
    },
    value: {
      type: String,
      default: null
    },
    blurAfterSelect: {
      type: Boolean,
      default: false
    },
    clearAfterSelect: {
      type: Boolean,
      default: false
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: undefined
    },
    options: {
      type: Array,
      default: () => []
    },
    // eslint-disable-next-line vue/require-prop-types
    placement: {
      ...placeable.props.placement,
      default: 'bottom-start'
    },
    // eslint-disable-next-line vue/require-prop-types
    widthMode: {
      ...placeable.props.widthMode,
      default: 'trigger'
    },
    zIndex: {
      type: Number,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: Function,
      default: undefined
    },
    onSelect: {
      type: Function,
      default: undefined
    },
    // deprecated
    onInput: {
      validator () {
        if (__DEV__) warn('auto-complete', '`on-input` is deprecated, please use `on-update:value` instead.')
        return true
      },
      default: undefined
    }
  },
  setup () {
    return {
      isMounted: useIsMounted()
    }
  },
  data () {
    return {
      canBeActivated: false,
      isComposing: false
    }
  },
  computed: {
    __placeableEnabled () {
      return this.active
    },
    selectOptions () {
      return mapAutoCompleteOptionsToSelectOptions(this.options)
    },
    active () {
      return !!this.value && this.canBeActivated && !!this.selectOptions.length
    },
    treeMate () {
      return createTreeMate(this.selectOptions, {
        getKey (node) {
          if (node.type === 'group') return node.name
          return node.value
        }
      })
    }
  },
  methods: {
    __placeableOffsetContainer () {
      return this.$refs.offsetContainer
    },
    __placeableTracking () {
      return this.$refs.tracking
    },
    __placeableTracked () {
      return this.$refs.tracked
    },
    __placeableBody () {
      return this.$refs.menu
    },
    doUpdateValue (value) {
      const {
        'onUpdate:value': onUpdateValue,
        onInput,
        nTriggerFormInput,
        nTriggerFormChange
      } = this
      if (onUpdateValue) call(onUpdateValue, value)
      if (onInput) call(onInput, value)
      nTriggerFormInput()
      nTriggerFormChange()
    },
    doSelect (value) {
      const {
        onSelect,
        nTriggerFormInput,
        nTriggerFormChange
      } = this
      if (onSelect) call(onSelect, value)
      nTriggerFormInput()
      nTriggerFormChange()
    },
    doBlur (value) {
      const {
        onBlur,
        nTriggerFormBlur
      } = this
      if (onBlur) call(onBlur, value)
      nTriggerFormBlur()
    },
    doFocus (value) {
      const {
        onFocus,
        nTriggerFormFocus
      } = this
      if (onFocus) call(onFocus, value)
      nTriggerFormFocus()
    },
    handleCompositionStart () {
      this.isComposing = true
    },
    handleCompositionEnd () {
      window.setTimeout(() => {
        this.isComposing = false
      }, 0)
    },
    handleKeyDownEnter (e) {
      if (this.$refs.menu && !this.isComposing) {
        const pendingOptionData = this.$refs.menu.getPendingOption()
        if (pendingOptionData) {
          this.select(pendingOptionData)
          e.preventDefault()
        }
      }
    },
    handleKeyDownDown () {
      const { menu } = this.$refs
      if (menu) {
        menu.next()
      }
    },
    handleKeyDownUp () {
      const { menu } = this.$refs
      if (menu) {
        menu.prev()
      }
    },
    select (option) {
      if (option) {
        if (this.clearAfterSelect) {
          this.doUpdateValue(null)
        } else {
          this.doUpdateValue(option.label)
        }
        this.doSelect(option.value)
        this.canBeActivated = false
        if (this.blurAfterSelect) {
          this.blur()
        }
      }
    },
    handleFocus (e) {
      this.canBeActivated = true
      this.doFocus(e)
    },
    handleBlur (e) {
      this.canBeActivated = false
      this.doBlur(e)
    },
    handleInput (value) {
      this.canBeActivated = true
      this.doUpdateValue(value)
    },
    handleToggleOption (option) {
      this.select(option)
    },
    handleClickOutsideMenu (e) {
      if (this.$refs.tracked) {
        if (!this.$refs.tracked.contains(e.target)) {
          this.canBeActivated = false
        }
      }
    },
    blur () {
      if (this.$el.contains(document.activeElement)) {
        document.activeElement.blur()
      }
    }
  }
}
</script>
