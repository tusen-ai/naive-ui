<markdown>
  # Basic size.
</markdown>

<template>
  <n-virtual-list
    style="max-height: 240px"
    :item-size="23"
    :items="basicData"
    item-resizable
  >
    <template #default="{ item }">
      <div :key="item.key" style="min-height;: 23px">
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

    const basicData = createArray(10000).map((_, i) => ({
      key: i,
      value: i
    }))

    return {
      basicData
    }
  }
})
</script>
