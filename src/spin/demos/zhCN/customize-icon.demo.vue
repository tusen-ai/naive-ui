<markdown>
# 自定义图标
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Reload } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    Reload
  },
  setup() {
    return {
      show: ref(false)
    }
  }
})
</script>

<template>
  <n-spin :show="show">
    <template #icon>
      <n-icon>
        <Reload />
      </n-icon>
    </template>
  </n-spin>
</template>
