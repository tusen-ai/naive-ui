<markdown>
# 自定义图标
</markdown>

<template>
  <n-spin :show="show">
    <template #icon>
      <n-icon>
        <Reload />
      </n-icon>
    </template>
  </n-spin>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { Reload } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    Reload
  },
  setup () {
    return {
      show: ref(false)
    }
  }
})
</script>
