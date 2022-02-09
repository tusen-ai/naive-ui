<markdown>
# Checkable

It can be checkable.
</markdown>

<template>
  <n-space>
    <n-tag v-model:checked="checked" checkable disabled>
      Real Love
    </n-tag>
    <n-tag v-model:checked="checked" checkable>
      Yes It Is
    </n-tag>
    <n-tag v-model:checked="checked" checkable>
      I'm Down
    </n-tag>
    <n-tag v-model:checked="checked" checkable>
      Yesterday
    </n-tag>
    <n-tag v-model:checked="checked" checkable>
      I'm Looking Through You
    </n-tag>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      checked: ref(false)
    }
  }
})
</script>
