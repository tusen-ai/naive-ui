<markdown>
# Password
</markdown>

<template>
  <n-space vertical>
    <n-input
      type="password"
      show-password-on="mousedown"
      placeholder="Password"
      :maxlength="8"
    />
    <n-input
      type="password"
      show-password-on="click"
      placeholder="Custom Password Toggle Icon"
      :password-visible-icon="Eye"
      :password-invisible-icon="EyeOff"
      :maxlength="8"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Eye, EyeOff } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      Eye,
      EyeOff
    }
  }
})
</script>
