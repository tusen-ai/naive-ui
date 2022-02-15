<markdown>
# Quaternary button
</markdown>

<template>
  <n-space>
    <n-button quaternary>
      Default
    </n-button>
    <n-button quaternary type="primary">
      Primary
    </n-button>
    <n-button quaternary type="info">
      Info
    </n-button>
    <n-button quaternary type="success">
      Success
    </n-button>
    <n-button quaternary type="warning">
      Warning
    </n-button>
    <n-button quaternary type="error">
      Error
    </n-button>
    <n-button quaternary round>
      Default
    </n-button>
    <n-button quaternary round type="primary">
      Primary
    </n-button>
    <n-button quaternary round type="info">
      Info
    </n-button>
    <n-button quaternary round type="success">
      Success
    </n-button>
    <n-button quaternary round type="warning">
      Warning
    </n-button>
    <n-button quaternary round type="error">
      Error
    </n-button>
    <n-button quaternary circle>
      <template #icon>
        <n-icon><cash-icon /></n-icon>
      </template>
    </n-button>
    <n-button quaternary circle type="primary">
      <template #icon>
        <n-icon><cash-icon /></n-icon>
      </template>
    </n-button>
    <n-button quaternary circle type="info">
      <template #icon>
        <n-icon><cash-icon /></n-icon>
      </template>
    </n-button>
    <n-button quaternary circle type="success">
      <template #icon>
        <n-icon><cash-icon /></n-icon>
      </template>
    </n-button>
    <n-button quaternary circle type="warning">
      <template #icon>
        <n-icon><cash-icon /></n-icon>
      </template>
    </n-button>
    <n-button quaternary circle type="error">
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
