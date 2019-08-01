<template>
  <div
    :key="data.value"
    class="n-cascader-menu__item"
    :class="itemClass"
  >
    {{ data.label }}
  </div>
</template>
<script>
export default {
  name: 'CasItem',
  props: {
    data: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    itemClass () {
      let val = ''
      if (this.data.children) {
        val = 'n-cascader-menu__item-next'
      } else if (this.selected) {
        val = 'n-cascader-menu__item--selected'
      }
      return val
    }
  }
}
</script>
