<markdown>
# Description

Show description on float button.
</markdown>

<template>
  <div style="height: 120px; transform: translate(0)">
    <n-float-button shape="square">
      <n-icon>
        <document-icon />
      </n-icon>
      <template #description>
        Docs
      </template>
    </n-float-button>
    <n-float-button :left="60" shape="square">
      <template #description>
        Docs
      </template>
    </n-float-button>
    <n-float-button :left="120" shape="square">
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
