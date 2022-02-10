<markdown>
# 文本按钮

长得就像文本。
</markdown>

<template>
  <n-button text>
    <template #icon>
      <n-icon>
        <train-icon />
      </n-icon>
    </template>
    那车头依然吐着烟
  </n-button>
</template>

<script lang="ts">
import { TrainOutline as TrainIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    TrainIcon
  }
})
</script>
