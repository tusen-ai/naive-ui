<markdown>
# 自定义颜色

这两个颜色看起来像毒蘑菇。
</markdown>

<template>
  <n-space align="center">
    <n-button color="#8a2be2">
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
      #8a2be2
    </n-button>
    <n-button color="#ff69b4">
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
      #ff69b4
    </n-button>
    <n-button ghost color="#8a2be2">
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
      #8a2be2
    </n-button>
    <n-button ghost color="#ff69b4">
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
      #ff69b4
    </n-button>
    <n-button text color="#8a2be2">
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
      #8a2be2
    </n-button>
    <n-button text color="#ff69b4">
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
      #ff69b4
    </n-button>
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
