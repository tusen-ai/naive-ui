<markdown>
# 需求图
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(`requirementDiagram

    requirement test_req {
    id: 1
    text: the test text.
    risk: high
    verifymethod: test
    }

    element test_entity {
    type: simulation
    }

    test_entity - satisfies -> test_req
`)
</script>

<template>
  <n-mermaid v-model:value="value" />
</template>
