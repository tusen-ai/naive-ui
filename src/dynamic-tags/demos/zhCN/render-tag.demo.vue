<markdown>
# 自定义渲染每一个 tag
</markdown>

<template>
  <n-dynamic-tags v-model:value="tags" :render-tag="renderTag" />
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { NTag } from 'naive-ui'

export default defineComponent({
  setup () {
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
