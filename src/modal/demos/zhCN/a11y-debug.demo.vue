<markdown>
# A11y debug

</markdown>

<template>
  <n-button @click="show = !show">
    Toggle
  </n-button>
  <n-modal v-model:show="show" preset="card" title="A11Y" style="width: 600px">
    <n-input placeholder="Gigigi" />
    <template #action>
      <n-button>Something</n-button>
    </template>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      show: ref(false)
    }
  }
})
</script>
