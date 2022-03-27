<markdown>
# 密码
</markdown>

<template>
  <n-space>
    <n-input
      type="password"
      show-password-on="mousedown"
      placeholder="密码"
      :maxlength="8"
    />
    <n-input
      type="password"
      show-password-on="click"
      placeholder="自定义密码图标"
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
