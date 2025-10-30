<markdown>
# Customizing input or trigger element

You can replace a dynamic-tags input or trigger element with another component.
</markdown>

<script lang="ts" setup>
import type { AutoCompleteInst } from 'naive-ui'
import { Add } from '@vicons/ionicons5'
import { computed, nextTick, ref, watch } from 'vue'

const autoCompleteInstRef = ref<AutoCompleteInst | null>(null)
watch(autoCompleteInstRef, (value) => {
  if (value)
    nextTick(() => value.focus())
})

const inputValue = ref('')
const options = computed(() => {
  if (inputValue.value === null) {
    return []
  }
  const prefix = inputValue.value.split('@')[0]
  const inputSuffix = inputValue.value.split('@')[1]
  if (inputSuffix) {
    return [
      {
        label: `${prefix}@${inputSuffix}`,
        value: `${prefix}@${inputSuffix}`
      }
    ]
  }
  return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
    return {
      label: prefix + suffix,
      value: prefix + suffix
    }
  })
})

const tags = ref(['Teacher', 'Programmer'])
</script>

<template>
  <n-dynamic-tags v-model:value="tags">
    <template #input="{ submit, deactivate }">
      <n-auto-complete
        ref="autoCompleteInstRef"
        v-model:value="inputValue"
        size="small"
        :options="options"
        placeholder="Email"
        :clear-after-select="true"
        @select="submit($event)"
        @blur="deactivate"
      />
    </template>
    <template #trigger="{ activate, disabled }">
      <n-button
        size="small"
        type="primary"
        dashed
        :disabled="disabled"
        @click="activate()"
      >
        <template #icon>
          <n-icon>
            <Add />
          </n-icon>
        </template>
        New Tag
      </n-button>
    </template>
  </n-dynamic-tags>
</template>
