<markdown>
# Addable debug
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NTab, NTabs } from 'naive-ui'

export default defineComponent({
  name: 'App',
  components: {
    NTabs,
    NTab
  },
  setup() {
    const itemsRef = ref<{ id: string, name: string }[]>([])
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

<template>
  <NTabs type="card" addable @add="handleAdd">
    <NTab
      v-for="item in items"
      :key="item.id"
      :name="item.name"
      :tab="item.name"
    />
  </NTabs>
</template>
