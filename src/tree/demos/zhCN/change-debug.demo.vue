<markdown>
# Change data debug
</markdown>

<template>
  <n-tree
    default-expand-all
    :data="data"
    :watch-props="['defaultExpandedKeys']"
  />
  <n-button @click="addChildrenToKey2">
    add children to key 2
  </n-button>
  <n-button @click="moveChildrenOutside">
    move children to top
  </n-button>
</template>

<script lang="ts">
import { NTree, NButton } from 'naive-ui'
import { ref, defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  components: {
    NTree,
    NButton
  },
  setup () {
    const data = ref([
      { key: '1', label: '1', children: [{ key: '1-1', label: '1-1' }] },
      { key: '2', label: '2' }
    ])

    const addChildrenToKey2 = () => {
      data.value = [
        { key: '1', label: '1', children: [{ key: '1-1', label: '1-1' }] },
        { key: '2', label: '2', children: [{ key: '2-1', label: '2-1' }] }
      ]
    }

    const moveChildrenOutside = () => {
      data.value = [
        { key: '1', label: '1' },
        { key: '1-1', label: '1-1' }
      ]
    }

    return {
      data,
      addChildrenToKey2,
      moveChildrenOutside
    }
  }
})
</script>
