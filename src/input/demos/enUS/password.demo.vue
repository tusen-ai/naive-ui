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

<script lang="ts">
import { defineComponent } from 'vue'
import { GlassesOutline, Glasses } from '@vicons/ionicons5'

export default defineComponent({
  setup () {
    return {
      GlassesOutline,
      Glasses
    }
  }
})
</script>
