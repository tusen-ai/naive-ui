<markdown>
# 按钮组

可以把几个按钮结合成按钮组。
</markdown>

<template>
  <n-space>
    <n-button-group vertical>
      <n-button round>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        活着
      </n-button>
      <n-button ghost>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        不多
      </n-button>
      <n-button>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        不少
      </n-button>
    </n-button-group>
    <n-button-group vertical size="large">
      <n-button>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        幸福
      </n-button>
      <n-button>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        刚好
      </n-button>
      <n-button ghost round>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        够用
      </n-button>
    </n-button-group>
    <n-button-group size="small">
      <n-button type="default" round>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        活着
      </n-button>
      <n-button type="default">
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        其实
      </n-button>
      <n-button type="default">
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        很好
      </n-button>
    </n-button-group>
    <n-button-group>
      <n-button ghost>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        再吃
      </n-button>
      <n-button ghost>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        一颗
      </n-button>
      <n-button round>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        苹果
      </n-button>
    </n-button-group>
  </n-space>
</template>

<script lang="ts">
import { LogInOutline as LogInIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    LogInIcon
  }
})
</script>
