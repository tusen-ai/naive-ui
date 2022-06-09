<markdown>
# Icon

Use icon in tag.
</markdown>

<template>
  <n-space>
    <n-tag type="success">
      Checked
      <template #icon>
        <n-icon :component="CheckmarkCircle" />
      </template>
    </n-tag>
    <n-tag round :bordered="false" type="success">
      Checked
      <template #icon>
        <n-icon :component="CheckmarkCircle" />
      </template>
    </n-tag>
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CheckmarkCircle } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      CheckmarkCircle
    }
  }
})
</script>
