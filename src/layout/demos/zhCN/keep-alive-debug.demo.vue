<markdown>
# Keep alive debug
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const showLayout = ref(true)
</script>

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
