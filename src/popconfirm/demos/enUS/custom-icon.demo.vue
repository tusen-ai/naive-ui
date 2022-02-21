<markdown>
# Custom Icon
</markdown>

<template>
  <n-popconfirm positive-text="ok" negative-text="not ok">
    <template #icon>
      <n-icon color="red">
        <hand-icon />
      </n-icon>
    </template>
    <template #trigger>
      <n-button>Quit Game</n-button>
    </template>
    How can you be strong without purchasing?
  </n-popconfirm>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { MdHand as HandIcon } from '@vicons/ionicons4'

export default defineComponent({
  components: {
    HandIcon
  }
})
</script>
