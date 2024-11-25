<markdown>
# Password
</markdown>

<script lang="ts">
import { Glasses, GlassesOutline } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      GlassesOutline,
      Glasses
    }
  }
})
</script>

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
      :maxlength="8"
    >
      <template #password-visible-icon>
        <n-icon :size="16" :component="GlassesOutline" />
      </template>
      <template #password-invisible-icon>
        <n-icon :size="16" :component="Glasses" />
      </template>
    </n-input>
  </n-space>
</template>
