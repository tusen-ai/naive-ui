<markdown>
# 可清除

让输入值可以清除（当有值的时候）。
</markdown>

<script lang="ts" setup>
import { TrashBinOutline } from '@vicons/ionicons5'
</script>

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
