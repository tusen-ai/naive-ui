<markdown>
# Mindmap
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(`mindmap
  root((mindmap))
    Origins
      Long history
      ::icon(fa fa-book)
      Popularisation
        British popular psychology author Tony Buzan
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping
    Tools
      Pen and paper
      Mermaid
`)
</script>

<template>
  <n-mermaid v-model:value="value" />
</template>
