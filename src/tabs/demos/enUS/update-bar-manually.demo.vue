<markdown>
# Update bar manually

Since `n-tabs` renders children directly, it can't understand your intention to update active tab. In some edge cases, you need to update bar position manually.
</markdown>

<template>
  <n-space vertical>
    <n-button @click="handleClick">
      Useless change
    </n-button>
    <n-tabs ref="tabsInstRef" v-model:value="value">
      <n-tab v-for="tab in tabs" :key="tab" :name="tab">
        I'm {{ tab }}
      </n-tab>
    </n-tabs>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue'
import { TabsInst } from 'naive-ui'

export default defineComponent({
  setup () {
    const tabsInstRef = ref<TabsInst | null>(null)
    const tabsRef = ref(['a', 'b'])
    const valueRef = ref('a')
    const handleClick = () => {
      tabsRef.value.reverse()
      valueRef.value = 'a'
      nextTick(() => tabsInstRef.value?.syncBarPosition())
    }
    return {
      tabsInstRef,
      tabs: tabsRef,
      value: valueRef,
      handleClick
    }
  }
})
</script>
