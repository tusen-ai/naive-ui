<markdown>
# Loading

Buttons can have loading states.
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
      Click Me
    </n-button>
    <n-button :loading="loading" icon-placement="left" @click="handleClick">
      Click Me
    </n-button>
  </n-space>
</template>
