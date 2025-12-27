<markdown>
# 清空时的值

可以通过 `value-on-clear` 设置当输入框被清空时显示的值。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref(100)
const value2 = ref(100)
const value3 = ref(100)
const value4 = ref(100)
</script>

<template>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px">
    <n-space vertical :size="0">
      <n-text depth="3">
        默认行为, 清空时设置为空:
      </n-text>
      <n-input-number
        v-model:value="value1"
        clearable
        :min="0"
        :max="200"
        placeholder="点击清空按钮"
      />
    </n-space>
    <n-space vertical :size="0">
      <n-text depth="3">
        清空时设置为 0:
      </n-text>
      <n-input-number
        v-model:value="value2"
        clearable
        :value-on-clear="0"
        :min="0"
        :max="200"
        placeholder="点击清空按钮"
      />
    </n-space>
    <n-space vertical :size="0">
      <n-text depth="3">
        清空时设置为最小值：
      </n-text>
      <n-input-number
        v-model:value="value3"
        clearable
        value-on-clear="min"
        :min="10"
        :max="200"
        placeholder="点击清空按钮"
      />
    </n-space>
    <n-space vertical :size="0">
      <n-text depth="3">
        清空时设置为最大值：
      </n-text>
      <n-input-number
        v-model:value="value4"
        clearable
        value-on-clear="max"
        :min="0"
        :max="200"
        placeholder="点击清空按钮"
      />
    </n-space>
  </div>
</template>
