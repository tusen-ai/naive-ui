<template>
  <div
    class="n-auto-complete"
    @keydown.down="handleKeyDownDown"
    @keydown.up="handleKeyDownUp"
    @keyup.enter="handleKeyUpEnter"
    @keydown.enter="handleKeyDownEnter"
  >
    <slot :handle-input="handleInput" :handle-focus="handleFocus" :handle-blur="handleBlur" :value="value">
      <n-input ref="activator" :value="value" :placeholder="placeholder" :size="size" @focus="canBeActivated = true" @input="handleInput" @blur="handleBlur" />
    </slot>
    <div
      ref="contentContainer"
      v-clickoutside="handleClickOutsideMenu"
      class="n-detached-content-container n-select-detached-content-container"
      :class="{
        [namespace]: namespace
      }"
    >
      <div
        ref="content"
        class="n-detached-content-content"
      >
        <transition name="n-select-menu--transition">
          <n-base-select-menu
            v-if="active"
            ref="contentInner"
            auto-pending-first-option
            class="n-select-menu"
            :mirror="false"
            :theme="synthesizedTheme"
            :pattern="value"
            :options="filteredOptions"
            :multiple="false"
            :size="size"
            :remote="remote"
            :loading="loading"
            :no-data-content="'Please Search'"
            :not-found-content="'Not Found'"
            :emit-option="false"
            :filterable="false"
            :is-option-selected="isSelected"
            :use-slot="!!$slots.default"
            @menu-toggle-option="handleToggleOption"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import NInput from '../../Input'
import detachable from '../../../mixins/detachable'
import placeable from '../../../mixins/placeable'
import zindexable from '../../../mixins/zindexable'
import asthemecontext from '../../../mixins/asthemecontext'
import clickoutside from '../../../directives/clickoutside'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import asformitem from '../../../mixins/asformitem'

import {
  NBaseSelectMenu
} from '../../../base/SelectMenu'

export default {
  name: 'NAutoComplete',
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
    asthemecontext,
    detachable,
    zindexable,
    placeable,
    asformitem()
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
      type: String,
      default: 'medium'
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
      canBeActivated: false
    }
  },
  computed: {
    active () {
      return !!this.value && this.canBeActivated && !!this.filteredOptions.length
    },
    filteredOptions () {
      return this.options.map(literal => typeof literal === 'string' ? ({
        label: literal,
        value: literal
      }) : literal)
    }
  },
  methods: {
    handleKeyDownEnter (e) {
      if (this.$refs.contentInner) {
        const pendingOption = this.$refs.contentInner.getPendingOption()
        if (pendingOption) {
          e.preventDefault()
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
    handleKeyUpEnter () {
      if (this.$refs.contentInner) {
        const pendingOption = this.$refs.contentInner.getPendingOption()
        this.select(pendingOption)
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
