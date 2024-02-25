<markdown>
# Modal debug
</markdown>

<template>
  <n-button @click="show = true">
    Show modal
  </n-button>
  <n-modal v-model:show="show" preset="card">
    <n-tabs type="segment">
      <n-tab v-for="tab in tabs" :key="tab" :name="tab">
        I'm {{ tab }}
      </n-tab>
    </n-tabs>
  </n-modal>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const showRef = ref(false)
    return {
      tabs: ['ccccc', 'dddddd'],
      show: showRef
    }
  }
})
</script>
