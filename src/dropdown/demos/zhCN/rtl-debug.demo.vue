<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import type { DropdownOption } from 'naive-ui'
import type { Component } from 'vue'
import {
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon
} from '@vicons/ionicons5'
import { NIcon, unstableDropdownRtl } from 'naive-ui'
import { h, ref } from 'vue'

function renderIcon(icon: Component) {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const rtlEnabled = ref(false)
const rtlStyles = [unstableDropdownRtl]

const options: DropdownOption[] = [
  {
    label: '用户资料',
    key: 'profile',
    icon: renderIcon(UserIcon)
  },
  {
    label: '编辑资料',
    key: 'editProfile',
    icon: renderIcon(EditIcon),
    children: [
      {
        label: '子项目 1',
        key: 'subitem-1'
      },
      {
        label: '子项目 2',
        key: 'subitem-2'
      }
    ]
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogoutIcon)
  }
]
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-dropdown :options="options">
        <n-button>用户菜单</n-button>
      </n-dropdown>
    </n-config-provider>
  </n-space>
</template>
