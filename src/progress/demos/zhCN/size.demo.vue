<markdown>
# 尺寸

有 `tiny` `small`、`medium` 和 `large` 尺寸。
</markdown>

<script lang="ts" setup>
import type { ProgressSize } from 'naive-ui'
import { ref } from 'vue'

const size = ref<ProgressSize>('medium')

const percentage = ref(40)

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
    <n-radio-group v-model:value="size">
      <n-space>
        <n-radio value="tiny">
          很小
        </n-radio>
        <n-radio value="small">
          小
        </n-radio>
        <n-radio value="medium">
          不小
        </n-radio>
        <n-radio value="large">
          不不小
        </n-radio>
      </n-space>
    </n-radio-group>

    <n-progress type="line" :size="size" :percentage="percentage" />

    <n-progress type="circle" :size="size" :percentage="percentage" />

    <n-progress
      type="dashboard"
      :size="size"
      gap-position="bottom"
      :percentage="percentage"
    />

    <n-el>
      <n-progress
        type="multiple-circle"
        :size="size"
        :stroke-width="6"
        :circle-gap="0.5"
        :percentage="[
          percentage,
          (percentage + 10) % 100,
          (percentage + 20) % 100,
          (percentage + 30) % 100,
        ]"
        :color="[
          'var(--info-color)',
          'var(--success-color)',
          'var(--warning-color)',
          'var(--error-color)',
        ]"
        :rail-style="[
          { stroke: 'var(--info-color)', opacity: 0.3 },
          { stroke: 'var(--success-color)', opacity: 0.3 },
          { stroke: 'var(--warning-color)', opacity: 0.3 },
          { stroke: 'var(--error-color)', opacity: 0.3 },
        ]"
      >
        <div style="text-align: center">
          圈圈赛跑！
        </div>
      </n-progress>
    </n-el>

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
