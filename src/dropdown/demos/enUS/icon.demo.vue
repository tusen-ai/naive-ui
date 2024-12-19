<markdown>
# Icon

Dropdown options can also have icons!
</markdown>

<script lang="ts">
import type { Component } from 'vue'
import {
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { defineComponent, h } from 'vue'

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
          label: 'Profile',
          key: 'profile',
          icon: renderIcon(UserIcon)
        },
        {
          label: 'Edit Profile',
          key: 'editProfile',
          icon: renderIcon(EditIcon)
        },
        {
          label: 'Logout',
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
    <n-button>User profile</n-button>
  </n-dropdown>
</template>
