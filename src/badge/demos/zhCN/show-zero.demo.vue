<markdown>
# 显示 0

设定 `show-zero` 来显示 0。
</markdown>

<template>
  <n-space :size="24" align="center">
    <n-badge :value="value">
      <n-avatar />
    </n-badge>
    <n-badge :value="value" show-zero>
      <n-avatar />
    </n-badge>
    <n-button-group>
      <n-button @click="value = Math.min(16, value + 1)">
        <template #icon>
          <n-icon><md-add /></n-icon>
        </template>
      </n-button>
      <n-button @click="value = Math.max(0, value - 1)">
        <template #icon>
          <n-icon><md-remove /></n-icon>
        </template>
      </n-button>
    </n-button-group>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MdAdd, MdRemove } from '@vicons/ionicons4'

export default defineComponent({
  components: {
    MdAdd,
    MdRemove
  },
  setup () {
    return {
      value: ref(0)
    }
  }
})
</script>
