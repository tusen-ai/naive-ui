<template>
  <div
    ref="select"
    class="n-select"
    :class="{
      [`n-select--${size}-size`]: true
    }"
    @click="toggleSelect"
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
              @click.stop="toggle(item)"
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
              @click.stop="toggle(item)"
            />
          </div>
        </div>
      </div>
      <transition name="n-select-menu--transition">
        <div
          v-if="active"
          class="n-select-menu n-select-menu--multiple"
          @mouseleave="removeLightBar"
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
            @click.stop="toggle(item)"
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
        <span v-if="selected">{{ selectedValue }}</span>
        <span
          v-else
          class="n-select-link-label__placeholder"
        >{{ placeholder }}</span>
      </div>
      <transition name="n-select-menu--transition">
        <div
          v-if="active"
          class="n-select-menu"
          @mouseleave="removeLightBar"
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
                selectedValue ===
                item.value
            }"
            @click.stop="select(item)"
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
import NIcon from '../../Icon/index'

export default {
  name: 'NSelect',
  components: {
    NIcon
  },
  model: {
    prop: 'selectedValue',
    event: 'change'
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
    }
  },
  data () {
    return {
      active: false,
      lightBarTop: null,
      showLightBar: false
    }
  },
  computed: {
    selected () {
      if (Array.isArray(this.selectedValue)) {
        return this.selectedValue.length !== 0
      }
      if (this.selectedValue !== null) {
        return true
      } else {
        return false
      }
    },
    selectedItems () {
      const selectedValues = new Set(this.selectedValue)
      return this.items.filter(item => selectedValues.has(item.value))
    }
  },
  watch: {
    active (newValue) {
      if (newValue === true) {
        this.$nextTick().then(
          () => {
            document.addEventListener('click', this.nativeCloseSelect)
          }
        )
      } else {
        this.$nextTick().then(
          () => {
            document.removeEventListener('click', this.nativeCloseSelect)
          }
        )
      }
    }
  },
  beforeDestroy () {
    document.removeEventListener('click', this.nativeCloseSelect)
  },
  methods: {
    // test (e) {
    //   console.log('click')
    //   this.closeSelect(e)
    // },
    showLightBarTop (e) {
      this.showLightBar = true
      this.lightBarTop = e.target.offsetTop
    },
    removeLightBar (e) {
      this.showLightBar = false
    },
    isSelected (item) {
      if (this.multiple) {
        return 1 + this.selectedValue.findIndex(value => value === item.value)
      } else {
        return item.value === this.selectedValue
      }
    },
    nativeCloseSelect (e) {
      if (!this.$refs.select.contains(e.target)) {
        this.active = false
      }
    },
    closeSelect () {
      this.active = false
    },
    toggleSelect () {
      this.active = !this.active
    },
    select (item) {
      this.$emit('change', item.value)
      this.closeSelect()
    },
    toggle (item) {
      const index = this.selectedValue.findIndex(value => value === item.value)
      if (1 + index) {
        const selectedValue = this.selectedValue
        selectedValue.splice(index, 1)
        this.$emit('change', selectedValue)
      } else {
        const selectedValue = this.selectedValue.concat([item.value])
        this.$emit('change', selectedValue)
      }
    }
  }
}
</script>
