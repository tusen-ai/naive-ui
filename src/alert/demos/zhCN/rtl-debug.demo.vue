<markdown>
# Rtl Debug
</markdown>

<script lang="ts">
import { IosAirplane } from '@vicons/ionicons4'
import { unstableAlertRtl } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: { IosAirplane },
  setup() {
    return {
      value: ref(false),
      rtlEnabled: ref(false),
      rtlStyles: [unstableAlertRtl]
    }
  }
})
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
