<markdown>
# Slots

Card has many slots to help you write less code.
</markdown>

<template>
  <n-card title="Card Slots Demo" closable close-style="border-radius: 50%">
    <template #close-icon>
      <n-icon :component="CloseCircle" />
    </template>
    <template #header-extra>
      #header-extra
    </template>
    Card Content
    <template #footer>
      #footer
    </template>
    <template #action>
      #action
    </template>
  </n-card>
</template>

<script lang="ts">
import { CloseCircle } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {
      CloseCircle
    }
  }
})
</script>
