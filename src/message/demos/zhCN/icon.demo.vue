<markdown>
# 图标
</markdown>

<script lang="ts" setup>
import { MdHourglass } from '@vicons/ionicons4'
import { NIcon, useMessage } from 'naive-ui'
import { h } from 'vue'

const message = useMessage()

function createMessage() {
  message.warning('I never needed anybody\'s help in any way', {
    icon: () => h(NIcon, null, { default: () => h(MdHourglass) })
  })
}
</script>

<template>
  <n-button @click="createMessage">
    沙漏图标
  </n-button>
</template>
