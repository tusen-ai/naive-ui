<markdown>
# 可清除

让输入值可以清除（当有值的时候）。
</markdown>

<template>
  <n-space vertical>
    <n-input type="text" placeholder="可以清除" clearable />
    <n-input type="password" placeholder="可以清除" clearable />
    <n-input type="textarea" placeholder="可以清除" round clearable />
    <n-input type="text" placeholder="自定义图标" round clearable>
      <template #clear-icon>
        <n-icon :component="TrashBinOutline" />
      </template>
    </n-input>
  </n-space>
</template>

<script lang="ts">
import { TrashBinOutline } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      TrashBinOutline
    }
  }
})
</script>
