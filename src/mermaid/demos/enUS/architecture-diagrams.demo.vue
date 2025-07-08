<markdown>
# Architecture Diagrams
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(`graph LR
    subgraph api[API]
        db[(Database)]
        disk1[(Storage)]
        disk2[(Storage)]
        server([Server])
    end
    
    db --> server
    disk1 --> server
    disk2 --> db
`)
</script>

<template>
  <n-mermaid v-model:value="value" />
</template>
