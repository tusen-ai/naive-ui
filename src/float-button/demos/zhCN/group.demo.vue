<markdown>
  # 浮动按钮组

  可以任意组合元素，实现更多的功能。
</markdown>

<template>
  <div style="height: 200px; transform: translate(0)">
    <n-float-button-group
      :left="0"
      right="auto"
      :bottom="0"
      vertical
      background-color="lightgrey"
    >
      <n-button
        tertiary
        circle
        type="primary"
        :style="{ marginBottom: '20px' }"
      >
        <template #icon>
          <n-icon><cash-icon /></n-icon>
        </template>
      </n-button>
      <n-button tertiary circle type="info" :style="{ marginBottom: '20px' }">
        <template #icon>
          <n-icon><cash-icon /></n-icon>
        </template>
      </n-button>
      <n-button
        tertiary
        circle
        type="success"
        :style="{ marginBottom: '20px' }"
      >
        <n-icon><cash-icon /></n-icon>
      </n-button>
      <n-button tertiary circle type="warning">
        <template #icon>
          <n-icon><cash-icon /></n-icon>
        </template>
      </n-button>
    </n-float-button-group>

    <n-float-button-group :right="0" :bottom="0">
      <n-flex vertical>
        <n-button tertiary circle type="primary">
          <template #icon>
            <n-icon><cash-icon /></n-icon>
          </template>
        </n-button>
        <n-button tertiary circle type="info">
          <template #icon>
            <n-icon><cash-icon /></n-icon>
          </template>
        </n-button>
        <n-button tertiary circle type="success">
          <n-icon><cash-icon /></n-icon>
        </n-button>
        <n-button tertiary circle type="warning">
          <template #icon>
            <n-icon><cash-icon /></n-icon>
          </template>
        </n-button>
      </n-flex>
    </n-float-button-group>
  </div>
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
