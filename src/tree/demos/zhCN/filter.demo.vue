<markdown>
# 搜索

树接受 `pattern` 和 `filter` 来完成搜索。
</markdown>

<template>
  <n-space vertical :size="12">
    <n-input v-model:value="pattern" placeholder="搜索" />
    <n-tree :pattern="pattern" :data="data" block-line />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TreeOption } from 'naive-ui'

function createData (level = 4, baseKey = ''): TreeOption[] | undefined {
  if (!level) return undefined
  return [0, 1].map((_, index) => {
    const key = '' + baseKey + level + index
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key)
    }
  })
}

function createLabel (level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}

export default defineComponent({
  setup () {
    return {
      data: createData(),
      pattern: ref('')
    }
  }
})
</script>
