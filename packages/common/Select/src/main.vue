<template>
  <div
    class="n-select"
    :class="{ active: active }"
    @click="toggleSelect"
  >
    <div
      v-if="multiple"
      class="link"
    >
      <div
        v-if="selected"
        class="tags"
      >
        <div
          v-for="item in selectedItems"
          :key="item.value"
        >
          {{ item.value }}
        </div>
      </div><div
        v-else
        class="tags placeholder"
      >
        {{ placeholder }}
      </div>
      <div class="menu">
        <div
          v-for="item in items"
          :key="item.value"
          class="item"
          @click="toggle(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
    <div
      v-else
      class="link"
    >
      <div
        v-if="selected"
        class="label"
      >
        {{ selectedValue }}
      </div><div
        v-else
        class="label placeholder"
      >
        {{ placeholder }}
      </div>
      <div class="menu">
        <div
          v-for="item in items"
          :key="item.value"
          class="item"
          @click="select(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NSelect',
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
    }
  },
  data () {
    return {
      active: false,
      selected: false,
      selectedItems: [],
      selectedItemValues: new Set()
    }
  },
  methods: {
    toggleSelect () {
      this.active = !this.active
    },
    select (item) {
      this.$emit('change', item.value)
      this.selected = true
    },
    toggle (item) {
      const index = this.selectedItems.findIndex(selectedItem => selectedItem.value === item.value)
      if (1 + index) {
        this.selectedItems.splice(index, 1)
        this.selectedItemValues.delete(item.value)
      } else {
        this.selectedItems.push(item)
        this.selectedItemValues.add(item.value)
      }
      if (this.selectedItems.length) {
        this.selected = true
      } else {
        this.selected = false
      }
      this.$emit('change', this.selectedItems)
    }
  }
}
</script>
