<markdown>
  # 忽略空数组

  为了适配不同的业务场景
  </markdown>

<template>
  <n-space vertical>
    <n-switch v-model:value="active">
      <template #checked>
        忽略
      </template>
      <template #unchecked>
        不忽略
      </template>
    </n-switch>
    <n-tree
      :ignore-empty-children="active"
      block-line
      :data="data"
      checkable
      expand-on-click
      selectable
      default-expand-all
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      active: ref(false),
      data: ref([
        {
          label: '1',
          key: '1',
          children: [
            { label: '1', key: '1-1', children: [] },
            { label: '2', key: '1-2', children: [] },
            { label: '3', key: '1-3', children: [] }
          ]
        }
      ])
    }
  }
})
</script>
