<markdown>
# 实体关系图
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(`erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
    `)
</script>

<template>
  <n-mermaid v-model:value="value" />
</template>
