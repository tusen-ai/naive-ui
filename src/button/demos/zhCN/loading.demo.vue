<markdown>
# 加载中

按钮有加载状态。
</markdown>

<template>
  <n-space>
    <n-button :loading="loading" @click="handleClick">
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
      点我
    </n-button>
    <n-button :loading="loading" @click="handleClick">
      点我
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    CashIcon
  },
  setup () {
    const loadingRef = ref(false)
    return {
      handleClick () {
        loadingRef.value = true
        setTimeout(() => {
          loadingRef.value = false
        }, 2000)
      },
      loading: loadingRef
    }
  }
})
</script>
