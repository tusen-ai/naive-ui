<markdown>
# Node Operations

Use `getNode`, `remove`, `append`, `insertBefore`, `insertAfter` methods to manipulate nodes.
</markdown>

<script lang="ts" setup>
import type { TreeInst, TreeOption } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()

const treeRef = ref<TreeInst | null>(null)

let id = 100

function createData(): TreeOption[] {
  return [
    {
      key: 1,
      label: 'Node 1',
      children: [
        {
          key: 2,
          label: 'Node 1-1'
        },
        {
          key: 3,
          label: 'Node 1-2'
        }
      ]
    },
    {
      key: 4,
      label: 'Node 2',
      children: [
        {
          key: 5,
          label: 'Node 2-1'
        }
      ]
    }
  ]
}

const dataRef = ref(createData())
const expandedKeysRef = ref<number[]>([1, 4])
const selectedKeysRef = ref<number[]>([])

function handleGetNode() {
  const selectedKey = selectedKeysRef.value[0]
  if (selectedKey === undefined) {
    message.warning('Please select a node first')
    return
  }
  const node = treeRef.value?.getNode(selectedKey)
  if (node) {
    message.success(`Got node: ${node.label}`)
  }
  else {
    message.error('Node not found')
  }
}

function handleRemove() {
  const selectedKey = selectedKeysRef.value[0]
  if (selectedKey === undefined) {
    message.warning('Please select a node first')
    return
  }
  treeRef.value?.remove(selectedKey)
  selectedKeysRef.value = []
  message.success('Node removed')
}

function handleAppendToRoot() {
  const newNode: TreeOption = {
    key: ++id,
    label: `New Node ${id}`
  }
  treeRef.value?.append(newNode)
  message.success(`Appended to root: ${newNode.label}`)
}

function handleAppendToSelected() {
  const selectedKey = selectedKeysRef.value[0]
  if (selectedKey === undefined) {
    message.warning('Please select a node first')
    return
  }
  const newNode: TreeOption = {
    key: ++id,
    label: `New Node ${id}`
  }
  treeRef.value?.append(newNode, selectedKey)
  // Expand the parent node
  if (!expandedKeysRef.value.includes(selectedKey)) {
    expandedKeysRef.value = [...expandedKeysRef.value, selectedKey]
  }
  message.success(`Appended child node: ${newNode.label}`)
}

function handleInsertBefore() {
  const selectedKey = selectedKeysRef.value[0]
  if (selectedKey === undefined) {
    message.warning('Please select a node first')
    return
  }
  const newNode: TreeOption = {
    key: ++id,
    label: `New Node ${id}`
  }
  treeRef.value?.insertBefore(newNode, selectedKey)
  message.success(`Inserted before selected: ${newNode.label}`)
}

function handleInsertAfter() {
  const selectedKey = selectedKeysRef.value[0]
  if (selectedKey === undefined) {
    message.warning('Please select a node first')
    return
  }
  const newNode: TreeOption = {
    key: ++id,
    label: `New Node ${id}`
  }
  treeRef.value?.insertAfter(newNode, selectedKey)
  message.success(`Inserted after selected: ${newNode.label}`)
}

function handleReset() {
  dataRef.value = createData()
  expandedKeysRef.value = [1, 4]
  selectedKeysRef.value = []
  id = 100
  message.success('Reset')
}
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-button @click="handleGetNode">
        Get Node
      </n-button>
      <n-button @click="handleRemove">
        Remove
      </n-button>
      <n-button @click="handleAppendToRoot">
        Append to Root
      </n-button>
      <n-button @click="handleAppendToSelected">
        Append Child
      </n-button>
      <n-button @click="handleInsertBefore">
        Insert Before
      </n-button>
      <n-button @click="handleInsertAfter">
        Insert After
      </n-button>
      <n-button @click="handleReset">
        Reset
      </n-button>
    </n-space>
    <n-tree
      ref="treeRef"
      block-line
      :data="dataRef"
      :expanded-keys="expandedKeysRef"
      :selected-keys="selectedKeysRef"
      @update:expanded-keys="expandedKeysRef = $event"
      @update:selected-keys="selectedKeysRef = $event"
    />
  </n-space>
</template>
