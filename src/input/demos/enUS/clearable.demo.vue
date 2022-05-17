<markdown>
# Clearable

Make the input clearable after a value is set.
</markdown>

<template>
  <n-space vertical>
    <n-input type="text" placeholder="Content is clearable" clearable />
    <n-input type="password" placeholder="Content is clearable" clearable />
    <n-input
      type="textarea"
      placeholder="Content is clearable"
      round
      clearable
    />
    <n-input type="text" placeholder="Custom clear icon" round clearable>
      <template #clear-icon>
        <n-icon :component="TrashBinOutline" />
      </template>
    </n-input>
  </n-space>
</template>

<script lang="ts">
import { TrashBinOutline } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      TrashBinOutline
    }
  }
})
</script>
