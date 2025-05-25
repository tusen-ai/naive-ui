<markdown>
# 图标

在按钮上使用图标，可以使用 `render-icon` 属性或 `icon` 插槽。
</markdown>

<script lang="ts" setup>
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { h } from 'vue'

function renderIcon() {
  return h(NIcon, null, {
    default: () => h(CashIcon)
  })
}
</script>

<template>
  <n-space>
    <n-button secondary strong :render-icon="renderIcon">
      +100 元
    </n-button>
    <n-button icon-placement="right" secondary strong>
      <template #icon>
        <NIcon>
          <CashIcon />
        </NIcon>
      </template>
      +100 元
    </n-button>
  </n-space>
</template>
