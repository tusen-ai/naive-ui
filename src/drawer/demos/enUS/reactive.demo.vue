<markdown>
# Imperative API

You can use `useDrawer.create` to open a drawer. (Make sure the component using this API is wrapped by `n-drawer-provider`.)
</markdown>

<script lang="ts" setup>
import { NButton, useDrawer, useMessage } from 'naive-ui'
import { h } from 'vue'

const drawer = useDrawer()
const message = useMessage()

function showBasicDrawer() {
  const d = drawer.create({
    title: 'Basic Drawer',
    closable: true,
    render: () => 'This is the content of the drawer'
  })
  message.info('Will close in 3 seconds')
  setTimeout(() => {
    d.destroy()
  }, 3000)
}

function showLeftDrawer() {
  drawer.create({
    title: 'Left Drawer',
    placement: 'left',
    closable: true,
    render: () => 'Drawer slides from left'
  })
}

function showTopDrawer() {
  drawer.create({
    title: 'Top Drawer',
    placement: 'top',
    closable: true,
    height: 200,
    render: () => 'Drawer slides from top'
  })
}

function showBottomDrawer() {
  drawer.create({
    title: 'Bottom Drawer',
    placement: 'bottom',
    closable: true,
    height: 200,
    render: () => 'Drawer slides from bottom'
  })
}

function showCustomDrawer() {
  const d = drawer.create({
    title: 'Custom Content',
    closable: true,
    width: 400,
    render: () =>
      h('div', [
        h('p', 'This is custom rendered content'),
        h(
          NButton,
          { type: 'primary', onClick: () => d.destroy() },
          () => 'Close Drawer'
        )
      ]),
    footer: () =>
      h(NButton, { type: 'primary', onClick: () => d.destroy() }, () => 'OK')
  })
}
</script>

<template>
  <n-flex>
    <NButton @click="showBasicDrawer">
      Basic Drawer
    </NButton>
    <NButton @click="showLeftDrawer">
      Left Drawer
    </NButton>
    <NButton @click="showTopDrawer">
      Top Drawer
    </NButton>
    <NButton @click="showBottomDrawer">
      Bottom Drawer
    </NButton>
    <NButton @click="showCustomDrawer">
      Custom Content
    </NButton>
  </n-flex>
</template>
