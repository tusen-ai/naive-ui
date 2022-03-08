<markdown>
# Addable debug
</markdown>

<template>
  <n-tabs type="card" addable @add="handleAdd">
    <n-tab
      v-for="item in items"
      :key="item.id"
      :name="item.name"
      :tab="item.name"
    />
  </n-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NTabs, NTab } from 'naive-ui'

export default defineComponent({
  name: 'App',
  components: {
    NTabs,
    NTab
  },
  setup () {
    const itemsRef = ref<{ id: string; name: string }[]>([])
    let i = 0
    return {
      handleAdd: () => {
        i += 1
        itemsRef.value.push({
          id: `${i}`,
          name: `name-${i}`
        })
      },
      items: itemsRef.value
    }
  }
})
</script>
