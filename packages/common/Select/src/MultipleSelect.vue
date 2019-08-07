<template>
  <div
    ref="select"
    class="n-select"
    :class="{
      [`n-select--${size}-size`]: true,
      'n-select--disabled': disabled
    }"
    @click="handleActivatorClick"
    @keyup.up.prevent="handleActivatorKeyUpUp"
    @keyup.down.prevent="handleActivatorKeyUpDown"
    @keyup.enter="handleActivatorKeyUpEnter"
  >
    <div
      ref="activator"
      class="n-select-link"
      :class="{
        'n-select-link--active': active,
        'n-select-link--selected': selected || (active && pattern.length)
      }"
    >
      <div
        class="n-select-link__tags"
        :class="{
          'n-select-link__tags--selected': selected
        }"
      >
        <div
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
              @click.stop="toggleItem(item)"
            />
          </div>
          <div
            v-if="filterable && active"
            class="n-select-input-tag"
          >
            <input
              ref="inputTagInput"
              v-model="pattern"
              class="n-select-input-tag__input"
              @keydown.delete="handlePatternInputDelete"
              @input="handlePatternInput"
            >
            <span
              ref="inputTagMirror"
              class="n-select-input-tag__mirror"
            >{{ pattern ? pattern : '&nbsp;' }}</span>
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
      v-clickoutside="handleClickOutsideMenu"
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
              class="n-select-menu n-select-menu--multiple"
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
                    v-for="(item, index) in filteredItems"
                    ref="menuItems"
                    :key="item.value"
                    :data-index="index"
                    class="n-select-menu__item"
                    :class="{
                      'n-select-menu__item--selected':
                        isSelected(item)
                    }"
                    @click="toggleItem(item)"
                    @mousemove="showLightBarTop($event, item, index)"
                  >
                    {{ item.label }}
                  </div>
                  <div
                    v-if="pattern.length && !filteredItems.length"
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
import NIcon from '../../Icon/index'
import detachable from '../../../mixins/detachable'
import placeable from '../../../mixins/placeable'
import toggleable from '../../../mixins/toggleable'
import zindexable from '../../../mixins/zindexable'
import Scrollbar from '../../Scrollbar'
import clickoutside from '../../../directives/clickoutside'
import Emitter from '../../../mixins/emitter'

export default {
  name: 'NMultipleSelect',
  components: {
    NIcon,
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
      scrolling: false,
      pattern: '',
      pendingItem: null,
      pendingItemIndex: null
    }
  },
  computed: {
    filteredItems () {
      if (!this.filterable || !this.pattern.trim().length) return this.items
      return this.items.filter(item => this.patternMatched(item.label))
    },
    selected () {
      if (Array.isArray(this.value)) {
        const itemValues = new Set(this.items.map(item => item.value))
        return this.value.filter(value => itemValues.has(value)).length
      } else {
        return false
      }
    },
    valueItemMap () {
      const valueToItem = new Map()
      this.items.forEach(item => valueToItem.set(item.value, item))
      return valueToItem
    },
    selectedItems () {
      if (!Array.isArray(this.value)) return []
      return this.value.filter(value => this.valueItemMap.has(value)).map(value => this.valueItemMap.get(value))
    },
    clearedPattern () {
      return this.pattern.toLowerCase().trim()
    }
  },
  watch: {
    selectedItems (n) {
      if (this.formItem) {
        let vals = n.map(i => i.value)
        this.dispatch('NFormItem', 'on-form-change', vals)
      }
    },
    filteredItems () {
      this.$nextTick().then(() => {
        this.hideLightBar()
        this.updatePosition()
        this.$refs.scrollbar.updateParameters()
      })
    },
    value () {
      this.$nextTick().then(() => {
        this.updatePosition()
        if (this.$refs.scrollbar) {
          this.$refs.scrollbar.updateParameters()
        }
      })
    }
  },
  methods: {
    /**
     * @param {string} value
     */
    patternMatched (value) {
      try {
        return 1 + value.toString().toLowerCase().search(this.pattern.trim().toLowerCase())
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
    setPendingItem (item, index) {
      this.pendingItem = item
      this.pendingItemIndex = index
    },
    clearPendingItem () {
      this.pendingItem = null
      this.pendingItemIndex = null
    },
    showLightBarTop (e, item, index) {
      this.showLightBar = true
      this.lightBarTop = e.target.offsetTop
      this.setPendingItem(item, index)
    },
    hideLightBar (e) {
      this.showLightBar = false
      this.clearPendingItem()
    },
    isSelected (item) {
      if (!Array.isArray(this.value)) return false
      return 1 + this.value.findIndex(value => value === item.value)
    },
    handleClickOutsideMenu (e) {
      if (!this.$refs.activator.contains(e.target) && !this.scrolling) {
        this.deactivate()
      }
    },
    closeMenu () {
      this.deactivate()
    },
    handleActivatorClick () {
      if (this.disabled) return
      if (!this.active) {
        this.pattern = ''
        this.activate()
      } else {
        if (!this.filterable) {
          this.deactivate()
        }
      }
      if (this.filterable) {
        this.$nextTick().then(() => {
          this.$refs.inputTagInput.focus()
        })
      }
    },
    toggleItem (item) {
      if (this.disabled) return
      let newValue = []
      if (Array.isArray(this.value)) {
        const itemValues = new Set(this.items.map(item => item.value))
        newValue = this.value.filter(value => itemValues.has(value))
      }
      const index = newValue.findIndex(value => value === item.value)
      if (~index) {
        newValue.splice(index, 1)
        this.emitChangeEvent(item, false)
      } else {
        newValue.push(item.value)
        this.emitChangeEvent(item, true)
        this.pattern = ''
      }
      this.$nextTick().then(() => {
        if (this.filterable) {
          this.$refs.inputTagInput.focus()
        }
      })
      this.$emit('input', newValue)
    },
    handleMenuScrollStart () {
      this.scrolling = true
    },
    handleMenuScrollEnd () {
      window.setTimeout(() => {
        this.scrolling = false
      }, 0)
    },
    handlePatternInput () {
      this.$nextTick().then(() => {
        const textWidth = this.$refs.inputTagMirror.getBoundingClientRect().width
        this.$refs.inputTagInput.style.width = textWidth + 'px'
      })
    },
    handlePatternInputDelete (e) {
      if (!this.pattern.length) {
        const newValue = this.value
        if (Array.isArray(newValue)) {
          newValue.pop()
          this.$emit('input', newValue)
        }
      }
    },
    handleActivatorKeyUpEnter () {
      if (this.pendingItem) {
        this.toggleItem(this.pendingItem)
      }
    },
    handleActivatorKeyUpUp () {
      if (this.$refs.menuItems && this.$refs.menuItems.length && this.active) {
        if (!this.pendingItem) {
          this.showLightBarTop({ target: this.$refs.content.querySelector('[data-index="0"]') }, this.filteredItems[0], 0)
          this.$refs.scrollbar.scrollToElement(this.$refs.content.querySelector('[data-index="0"]'))
        } else {
          const newIndex = this.pendingItemIndex - 1 < 0 ? this.filteredItems.length - 1 : this.pendingItemIndex - 1
          this.showLightBarTop({ target: this.$refs.content.querySelector(`[data-index="${newIndex}"]`) }, this.filteredItems[newIndex], newIndex)
          this.$refs.scrollbar.scrollToElement(this.$refs.content.querySelector(`[data-index="${newIndex}"]`))
        }
      }
    },
    handleActivatorKeyUpDown () {
      if (this.$refs.menuItems && this.$refs.menuItems.length && this.active) {
        if (!this.pendingItem) {
          this.showLightBarTop({ target: this.$refs.content.querySelector('[data-index="0"]') }, this.filteredItems[0], 0)
          this.$refs.scrollbar.scrollToElement(this.$refs.content.querySelector('[data-index="0"]'))
        } else {
          const newIndex = this.filteredItems.length - 1 < this.pendingItemIndex + 1 ? 0 : this.pendingItemIndex + 1
          this.showLightBarTop({ target: this.$refs.content.querySelector(`[data-index="${newIndex}"]`) }, this.filteredItems[newIndex], newIndex)
          this.$refs.scrollbar.scrollToElement(this.$refs.content.querySelector(`[data-index="${newIndex}"]`))
        }
      }
    }
  }
}
</script>
