<markdown>
# Rtl Debug
</markdown>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-space>
        <n-button>
          <template #icon>
            <n-icon>
              <cash-icon />
            </n-icon>
          </template>
          Rtl Test
        </n-button>
        <n-button icon-placement="right">
          <template #icon>
            <n-icon>
              <cash-icon />
            </n-icon>
          </template>
          Rtl Test
        </n-button>
      </n-space>
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { defineComponent, ref } from 'vue'
import { unstableButtonRtl } from 'naive-ui'

export default defineComponent({
  components: {
    CashIcon
  },
  setup () {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableButtonRtl]
    }
  }
})
</script>
