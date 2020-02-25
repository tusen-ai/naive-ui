<template>
  <span class="n-tree-node-checkbox">
    <n-checkbox
      :checked="value"
      @change="handleChange"
    />
  </span>
</template>

<script>
import NCheckbox from '../../Checkbox'

export default {
  name: 'NTreeNodeCheckbox',
  components: {
    NCheckbox
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleChange (value) {
      this.$emit('check', value)
    }
  }
}
</script>
