<markdown>
# Rtl Debug
</markdown>

<script lang="ts">
import { MdSave } from '@vicons/ionicons4'
import { unstableRowRtl, unstableStatisticRtl } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    MdSave
  },
  setup() {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableStatisticRtl, unstableRowRtl]
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
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
    </n-config-provider>
  </n-space>
</template>
