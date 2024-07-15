<markdown>
# Basic
</markdown>

<script lang="ts">
import { GameController, GameControllerOutline } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    GameController,
    GameControllerOutline
  },
  setup() {
    return {
      GameController
    }
  }
})
</script>

<template>
  <n-icon size="40">
    <GameControllerOutline />
  </n-icon>
  <n-icon size="40" color="#0e7a0d">
    <GameController />
  </n-icon>
  <n-icon size="40" :component="GameController" />
</template>
