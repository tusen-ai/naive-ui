<markdown>
# Value debug
</markdown>

<template>
  {{ JSON.stringify(value) }}
  <n-transfer ref="transfer" v-model:value="value" :options="options" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

function createOptions () {
  return Array.from({ length: 100 }).map((v, i) => ({
    label: 'Option ' + i,
    value: i,
    disabled: i % 5 === 0
  }))
}

export default defineComponent({
  setup () {
    return {
      options: createOptions(),
      value: ref([9999, 9998, 9997])
    }
  }
})
</script>
