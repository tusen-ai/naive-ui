<markdown>
# Use vue-router

Usually you can use vue-router here to accomplish routing. You can render `label` as `<router-link />` to set route.
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
        { default: () => 'Go Home' }
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
        { default: () => 'Go to work' }
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
