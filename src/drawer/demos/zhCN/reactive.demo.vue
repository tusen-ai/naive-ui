<markdown>
# 命令式 API

你可以使用 `useDrawer.create` 来打开一个抽屉。（请确保使用此 API 的组件被 `n-drawer-provider` 包含。）
</markdown>

<script lang="ts" setup>
import { NButton, useDrawer, useMessage } from 'naive-ui'
import { h } from 'vue'

const drawer = useDrawer()
const message = useMessage()

function showBasicDrawer() {
  const d = drawer.create({
    title: '基础抽屉',
    closable: true,
    width: 502,
    render: () => '这是抽屉的内容'
  })
  message.info('三秒钟后关闭')
  setTimeout(() => {
    d.destroy()
  }, 3000)
}

function showLeftDrawer() {
  drawer.create({
    title: '左侧抽屉',
    placement: 'left',
    closable: true,
    width: 502,
    render: () => '从左侧滑出的抽屉'
  })
}

function showTopDrawer() {
  drawer.create({
    title: '顶部抽屉',
    placement: 'top',
    closable: true,
    height: 300,
    render: () => '从顶部滑出的抽屉'
  })
}

function showBottomDrawer() {
  drawer.create({
    title: '底部抽屉',
    placement: 'bottom',
    closable: true,
    height: 300,
    render: () => '从底部滑出的抽屉'
  })
}

function showCustomDrawer() {
  const d = drawer.create({
    title: '自定义内容',
    closable: true,
    width: 400,
    render: () =>
      h('div', [
        h('p', '这是自定义渲染的内容'),
        h(
          NButton,
          { type: 'primary', onClick: () => d.destroy() },
          () => '关闭抽屉'
        )
      ]),
    footer: () =>
      h(NButton, { type: 'primary', onClick: () => d.destroy() }, () => '确定')
  })
}
</script>

<template>
  <n-flex>
    <NButton @click="showBasicDrawer">
      基础抽屉
    </NButton>
    <NButton @click="showLeftDrawer">
      左侧抽屉
    </NButton>
    <NButton @click="showTopDrawer">
      顶部抽屉
    </NButton>
    <NButton @click="showBottomDrawer">
      底部抽屉
    </NButton>
    <NButton @click="showCustomDrawer">
      自定义内容
    </NButton>
  </n-flex>
</template>
