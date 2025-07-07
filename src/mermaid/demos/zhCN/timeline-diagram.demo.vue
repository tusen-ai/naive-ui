<markdown>
# 时间线图
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(`timeline
    title History of Social Media Platform
    2002 : LinkedIn
    2004 : Facebook
         : Google
    2005 : YouTube
    2006 : Twitter
`)
</script>

<template>
  <n-mermaid v-model:value="value" />
</template>
