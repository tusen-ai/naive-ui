<markdown>
# Theme

Set theme of inner components of `n-config-provider`.
</markdown>

<template>
  <n-config-provider :theme="theme">
    <n-card>
      <n-space>
        <n-button @click="theme = darkTheme">
          Dark
        </n-button>
        <n-button @click="theme = null">
          Light
        </n-button>
      </n-space>
    </n-card>
  </n-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { darkTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      darkTheme,
      theme: ref<GlobalTheme | null>(null)
    }
  }
})
</script>
