<markdown>
# Addable debug
</markdown>

<script lang="ts" setup>
import { NTab, NTabs } from 'naive-ui'
import { ref } from 'vue'

const itemsRef = ref<{ id: string, name: string }[]>([])
let i = 0

function handleAdd() {
  i += 1
  itemsRef.value.push({
    id: `${i}`,
    name: `name-${i}`
  })
}

const items = itemsRef.value
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
