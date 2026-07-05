<markdown>
# 基础用法
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const checkedValueRef = ref<string | null>(null)
const disabled = ref(true)
const checkedValue = checkedValueRef

function handleChange(e: Event) {
  checkedValueRef.value = (e.target as HTMLInputElement).value
}
</script>

<template>
  <n-space>
    <n-radio
      :checked="checkedValue === 'Definitely Maybe'"
      value="Definitely Maybe"
      name="basic-demo"
      @change="handleChange"
    >
      Definitely Maybe
    </n-radio>
    <n-radio
      :checked="checkedValue === 'Be Here Now'"
      value="Be Here Now"
      name="basic-demo"
      @change="handleChange"
    >
      Be Here Now
    </n-radio>
    <n-radio
      :checked="checkedValue === 'Be Here Now'"
      value="Be Here Now"
      :disabled="disabled"
      name="basic-demo"
      label=" Be Here Now"
      @change="handleChange"
    />
    <n-switch v-model:value="disabled" />
  </n-space>
</template>
