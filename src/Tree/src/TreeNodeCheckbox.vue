<template>
  <span class="n-tree-node-checkbox">
    <n-checkbox
      :checked="value"
      @input="handleInput"
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
    handleInput (value) {
      this.$emit('check', value)
    }
  }
}
</script>
