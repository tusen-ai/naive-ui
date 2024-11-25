<markdown>
# 点击标题
</markdown>

<script lang="ts">
import type { CollapseProps } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    const handleItemHeaderClick: CollapseProps['onItemHeaderClick'] = ({
      name,
      expanded
    }) => {
      message.info(`Name: ${name}, Expanded: ${expanded}`)
    }
    return {
      handleItemHeaderClick
    }
  }
})
</script>

<template>
  <n-collapse @item-header-click="handleItemHeaderClick">
    <n-collapse-item name="1">
      <template #header>
        青铜
      </template>
      <div>可以</div>
    </n-collapse-item>
    <n-collapse-item name="2">
      <template #header>
        白银
      </template>
      <div>很好</div>
    </n-collapse-item>
    <n-collapse-item name="3">
      <template #header>
        黄金
      </template>
      <div>真棒</div>
    </n-collapse-item>
  </n-collapse>
</template>
