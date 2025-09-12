<markdown>
# Icon

Icons can be used in buttons. You can use `render-icon` prop or `icon` slot.
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
    <n-button :render-icon="renderIcon">
      +100$
    </n-button>
    <n-button icon-placement="right">
      <template #icon>
        <NIcon>
          <CashIcon />
        </NIcon>
      </template>
      +100$
    </n-button>
  </n-space>
</template>
