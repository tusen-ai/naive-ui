<template>
  <div
    class="n-base-select-menu"
    :class="{
      [`n-base-select-menu--${size}-size`]: true,
      'n-base-select-menu--multiple': multiple,
      [`n-${theme}-theme`]: theme
    }"
    :style="{
      width: width &&(width + 'px')
    }"
    @keyup.up.stop="handleKeyUpUp"
    @keyup.down.stop="handleKeyUpDown"
    @mousedown.prevent="() => {}"
  >
    <n-scrollbar
      ref="scrollbar"
      :without-scrollbar="withoutScrollbar"
      @scroll="handleMenuScroll"
    >
      <div class="n-base-select-menu-option-wrapper">
        <n-select-menu-light-bar ref="lightBar" />
        <template v-if="!loading">
          <template v-if="!useSlot">
            <n-select-option
              v-for="option in linkedOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
              :disabled="option.disabled"
              :is-selected="isSelected({ value: option.value })"
              :mirror="false"
            />
          </template>
          <template v-else>
            <n-render-options :mirror="mirror">
              <slot />
            </n-render-options>
          </template>
        </template>
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
    </n-scrollbar>
  </div>
</template>

<script>
import NScrollbar from '../../../common/Scrollbar'
import linkedOptions from '../../../utils/data/linkedOptions'
import NSelectOption from './SelectOption.vue'
import NSelectMenuLightBar from './SelectMenuLightBar.vue'
import NRenderOptions from './SelectRenderOptions.vue'
import {
  createValueAttribute
} from './utils'

export default {
  name: 'NBaseSelectMenu',
  provide () {
    return {
      NBaseSelectMenu: this
    }
  },
  components: {
    NScrollbar,
    NSelectOption,
    NSelectMenuLightBar,
    NRenderOptions
  },
  props: {
    theme: {
      type: String,
      default: null
    },
    withoutScrollbar: {
      type: Boolean,
      default: false
    },
    useSlot: {
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
    emitOption: {
      type: Boolean,
      default: false
    },
    loading: {
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
    mirror: {
      type: Boolean,
      default: true
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
    }
  },
  watch: {
    notFound (value) {
      if (value) {
        this.hideLightBarSync()
      }
    },
    noData (value) {
      if (value) {
        this.hideLightBarSync()
      }
    },
    loading (value) {
      if (value) {
        this.hideLightBarSync()
      }
    },
    linkedOptions () {
      this.$nextTick().then(() => {
        this.hideLightBar()
        this.pendingOption = null
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
  methods: {
    hideLightBar () {
      if (this.$refs.lightBar) {
        this.$refs.lightBar.hideLightBar()
      }
    },
    hideLightBarSync () {
      if (this.$refs.lightBar) {
        this.$refs.lightBar.hideLightBarSync()
      }
    },
    updateLightBarPosition (el) {
      if (this.$refs.lightBar) {
        this.$refs.lightBar.updateLightBarPosition(el)
      }
    },
    handleMenuScroll (e, scrollContainer, scrollContent) {
      this.$emit('menu-scroll', e, scrollContainer, scrollContent)
    },
    handleToggleOption (option) {
      this.emit('menu-toggle-option', option)
    },
    handleOptionMouseEnter (e, option) {
      if (!option.disabled) {
        this.updateLightBarPosition(e.target)
        this.pendingOption = this.value2Option.get(option.value)
      }
    },
    handleOptionMouseLeave (e, option) {

    },
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
        this.linkedOptions.firstAvailableOptionValue !== null
      ) {
        this.setPendingOptionElementValue(this.linkedOptions.firstAvailableOptionValue)
      } else {
        this.setPendingOptionElementValue(this.pendingOption.nextAvailableOptionValue)
      }
    },
    prev () {
      if (this.pendingOption) {
        this.setPendingOptionElementValue(this.pendingOption.prevAvailableOptionValue)
      }
    },
    setPendingOptionElementValue (value) {
      const menu = this.$el
      if (menu && value !== null) {
        const el = menu.querySelector(`[n-value="${createValueAttribute(value)}"]`)
        this.pendingOption = this.value2Option.get(value)
        this.pendingOptionElement = el
        this.updateLightBarPosition(this.pendingOptionElement)
        this.$refs.scrollbar.scrollToElement(this.pendingOptionElement)
      }
    }
  }
}
</script>
