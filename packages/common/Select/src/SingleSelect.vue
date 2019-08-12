<template>
  <div
    ref="select"
    class="n-select"
    :class="{
      [`n-select--${size}-size`]: true,
      'n-select--disabled': disabled
    }"
    @click="toggleMenu"
  >
    <div
      ref="activator"
      class="n-select-link"
      :class="{
        'n-select-link--active': active
      }"
    >
      <div
        class="n-select-link__label"
      >
        <input
          ref="singleSelectInput"
          v-model="label"
          class="n-select-link-label__input"
          :placeholder="labelPlaceholder"
          :readonly="!disabled && filterable ? false : 'readonly'"
        >
      </div>
    </div>
    <div
      ref="contentWrapper"
      class="n-select-menu__content-wrapper"
    >
      <div
        ref="content"
        class="n-select-menu__content"
      >
        <transition name="n-select-menu--transition">
          <div
            v-if="active"
            v-clickoutside="handleClickOutsideMenu"
            class="n-select-menu-wrapper"
          >
            <div
              ref="contentInner"
              class="n-select-menu"
              :class="{[`n-select-menu--${size}-size`]: true}"
              @mouseleave="hideLightBar"
            >
              <scrollbar
                ref="scrollbar"
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
                  <div
                    v-for="item in filteredItems"
                    :key="item.value"
                    class="n-select-menu__item"
                    :class="{
                      'n-select-menu__item--selected':
                        value ===
                        item.value
                    }"
                    @click.stop="toggleItemInSingleSelect(item)"
                    @mouseenter="showLightBarTop"
                  >
                    {{ item.label }}
                  </div>
                  <div
                    v-if="label.length && !filteredItems.length"
                    class="n-select-menu__item n-select-menu__item--not-found"
                  >
                    {{
                      /**
                      * This method to activate hideLightBar is ridiculous, however using
                      * event handler still has some problem.
                      */
                      hideLightBar()
                    }}
                    none result matched
                  </div>
                </div>
              </scrollbar>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Emitter from '../../../mixins/emitter'
import detachable from '../../../mixins/detachable'
import placeable from '../../../mixins/placeable'
import toggleable from '../../../mixins/toggleable'
import zindexable from '../../../mixins/zindexable'
import Scrollbar from '../../Scrollbar'
import clickoutside from '../../../directives/clickoutside'

export default {
  name: 'NSingleSelect',
  components: {
    Scrollbar
  },
  directives: {
    clickoutside
  },
  mixins: [detachable, toggleable, placeable, zindexable, Emitter],
  inject: {
    formItem: {
      default: null
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: null
    },
    placeholder: {
      type: String,
      default: 'Please Select'
    },
    size: {
      type: String,
      default: 'default'
    },
    verboseTransition: {
      type: Boolean,
      default: false
    },
    emitItem: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    remote: {
      type: Boolean,
      default: false
    },
    onSearch: {
      type: Function,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      lightBarTop: null,
      showLightBar: false,
      label: '',
      labelPlaceholder: 'Please Select',
      scrolling: false
    }
  },
  computed: {
    filteredItems () {
      if (!this.filterable || !this.label.trim().length) return this.items
      return this.items.filter(item => this.matchFilterablePattern(item.label))
    },
    selected () {
      return this.items.some(item => item.value === this.value)
    },
    selectedItem () {
      const value = this.value
      const index = this.items.findIndex(item => item.value === value)
      if (1 + index) return this.items[index]
      else return null
    }
  },
  watch: {
    label () {
      this.$nextTick().then(() => {
        this.updatePosition()
        if (this.$refs.scrollbar) {
          this.$refs.scrollbar.updateParameters()
        }
      })
    },
    selectedItem (n, o) {
      if (this.selectedItem !== null) {
        this.label = this.selectedItem.label
        if (n !== o && this.formItem) {
          this.dispatch('NFormItem', 'on-form-change', n.value)
        }
      } else {
        this.label = ''
      }
    },
    active (newValue) {
      if (newValue === true) {
        if (this.selectedItem && this.filterable) {
          this.labelPlaceholder = this.selectedItem.label
          this.label = ''
        }
      } else {
        this.$refs.singleSelectInput.blur()
        if (this.selectedItem) {
          this.label = this.selectedItem.label
        } else {
          this.label = ''
          this.labelPlaceholder = this.placeholder
        }
      }
    }
  },
  created () {
    this.labelPlaceholder = this.placeholder
    if (this.selectedItem) {
      this.label = this.selectedItem.label
    }
  },
  methods: {
    /**
     * @param {string} value
     */
    matchFilterablePattern (value) {
      try {
        return 1 + value.toString().toLowerCase().search(this.label.trim().toLowerCase())
      } catch (err) {
        return false
      }
    },
    emitChangeEvent (item, isSelected) {
      if (this.emitItem) {
        this.$emit('change', item, isSelected)
      } else {
        this.$emit('change', item.value, isSelected)
      }
    },
    showLightBarTop (e) {
      this.showLightBar = true
      this.lightBarTop = e.target.offsetTop
    },
    hideLightBar (e) {
      this.showLightBar = false
    },
    isSelected (item) {
      return item.value === this.value
    },
    handleClickOutsideMenu (e) {
      if (!this.$refs.activator.contains(e.target) && !this.scrolling) {
        this.deactivate()
      }
    },
    closeMenu () {
      this.deactivate()
    },
    toggleMenu () {
      if (this.disabled) return
      if (this.active) {
        this.deactivate()
      } else {
        this.activate()
      }
    },
    toggleItemInSingleSelect (item) {
      if (this.disabled) return
      this.label = item.label
      this.$emit('input', item.value)
      this.emitChangeEvent(item, true)
      this.closeMenu()
    },
    handleMenuScrollStart () {
      this.scrolling = true
    },
    handleMenuScrollEnd () {
      window.setTimeout(() => {
        this.scrolling = false
      }, 0)
    }
  }
}
</script>
