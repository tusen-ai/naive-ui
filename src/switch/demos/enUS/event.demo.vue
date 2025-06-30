<markdown>
# Event
</markdown>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const active = ref(false)
function handleChange(value: boolean) {
  message.info(`Update value: ${value}`)
}
</script>

<template>
  <n-switch v-model:value="active" @update:value="handleChange" />
</template>
