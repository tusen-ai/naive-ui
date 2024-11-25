<markdown>
# 自定义渲染每一个 tag
</markdown>

<script lang="ts">
import { NTag } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

export default defineComponent({
  setup() {
    const tagsRef = ref(['教师', '程序员'])
    return {
      tags: tagsRef,
      renderTag: (tag: string, index: number) => {
        return h(
          NTag,
          {
            type: index < 3 ? 'success' : 'error',
            disabled: index > 3,
            closable: true,
            onClose: () => {
              tagsRef.value.splice(index, 1)
            }
          },
          {
            default: () => tag
          }
        )
      }
    }
  }
})
</script>

<template>
  <n-dynamic-tags v-model:value="tags" :render-tag="renderTag" />
</template>
