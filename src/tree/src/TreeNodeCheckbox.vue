<template>
  <span class="n-tree-node-checkbox">
    <n-checkbox
      :unstable-theme="NTree.mergedTheme.peers.Checkbox"
      :unstable-theme-overrides="NTree.mergedTheme.overrides.Checkbox"
      :checked="checked"
      :indeterminate="indeterminate"
      @update:checked="handleUpdateValue"
    />
  </span>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { NCheckbox } from '../../checkbox'
import type { TreeInjection } from './Tree'

export default defineComponent({
  name: 'NTreeNodeCheckbox',
  components: {
    NCheckbox
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
  setup (props) {
    const NTree = inject<TreeInjection>('NTree')
    function doCheck (value: boolean) {
      const { onCheck } = props
      if (onCheck) return onCheck(value)
    }
    function handleUpdateValue (value: boolean) {
      if (props.indeterminate) {
        doCheck(false)
      } else {
        doCheck(value)
      }
    }
    return {
      handleUpdateValue,
      NTree
    }
  }
})
</script>
