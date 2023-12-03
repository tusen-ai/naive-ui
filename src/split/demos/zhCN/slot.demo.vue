<markdown>
# 插槽

</markdown>

<template>
  <n-split direction="horizontal" style="height: 200px">
    <template #first>
      <div :style="{ height: '100%' }">
        Pane 1
      </div>
    </template>

    <template #second>
      <div :style="{ height: '100%' }">
        Pane 2
      </div>
    </template>

    <template #resize-trigger>
      <div
        :style="{
          height: '100%',
          width: '16px',
          backgroundColor: '#409eff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }"
      >
        <n-icon color="white" :size="18">
          <swap-horizontal-icon />
        </n-icon>
      </div>
    </template>
  </n-split>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SwapHorizontal as SwapHorizontalIcon } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    SwapHorizontalIcon
  }
})
</script>
