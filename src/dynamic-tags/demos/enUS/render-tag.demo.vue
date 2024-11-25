<markdown>
# Custom render for each tag
</markdown>

<script lang="ts">
import { NTag } from 'naive-ui'
import { defineComponent, h, ref } from 'vue'

export default defineComponent({
  setup() {
    const tagsRef = ref(['teacher', 'programmer'])
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
