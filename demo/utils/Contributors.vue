<script setup lang="ts">
// @ts-expect-error missing
// eslint-disable-next-line import/no-absolute-path
import _contributors from '/virtual-contributors'
import { computed } from 'vue'
const props = defineProps<{ id: string }>()
const contributors = computed(() => _contributors[props.id] || [])
</script>

<template>
  <div class="contributor-container">
    <div
      v-for="contributor of contributors"
      :key="contributor.email"
      class="contributor-item"
    >
      <img
        :src="`https://avatars.githubusercontent.com/${contributor.name}`"
        class="contributor-item-avatar"
      >
      {{ contributor.name }}
    </div>
  </div>
</template>

<style scoped>
.contributor-container {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 1rem;
  gap: 1rem;
}
.contributor-item {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-gap: 0.5rem;
  gap: 0.5rem;
}
.contributor-item-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}
</style>
