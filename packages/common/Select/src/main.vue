<template>
  <div
    ref="select"
    class="n-select"
    :class="{
      [`n-select--${size}-size`]: true
    }"
    @click="toggleMenu"
  >
    <div
      v-if="multiple"
      class="n-select-link"
      :class="{
        'n-select-link--active': active,
        'n-select-link--selected': selected
      }"
    >
      <div
        class="n-select-link__placeholder"
        :class="{
          'n-select-link__placeholder--verbose-transition': verboseTransition
        }"
      >
        {{ placeholder }}
      </div>
      <div
        class="n-select-link__tags"
        :class="{
          'n-select-link__tags--selected': selected
        }"
      >
        <transition-group
          v-if="verboseTransition"
          class="n-select-link__tag-wrapper"
          name="n-select-menu__tags--transition"
        >
          <div
            v-for="item in selectedItems"
            :key="item.value"
            class="n-select-link__tag"
          >
            <div class="n-select-link-tag__content">
              {{ item.label }}
            </div>
            <n-icon
              class="n-select-link-tag__icon"
              type="md-close"
              @click.stop="toggleItemInMultipleSelect(item)"
            />
          </div>
        </transition-group>
        <div
          v-else
          class="n-select-link__tag-wrapper"
        >
          <div
            v-for="item in selectedItems"
            :key="item.value"
            class="n-select-link__tag"
          >
            <div class="n-select-link-tag__content">
              {{ item.label }}
            </div>
            <n-icon
              class="n-select-link-tag__icon"
              type="md-close"
              @click.stop="toggleItemInMultipleSelect(item)"
            />
          </div>
        </div>
      </div>
      <transition name="n-select-menu--transition">
        <div
          v-if="active"
          class="n-select-menu n-select-menu--multiple"
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
            v-for="item in items"
            :key="item.value"
            class="n-select-menu__item"
            :class="{
              'is-selected':
                isSelected(item)
            }"
            @click.stop="toggleItemInMultipleSelect(item)"
            @mouseenter="showLightBarTop"
          >
            {{ item.label }}
          </div>
        </div>
      </transition>
    </div>
    <div
      v-else
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
      <transition name="n-select-menu--transition">
        <div
          v-if="active"
          class="n-select-menu"
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
              'is-selected':
                selectedValue ===
                item.value
            }"
            @click.stop="toggleItemInSingleSelect(item)"
            @mouseenter="showLightBarTop"
          >
            {{ item.label }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
/**
 * Warning: There are some potential problems if there are too many items!
 */
import NIcon from '../../Icon/index'

export default {
  name: 'NSelect',
  components: {
    NIcon
  },
  model: {
    prop: 'selectedValue',
    event: '_change'
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
    multiple: {
      type: Boolean,
      default: false
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
    }
  },
  data () {
    return {
      active: false,
      lightBarTop: null,
      showLightBar: false,
      label: '',
      labelPlaceholder: 'Please Select'
    }
  },
  computed: {
    filteredItems () {
      if (!this.filterable) return this.items
      return this.items.filter(item => typeof item.label === 'string' ? 1 + item.label.search(this.label) : false)
    },
    selected () {
      if (this.multiple) {
        if (Array.isArray(this.selectedValue)) {
          const itemValues = new Set(this.items.map(item => item.value))
          return this.selectedValue.filter(value => itemValues.has(value)).length
        } else {
          return false
        }
      } else {
        return this.items.some(item => item.value === this.selectedValue)
      }
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
    selectedItem () {
      if (this.selectedItem) {
        this.label = this.selectedItem.label
      }
    },
    active (newValue) {
      if (newValue === true) {
        if (!this.multiple) {
          if (this.selectedItem && this.filterable) {
            this.labelPlaceholder = this.selectedItem.label
            this.label = ''
          }
        }
        this.$nextTick().then(
          () => {
            document.addEventListener('click', this.nativeCloseMenu)
          }
        )
      } else {
        if (!this.multiple) {
          this.$refs.singleSelectInput.blur()
          if (this.selectedItem) {
            this.label = this.selectedItem.label
          }
        }
        this.$nextTick().then(
          () => {
            document.removeEventListener('click', this.nativeCloseMenu)
          }
        )
      }
    }
  },
  created () {
    if (!this.multiple) {
      this.labelPlaceholder = this.placeholder
    }
  },
  beforeDestroy () {
    document.removeEventListener('click', this.nativeCloseMenu)
  },
  methods: {
    /**
     * @param {string} value
     */
    matchFilterablePattern (value) {
      return 1 + value.search(this.label)
    },
    emitChangeEvent (item) {
      if (this.emitItem) {
        this.$emit('change', item)
      } else {
        this.$emit('change', item.value)
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
      if (this.multiple) {
        if (!Array.isArray(this.selectedValue)) return false
        return 1 + this.selectedValue.findIndex(value => value === item.value)
      } else {
        return item.value === this.selectedValue
      }
    },
    nativeCloseMenu (e) {
      if (!this.$refs.select.contains(e.target)) {
        this.active = false
      }
    },
    closeMenu () {
      this.active = false
    },
    toggleMenu () {
      this.active = !this.active
    },
    toggleItemInSingleSelect (item) {
      this.label = item.label
      this.$emit('_change', item.value)
      this.emitChangeEvent(item)
      this.closeMenu()
    },
    toggleItemInMultipleSelect (item) {
      let newSelectedValues = []
      if (Array.isArray(this.selectedValue)) {
        const itemValues = new Set(this.items.map(item => item.value))
        newSelectedValues = this.selectedValue.filter(value => itemValues.has(value))
      }
      const index = newSelectedValues.findIndex(value => value === item.value)
      if (1 + index) {
        newSelectedValues.splice(index, 1)
      } else {
        newSelectedValues.push(item.value)
      }
      this.$emit('_change', newSelectedValues)
      this.emitChangeEvent(item)
    }
  }
}
</script>
