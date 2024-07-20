<markdown>
# 图标

我喜欢用图标当头像。
</markdown>

<script lang="ts">
import { MdCash } from '@vicons/ionicons4'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    MdCash
  }
})
</script>

<template>
  <n-avatar>
    <n-icon>
      <MdCash />
    </n-icon>
  </n-avatar>
</template>
