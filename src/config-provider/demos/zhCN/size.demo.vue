<markdown>
# 组件尺寸

修改默认组件尺寸。
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
  <n-config-provider :size>
    <n-space vertical>
      <n-button>按钮</n-button>
      <n-auto-complete />
      <n-cascader style="width: 240px" />
      <n-checkbox-group>
        <n-checkbox>靓仔</n-checkbox>
        <n-checkbox>帅哥</n-checkbox>
      </n-checkbox-group>
      <n-date-picker />
      <n-dynamic-tags />
      <n-input-group>
        <n-input-group-label> 之前 </n-input-group-label>
        <n-input />
        <n-input-group-label> 之后 </n-input-group-label>
      </n-input-group>
      <n-input-number />
    </n-space>
  </n-config-provider>
</template>
