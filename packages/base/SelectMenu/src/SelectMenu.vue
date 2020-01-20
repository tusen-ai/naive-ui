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
      ref="scrollbar"
      :theme="theme"
      :without-scrollbar="withoutScrollbar"
      :container="getScrollContainer"
      :content="getScrollContent"
      @scroll="handleMenuScroll"
    >
      <div class="n-base-select-menu-option-wrapper">
        <template v-if="!loading">
          <recycle-scroller
            ref="virtualScroller"
            class="n-virtual-scroller"
            :items="linkedOptions"
            :item-size="itemSize"
            key-field="value"
          >
            <template v-slot:before>
              <n-base-light-bar ref="lightBar" :item-size="itemSize" :theme="theme" />
            </template>
            <template v-slot="{ item: option }">
              <n-select-option
                :key="option.value"
                :index="option._index"
                :label="option.label"
                :value="option.value"
                :disabled="option.disabled"
                :is-selected="isSelected({ value: option.value })"
              />
            </template>
          </recycle-scroller>
        </template>
      </div>
    </n-scrollbar>
    <div
      v-if="loading"
      class="n-base-select-option n-base-select-option--loading"
    >
      loading
    </div>
    <div
      v-else-if="noData"
      class="n-base-select-option n-base-select-option--no-data"
    >
      {{ noDataContent }}
    </div>
    <div
      v-else-if="notFound"
      class="n-base-select-option n-base-select-option--not-found"
    >
      {{ notFoundContent }}
    </div>
  </div>
</template>

<script>
import NScrollbar from '../../../common/Scrollbar'
import linkedOptions from '../../../utils/data/linkedOptions'
import NSelectOption from './SelectOption.vue'
import NBaseLightBar from '../../LightBar'
import debounce from 'lodash-es/debounce'
import { RecycleScroller } from 'vue-virtual-scroller'

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
    loading: {
      type: Boolean,
      default: false
    },
    pattern: {
      type: String,
      default: null
    },
    isSelected: {
      type: Function,
      required: true
    },
    width: {
      type: Number,
      default: null
    },
    autoPendingFirstOption: {
      type: Boolean,
      defa: false
    },
    /** deprecated */
    emitOption: {
      type: Boolean,
      default: false
    },
    noDataContent: {
      type: [String, Function],
      default: 'no data'
    },
    notFoundContent: {
      type: [String, Function],
      default: 'none result matched'
    }
  },
  data () {
    return {
      active: true,
      pendingOption: null
    }
  },
  computed: {
    notFound () {
      return this.filterable && (this.pattern.length && !this.linkedOptions.length)
    },
    noData () {
      return this.linkedOptions && this.linkedOptions.length === 0
    },
    value2Option () {
      const value2Option = new Map()
      for (const option of this.linkedOptions) {
        value2Option.set(option.value, option)
      }
      return value2Option
    },
    firstOptionValue () {
      return this.linkedOptions.firstAvailableOptionValue
    },
    linkedOptions () {
      return linkedOptions(this.options)
    },
    itemSize () {
      return ({
        small: 28,
        medium: 34,
        lerge: 40
      })[this.size]
    }
  },
  watch: {
    notFound (value) {
      if (value) {
        this.hideLightBar(0)
      }
    },
    noData (value) {
      if (value) {
        this.hideLightBar(0)
      }
    },
    loading (value) {
      if (value) {
        this.hideLightBar(0)
      }
    },
    linkedOptions () {
      this.$nextTick().then(() => {
        if (this.autoPendingFirstOption) {
          this.setPendingOptionIndex(this.linkedOptions.firstAvailableOptionIndex)
        } else {
          this.hideLightBar()
          this.pendingOption = null
        }
      })
    },
    pendingOption (value) {
      if (value === null) {
        this.$nextTick().then(() => {
          this.hideLightBar()
        })
      }
    }
  },
  mounted () {
    if (this.autoPendingFirstOption) {
      this.setPendingOptionIndex(this.linkedOptions.firstAvailableOptionIndex)
    }
  },
  methods: {
    handleMenuScroll (e, scrollContainer, scrollContent) {
      this.$emit('menu-scroll', e, scrollContainer, scrollContent)
    },
    handleToggleOption (option) {
      this.emit('menu-toggle-option', option)
    },
    handleOptionMouseEnter: debounce(function (e, option) {
      if (!option.disabled) {
        this.setPendingOptionIndex(option._index, false)
      }
    }, 64),
    handleKeyUpUp () {
      this.prev()
    },
    handleKeyUpDown () {
      this.next()
    },
    handleOptionClick (e, option) {
      if (!option.disabled) {
        this.toggleOption(option)
      }
    },
    handleMenuMouseLeave () {
      this.hideLightBar()
      this.pendingOption = null
    },
    toggleOption (option) {
      this.$emit('menu-toggle-option', option)
    },
    next () {
      if (
        this.pendingOption === null &&
        this.linkedOptions.firstAvailableOptionIndex !== null
      ) {
        this.setPendingOptionIndex(
          this.linkedOptions.firstAvailableOptionIndex
        )
      } else {
        this.setPendingOptionIndex(
          this.pendingOption.nextAvailableOptionIndex
        )
      }
    },
    prev () {
      if (this.pendingOption) {
        this.setPendingOptionIndex(
          this.pendingOption.prevAvailableOptionIndex
        )
      }
    },
    setPendingOptionIndex (index, doScroll = true) {
      if (index !== null) {
        this.pendingOption = this.linkedOptions[index]
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
      return this.$refs.virtualScroller.$el
    },
    getScrollContent () {
      return this.$refs.virtualScroller.$refs.wrapper
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
