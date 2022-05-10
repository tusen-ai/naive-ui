<markdown>
# 形状

按钮拥有不同的形状。
</markdown>

<template>
  <n-space>
    <n-button circle>
      <template #icon>
        <n-icon><cash-icon /></n-icon>
      </template>
    </n-button>
    <n-button round>
      圆角
    </n-button>
    <n-button>方</n-button>
  </n-space>
</template>

<script lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    CashIcon
  }
})
</script>
