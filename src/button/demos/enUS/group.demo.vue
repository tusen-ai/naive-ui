<markdown>
# Button group

Buttons can be grouped.
</markdown>

<template>
  <n-space>
    <n-button-group vertical>
      <n-button round>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        Live a
      </n-button>
      <n-button ghost>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        Sufficient
      </n-button>
      <n-button>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        Life
      </n-button>
    </n-button-group>
    <n-button-group vertical size="large">
      <n-button>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        With
      </n-button>
      <n-button>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        Enough
      </n-button>
      <n-button ghost round>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        Happiness
      </n-button>
    </n-button-group>
    <n-button-group size="small">
      <n-button round>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        Life
      </n-button>
      <n-button>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        Is
      </n-button>
      <n-button>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        Good
      </n-button>
    </n-button-group>
    <n-button-group>
      <n-button ghost>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        Eat
      </n-button>
      <n-button ghost>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        One More
      </n-button>
      <n-button round>
        <template #icon>
          <n-icon><log-in-icon /></n-icon>
        </template>
        Apple
      </n-button>
    </n-button-group>
  </n-space>
</template>
<script lang="ts">
import { LogInOutline as LogInIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    LogInIcon
  }
})
</script>
