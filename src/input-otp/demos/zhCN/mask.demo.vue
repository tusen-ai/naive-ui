<markdown>
# 密码模式

指定 `mask = true`，可开启密码模式。
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('654321'.split(''))
</script>

<template>
  <n-input-otp v-model:value="value" mask />
</template>
