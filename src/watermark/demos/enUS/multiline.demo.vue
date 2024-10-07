<markdown>
# Multiline Text

Supports multiple lines text separated by `\n` since `2.38.2`.

Watermark supports displaying multiline text content.
</markdown>

<script setup>
import { ref } from 'vue'

const content = ref('Naive UI\nQuite Interesting...')
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
          <th>Review</th>
          <th>Empower</th>
          <th>Collaborate</th>
          <th>...</th>
          <th>Connect</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Align</td>
          <td>Enable</td>
          <td>Establish</td>
          <td>...</td>
          <td>Fulfill</td>
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
