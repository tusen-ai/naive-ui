<markdown>
# Rtl Debug

</markdown>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-card closable>
        <template #header>
          Rtl Header Test
        </template>
        <template #header-extra>
          Rtl Header Extra Test
        </template>
        Rtl Content Test
        <template #footer>
          Rtl Header Test
        </template>
        <template #action>
          Rtl Action Test
        </template>
      </n-card>
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { unstableCardRtl } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableCardRtl]
    }
  }
})
</script>
