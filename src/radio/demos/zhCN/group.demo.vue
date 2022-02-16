<markdown>
# 选项组

一个选项组看起来就挺舒服。
</markdown>

<template>
  <n-radio-group v-model:value="value" name="radiogroup">
    <n-space>
      <n-radio v-for="song in songs" :key="song.value" :value="song.value">
        {{ song.label }}
      </n-radio>
    </n-space>
  </n-radio-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(null),
      songs: [
        {
          value: "Rock'n'Roll Star",
          label: "Rock'n'Roll Star"
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
    }
  }
})
</script>
