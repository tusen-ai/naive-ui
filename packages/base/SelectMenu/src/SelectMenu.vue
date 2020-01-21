<template>
  <div
    class="n-base-select-menu"
    :class="{
      [`n-base-select-menu--${size}-size`]: true,
      'n-base-select-menu--multiple': multiple,
      [`n-${theme}-theme`]: theme
    }"

    :style="{
      width: width && (width + 'px')
    }"
    @keyup.up.stop="handleKeyUpUp"
    @keyup.down.stop="handleKeyUpDown"
    @mousedown.prevent="() => {}"
  >
    <n-scrollbar
      v-show="!empty"
      ref="scrollbar"
      :theme="theme"
      :without-scrollbar="withoutScrollbar"
      :container="getScrollContainer"
      :content="getScrollContent"
      @scroll="handleMenuScroll"
    >
      <div class="n-base-select-menu-option-wrapper">
        <template v-show="empty">
          <recycle-scroller
            ref="virtualScroller"
            class="n-virtual-scroller"
            :items="flattenedOptions"
            :item-size="itemSize"
            key-field="key"
            @visible="handleMenuVisible"
          >
            <template v-slot:before>
              <n-base-light-bar ref="lightBar" :item-size="itemSize" :theme="theme" />
            </template>
            <template v-slot="{ item: option }">
              <n-select-option
                v-if="option.type === OPTION_TYPE.OPTION"
                :index="option.index"
                :label="option.data.label"
                :value="option.data.value"
                :disabled="option.data.disabled"
                :grouped="option.grouped"
                :selected="isOptionSelected({ value: option.data.value })"
              />
              <n-select-group-header
                v-else-if="option.type === OPTION_TYPE.GROUP_HEADER"
                :name="option.data.name"
              />
            </template>
          </recycle-scroller>
        </template>
      </div>
    </n-scrollbar>
    <div
      v-if="empty"
      style="padding: 14px 0;"
    >
      <slot name="empty">
        <n-empty description="No Data" />
      </slot>
    </div>
  </div>
</template>

<script>
import NScrollbar from '../../../common/Scrollbar'
import NSelectOption from './SelectOption.vue'
import NSelectGroupHeader from './SelectGroupHeader.vue'
import NBaseLightBar from '../../LightBar'
import NEmpty from '../../../common/Empty'
import { RecycleScroller } from 'vue-virtual-scroller'
import debounce from 'lodash-es/debounce'
import {
  getPrevAvailableIndex,
  getNextAvailableIndex,
  flattenOptions,
  OPTION_TYPE
} from '../../../utils/component/select'

export default {
  name: 'NBaseSelectMenu',
  provide () {
    return {
      NBaseSelectMenu: this
    }
  },
  components: {
    NScrollbar,
    NBaseLightBar,
    NSelectOption,
    NEmpty,
    NSelectGroupHeader,
    RecycleScroller
  },
  props: {
    theme: {
      type: String,
      default: null
    },
    withoutLightBar: {
      type: Boolean,
      default: false
    },
    withoutScrollbar: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: null
    },
    filterable: {
      type: Boolean,
      default: false
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
      type: Number,
      default: null
    },
    autoPendingFirstOption: {
      type: Boolean,
      default: false
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
      return ({
        small: 28,
        medium: 34,
        large: 40
      })[this.size]
    }
  },
  watch: {
    empty (value) {
      if (value) {
        this.hideLightBar(0)
      }
    },
    flattenedOptions () {
      this.$nextTick().then(() => {
        if (this.autoPendingFirstOption) {
          const firstAvailableOptionIndex = getNextAvailableIndex(this.flattenedOptions, null)
          this.setPendingWrappedOptionIndex(firstAvailableOptionIndex)
        } else {
          this.hideLightBar()
          this.pendingWrappedOption = null
        }
      })
    },
    pendingWrappedOption (value) {
      if (value === null) {
        this.$nextTick().then(() => {
          this.hideLightBar()
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
    getPendingOption () {
      const pendingWrappedOption = this.pendingWrappedOption
      return pendingWrappedOption && pendingWrappedOption.data
    },
    handleOptionMouseEnter: debounce(function (e, option) {
      if (!option.disabled) {
        this.setPendingWrappedOptionIndex(option.index, false)
      }
    }, 64),
    handleOptionClick (e, option) {
      if (!option.disabled) {
        this.toggleOption(option)
      }
    },
    toggleOption (option) {
      this.$emit('menu-toggle-option', option)
    },
    handleMenuMouseLeave () {
      this.hideLightBar()
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
          getNextAvailableIndex(this.flattenedOptions, null)
        )
      } else {
        this.setPendingWrappedOptionIndex(
          getNextAvailableIndex(this.flattenedOptions, this.pendingWrappedOptionIndex)
        )
      }
    },
    prev () {
      if (this.pendingWrappedOption) {
        this.setPendingWrappedOptionIndex(
          getPrevAvailableIndex(this.flattenedOptions, this.pendingWrappedOptionIndex)
        )
      }
    },
    setPendingWrappedOptionIndex (index, doScroll = true) {
      if (index !== null) {
        this.pendingWrappedOption = this.flattenedOptions[index]
        const itemSize = this.itemSize
        const offsetTop = itemSize * index
        this.updateLightBarTop({
          offsetTop
        })
        doScroll && this.$refs.scrollbar.scrollToElement({}, () => offsetTop, () => itemSize)
      }
    },
    /**
     * scrollbar related
     */
    getScrollContainer () {
      return this.$refs.virtualScroller && this.$refs.virtualScroller.$el
    },
    getScrollContent () {
      return this.$refs.virtualScroller && this.$refs.virtualScroller.$refs.wrapper
    },
    /**
     * light-bar related
     */
    updateLightBarTop (el) {
      if (this.$refs.lightBar) {
        this.$refs.lightBar.updateLightBarTop(el)
      }
    },
    hideLightBar () {
      if (this.$refs.lightBar) {
        this.$refs.lightBar.hideLightBar()
      }
    },
    hideLightBarSync () {
      if (this.$refs.lightBar) {
        this.$refs.lightBar.hideLightBar(0)
      }
    }
  }
}
</script>
