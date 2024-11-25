<markdown>
# 语言
</markdown>

<script lang="ts">
import type { NDateLocale, NLocale } from 'naive-ui'
import { dateZhCN, zhCN } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      zhCN,
      dateZhCN,
      locale: ref<NLocale | null>(null),
      dateLocale: ref<NDateLocale | null>(null)
    }
  }
})
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-button
        @click="
          () => {
            locale = null
            dateLocale = null
          }
        "
      >
        英文
      </n-button>
      <n-button
        @click="
          () => {
            locale = zhCN
            dateLocale = dateZhCN
          }
        "
      >
        中文
      </n-button>
    </n-space>
    <n-config-provider :locale="locale" :date-locale="dateLocale">
      <n-date-picker />
    </n-config-provider>
  </n-space>
</template>
