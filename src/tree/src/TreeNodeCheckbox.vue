<template>
  <span class="n-tree-node-checkbox">
    <n-checkbox
      :theme="'light'"
      :checked="checked"
      :indeterminate="indeterminate"
      @update:checked="handleUpdateValue"
    />
  </span>
</template>

<script>
import { defineComponent } from 'vue'
import { NCheckbox } from '../../checkbox'

export default defineComponent({
  name: 'NTreeNodeCheckbox',
  components: {
    NCheckbox
  },
  inject: {
    NTree: {
      default: null
    }
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    indeterminate: {
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
      const { onCheck } = this
      if (onCheck) return onCheck(value)
    },
    handleUpdateValue (value) {
      if (this.indeterminate) {
        this.doCheck(false)
      } else {
        this.doCheck(value)
      }
    }
  }
})
</script>
