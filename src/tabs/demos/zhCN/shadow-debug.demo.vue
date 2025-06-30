<markdown>
# Shadow Debug

`#1224`
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const valueRef = ref(1)
const panelsRef = ref([1, 2, 3])

const value = valueRef
const panels = panelsRef
const getClass = ref('half')
</script>

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

<style>
.half {
  width: 50%;
}
</style>
