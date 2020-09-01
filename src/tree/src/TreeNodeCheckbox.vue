<template>
  <span class="n-tree-node-checkbox">
    <n-checkbox
      :theme="NTree.syntheticTheme"
      :checked="value"
      @change="handleChange"
    />
  </span>
</template>

<script>
import NCheckbox from '../../checkbox'

export default {
  name: 'NTreeNodeCheckbox',
  inject: {
    NTree: {
      default: null
    }
  },
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
