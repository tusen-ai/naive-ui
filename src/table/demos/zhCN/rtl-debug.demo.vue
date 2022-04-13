<markdown>
# Rtl Debug
</markdown>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-table :bordered="false" :single-line="false">
        <thead>
          <tr>
            <th>Abandon</th>
            <th>Abormal</th>
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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { unstableTableRtl } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableTableRtl]
    }
  }
})
</script>
