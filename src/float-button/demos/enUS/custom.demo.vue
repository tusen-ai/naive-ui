<markdown>
# Description

Show description on float button.
</markdown>

<script lang="ts" setup>
import { Document as DocumentIcon } from '@vicons/ionicons5'
</script>

<template>
  <div style="height: 120px; transform: translate(0)">
    <n-float-button shape="square">
      <n-icon>
        <DocumentIcon />
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
        <DocumentIcon />
      </n-icon>
      <template #description>
        Long Long Docs
      </template>
    </n-float-button>
  </div>
</template>
