<markdown>
  # 虚拟列表

  一个虚拟列表.
</markdown>

<template>
  <n-virtual-list style="max-height: 240px" :item-size="23" :items="basicData">
    <template #default="{ item }">
      <div :key="item.key" style="height: 23px">
        <span> {{ item.value }}</span>
      </div>
    </template>
  </n-virtual-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup () {
    function createArray (length: number): number[] {
      const ret = []
      for (let i = 0; i < length; ++i) {
        ret.push(i)
      }
      return ret
    }

    const basicData = createArray(100000).map((_, i) => ({
      key: i,
      value: `item_${i}`
    }))

    return {
      basicData
    }
  }
})
</script>
