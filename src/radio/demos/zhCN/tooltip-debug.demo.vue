<markdown>
# Tooltip debug
</markdown>

<script setup lang="ts">
import { NRadio, NRadioGroup, NSpace, NTooltip } from 'naive-ui'
import { ref } from 'vue'

const mode = ref('direct')
const modeOptions = [
  { label: '直接', value: 'direct' },
  { label: '拆分', value: 'paragraph' }
]
</script>

<template>
  <div class="rd-2">
    <NRadioGroup v-model:value="mode" name="radiogroup">
      <NSpace>
        <NRadio v-for="i in modeOptions" :key="i.value" :value="i.value">
          {{ i.label }}
          <NTooltip placement="top">
            <template #trigger>
              <span style="color: red">提示</span>
            </template>
            <div>
              reloaded using link preload but not used within a few seconds from
              the window's load event. Pleas
            </div>
          </NTooltip>
        </NRadio>
      </NSpace>
    </NRadioGroup>
  </div>
</template>

<style scoped></style>
