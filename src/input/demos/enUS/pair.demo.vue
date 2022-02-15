<markdown>
# Pairwise value

</markdown>

<template>
  <n-input
    pair
    separator="-"
    :placeholder="placeholder"
    clearable
    @blur="handleInputBlur"
    @focus="handleInputFocus"
    @change="handleInputChange"
    @update:value="handleInputInput"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const message = useMessage()
    return {
      placeholder: ['From', 'To'] as const,
      handleInputBlur () {
        message.info('Pairwise Value：Blur')
      },
      handleInputFocus () {
        message.info('Pairwise Value：Focus')
      },
      handleInputInput () {
        message.info('Pairwise Value：Input')
      },
      handleInputChange () {
        message.info('Pairwise Value：Change')
      }
    }
  }
})
</script>
