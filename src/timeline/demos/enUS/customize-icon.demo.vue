<markdown>
# Customize icon
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
  <n-timeline>
    <n-timeline-item color="grey" content="Oops">
      <template #icon>
        <n-icon>
          <CashIcon />
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
          <CashIcon />
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
          <CashIcon />
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
          <CashIcon />
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
          <CashIcon />
        </n-icon>
      </template>
    </n-timeline-item>
  </n-timeline>
</template>
