<markdown>
# 基础用法
</markdown>

<template>
  <n-row>
    <n-col :span="12">
      <n-statistic label="统计数据" :value="99">
        <template #prefix>
          <n-icon>
            <md-save />
          </n-icon>
        </template>
        <template #suffix>
          / 100
        </template>
      </n-statistic>
    </n-col>
    <n-col :span="12">
      <n-statistic label="活跃用户">
        1,234,123
      </n-statistic>
    </n-col>
  </n-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { MdSave } from '@vicons/ionicons4'

export default defineComponent({
  components: {
    MdSave
  }
})
</script>
