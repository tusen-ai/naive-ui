<template>
  <div
    class="n-select-menu-wrapper"
  >
    <div
      class="n-select-menu"
      :class="{
        [`n-select-menu--${size}-size`]: true,
        'n-select-menu--multiple': multiple
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
        <div class="n-select-menu__item-wrapper">
          <transition name="n-select-menu__light-bar--transition">
            <div
              v-if="showLightBar"
              class="n-select-menu__light-bar"
              :style="{ top: `${lightBarTop}px` }"
            />
          </transition>
          <template v-if="!loading">
            <div
              v-for="option in processedOptions"
              ref="menuOptions"
              :key="option.value"
              :data-id="option.id"
              class="n-select-menu__item"
              :class="{
                'n-select-menu__item--selected':
                  isSelected(option)
              }"
              @click="handleOptionClick($event, option)"
              @mouseenter="handleOptionMouseEnter($event, option)"
            >
              {{ option.label }}
            </div>
          </template>
          <div
            v-if="loading"
            class="n-select-menu__item n-select-menu__item--loading"
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
            class="n-select-menu__item n-select-menu__item--no-data"
          >
            {{
              hideLightBar()
            }}
            {{ noDataContent }}
          </div>
          <div
            v-else-if="filterable && (pattern.length && !processedOptions.length)"
            class="n-select-menu__item n-select-menu__item--not-found"
          >
            {{
              hideLightBar()
            }}
            {{ notFoundContent }}
          </div>
        </div>
      </n-scrollbar>
    </div>
  </div>
</template>

<script>
import withlightbar from '../../../mixins/withlightbar'
import NScrollbar from '../../Scrollbar'

export default {
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
    pendingOption: {
      type: Object,
      default: null
    },
    pendingOptionElement: {
      validator (el) {
        return el instanceof Element
      },
      default: null
    },
    isSelected: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      active: true
    }
  },
  watch: {
    processedOptions () {
      this.$nextTick().then(() => {
        this.hideLightBar()
        this.$emit('menu-change-pending-option', null)
      })
    },
    pendingOption (newValue) {
      if (newValue !== null) {
        this.$nextTick().then(() => {
          if (this.pendingOptionElement) {
            this.updateLightBarPosition(this.pendingOptionElement)
            this.$refs.scrollbar.scrollToElement(this.pendingOptionElement)
          }
        })
      } else {
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
      this.updateLightBarPosition(e.target)
      this.$emit('menu-change-pending-option', option)
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
      const selectElement = this.$parent.$el
      if (selectElement) {
        selectElement.focus()
      }
      console.log('handleOptionClick', option)
      this.toggleOption(option)
    },
    handleMenuMouseLeave () {
      this.hideLightBar()
      this.$emit('menu-change-pending-option', null)
    },
    toggleOption (option) {
      this.$emit('menu-toggle-option', option)
    }
  }
}
</script>
