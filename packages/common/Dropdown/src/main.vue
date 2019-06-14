<template>
  <div
    class="n-dropdown"
    :class="{ active: active }"
    @click="toggleDropdown"
  >
    <div class="link">
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
  name: 'NDropdown',
  model: {
    prop: 'selectedValue',
    event: 'change'
  },
  props: {
    items: {
      type: Array,
      default: () => [
        {
          label: 'Artifactory',
          value: 'Artifactory'
        },
        {
          label: 'Registry',
          value: 'Registry'
        },
        {
          label: 'Public',
          value: 'Public'
        },
        {
          label: 'Custom',
          value: 'Custom'
        }
      ]
    },
    selectedValue: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: 'Please Select'
    }
  },
  data () {
    return {
      active: false,
      selected: false
    }
  },
  methods: {
    toggleDropdown () {
      this.active = !this.active
    },
    select (item) {
      this.$emit('change', item.value)
      this.selected = true
    }
  }
}
</script>
