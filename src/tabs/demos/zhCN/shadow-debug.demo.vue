<markdown>
# Shadow Debug

`#1224`
</markdown>
<template>
  <div :class="getClass">
    <n-button @click="() => (getClass = 'half')">
      half
    </n-button>
    <n-button @click="() => (getClass = 'full')">
      full
    </n-button>
    <n-tabs v-model:value="value" type="card" tab-style="min-width: 100px;">
      <n-tab-pane v-for="panel in panels" :key="panel" :name="panel">
        {{ panel }}
      </n-tab-pane>
      <template #prefix>
        Prefix
      </template>
      <template #suffix>
        Suffix
      </template>
    </n-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const valueRef = ref(1)
    const panelsRef = ref([1, 2, 3])

    return {
      value: valueRef,
      panels: panelsRef,
      getClass: ref('half')
    }
  }
})
</script>
<style>
.half {
  width: 50%;
}
</style>
