<markdown>
# 基础用法
</markdown>

<script lang="ts">
import { MdSave } from '@vicons/ionicons4'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    MdSave
  }
})
</script>

<template>
  <n-row>
    <n-col :span="12">
      <n-statistic label="统计数据" :value="99">
        <template #prefix>
          <n-icon>
            <MdSave />
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
