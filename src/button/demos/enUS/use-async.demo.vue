<markdown>
# Event driven loading status

If you use asynchronous events, it can guarantee you a loading state。
</markdown>

<template>
  <n-space>
    <n-button @click="handleClickOne">
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
      Confirm Submit
    </n-button>
    <n-button @click="handleClickTwo">
      Confirm
    </n-button>
    <n-button :loading="loading" @click="handleClick">
      Delete
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
      async handleClickOne () {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      },
      handleClickTwo () {
        return new Promise((resolve) => setTimeout(resolve, 2000))
      },
      handleClick () {
        loadingRef.value = true
        setTimeout(() => {
          loadingRef.value = false
        }, 1000)
      },
      loading: loadingRef
    }
  }
})
</script>
