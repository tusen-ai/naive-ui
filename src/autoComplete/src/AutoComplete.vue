<template>
  <div
    class="n-auto-complete"
    @keydown.down="handleKeyDownDown"
    @keydown.up="handleKeyDownUp"
    @keydown.enter="handleKeyDownEnter"
    @compositionstart="handleCompositionStart"
    @compositionend="handleCompositionEnd"
  >
    <slot
      :handle-input="handleInput"
      :handle-focus="handleFocus"
      :handle-blur="handleBlur"
      :value="value"
      :theme="syntheticTheme"
    >
      <n-input
        ref="activator"
        :theme="syntheticTheme"
        :value="value"
        :placeholder="placeholder"
        :size="syntheticSize"
        @focus="canBeActivated = true"
        @input="handleInput"
        @blur="handleBlur"
      />
    </slot>
    <div
      ref="contentContainer"
      class="n-positioning-container"
      :class="{
        [namespace]: namespace
      }"
    >
      <div
        ref="content"
        class="n-positioning-content"
      >
        <transition name="n-fade-in-scale-up-transition">
          <n-base-select-menu
            v-if="active"
            ref="contentInner"
            v-clickoutside="handleClickOutsideMenu"
            auto-pending-first-option
            class="n-auto-complete-menu"
            :theme="syntheticTheme"
            :pattern="value"
            :options="selectOptions"
            :multiple="false"
            :size="syntheticSize"
            :remote="remote"
            :loading="loading"
            :filterable="false"
            :is-option-selected="isSelected"
            @menu-toggle-option="handleToggleOption"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import NInput from '../../input'
import detachable from '../../_mixins/detachable'
import placeable from '../../_mixins/placeable'
import zindexable from '../../_mixins/zindexable'
import clickoutside from '../../_directives/clickoutside'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import asformitem from '../../_mixins/asformitem'
import NBaseSelectMenu from '../../_base/select-menu'
import { mapAutoCompleteOptionsToSelectOptions } from './utils'
import usecssr from '../../_mixins/usecssr'
import styles from './styles'

export default {
  name: 'AutoComplete',
  components: {
    NInput,
    NBaseSelectMenu
  },
  directives: {
    clickoutside
  },
  mixins: [
    withapp,
    themeable,
    detachable,
    zindexable,
    placeable,
    asformitem(),
    usecssr(styles)
  ],
  props: {
    placeholder: {
      type: String,
      default: null
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
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    widthMode: {
      type: String,
      default: 'activator'
    }
  },
  data () {
    return {
      canBeActivated: false,
      isComposing: false
    }
  },
  computed: {
    active () {
      return !!this.value && this.canBeActivated && !!this.selectOptions.length
    },
    selectOptions () {
      return mapAutoCompleteOptionsToSelectOptions(this.options)
    }
  },
  methods: {
    handleCompositionStart () {
      this.isComposing = true
    },
    handleCompositionEnd () {
      window.setTimeout(() => {
        this.isComposing = false
      }, 0)
    },
    handleKeyDownEnter (e) {
      if (this.$refs.contentInner && !this.isComposing) {
        const pendingOptionData = this.$refs.contentInner.getPendingOptionData()
        if (pendingOptionData) {
          this.select(pendingOptionData)
        }
      }
    },
    handleKeyDownDown () {
      if (this.$refs.contentInner) {
        this.$refs.contentInner.next()
      }
    },
    handleKeyDownUp () {
      if (this.$refs.contentInner) {
        this.$refs.contentInner.prev()
      }
    },
    select (option) {
      if (option) {
        if (this.clearAfterSelect) {
          this.$emit('input', null)
        } else {
          this.$emit('input', option.label)
        }
        this.$emit('select', option.value)
        this.canBeActivated = false
        if (this.blurAfterSelect) {
          this.blur()
        }
      }
    },
    getTrackedElement () {
      return this.$el
    },
    isSelected () {},
    handleFocus () {
      this.canBeActivated = true
    },
    handleBlur () {
      this.canBeActivated = false
    },
    handleInput (value) {
      this.$emit('input', value)
      this.canBeActivated = true
    },
    handleToggleOption (option) {
      this.select(option)
    },
    handleClickOutsideMenu (e) {
      if (this.$refs.activator) {
        if (!this.$refs.activator.$el.contains(e.target)) {
          this.canBeActivated = false
        }
      } else {
        if (!this.$el.contains(e.target)) {
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
