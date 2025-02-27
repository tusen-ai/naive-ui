<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import { unstableSegmentRtl, unstableSpaceRtl } from 'naive-ui'
import { ref } from 'vue'

const rtlEnabled = ref(false)
const rtlStyles = [unstableSpaceRtl, unstableSegmentRtl]

const options = ref([
  {
    label: 'Everybody',
    value: 'song0'
  },
  {
    label: 'Drive',
    value: 'song1'
  },
  {
    label: 'Norwegian',
    value: 'song2'
  },
  {
    label: 'You',
    value: 'song3'
  }
])
</script>

<template>
  <n-space vertical>
    <n-space> <n-switch v-model:value="rtlEnabled" />Rtl </n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-space>
        <n-segment :options="options" />
      </n-space>
    </n-config-provider>
  </n-space>
</template>
