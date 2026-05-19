<markdown>
# 按钮组

复选框也有按钮组样式，你可以在 `n-checkbox-group` 中使用 `n-checkbox-button`。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string[]>([])
const disabled2 = ref(false)
const disabled1 = ref(false)
const songs = [
  {
    value: 'Rock\'n\'Roll Star',
    label: 'Rock\'n\'Roll Star'
  },
  {
    value: 'Shakermaker',
    label: 'Shakermaker'
  },
  {
    value: 'Live Forever',
    label: 'Live Forever'
  },
  {
    value: 'Up in the Sky',
    label: 'Up in the Sky'
  },
  {
    value: '...',
    label: '...'
  }
].map((s) => {
  s.value = s.value.toLowerCase()
  return s
})
</script>

<template>
  <n-space vertical>
    <n-checkbox-group v-model:value="value">
      <n-checkbox-button
        v-for="song in songs"
        :key="song.value"
        :value="song.value"
        :disabled="
          (song.label === 'Live Forever' && disabled1)
            || (song.label === 'Shakermaker' && disabled2)
        "
        :label="song.label"
      />
    </n-checkbox-group>
    <n-space>
      <n-checkbox v-model:checked="disabled2" style="margin-right: 12px">
        禁用 Shakemaker
      </n-checkbox>
      <n-checkbox v-model:checked="disabled1">
        禁用 Live Forever
      </n-checkbox>
    </n-space>
  </n-space>
</template>
