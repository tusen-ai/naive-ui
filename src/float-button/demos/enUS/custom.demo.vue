<markdown>
# Description

Show description on float button.
</markdown>

<template>
  <div style="height: 120px; transform: translate(0)">
    <n-float-button style="border-radius: 6px">
      <n-icon>
        <document-icon />
      </n-icon>
      <template #description>
        Docs
      </template>
    </n-float-button>
    <n-float-button :left="60" style="border-radius: 6px">
      <template #description>
        Docs
      </template>
    </n-float-button>
    <n-float-button :left="120" style="border-radius: 6px">
      <n-icon>
        <document-icon />
      </n-icon>
      <template #description>
        Long Long Docs
      </template>
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
