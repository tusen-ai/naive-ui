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
        <div class="n-base-select-menu-light-bar-wrapper">
          <transition name="n-base-select-menu-light-bar--transition">
            <div
              v-if="showLightBar"
              class="n-base-select-menu-light-bar"
              :style="{ top: `${lightBarTop}px` }"
            />
          </transition>
        </div>
        <template v-if="!loading">
          <template v-if="!useSlot">
            <n-select-option
              v-for="option in linkedOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
              :disabled="option.disabled"
            />
          </template>
          <template v-else>
            <slot />
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
import withlightbar from '../../../mixins/withlightbar'
import NScrollbar from '../../../common/Scrollbar'
import linkedOptions from '../../../utils/data/linkedOptions'
import NSelectOption from './SelectOption'

export default {
  name: 'NBaseSelectMenu',
  provide () {
    return {
      NBaseSelectMenu: this
    }
  },
  components: {
    NScrollbar,
    NSelectOption
  },
  mixins: [withlightbar],
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
    value2Id () {
      const value2Id = new Map()
      this.linkedOptions.forEach(option => {
        value2Id.set(option.value, option.id)
      })
      return value2Id
    },
    id2Option () {
      const id2Option = new Map()
      for (const option of this.linkedOptions) {
        id2Option.set(option.id, option)
      }
      return id2Option
    },
    firstOptionId () {
      return this.linkedOptions.firstAvailableOptionId
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
    handleMenuScroll (e, scrollContainer, scrollContent) {
      this.$emit('menu-scroll', e, scrollContainer, scrollContent)
    },
    handleToggleOption (option) {
      this.emit('menu-toggle-option', option)
    },
    handleOptionMouseEnter (e, option) {
      if (!option.disabled) {
        this.updateLightBarPosition(e.target)
        this.pendingOption = option
      }
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
      if (this.pendingOption === null) {
        this.setPendingOptionElementId(this.linkedOptions.firstAvailableOptionId)
      } else {
        this.setPendingOptionElementId(this.pendingOption.nextAvailableOptionId)
      }
    },
    prev () {
      if (this.pendingOption) {
        this.setPendingOptionElementId(this.pendingOption.prevAvailableOptionId)
      }
    },
    setPendingOptionElementId (id) {
      const menu = this.$el
      if (menu && id !== null) {
        const el = menu.querySelector(`[data-id="${id}"]`)
        this.pendingOption = this.id2Option.get(id)
        this.pendingOptionElement = el
        this.updateLightBarPosition(this.pendingOptionElement)
        this.$refs.scrollbar.scrollToElement(this.pendingOptionElement)
      }
    }
  }
}
</script>
