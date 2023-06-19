<markdown>
# 图标

在按钮上使用图标，可以使用 `render-icon` 属性或 `icon` 插槽。
</markdown>

<template>
  <n-space>
    <n-button secondary strong :render-icon="renderIcon">
      +100 元
    </n-button>
    <n-button icon-placement="right" secondary strong>
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
      +100 元
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { defineComponent, h } from 'vue'

export default defineComponent({
  components: {
    CashIcon
  },
  setup () {
    return {
      renderIcon () {
        return h(NIcon, null, {
          default: () => h(CashIcon)
        })
      }
    }
  }
})
</script>
