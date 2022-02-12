<markdown>
# Loading

Buttons can have loading states.
</markdown>

<template>
  <n-space>
    <n-button :loading="loading" @click="handleClick">
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
      Click Me
    </n-button>
    <n-button :loading="loading" icon-placement="left" @click="handleClick">
      Click Me
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    CashIcon
  },
  setup () {
    const loadingRef = ref(false)
    return {
      handleClick () {
        loadingRef.value = true
        setTimeout(() => {
          loadingRef.value = false
        }, 2000)
      },
      loading: loadingRef
    }
  }
})
</script>
