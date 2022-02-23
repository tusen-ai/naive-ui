<markdown>
# Use vue-router

Usually you can use vue-router here to accomplish routing. You can render `label` as `<router-link />` to set route.
</markdown>

<template>
  <n-menu :options="menuOptions" />
</template>

<script lang="ts">
import { defineComponent, h, Component } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import {
  LaptopOutline as WorkIcon,
  LogOutOutline as HomeIcon
} from '@vicons/ionicons5'

function renderIcon (icon: Component) {
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
  setup () {
    return {
      menuOptions
    }
  }
})
</script>
