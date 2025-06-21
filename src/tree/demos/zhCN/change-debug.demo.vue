<markdown>
# Change data debug
</markdown>

<script lang="ts" setup>
import { NButton, NTree } from 'naive-ui'
import { ref } from 'vue'

const data = ref([
  { key: '1', label: '1', children: [{ key: '1-1', label: '1-1' }] },
  { key: '2', label: '2' }
])

function addChildrenToKey2() {
  data.value = [
    { key: '1', label: '1', children: [{ key: '1-1', label: '1-1' }] },
    { key: '2', label: '2', children: [{ key: '2-1', label: '2-1' }] }
  ]
}

function moveChildrenOutside() {
  data.value = [
    { key: '1', label: '1' },
    { key: '1-1', label: '1-1' }
  ]
}
</script>

<template>
  <NTree
    default-expand-all
    :data="data"
    :watch-props="['defaultExpandedKeys']"
  />
  <NButton @click="addChildrenToKey2">
    add children to key 2
  </NButton>
  <NButton @click="moveChildrenOutside">
    move children to top
  </NButton>
</template>
