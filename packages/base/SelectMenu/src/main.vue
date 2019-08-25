<template>
  <div
    class="n-base-select-menu"
    :class="{
      [`n-base-select-menu--${size}-size`]: true,
      'n-base-select-menu--multiple': multiple
    }"
    @mouseenter="handleMenuMouseEnter"
    @mouseleave="handleMenuMouseLeave"
  >
    <n-scrollbar
      ref="scrollbar"
      @scroll="handleMenuScroll"
      @scrollstart="handleMenuScrollStart"
      @scrollend="handleMenuScrollEnd"
    >
      <div class="n-base-select-menu__item-wrapper">
        <transition name="n-base-select-menu__light-bar--transition">
          <div
            v-if="showLightBar"
            class="n-base-select-menu__light-bar"
            :style="{ top: `${lightBarTop}px` }"
          />
        </transition>
        <template v-if="!loading">
          <div
            v-for="option in processedOptions"
            ref="menuOptions"
            :key="option.value"
            :data-id="option.id"
            class="n-base-select-menu__item"
            :class="{
              'n-base-select-menu__item--selected':
                isSelected(option),
              'n-base-select-menu__item--disabled':
                option.disabled
            }"
            @click="handleOptionClick($event, option)"
            @mouseenter="handleOptionMouseEnter($event, option)"
          >
            {{ option.label }}
          </div>
        </template>
        <div
          v-if="loading"
          class="n-base-select-menu__item n-base-select-menu__item--loading"
        >
          {{
            /**
             * This method to activate hideLightBar is ridiculous, however using
             * event handler still has some problem.
             */
            hideLightBar()
          }}
          loading
        </div>
        <div
          v-else-if="options && options.length === 0"
          class="n-base-select-menu__item n-base-select-menu__item--no-data"
        >
          {{
            hideLightBar()
          }}
          {{ noDataContent }}
        </div>
        <div
          v-else-if="filterable && (pattern.length && !processedOptions.length)"
          class="n-base-select-menu__item n-base-select-menu__item--not-found"
        >
          {{
            hideLightBar()
          }}
          {{ notFoundContent }}
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>

<script>
import withlightbar from '../../../mixins/withlightbar'
import NScrollbar from '../../../common/Scrollbar'

export default {
  name: 'NBaseSelectMenu',
  components: {
    NScrollbar
  },
  mixins: [withlightbar],
  props: {
    options: {
      type: Array,
      default: null
    },
    processedOptions: {
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
    }
  },
  data () {
    return {
      active: true,
      pendingOption: null
    }
  },
  computed: {
    firstOption () {
      // console.log(this.processedOptions)
      if (this.processedOptions && this.processedOptions.length) {
        return this.processedOptions[0]
      }
      return null
    }
  },
  watch: {
    processedOptions () {
      this.$nextTick().then(() => {
        this.hideLightBar()
        this.pendingOption = null
      })
    },
    pendingOption (newValue) {
      if (newValue === null) {
        this.$nextTick().then(() => {
          this.hideLightBar()
        })
      }
    }
  },
  methods: {
    handleMenuScrollStart () {
      this.$emit('menu-scroll-start')
    },
    handleMenuScrollEnd () {
      this.$emit('menu-scroll-end')
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
        this.pendingOption = option
      }
    },
    handleOptionMouseLeave (e) {
    },
    handleMenuMouseEnter (e) {
      if (!this.filterable) {
        const selectElement = this.$parent.$el
        if (selectElement) {
          selectElement.focus()
        }
      }
    },
    handleOptionClick (e, option) {
      if (!option.disabled) {
        const selectElement = this.$parent.$el
        if (selectElement) {
          selectElement.focus()
        }
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
        // console.log('this.pendingOption === null', this.firstOption)
        const firstOption = this.firstOption
        if (firstOption) {
          let optionIterator = firstOption
          if (!optionIterator) {
            return
          } else {
            while (optionIterator.disabled) {
              optionIterator = optionIterator.next
              if (optionIterator === firstOption) {
                break
              }
            }
          }
          this.pendingOption = optionIterator
          this.setPendingOptionElement(optionIterator)
        }
      } else {
        // console.log('this.pendingOption !== null', this.pendingOption)
        let optionIterator = this.pendingOption
        optionIterator = optionIterator.next
        while (this.pendingOption !== optionIterator && optionIterator.disabled) {
          optionIterator = optionIterator.next
        }
        this.pendingOption = optionIterator
        this.setPendingOptionElement(optionIterator)
      }
    },
    prev () {
      if (this.pendingOption) {
        let optionIterator = this.pendingOption
        optionIterator = optionIterator.prev
        while (this.pendingOption !== optionIterator && optionIterator.disabled) {
          optionIterator = optionIterator.prev
        }
        this.pendingOption = optionIterator
        this.setPendingOptionElement(optionIterator)
      }
    },
    setPendingOptionElement (option) {
      const menu = this.$el
      if (menu) {
        const el = menu.querySelector(`[data-id="${option.id}"]`)
        this.pendingOptionElement = el
        this.updateLightBarPosition(this.pendingOptionElement)
        this.$refs.scrollbar.scrollToElement(this.pendingOptionElement)
      }
    }
  }
}
</script>
