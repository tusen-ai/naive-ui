<markdown>
# 使用 vue-router

你可以在这个地方配合 vue-router 完成路由。通过将 `label` 渲染为 `<router-link />` 来改变路由。
</markdown>

<script lang="ts">
import type { MenuOption } from 'naive-ui'
import type { Component } from 'vue'
import {
  LogOutOutline as HomeIcon,
  LaptopOutline as WorkIcon
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'home',
            params: {
              lang: 'zh-CN'
            }
          }
        },
        { default: () => '回家' }
      ),
    key: 'go-back-home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/zh-CN/os-theme/components/code'
          }
        },
        { default: () => '上班' }
      ),
    key: 'go-to-work',
    icon: renderIcon(WorkIcon)
  }
]

export default defineComponent({
  setup() {
    return {
      menuOptions
    }
  }
})
</script>

<template>
  <n-menu :options="menuOptions" />
</template>
