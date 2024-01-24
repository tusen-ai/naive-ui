<markdown>
  # 基础用法

  跟 BackTop 很像
  </markdown>

<template>
  <div id="test" style="height: 200px">
    <n-float-button to="#test" badge>
      <n-badge :value="9">
        <n-icon :size="24">
          <cash-icon />
        </n-icon>
      </n-badge>
    </n-float-button>
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
