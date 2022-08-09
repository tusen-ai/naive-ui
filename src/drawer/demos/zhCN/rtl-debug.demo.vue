<markdown>
# Rtl Debug
</markdown>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-button @click="show = true">
        Open
      </n-button>
      <n-drawer v-model:show="show" :width="502">
        <n-drawer-content title="Stoner" closable>
          Stoner is a 1965 novel by the American writer John Williams.
        </n-drawer-content>
      </n-drawer>
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { unstableDrawerRtl } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      rtlEnabled: ref(false),
      rtlStyles: [unstableDrawerRtl],
      show: ref(false)
    }
  }
})
</script>
