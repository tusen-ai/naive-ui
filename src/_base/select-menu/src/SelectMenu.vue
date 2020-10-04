<template>
  <div
    class="n-base-select-menu"
    :class="{
      [`n-base-select-menu--${size}-size`]: true,
      'n-base-select-menu--multiple': multiple,
      [`n-${theme}-theme`]: theme
    }"
    :style="style"
    @keyup.up.stop="handleKeyUpUp"
    @keyup.down.stop="handleKeyUpDown"
    @mousedown.prevent
  >
    <n-scrollbar
      v-if="!empty"
      ref="scrollbar"
      :theme="theme"
      :scrollable="scrollable"
      @scroll="handleMenuScroll"
    >
      <div class="n-base-select-menu-option-wrapper">
        <!-- <recycle-scroller
          v-if="virtualScroll"
          ref="virtualScroller"
          class="n-virtual-scroller"
          :items="flattenedOptions"
          :item-size="itemSize"
          key-field="key"
          @visible="handleMenuVisible"
        >
          <template v-slot:before>
            <n-base-tracking-rect
              v-if="showTrackingRect"
              ref="trackingRect"
              key="__select-tracking-rect__"
              :item-size="itemSize"
              :theme="theme"
            />
          </template>
          <template v-slot="{ item: option }">
            <n-select-option
              v-if="option.type === OPTION_TYPE.OPTION"
              :key="option.key"
              :index="option.index"
              :wrapped-option="option"
              :grouped="option.grouped"
              :selected="isOptionSelected({ value: option.data.value })"
            />
            <n-select-group-header
              v-else-if="option.type === OPTION_TYPE.GROUP_HEADER"
              :key="option.key"
              :data="option.data"
            />
          </template>
        </recycle-scroller> -->
        <template v-for="option in flattenedOptions">
          <n-select-option
            v-if="option.type === OPTION_TYPE.OPTION"
            :key="option.key"
            :index="option.index"
            :wrapped-option="option"
            :grouped="option.grouped"
          />
          <n-select-group-header
            v-else-if="option.type === OPTION_TYPE.GROUP_HEADER"
            :key="option.key"
            :data="option.data"
          />
          <render
            v-else-if="option.type === OPTION_TYPE.RENDER"
            :key="option.key"
            :render="option.render"
          />
        </template>
      </div>
    </n-scrollbar>
    <div
      v-else
      style="padding: 14px 0; width: 100%;"
    >
      <slot name="empty">
        <n-empty />
      </slot>
    </div>
    <div v-if="$slots.action" class="n-base-select-menu__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script>
import NScrollbar from '../../../scrollbar'
import NSelectOption from './SelectOption.js'
import NSelectGroupHeader from './SelectGroupHeader.js'
import NEmpty from '../../../empty'
import { render } from '../../../_utils/vue'
import {
  getPrevAvailableIndex,
  getNextAvailableIndex,
  flattenOptions,
  OPTION_TYPE
} from '../../../_utils/component/select'
import { depx, formatLength } from '../../../_utils/css'
import { createKey } from '../../../_utils/cssr'
import { usecssr } from '../../../_mixins'
import styles from './styles'

export default {
  name: 'BaseSelectMenu',
  provide () {
    return {
      NBaseSelectMenu: this
    }
  },
  components: {
    NScrollbar,
    NSelectOption,
    NEmpty,
    NSelectGroupHeader,
    render
  },
  mixins: [
    usecssr(styles, {
      themeKey: 'theme',
      injectCssrProps: true
    })
  ],
  props: {
    theme: {
      type: String,
      default: null
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    pattern: {
      type: String,
      default: null
    },
    value: {
      type: [String, Number],
      default: null
    },
    width: {
      type: [Number, String],
      default: null
    },
    autoPendingFirstOption: {
      type: Boolean,
      default: false
    },
    virtualScroll: {
      type: Boolean,
      default: false
    },
    // deprecated
    onMenuVisible: {
      type: Function,
      default: undefined
    },
    onMenuToggleOption: {
      type: Function,
      default: undefined
    },
    onMenuScroll: {
      type: Function,
      default: undefined
    },
    // deprecated
    emitOption: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const flattenedOptions = flattenOptions(this.options)
    const firstAvailableOptionIndex = this.autoPendingFirstOption
      ? getNextAvailableIndex(flattenedOptions, null)
      : null
    const pendingWrappedOption = firstAvailableOptionIndex === null
      ? null
      : flattenedOptions[firstAvailableOptionIndex]
    return {
      flattenedOptions,
      pendingWrappedOption,
      OPTION_TYPE
    }
  },
  computed: {
    valueSet () {
      if (
        this.multiple &&
        Array.isArray(this.value)
      ) return new Set(this.value)
      return null
    },
    /**
     * scrollbar related
     */
    getScrollContainer () {
      if (this.virtualScroll) return () => this.$refs.virtualScroller && this.$refs.virtualScroller.$el
      return null
    },
    getScrollContent () {
      if (this.virtualScroll) return () => this.$refs.virtualScroller && this.$refs.virtualScroller.$refs.wrapper
      return null
    },
    pendingWrappedOptionIndex () {
      const pendingWrappedOption = this.pendingWrappedOption
      if (!pendingWrappedOption) return null
      return pendingWrappedOption.index
    },
    empty () {
      const flattenedOptions = this.flattenedOptions
      return flattenedOptions && flattenedOptions.length === 0
    },
    itemSize () {
      return depx(this.cssrProps.$local[createKey('optionHeight', this.size)])
    },
    pendingOptionValue () {
      const pendingWrappedOption = this.pendingWrappedOption
      const data = (pendingWrappedOption && pendingWrappedOption.data) || null
      return (
        data &&
        data.value !== undefined &&
        data.value
      ) || null
    },
    style () {
      return {
        width: formatLength(this.width)
      }
    }
  },
  watch: {
    options (value) {
      this.flattenedOptions = flattenOptions(value)
      if (this.autoPendingFirstOption) {
        const firstAvailableOptionIndex = getNextAvailableIndex(this.flattenedOptions, null)
        this.setPendingWrappedOptionIndex(firstAvailableOptionIndex)
      } else {
        this.pendingWrappedOption = null
      }
    }
  },
  methods: {
    handleMenuVisible () {
      const {
        onMenuVisible
      } = this
      if (onMenuVisible) onMenuVisible()
    },
    handleMenuScroll (e, scrollContainer, scrollContent) {
      const {
        onMenuScroll
      } = this
      if (onMenuScroll) onMenuScroll(e, scrollContainer, scrollContent)
    },
    getPendingOptionData () {
      const pendingWrappedOption = this.pendingWrappedOption
      return pendingWrappedOption && pendingWrappedOption.data
    },
    handleOptionMouseEnter (e, index, wrappedOption) {
      const data = wrappedOption.data
      if (data.disabled) return
      this.setPendingWrappedOptionIndex(index, false)
    },
    handleOptionClick (e, index, wrappedOption) {
      const data = wrappedOption.data
      if (data.disabled || wrappedOption.as === 'dropdown-submenu') return
      this.toggleOption(data)
    },
    toggleOption (option) {
      const {
        onMenuToggleOption
      } = this
      if (onMenuToggleOption) onMenuToggleOption(option)
    },
    handleMenuMouseLeave () {
      this.pendingWrappedOption = null
    },
    /**
     * keyboard related methods
     */
    handleKeyUpUp () {
      this.prev()
    },
    handleKeyUpDown () {
      this.next()
    },
    next () {
      if (
        this.pendingWrappedOption === null
      ) {
        this.setPendingWrappedOptionIndex(
          getNextAvailableIndex(this.flattenedOptions, null),
          true
        )
      } else {
        this.setPendingWrappedOptionIndex(
          getNextAvailableIndex(this.flattenedOptions, this.pendingWrappedOptionIndex),
          true
        )
      }
    },
    prev () {
      if (this.pendingWrappedOption) {
        this.setPendingWrappedOptionIndex(
          getPrevAvailableIndex(this.flattenedOptions, this.pendingWrappedOptionIndex),
          true
        )
      }
    },
    setPendingWrappedOptionIndex (index, doScroll = false) {
      if (index === null) {
        this.pendingWrappedOption = null
        return
      }
      const scrollbar = this.$refs.scrollbar
      if (this.virtualScroll) {
        // this.pendingWrappedOption = this.flattenedOptions[index]
        // const size = this.itemSize
        // const offsetTop = size * index
        // this.updateTrackingRectTop({
        //   offsetTop
        // })
        // doScroll && scrollbar && scrollbar.scrollToElement({}, () => offsetTop, () => size)
      } else {
        this.pendingWrappedOption = this.flattenedOptions[index]
        if (doScroll && scrollbar) {
          const el = this.$el
          const optionEl = el.querySelector(`[n-option-index="${index}"]`)
          scrollbar.scrollToElement(optionEl, {
            behavior: 'auto'
          })
        }
      }
    }
  }
}
</script>
