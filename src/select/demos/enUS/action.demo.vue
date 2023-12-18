<markdown>
# Action slot

Is there anybody who needs an action slot on a select menu?
</markdown>
<template>
  <n-select v-model:value="value" :options="options">
    <template #header>
      Don't know what to put
    </template>
    <template #action>
      If you click this demo, you may need it.
    </template>
  </n-select>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      value: ref(null),
      options: [
        {
          label: "Everybody's Got Something to Hide Except Me and My Monkey",
          value: 'song0',
          disabled: true
        },
        {
          label: 'Drive My Car',
          value: 'song1'
        },
        {
          label: 'Norwegian Wood',
          value: 'song2'
        },
        {
          label: "You Won't See",
          value: 'song3',
          disabled: true
        }
      ]
    }
  }
})
</script>
