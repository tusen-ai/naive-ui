<markdown>
  # 浮动按钮组

  可以任意组合元素，实现更多的功能。
</markdown>

<script lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    CashIcon
  }
})
</script>

<template>
  <n-flex align="flex-start">
    <n-float-button-group shape="square" position="relative">
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
    </n-float-button-group>
    <n-float-button-group position="relative">
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
    </n-float-button-group>
  </n-flex>
</template>
