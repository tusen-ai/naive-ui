<markdown>
# Rtl Debug
</markdown>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-alert title="Default 类型" type="default" closable>
        <template #icon>
          <n-icon>
            <ios-airplane />
          </n-icon>
        </template>
        Gee it's good to be back home
      </n-alert>
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IosAirplane } from '@vicons/ionicons4'
import { unstableAlertRtl } from 'naive-ui'

export default defineComponent({
  components: { IosAirplane },
  setup () {
    return {
      value: ref(false),
      rtlEnabled: ref(false),
      rtlStyles: [unstableAlertRtl]
    }
  }
})
</script>
