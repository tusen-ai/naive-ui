<template>
  <div
    class="n-base-select-menu"
    :class="{
      [`n-base-select-menu--${size}-size`]: true,
      'n-base-select-menu--multiple': multiple,
      [`n-base-select-menu--no-tracking-rect`]: !showTrackingRect,
      [`n-${theme}-theme`]: theme
    }"
    :style="{
      width: styleWidth
    }"
    @keyup.up.stop="handleKeyUpUp"
    @keyup.down.stop="handleKeyUpDown"
    @mousedown.prevent
  >
    <n-scrollbar
      v-if="!empty"
      ref="scrollbar"
      :theme="theme"
      :scrollable="scrollable"
      :container="getScrollContainer"
      :content="getScrollContent"
      @scroll="handleMenuScroll"
    >
      <div class="n-base-select-menu-option-wrapper">
        <template v-show="empty">
          <recycle-scroller
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
          </recycle-scroller>
          <template v-else>
            <n-base-tracking-rect
              v-if="showTrackingRect"
              ref="trackingRect"
              key="__select-tracking-rect__"
              :item-size="itemSize"
              :theme="theme"
            />
            <template v-for="option in flattenedOptions">
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
              <render
                v-else-if="option.type === OPTION_TYPE.RENDER"
                :key="option.key"
                :render="option.render"
              />
            </template>
          </template>
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
    <div v-if="$scopedSlots.action" class="n-base-select-menu__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script>
import NScrollbar from '../../../Scrollbar'
import NSelectOption from './SelectOption.vue'
import NSelectGroupHeader from './SelectGroupHeader.vue'
import NBaseTrackingRect from '../../tracking-rect'
import NEmpty from '../../../empty'
import { RecycleScroller } from 'vue-virtual-scroller'
import render from '../../../_utils/vue/render'
import {
  getPrevAvailableIndex,
  getNextAvailableIndex,
  flattenOptions,
  OPTION_TYPE
} from '../../../_utils/component/select'
import formatLength from '../../../_utils/css/formatLength'
import { itemSize } from '../../../_styles-in-js/common.js'

export default {
  name: 'NBaseSelectMenu',
  provide () {
    return {
      NBaseSelectMenu: this
    }
  },
  components: {
    NScrollbar,
    NBaseTrackingRect,
    NSelectOption,
    NEmpty,
    NSelectGroupHeader,
    RecycleScroller,
    render
  },
  props: {
    theme: {
      type: String,
      default: null
    },
    showTrackingRect: {
      type: Boolean,
      default: true
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
    isOptionSelected: {
      type: Function,
      required: true
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
      default: true
    },
    /** deprecated */
    emitOption: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      active: true,
      pendingWrappedOption: null,
      OPTION_TYPE
    }
  },
  computed: {
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
    flattenedOptions () {
      const flattenedOptions = flattenOptions(this.options)
      return flattenedOptions
    },
    empty () {
      const flattenedOptions = this.flattenedOptions
      return flattenedOptions && flattenedOptions.length === 0
    },
    itemSize () {
      return itemSize[this.size]
    },
    pendingOptionValue () {
      const pendingWrappedOption = this.pendingWrappedOption
      return (
        pendingWrappedOption &&
        pendingWrappedOption.data &&
        pendingWrappedOption.data.value
      ) || null
    },
    styleWidth () {
      return formatLength(this.width)
    }
  },
  watch: {
    empty (value) {
      if (value) {
        this.hideTrackingRect(0)
      }
    },
    flattenedOptions () {
      this.$nextTick().then(() => {
        if (this.autoPendingFirstOption) {
          const firstAvailableOptionIndex = getNextAvailableIndex(this.flattenedOptions, null)
          this.setPendingWrappedOptionIndex(firstAvailableOptionIndex)
        } else {
          this.hideTrackingRect()
          this.pendingWrappedOption = null
        }
      })
    },
    pendingWrappedOption (value) {
      if (value === null) {
        this.$nextTick().then(() => {
          this.hideTrackingRect()
        })
      }
    }
  },
  mounted () {
    if (this.autoPendingFirstOption) {
      const firstAvailableOptionIndex = getNextAvailableIndex(this.flattenedOptions, null)
      this.setPendingWrappedOptionIndex(firstAvailableOptionIndex)
    }
  },
  methods: {
    handleMenuVisible () {
      this.$emit('menu-visible')
    },
    handleMenuScroll (e, scrollContainer, scrollContent) {
      this.$emit('menu-scroll', e, scrollContainer, scrollContent)
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
      this.$emit('menu-toggle-option', option)
    },
    handleMenuMouseLeave () {
      this.hideTrackingRect()
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
        this.pendingWrappedOption = this.flattenedOptions[index]
        const size = this.itemSize
        const offsetTop = size * index
        this.updateTrackingRectTop({
          offsetTop
        })
        doScroll && scrollbar && scrollbar.scrollToElement({}, () => offsetTop, () => size)
      } else {
        this.pendingWrappedOption = this.flattenedOptions[index]
        const el = this.$el
        const optionEl = el.querySelector(`[n-option-index="${index}"]`)
        const offsetTop = optionEl.offsetTop
        this.updateTrackingRectTop({
          offsetTop
        })
        doScroll && scrollbar && scrollbar.scrollToElement(optionEl)
      }
    },
    /**
     * select option background related
     */
    updateTrackingRectTop (el) {
      const refs = this.$refs
      if (refs.trackingRect) {
        refs.trackingRect.updateTrackingRectTop(el)
      }
    },
    hideTrackingRect () {
      const refs = this.$refs
      if (refs.trackingRect) {
        refs.trackingRect.hideTrackingRect()
      }
    },
    hideTrackingRectSync () {
      const refs = this.$refs
      if (refs.trackingRect) {
        refs.trackingRect.hideTrackingRect(0)
      }
    }
  }
}
</script>
