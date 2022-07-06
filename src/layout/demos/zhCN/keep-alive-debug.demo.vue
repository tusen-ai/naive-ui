<markdown>
# Keep alive debug
</markdown>

<template>
  <n-button @click="showLayout = !showLayout">
    xxx
  </n-button>
  <keep-alive>
    <n-layout v-if="showLayout" style="height: 100px">
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
    </n-layout>
    <n-empty v-else />
  </keep-alive>
  <keep-alive>
    <n-layout v-if="showLayout" style="height: 100px" :native-scrollbar="false">
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
    </n-layout>
    <n-empty v-else />
  </keep-alive>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      showLayout: ref(true)
    }
  }
})
</script>
