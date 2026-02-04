<markdown>
# 节点操作

使用 `getNode`、`remove`、`append`、`insertBefore`、`insertAfter` 方法来操作节点。
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
      label: '节点 1',
      children: [
        {
          key: 2,
          label: '节点 1-1'
        },
        {
          key: 3,
          label: '节点 1-2'
        }
      ]
    },
    {
      key: 4,
      label: '节点 2',
      children: [
        {
          key: 5,
          label: '节点 2-1'
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
    message.warning('请先选择一个节点')
    return
  }
  const node = treeRef.value?.getNode(selectedKey)
  if (node) {
    message.success(`获取到节点: ${node.label}`)
  }
  else {
    message.error('节点未找到')
  }
}

function handleRemove() {
  const selectedKey = selectedKeysRef.value[0]
  if (selectedKey === undefined) {
    message.warning('请先选择一个节点')
    return
  }
  treeRef.value?.remove(selectedKey)
  selectedKeysRef.value = []
  message.success('节点已删除')
}

function handleAppendToRoot() {
  const newNode: TreeOption = {
    key: ++id,
    label: `新节点 ${id}`
  }
  treeRef.value?.append(newNode)
  message.success(`已添加节点到根节点: ${newNode.label}`)
}

function handleAppendToSelected() {
  const selectedKey = selectedKeysRef.value[0]
  if (selectedKey === undefined) {
    message.warning('请先选择一个节点')
    return
  }
  const newNode: TreeOption = {
    key: ++id,
    label: `新节点 ${id}`
  }
  treeRef.value?.append(newNode, selectedKey)
  // 展开父节点
  if (!expandedKeysRef.value.includes(selectedKey)) {
    expandedKeysRef.value = [...expandedKeysRef.value, selectedKey]
  }
  message.success(`已添加子节点: ${newNode.label}`)
}

function handleInsertBefore() {
  const selectedKey = selectedKeysRef.value[0]
  if (selectedKey === undefined) {
    message.warning('请先选择一个节点')
    return
  }
  const newNode: TreeOption = {
    key: ++id,
    label: `新节点 ${id}`
  }
  treeRef.value?.insertBefore(newNode, selectedKey)
  message.success(`已在选中节点前插入: ${newNode.label}`)
}

function handleInsertAfter() {
  const selectedKey = selectedKeysRef.value[0]
  if (selectedKey === undefined) {
    message.warning('请先选择一个节点')
    return
  }
  const newNode: TreeOption = {
    key: ++id,
    label: `新节点 ${id}`
  }
  treeRef.value?.insertAfter(newNode, selectedKey)
  message.success(`已在选中节点后插入: ${newNode.label}`)
}

function handleReset() {
  dataRef.value = createData()
  expandedKeysRef.value = [1, 4]
  selectedKeysRef.value = []
  id = 100
  message.success('已重置')
}
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-button @click="handleGetNode">
        获取节点
      </n-button>
      <n-button @click="handleRemove">
        删除节点
      </n-button>
      <n-button @click="handleAppendToRoot">
        添加到根
      </n-button>
      <n-button @click="handleAppendToSelected">
        添加子节点
      </n-button>
      <n-button @click="handleInsertBefore">
        前面插入
      </n-button>
      <n-button @click="handleInsertAfter">
        后面插入
      </n-button>
      <n-button @click="handleReset">
        重置
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
