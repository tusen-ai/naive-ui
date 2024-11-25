<markdown>
# Customizing content

Insert some custom content in it.
</markdown>

<script lang="ts">
import { LockClosedOutline } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      LockClosedOutline
    }
  }
})
</script>

<template>
  <n-space :size="24" align="center">
    <n-badge value="new">
      <n-avatar />
    </n-badge>
    <n-badge value="hot">
      <n-avatar />
    </n-badge>
    <n-badge processing>
      <n-avatar />
      <template #value>
        <n-icon :component="LockClosedOutline" />
      </template>
    </n-badge>
  </n-space>
</template>
