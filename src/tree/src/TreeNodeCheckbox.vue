<template>
  <span class="n-tree-node-checkbox">
    <n-checkbox
      :theme="NTree.syntheticTheme"
      :checked="value"
      @update:value="handleUpdateValue"
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
    },
    onCheck: {
      type: Function,
      default: undefined
    }
  },
  methods: {
    doCheck (value) {
      const {
        onCheck
      } = this
      if (onCheck) return onCheck(value)
    },
    handleUpdateValue (value) {
      this.doCheck(value)
    }
  }
}
</script>
