<markdown>
# Locale
</markdown>

<script lang="ts" setup>
import type { NDateLocale, NLocale } from 'naive-ui'
import { dateZhCN, zhCN } from 'naive-ui'
import { ref } from 'vue'

const locale = ref<NLocale | null>(null)
const dateLocale = ref<NDateLocale | null>(null)
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
        en-US
      </n-button>
      <n-button
        @click="
          () => {
            locale = zhCN
            dateLocale = dateZhCN
          }
        "
      >
        zh-CN
      </n-button>
    </n-space>
    <n-config-provider :locale="locale" :date-locale="dateLocale">
      <n-date-picker />
    </n-config-provider>
  </n-space>
</template>
