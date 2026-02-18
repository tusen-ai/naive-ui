<markdown>
# 组件尺寸

通过 `component-options` 按组件配置尺寸。
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
      小一点儿
    </n-button>
    <n-button @click="handleBtnClick('medium')">
      中规中矩
    </n-button>
    <n-button @click="handleBtnClick('large')">
      大一点儿
    </n-button>
  </n-button-group>
  <n-divider />
  <n-config-provider :component-options="componentOptions">
    <n-space vertical>
      <n-button>按钮</n-button>
      <n-tag closable>
        标签
      </n-tag>
      <n-card title="卡片">
        卡片内容
      </n-card>
      <n-pagination :page-count="20" />
    </n-space>
  </n-config-provider>
</template>
