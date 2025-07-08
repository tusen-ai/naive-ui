<markdown>
# Sankey diagram
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(`sankey-beta

%% source,target,value
Electricity grid,Over generation / exports,104.453
Electricity grid,Heating and cooling - homes,113.726
Electricity grid,H2 conversion,27.14
`)
</script>

<template>
  <n-mermaid v-model:value="value" />
</template>
