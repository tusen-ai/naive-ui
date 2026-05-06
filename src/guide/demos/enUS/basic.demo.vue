<markdown>
# Basic

Start a guide with multiple highlighted targets.
</markdown>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      show: ref(false),
      steps: [
        {
          title: 'Create something',
          content: 'Start by creating a draft.',
          target: '#guide-basic-create'
        },
        {
          title: 'Save changes',
          content: 'Save your work before publishing.',
          target: '#guide-basic-save'
        },
        {
          title: 'Publish',
          content: 'Make the content visible to everyone.',
          target: '#guide-basic-publish'
        }
      ]
    }
  }
})
</script>

<template>
  <n-space>
    <n-button id="guide-basic-create">
      Create
    </n-button>
    <n-button id="guide-basic-save">
      Save
    </n-button>
    <n-button id="guide-basic-publish">
      Publish
    </n-button>
    <n-button @click="show = true">
      Start guide
    </n-button>
  </n-space>
  <n-guide v-model:show="show" :steps="steps" />
</template>
