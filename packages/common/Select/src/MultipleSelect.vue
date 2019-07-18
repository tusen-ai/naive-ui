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
        'n-select-link--active': active,
        'n-select-link--selected': selected
      }"
    >
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
      <div
        class="n-select-link__placeholder"
        :class="{
          'n-select-link__placeholder--verbose-transition': verboseTransition
        }"
      >
        {{ placeholder }}
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
            ref="contentInner"
            class="n-select-menu n-select-menu--multiple"
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
              v-for="item in items"
              :key="item.value"
              class="n-select-menu__item"
              :class="{
                'n-select-menu__item--selected':
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
    </div>
  </div>
</template>

<script>
import NIcon from '../../Icon/index'
import detachable from '../../../mixins/detachable'
import placeable from '../../../mixins/placeable'
import toggleable from '../../../mixins/toggleable'

export default {
  name: 'NMultipleSelect',
  components: {
    NIcon
  },
  mixins: [detachable, toggleable, placeable],
  model: {
    prop: 'selectedValue',
    event: 'input'
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
      if (Array.isArray(this.selectedValue)) {
        const itemValues = new Set(this.items.map(item => item.value))
        return this.selectedValue.filter(value => itemValues.has(value)).length
      } else {
        return false
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
      if (this.selectedItem !== null) {
        this.label = this.selectedItem.label
      } else {
        this.label = ''
      }
    },
    active (newValue) {
      if (newValue === true) {
        this.$nextTick().then(
          () => {
            document.addEventListener('click', this.nativeCloseMenu)
          }
        )
      } else {
        this.$nextTick().then(
          () => {
            document.removeEventListener('click', this.nativeCloseMenu)
          }
        )
      }
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
      if (!Array.isArray(this.selectedValue)) return false
      return 1 + this.selectedValue.findIndex(value => value === item.value)
    },
    nativeCloseMenu (e) {
      if (!this.$refs.select.contains(e.target)) {
        this.deactivate()
      }
    },
    closeMenu () {
      this.deactivate()
    },
    toggleMenu () {
      if (this.disabled) return
      this.toggle()
    },
    toggleItemInMultipleSelect (item) {
      if (this.disabled) return
      let newSelectedValues = []
      if (Array.isArray(this.selectedValue)) {
        const itemValues = new Set(this.items.map(item => item.value))
        newSelectedValues = this.selectedValue.filter(value => itemValues.has(value))
      }
      const index = newSelectedValues.findIndex(value => value === item.value)
      if (1 + index) {
        newSelectedValues.splice(index, 1)
        this.emitChangeEvent(item, false)
      } else {
        newSelectedValues.push(item.value)
        this.emitChangeEvent(item, true)
      }
      this.$emit('input', newSelectedValues)
      this.$nextTick().then(this.updatePosition)
    }
  }
}
</script>
