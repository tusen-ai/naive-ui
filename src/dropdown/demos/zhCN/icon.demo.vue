<markdown>
# 图标
</markdown>

<script lang="ts">
import { defineComponent, h } from 'vue'
import type { Component } from 'vue'
import { NIcon } from 'naive-ui'
import {
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon
} from '@vicons/ionicons5'

function renderIcon(icon: Component) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

export default defineComponent({
  setup() {
    return {
      options: [
        {
          label: '用户资料',
          key: 'profile',
          icon: renderIcon(UserIcon)
        },
        {
          label: '编辑用户资料',
          key: 'editProfile',
          icon: renderIcon(EditIcon)
        },
        {
          label: '退出登录',
          key: 'logout',
          icon: renderIcon(LogoutIcon)
        }
      ]
    }
  }
})
</script>

<template>
  <n-dropdown :options="options">
    <n-button>用户资料</n-button>
  </n-dropdown>
</template>
