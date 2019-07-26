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
          :readonly="filterable ? false : 'readonly'"
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
            class="n-select-menu-wrapper"
          >
            <div
              ref="contentInner"
              class="n-select-menu"
              :class="{[`n-select-menu--${size}-size`]: true}"
              @mouseleave="hideLightBar"
            >
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
                    selectedValue ===
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

export default {
  name: 'NSingleSelect',
  mixins: [detachable, toggleable, placeable, zindexable, Emitter],
  model: {
    prop: 'selectedValue',
    event: 'input'
  },
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
    selectedValue: {
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
    }
  },
  data () {
    return {
      lightBarTop: null,
      showLightBar: false,
      label: '',
      labelPlaceholder: 'Please Select'
    }
  },
  computed: {
    filteredItems () {
      if (!this.filterable || !this.label.trim().length) return this.items
      return this.items.filter(item => this.matchFilterablePattern(item.label))
    },
    selected () {
      return this.items.some(item => item.value === this.selectedValue)
    },
    selectedItem () {
      const selectedValue = this.selectedValue
      const index = this.items.findIndex(item => item.value === selectedValue)
      if (1 + index) return this.items[index]
      else return null
    },
    selectedItems () {
      if (!Array.isArray(this.selectedValue)) return []
      const selectedValues = new Set(this.selectedValue)
      return this.items.filter(item => selectedValues.has(item.value))
    }
  },
  watch: {
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
        this.$nextTick().then(
          () => {
            document.addEventListener('click', this.handleClickOutsideMenu)
          }
        )
      } else {
        this.$refs.singleSelectInput.blur()
        if (this.selectedItem) {
          this.label = this.selectedItem.label
        } else {
          this.label = ''
          this.labelPlaceholder = this.placeholder
        }
        this.$nextTick().then(
          () => {
            document.removeEventListener('click', this.handleClickOutsideMenu)
          }
        )
      }
    }
  },
  created () {
    this.labelPlaceholder = this.placeholder
    if (this.selectedItem) {
      this.label = this.selectedItem.label
    }
  },
  beforeDestroy () {
    document.removeEventListener('click', this.handleClickOutsideMenu)
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
      return item.value === this.selectedValue
    },
    handleClickOutsideMenu (e) {
      if (!this.$refs.select.contains(e.target)) {
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
    }
  }
}
</script>
