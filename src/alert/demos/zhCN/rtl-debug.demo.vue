<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import { IosAirplane } from '@vicons/ionicons4'
import { unstableAlertRtl } from 'naive-ui'
import { ref } from 'vue'

const rtlEnabled = ref(false)
const rtlStyles = [unstableAlertRtl]
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-alert title="Default 类型" type="default" closable>
        <template #icon>
          <n-icon>
            <IosAirplane />
          </n-icon>
        </template>
        Gee it's good to be back home
      </n-alert>
    </n-config-provider>
  </n-space>
</template>
