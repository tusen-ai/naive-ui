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
        'is-active': active
      }"
    >
      <div
        v-if="selected"
        class="n-select-link__tags"
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
      </div><div
        v-else
        class="n-select-link__tags n-select-link__placeholder"
      >
        {{ placeholder }}
      </div>
      <div class="n-select-menu n-select-menu--multiple">
        <div
          v-for="item in items"
          :key="item.value"
          class="n-select-menu__item"
          :class="{
            'is-selected':
              isSelected(item)
          }"
          @click.stop="toggle(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <div
      v-else
      class="n-select-link"
      :class="{
        'is-active': active
      }"
    >
      <div
        v-if="selected"
        class="n-select-link__label"
      >
        {{ selectedValue }}
      </div>
      <div
        v-else
        class="n-select-link__label n-select-link__placeholder"
      >
        {{ placeholder }}
      </div>
      <div class="n-select-menu">
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
        >
          {{ item.label }}
        </div>
      </div>
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
    }
  },
  data () {
    return {
      active: false
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
  mounted () {
    document.addEventListener('click', this.nativeCloseSelect, true)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.nativeCloseSelect)
  },
  methods: {
    // test (e) {
    //   console.log('click')
    //   this.closeSelect(e)
    // },
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
      e.preventDefault()
    },
    closeSelect () {
      this.active = false
    },
    toggleSelect () {
      this.active = !this.active
    },
    select (item) {
      this.$emit('change', item.value)
      console.log(this.active)
      this.closeSelect()
      console.log(this.active)
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
