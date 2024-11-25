<markdown>
# 多行文本

自 `2.38.2` 起，支持由 `\n` 分割的多行文本。

水印支持显示多行文本内容。
</markdown>

<script setup>
import { ref } from 'vue'

const content = ref('Naive UI\n有点意思...')
</script>

<template>
  <n-watermark
    :content="content"
    cross
    selectable
    :font-size="16"
    :line-height="16"
    :width="192"
    :height="128"
    :x-offset="12"
    :y-offset="28"
    :rotate="-15"
  >
    <n-table :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>复盘</th>
          <th>赋能</th>
          <th>协同</th>
          <th>...</th>
          <th>串联</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>拉通</td>
          <td>打通</td>
          <td>树立</td>
          <td>...</td>
          <td>履约</td>
        </tr>
        <tr>
          <td>...</td>
          <td>...</td>
          <td>...</td>
          <td>...</td>
          <td>...</td>
        </tr>
      </tbody>
    </n-table>
  </n-watermark>
</template>
