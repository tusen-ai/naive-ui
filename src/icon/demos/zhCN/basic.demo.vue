<markdown>
# 基础用法
</markdown>

<template>
  <n-icon size="40">
    <game-controller-outline />
  </n-icon>
  <n-icon size="40" color="#0e7a0d">
    <game-controller />
  </n-icon>
  <n-icon size="40" :component="GameController" />
</template>

<script lang="ts">
import { GameControllerOutline, GameController } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    GameController,
    GameControllerOutline
  },
  setup () {
    return {
      GameController
    }
  }
})
</script>
