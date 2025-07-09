<markdown>
# 形状

按钮拥有不同的形状。
</markdown>

<script lang="ts" setup>
import { CashOutline as CashIcon } from '@vicons/ionicons5'
</script>

<template>
  <n-space>
    <n-button circle>
      <template #icon>
        <n-icon><CashIcon /></n-icon>
      </template>
    </n-button>
    <n-button round>
      圆角
    </n-button>
    <n-button>方</n-button>
  </n-space>
</template>
