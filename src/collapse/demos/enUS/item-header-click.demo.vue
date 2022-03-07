<markdown>
# Click on item header
</markdown>

<template>
  <n-collapse @item-header-click="handleItemHeaderClick">
    <n-collapse-item name="1">
      <template #header>
        Bronze
      </template>
      <div>Okay</div>
    </n-collapse-item>
    <n-collapse-item name="2">
      <template #header>
        Silver
      </template>
      <div>Good</div>
    </n-collapse-item>
    <n-collapse-item name="3">
      <template #header>
        Gold
      </template>
      <div>Excellent</div>
    </n-collapse-item>
  </n-collapse>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'
import type { CollapseProps } from 'naive-ui'

export default defineComponent({
  setup () {
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
