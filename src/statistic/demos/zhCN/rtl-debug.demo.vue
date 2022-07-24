<markdown>
# Rtl Debug
</markdown>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-row>
        <n-col :span="12">
          <n-statistic label="Statistic" :value="99">
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
          <n-statistic label="Active Users">
            1,234,123
          </n-statistic>
        </n-col>
      </n-row>
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { unstableStatisticRtl, unstableRowRtl } from 'naive-ui'
import { MdSave } from '@vicons/ionicons4'

export default defineComponent({
  components: {
    MdSave
  },
  setup () {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableStatisticRtl, unstableRowRtl]
    }
  }
})
</script>
