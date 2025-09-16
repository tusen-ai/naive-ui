<markdown>
# 自定义格式化

使用 `format` 属性自定义数值
</markdown>

<script lang="ts" setup>
import type { NumberAnimationInst } from 'naive-ui'
import { ref } from 'vue'

const numberAnimationInstRef1 = ref<NumberAnimationInst | null>(null)
const numberAnimationInstRef2 = ref<NumberAnimationInst | null>(null)

function handleClick() {
  numberAnimationInstRef1.value?.play()
  numberAnimationInstRef2.value?.play()
}

function formatNumber(value: number): string {
  const v = (value / 1000).toFixed(0)
  return `${v.toString().replace(/(\d)(?=(\d{4})+(?!\d))/g, '$1,')}k`
}

function formatVideoViews(value: number): string {
  return `${value.toString().replace(/(\d)(?=(\d{4})+(?!\d))/g, '$1,')}次`
}
</script>

<template>
  <n-flex>
    <n-statistic label="粉丝数" tabular-nums>
      <n-number-animation
        ref="numberAnimationInstRef1"
        :from="0"
        :to="869825"
        :format="formatNumber"
      />
    </n-statistic>
    <n-statistic label="视频播放量" tabular-nums>
      <n-number-animation
        ref="numberAnimationInstRef2"
        :from="0"
        :to="10000000000"
        :format="formatVideoViews"
      />
    </n-statistic>
  </n-flex>
  <n-space vertical>
    <n-button @click="handleClick">
      播放
    </n-button>
  </n-space>
</template>
