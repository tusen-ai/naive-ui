<markdown>
# 次次要按钮

</markdown>

<template>
  <n-space>
    <n-button tertiary>
      Default
    </n-button>
    <n-button tertiary type="primary">
      Primary
    </n-button>
    <n-button tertiary type="info">
      Info
    </n-button>
    <n-button tertiary type="success">
      Success
    </n-button>
    <n-button tertiary type="warning">
      Warning
    </n-button>
    <n-button tertiary type="error">
      Error
    </n-button>
    <n-button tertiary round>
      Default
    </n-button>
    <n-button tertiary round type="primary">
      Primary
    </n-button>
    <n-button tertiary round type="info">
      Info
    </n-button>
    <n-button tertiary round type="success">
      Success
    </n-button>
    <n-button tertiary round type="warning">
      Warning
    </n-button>
    <n-button tertiary round type="error">
      Error
    </n-button>
    <n-button tertiary circle>
      <template #icon>
        <n-icon><cash-icon /></n-icon>
      </template>
    </n-button>
    <n-button tertiary circle type="primary">
      <template #icon>
        <n-icon><cash-icon /></n-icon>
      </template>
    </n-button>
    <n-button tertiary circle type="info">
      <template #icon>
        <n-icon><cash-icon /></n-icon>
      </template>
    </n-button>
    <n-button tertiary circle type="success">
      <n-icon><cash-icon /></n-icon>
    </n-button>
    <n-button tertiary circle type="warning">
      <template #icon>
        <n-icon><cash-icon /></n-icon>
      </template>
    </n-button>
    <n-button tertiary circle type="error">
      <template #icon>
        <n-icon><cash-icon /></n-icon>
      </template>
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    CashIcon
  }
})
</script>
