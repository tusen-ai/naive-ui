<markdown>
# Component Size

Configure component size with `component-options`.
</markdown>

<script setup lang="ts">
import { computed, ref } from 'vue'

type ComponentSize = 'small' | 'medium' | 'large'

const size = ref<ComponentSize>('small')

function handleBtnClick(_size: ComponentSize): void {
  size.value = _size
}

const componentOptions = computed(() => ({
  Button: { size: size.value },
  Card: { size: size.value },
  Pagination: { size: size.value },
  Tag: { size: size.value }
}))
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
  <n-config-provider :component-options="componentOptions">
    <n-space vertical>
      <n-button>Button</n-button>
      <n-tag closable>
        Tag
      </n-tag>
      <n-card title="Card">
        Card Content
      </n-card>
      <n-pagination :page-count="20" />
    </n-space>
  </n-config-provider>
</template>
