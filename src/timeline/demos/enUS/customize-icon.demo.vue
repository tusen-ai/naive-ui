<markdown>
# Customize icon
</markdown>

<template>
  <n-timeline>
    <n-timeline-item color="grey" content="Oops">
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
    </n-timeline-item>
    <n-timeline-item
      type="success"
      title="Success"
      content="success content"
      time="2018-04-03 20:46"
    >
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
    </n-timeline-item>
    <n-timeline-item
      type="error"
      content="error content"
      time="2018-04-03 20:46"
    >
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
    </n-timeline-item>
    <n-timeline-item
      type="warning"
      title="Warning"
      content="warning content"
      time="2018-04-03 20:46"
    >
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
    </n-timeline-item>
    <n-timeline-item
      type="info"
      title="Info"
      content="info content"
      time="2018-04-03 20:46"
    >
      <template #icon>
        <n-icon>
          <cash-icon />
        </n-icon>
      </template>
    </n-timeline-item>
  </n-timeline>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CashOutline as CashIcon } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    CashIcon
  }
})
</script>
