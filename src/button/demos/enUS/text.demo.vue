<markdown>
# Text button

It just looks like text.
</markdown>

<template>
  <n-button text>
    <template #icon>
      <n-icon>
        <train-icon />
      </n-icon>
    </template>
    The Engine is Still Spitting Smoke
  </n-button>
</template>

<script lang="ts">
import { TrainOutline as TrainIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    TrainIcon
  }
})
</script>
