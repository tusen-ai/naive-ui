<markdown>
# Basic
</markdown>

<template>
  <n-infinite-scroll style="height: 240px" :distance="10" @load="handleLoad">
    <div v-for="i in count" :key="i" class="item">
      {{ i }}
    </div>
  </n-infinite-scroll>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const count = ref(6)
    const handleLoad = () => {
      count.value += 1
    }
    return {
      count,
      handleLoad
    }
  }
})
</script>

<style>
.item {
  display: flex;
  align-items: center;
  height: 46px;
  justify-content: center;
  margin-bottom: 10px;
  background-color: #e7f5ee;
}

.item:last-child {
  margin-bottom: 0;
}
</style>
