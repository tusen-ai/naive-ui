<markdown>
  # Float Button Group

  Elements can be arbitrarily combined to achieve more functionality.
</markdown>

<script lang="ts">
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    CashIcon
  }
})
</script>

<template>
  <n-flex align="flex-start">
    <n-float-button-group shape="square" position="relative">
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
    </n-float-button-group>
    <n-float-button-group position="relative">
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
      <n-float-button>
        <n-icon><CashIcon /></n-icon>
      </n-float-button>
    </n-float-button-group>
  </n-flex>
</template>
