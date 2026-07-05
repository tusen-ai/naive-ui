<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import { unstableTableRtl } from 'naive-ui'
import { ref } from 'vue'

const singleColumn = ref(false)
const singleLine = ref(false)
const bordered = ref(false)
const rtlEnabled = ref(false)
const rtlStyles = [unstableTableRtl]
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-space><n-switch v-model:value="singleLine" />Single line</n-space>
    <n-space><n-switch v-model:value="singleColumn" />Single column</n-space>
    <n-space><n-switch v-model:value="bordered" />Bordered</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-table
        :bordered="bordered"
        :single-column="singleColumn"
        :single-line="singleLine"
      >
        <thead>
          <tr>
            <th>Abandon</th>
            <th>Abnormal</th>
            <th>Abolish</th>
            <th>...</th>
            <th>万事开头难</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>放弃</td>
            <td>反常的</td>
            <td>彻底废除</td>
            <td>...</td>
            <td>干！我刚才背的是啥</td>
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
    </n-config-provider>
  </n-space>
</template>
