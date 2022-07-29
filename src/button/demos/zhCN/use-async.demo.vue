<markdown>
# 事件驱动加载中状态

如果使用的是异步事件，它就能保证给你一个加载中的状态。
</markdown>

<template>
  <n-space>
    <n-button @click="handleClickOne">
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
      确认提交
    </n-button>
    <n-button @click="handleClickTwo">
      确认
    </n-button>
    <n-button :loading="loading" @click="handleClick">
      删除
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
