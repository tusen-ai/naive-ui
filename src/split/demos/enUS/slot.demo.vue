<markdown>
# Slot
</markdown>

<script lang="ts">
import { SwapHorizontal as SwapHorizontalIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    SwapHorizontalIcon
  }
})
</script>

<template>
  <n-split
    direction="horizontal"
    style="height: 200px"
    :default-size="0.4"
    :resize-trigger-size="16"
    :min="0.25"
    :max="0.75"
  >
    <template #1>
      Pane 1
    </template>
    <template #2>
      Pane 2
    </template>
    <template #resize-trigger>
      <div
        :style="{
          height: '100%',
          backgroundColor: '#409eff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '8px',
        }"
      >
        <n-icon color="white" :size="16">
          <SwapHorizontalIcon />
        </n-icon>
      </div>
    </template>
  </n-split>
</template>
