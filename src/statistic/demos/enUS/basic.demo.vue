<markdown>
# Basic
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
      <n-statistic label="Statistic" :value="99">
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
      <n-statistic label="Active Users">
        1,234,123
      </n-statistic>
    </n-col>
  </n-row>
</template>
