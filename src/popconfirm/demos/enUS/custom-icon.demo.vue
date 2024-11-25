<markdown>
# Custom Icon
</markdown>

<script lang="ts">
import { MdHand as HandIcon } from '@vicons/ionicons4'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    HandIcon
  }
})
</script>

<template>
  <n-popconfirm positive-text="ok" negative-text="not ok">
    <template #icon>
      <n-icon color="red">
        <HandIcon />
      </n-icon>
    </template>
    <template #trigger>
      <n-button>Quit Game</n-button>
    </template>
    How can you be strong without purchasing?
  </n-popconfirm>
</template>
