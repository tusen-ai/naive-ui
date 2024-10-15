<markdown>
# Component Size

Modify the default component size.
</markdown>

<script setup lang="ts">
import { ref } from 'vue'
import type { GlobalSize } from 'naive-ui'

const size = ref<GlobalSize>('small')

function handleBtnClick(_size: GlobalSize): void {
  size.value = _size
}
</script>

<template>
  <n-button-group>
    <n-button @click="handleBtnClick('small')">
      Smaller
    </n-button>
    <n-button @click="handleBtnClick('medium')">
      Medium
    </n-button>
    <n-button @click="handleBtnClick('large')">
      Larger
    </n-button>
  </n-button-group>
  <n-divider />
  <n-config-provider :size="size">
    <n-space vertical>
      <n-button>Button</n-button>
      <n-auto-complete />
      <n-cascader style="width: 240px" />
      <n-checkbox-group>
        <n-checkbox>Handsome</n-checkbox>
        <n-checkbox>Good-looking</n-checkbox>
      </n-checkbox-group>
      <n-date-picker />
      <n-dynamic-tags />
      <n-input-group>
        <n-input-group-label> Before </n-input-group-label>
        <n-input />
        <n-input-group-label> After </n-input-group-label>
      </n-input-group>
      <n-input-number />
    </n-space>
  </n-config-provider>
</template>
