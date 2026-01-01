<markdown>
# 线型

事实上线型的进度条不需要这么多种样子，但是既然 UI 画了，我也就实现了。它支持 `default`、`info`、`success`、`warning` 和 `error` 的 `status`。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const percentage = ref(0)

function add() {
  percentage.value += 10
  if (percentage.value > 100) {
    percentage.value = 0
  }
}

function minus() {
  percentage.value -= 10
  if (percentage.value < 0) {
    percentage.value = 100
  }
}
</script>

<template>
  <n-space vertical>
    <n-progress type="line" :percentage="percentage" :show-indicator="false" />
    <n-progress type="line" :percentage="percentage" />
    <n-progress
      type="line"
      :percentage="percentage"
      indicator-placement="inside"
    />
    <n-progress
      type="line"
      status="info"
      :percentage="percentage"
      :show-indicator="false"
    />
    <n-progress type="line" status="info" :percentage="percentage" />
    <n-progress
      type="line"
      status="info"
      :percentage="percentage"
      indicator-placement="inside"
    />
    <n-progress
      type="line"
      status="success"
      :percentage="percentage"
      :show-indicator="false"
    />
    <n-progress type="line" status="success" :percentage="percentage" />
    <n-progress
      type="line"
      status="success"
      :percentage="percentage"
      indicator-placement="inside"
    />
    <n-progress
      type="line"
      status="warning"
      :percentage="percentage"
      :show-indicator="false"
    />
    <n-progress type="line" status="warning" :percentage="percentage" />
    <n-progress
      type="line"
      status="warning"
      :percentage="percentage"
      indicator-placement="inside"
    />
    <n-progress
      type="line"
      status="error"
      :percentage="percentage"
      :show-indicator="false"
    />
    <n-progress type="line" status="error" :percentage="percentage" />
    <n-progress
      type="line"
      status="error"
      :percentage="percentage"
      indicator-placement="inside"
    />
    <n-space>
      <n-button @click="minus">
        减 10%
      </n-button>
      <n-button @click="add">
        加 10%
      </n-button>
    </n-space>
  </n-space>
</template>
