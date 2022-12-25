<markdown>
# Position
</markdown>
<template>
  <n-button @click="placement = 'top'">
    top
  </n-button>
  <n-button @click="placement = 'bottom'">
    bottom
  </n-button>
  <n-button @click="placement = 'left'">
    left
  </n-button>
  <n-button @click="placement = 'right'">
    right
  </n-button>

  <n-tabs
    type="line"
    animated
    :placement="placement"
    :style="{ height: '240px' }"
  >
    <n-tab-pane name="oasis" tab="Oasis">
      Wonderwall
    </n-tab-pane>
    <n-tab-pane name="the beatles" tab="the Beatles">
      Hey Jude
    </n-tab-pane>
    <n-tab-pane name="jay chou" tab="Jay Chou">
      Qilixiang
    </n-tab-pane>
    <n-tab-pane name="oasis1" tab="Oasis1">
      Wonderwall
    </n-tab-pane>
    <n-tab-pane name="the beatles1" tab="the Beatles1">
      Hey Jude
    </n-tab-pane>
    <n-tab-pane name="jay chou1" tab="Jay Chou1">
      Qilixiang
    </n-tab-pane>
    <n-tab-pane name="oasis2" tab="Oasis2">
      Wonderwall
    </n-tab-pane>
    <n-tab-pane name="the beatles2" tab="the Beatles2">
      Hey Jude
    </n-tab-pane>
    <n-tab-pane name="jay chou2" tab="Jay Chou2">
      Qilixiang
    </n-tab-pane>
    <n-tab-pane name="oasis3" tab="Oasis3">
      Wonderwall
    </n-tab-pane>
    <n-tab-pane name="the beatles3" tab="the Beatles3">
      Hey Jude
    </n-tab-pane>
    <n-tab-pane name="jay chou3" tab="Jay Chou3">
      Qilixiang
    </n-tab-pane>
    <n-tab-pane name="oasis4" tab="Oasis4">
      Wonderwall
    </n-tab-pane>
    <n-tab-pane name="the beatles4" tab="the Beatles4">
      Hey Jude
    </n-tab-pane>
    <n-tab-pane name="jay chou4" tab="Jay Chou4">
      Qilixiang
    </n-tab-pane>
    <n-tab-pane name="oasis5" tab="Oasis5">
      Wonderwall
    </n-tab-pane>
    <n-tab-pane name="the beatles5" tab="the Beatles5">
      Hey Jude
    </n-tab-pane>
    <n-tab-pane name="jay chou5" tab="Jay Chou5">
      Qilixiang
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TabsProps } from 'naive-ui'
const placement = ref<TabsProps['placement']>('left')
</script>
