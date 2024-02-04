<markdown>
  # Custom Dom

  You can put any element you want.

</markdown>

<template>
  <div style="height: 200px; transform: translate(0)">
    <n-float-button
      :right="0"
      :bottom="60"
      height="auto"
      width="auto"
      :radius="10"
    >
      <n-flex
        vertical
        :style="{ padding: '4px', textAlign: 'center' }"
        align="center"
      >
        <n-icon :size="24">
          <document-icon />
        </n-icon>
        <span> Document </span>
      </n-flex>
    </n-float-button>

    <n-float-button :right="0" :left="0" :bottom="0" width="100%" :radius="10">
      <n-flex align="center">
        <n-icon :size="24">
          <document-icon />
        </n-icon>
        <span> Document </span>
      </n-flex>
    </n-float-button>
  </div>
</template>

<script lang="ts">
import { Document as DocumentIcon } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    DocumentIcon
  }
})
</script>
