<markdown>
# Debug
</markdown>

<script lang="ts" setup>
import type { MenuOption } from 'naive-ui'
import type { Component } from 'vue'
import { BookOutline as BookIcon } from '@vicons/ionicons5'
import { NButton, NIcon, useMessage } from 'naive-ui'
import { h } from 'vue'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: 'Hear the Wind Sing',
    key: 'hear-the-wind-sing',
    extra: () => h(NButton, {}, () => ' debug test'),
    icon: renderIcon(BookIcon)
  },
  {
    label: 'Pinball 1973',
    key: 'pinball-1973',
    extra: () => h(NButton, {}, () => 'debug 1937'),
    children: [
      {
        label: 'Rat',
        extra: '24',
        key: 'rat'
      }
    ]
  }
]

const message = useMessage()
const defaultExpandedKeys = ['dance-dance-dance', 'food']

function handleUpdateExpandedKeys(value: string[]) {
  message.info(`[onUpdate:expandedKeys]: ${JSON.stringify(value)}`)
}
</script>

<template>
  <n-menu
    :options="menuOptions"
    :default-expanded-keys="defaultExpandedKeys"
    @update:expanded-keys="handleUpdateExpandedKeys"
  />
</template>
