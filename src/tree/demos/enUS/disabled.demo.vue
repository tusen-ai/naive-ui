<markdown>
# Disabled nodes
</markdown>

<template>
  <n-tree
    :data="data"
    block-line
    checkable
    default-expand-all
    cascade
    :default-checked-keys="['1-1']"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      data: [
        {
          key: '0',
          label: '0',
          children: [
            {
              key: '0-0',
              label: '0-0'
            },
            {
              disabled: true,
              key: '0-1',
              label: '0-1',
              children: [
                {
                  label: '0-1-0',
                  key: '0-1-0'
                },
                {
                  label: '0-1-1',
                  key: '0-1-1'
                }
              ]
            }
          ]
        },
        {
          key: '1',
          label: '1',
          children: [
            {
              key: '1-0',
              label: '1-0'
            },
            {
              checkboxDisabled: true,
              key: '1-1',
              label: '1-1',
              children: [
                {
                  label: '1-1-0',
                  key: '1-1-0'
                },
                {
                  label: '1-1-1',
                  key: '1-1-1'
                }
              ]
            }
          ]
        }
      ]
    }
  }
})
</script>
