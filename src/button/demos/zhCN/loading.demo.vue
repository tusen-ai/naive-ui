<markdown>
# 加载中

按钮有加载状态。
</markdown>

<script lang="ts" setup>
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { ref } from 'vue'

const loading = ref(false)
function handleClick() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <n-space>
    <n-button :loading="loading" @click="handleClick">
      <template #icon>
        <n-icon>
          <CashIcon />
        </n-icon>
      </template>
      点我
    </n-button>
    <n-button :loading="loading" @click="handleClick">
      点我
    </n-button>
  </n-space>
</template>
