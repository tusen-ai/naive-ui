<markdown>
# Update bar manually

Since `n-tabs` renders children directly, it can't understand your intention to update active tab. In some edge cases, you need to update bar position manually.
</markdown>

<template>
  <n-space vertical>
    <n-space>
      <n-button @click="handleClick">
        Useless change
      </n-button>
      <n-button @click="switchTabs">
        Switch tabs
      </n-button>
    </n-space>
    <n-tabs ref="tabsInstRef" v-model:value="value">
      <n-tab v-for="tab in tabs" :key="tab" :name="tab">
        I'm {{ tab }}
      </n-tab>
    </n-tabs>
    <n-tabs v-model:value="value">
      <n-tab v-for="tab in otherTabs" :key="tab" :name="tab">
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
    const otherTabsRef = ref(['c', 'd'])
    const valueRef = ref('a')
    const handleClick = () => {
      tabsRef.value.reverse()
      valueRef.value = 'a'
      nextTick(() => tabsInstRef.value?.syncBarPosition())
    }
    const switchTabs = () => {
      if (tabsRef.value.includes(valueRef.value)) {
        valueRef.value = 'c'
      } else {
        valueRef.value = 'a'
      }
    }
    return {
      tabsInstRef,
      tabs: tabsRef,
      otherTabs: otherTabsRef,
      value: valueRef,
      handleClick,
      switchTabs
    }
  }
})
</script>
