<markdown>
# Rtl Debug
</markdown>

<script lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { unstableButtonRtl } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    CashIcon
  },
  setup() {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableButtonRtl]
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-space>
        <n-button>
          <template #icon>
            <n-icon>
              <CashIcon />
            </n-icon>
          </template>
          Rtl Test
        </n-button>
        <n-button icon-placement="right">
          <template #icon>
            <n-icon>
              <CashIcon />
            </n-icon>
          </template>
          Rtl Test
        </n-button>
      </n-space>
    </n-config-provider>
  </n-space>
</template>
