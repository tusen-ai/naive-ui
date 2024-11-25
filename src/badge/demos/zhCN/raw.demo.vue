<markdown>
# 直接使用
</markdown>

<script lang="ts">
import { MdAdd, MdRemove } from '@vicons/ionicons4'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    MdAdd,
    MdRemove
  },
  setup() {
    return {
      value: ref(5)
    }
  }
})
</script>

<template>
  <n-space :size="24" align="center" item-style="display: flex;">
    <n-badge :value="value" :max="15" />
    <n-badge :value="value" dot />
    <n-button-group>
      <n-button @click="value = Math.min(16, value + 1)">
        <template #icon>
          <n-icon><MdAdd /></n-icon>
        </template>
      </n-button>
      <n-button @click="value = Math.max(0, value - 1)">
        <template #icon>
          <n-icon><MdRemove /></n-icon>
        </template>
      </n-button>
    </n-button-group>
  </n-space>
</template>
