<markdown>
# Dynamic Debug
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref(
  '住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪'
)

function toogleText() {
  if (text.value.length > 10) {
    text.value = '住在我心里孤独的'
  }
  else {
    text.value
      = '住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪'
  }
}
</script>

<template>
  <p>测试：：：：</p>

  <n-ellipsis style="max-width: 240px">
    {{ text }}
  </n-ellipsis>
  <br>
  <br>
  <br>
  <n-button type="primary" @click="toogleText">
    测试动态文字
  </n-button>
</template>
